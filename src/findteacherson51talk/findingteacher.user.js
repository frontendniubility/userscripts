// ==UserScript==
// @name Best Teacher(JQuery)
// @version 2021.4.15001
// @namespace https://github.com/niubilityfrontend
// @description 谁是最好的老师？-排序显示，经验值计算|自定义经验值公式|好评率|显示年龄|列表显示所有教师
// @author jimbo
// @license OSL-3.0
// @supportURL https://gitee.com/tsharp/userscripts/findteacherson51talk
// @include *51talk.com/ReserveNew/index*
// @include *51talk.com/TeacherNew/*
// @include *51talk.com/user/*
// @include *51talk.cn/ReserveNew/index*
// @include *51talk.cn/TeacherNew/*
// @include *51talk.cn/user/*
// @include *51suyang.cn/ReserveNew/index*
// @include *51suyang.cn/TeacherNew/*
// @include *51suyang.cn/user/*
// @grant GM_xmlhttpRequest
// @grant GM_getValue
// @grant GM_setValue
// @grant GM_listValues
// @grant GM_deleteValue
// @grant GM_registerMenuCommand
// ==/UserScript==

// @require https://code.jquery.com/jquery-3.6.0.min.js

// loadScript('https://gitee.com/tsharp/jqGrid/raw/v4.15.5/dist/jquery.jqgrid.min.js')
// 	.then(d => loadScript('https://gitee.com/tsharp/jquery.ui/raw/1.12.1/jquery-ui.min.js'))
// 	.then(d => loadScript('https://gitee.com/tsharp/jquery-scrollfix/raw/master/src/scrollfix.js'))
// 	.then(d => loadScript('https://gitee.com/tsharp/jqGrid/raw/v4.15.5/dist/i18n/grid.locale-cn.js'))
// 	.then(d => loadScript('https://gitee.com/tsharp/pace/raw/v1.2.4/pace.min.js'))
import './../../libs/jquery-ui-1.12.1/jquery-ui.min.js'
import '../../libs/jqGrid-4.15.5/dist/jquery.jqgrid.min.js'
import '../../libs/pace-1.2.4/pace'
import '../../libs/jquery-scrollfix-v3.0.2/src/scrollfix'
import dayjs from "dayjs"
import zh_cn from "dayjs/locale/zh-cn"
import relative from "dayjs/plugin/relativeTime"
import { conf } from "./bestteacher_gm_toolbar"
import { configExprMilliseconds, getTId, setSession, settings, submit } from "./common"

import "./findingteacher.user.css"

import {
	addCheckbox, executeFilters, getUiFilters, IsTriggerNextTimeSlotOk,
	maxAge, maxFc, maxLabel, maxRate, minAge, minFc, minLabel, minRate, listMain
} from "./listpage.js"

import "./jqueryextend"
import "./detailpage"
// import setUpPace from "./pacesetup"
import UiHtmlTemplate from "./pluginUITemplate.html"

async function main() {

	dayjs.extend(relative)
	dayjs.locale(zh_cn)
	if (settings.isListPage || settings.isDetailPage) {
		//构建插件信息
		submit(function (next) {
			try {
				let config = GM_getValue("filterConfig", {
					l1: minLabel ?? 300,
					l2: maxLabel ?? 200,
					rate1: minRate ?? 97,
					rate2: maxRate ?? 100,
					age1: minAge ?? 0,
					age2: maxAge ?? 100,
					fc1: minFc ?? 0,
					fc2: maxFc ?? 999999,
				})

				$("body").append(UiHtmlTemplate)
				if (!settings.isListPage) {
					$("#filterButtons").hide()
				}
				$("body").append("<div id='teacherListDialog' style='display:none;'></div>")
				$("body").append("<div id='wwwww'>已加载选课辅助插件。</div>") //这是一个奇怪的BUG on jqueryui. 如果不多额外添加一个，则dialog无法弹出。
				$("#labelSlider")
					.slider({
						range: true,
						min: minLabel - 1,
						max: maxLabel + 1,
						values: [config.l1 < minLabel - 1 ? minLabel - 1 : config.l1, maxLabel],
						slide: function (event, ui) {
							$("#_tLabelCount").html(ui.values[0] + " - " + ui.values[1])
						},
					})
					.on("slidestop", function (event, ui) {
						let l = $(this).slider("values")
						let uiFilters = getUiFilters()
						let filterConfig = GM_getValue("filterConfig", uiFilters)
						filterConfig.l1 = l[0]
						filterConfig.l2 = l[1]
						GM_setValue("filterConfig", filterConfig)
						executeFilters(uiFilters)
					})
				$("#fcSlider")
					.slider({
						range: true,
						min: minFc - 1,
						max: maxFc + 1,
						values: [config.fc1, config.fc2],
						slide: function (event, ui) {
							$("#_tfc").html(ui.values[0] + " - " + ui.values[1])
						},
					})
					.on("slidestop", function (event, ui) {
						let fc = $(this).slider("values")
						let uiFilters = getUiFilters()
						let filterConfig = GM_getValue("filterConfig", uiFilters)
						filterConfig.fc1 = fc[0]
						filterConfig.fc2 = fc[1]
						GM_setValue("filterConfig", filterConfig)
						executeFilters(uiFilters)
					})
				$("#thumbUpRateSlider")
					.slider({
						range: true,
						min: minRate,
						max: maxRate,
						values: [config.rate1, config.rate2],
						slide: function (_event, ui) {
							$("#_thumbUpRate").html(ui.values[0] + "% - " + ui.values[1] + "%")
						},
					})
					.on("slidestop", function (event, ui) {
						let rate = $("#thumbUpRateSlider").slider("values")
						let uiFilters = getUiFilters()
						let filterConfig = GM_getValue("filterConfig", uiFilters)
						filterConfig.rate1 = rate[0]
						filterConfig.rate2 = rate[1]
						GM_setValue("filterConfig", filterConfig)
						executeFilters(uiFilters)
					})

				$("#tAgeSlider")
					.slider({
						range: true,
						min: minAge,
						max: maxAge,
						values: [config.age1 < minAge ? minAge : config.age1, config.age2 > maxAge ? maxAge : config.age2],
						slide: function (event, ui) {
							$("#_tAge").html(ui.values[0] + " - " + ui.values[1])
						},
					})
					.on("slidestop", function (event, ui) {
						let age = $(this).slider("values")
						let uiFilters = getUiFilters()
						let filterConfig = GM_getValue("filterConfig", uiFilters)
						filterConfig.age1 = age[0]
						filterConfig.age2 = age[1]

						GM_setValue("filterConfig", filterConfig)
						executeFilters(uiFilters)
					})
				$("#buttons>button,#buttons>input,#buttons>a")
					//升序
					.eq(0)
					.button({ icon: "ui-icon-arrowthick-1-n", showLabel: true })
					.click(function () {
						$("#desc").show()
						$(this).hide()
						sortElementsByIndicator(asc)
					})
					.end()
					//降序
					.eq(1)
					.button({ icon: "ui-icon-arrowthick-1-s", showLabel: true })
					.click(function () {
						$("#asc").show()
						$(this).hide()
						sortElementsByIndicator(desc)
					})
					.end()
					// 缓存过期时间（小时）
					.eq(2)
					.spinner({
						min: 0,
						spin: function (event, ui) {
							GM_setValue("tInfoExprHours", ui.value)
						},
					})
					.css({ width: "45px" })
					.val(GM_getValue("tInfoExprHours", configExprMilliseconds / 3600000))
					.hide()
					.end()
					//清空缓存
					.eq(3)
					.button({ icon: "uiicon-trash", showLabel: true })
					.click(function () {
						var keys = GM_listValues()
						$.each(keys, function (i, item) {
							let title = `正在删除第${i}个教师缓存`
							submit(function (next1) {
								try {
									$("title").html(title)
									GM_deleteValue(item)
								} finally {
									next1()
								}
							})
						})
						$(".go-search").click()
					})
					.end()
					//submit suggestion
					.eq(4)
					.button({ icon: "ui-icon-comment", showLabel: true })
					.prop("href", "https://gitee.com/tsharp/userscripts/issues/new?assignees=&labels=&template=feature_request.md&title=")
					.prop("target", "_blank")
					.end()
					//系统帮助
					.eq(5)
					.button({ icon: "ui-icon-help", showLabel: true })
					.prop("href", "https://gitee.com/tsharp/userscripts/tree/master/findteacherson51talk")
					.prop("target", "_blank")
					.end()
				$("#buttons1>button")
					//反选时间段
					.eq(0)
					.button({ icon: "ui-icon-seek-next", showLabel: true })
					.click(function () {
						$("#timesMultipleCheck>input").each(function (i, item) {
							$(item).prop("checked", !$(item).is(":checked")).change()
						})
					})
					.end()
					// 获取选定时段老师
					.eq(1)
					.button({ icon: "ui-icon-seek-next", showLabel: true })
					.click(function () {
						selectedTimeSlots = []
						$("#timesMultipleCheck>input").each(function (i, item) {
							if ($(item).is(":checked")) {
								selectedTimeSlots.push($(item).val())
							}
						})
						setSession("selectedTimeSlots", selectedTimeSlots)
						setSession("selectedTimeSlotsTotal", selectedTimeSlots.length)
						IsTriggerNextTimeSlotOk()
					})
					.end()
				//初始化时间选择按钮
				$("div.condition-type:eq(0)>ul.condition-type-time>li").each(function (i, item) {
					addCheckbox($(item).attr("data-val"), $(item).text())
				})
				let timesStr = sessionStorage.getItem("selectedTimeSlots"),
					selectedTimeSlots = []
				if (timesStr) {
					selectedTimeSlots = JSON.parse(timesStr)
					if (selectedTimeSlots.length > 0) {
						let i = selectedTimeSlots.length
						while (i--) {
							$("#timesMultipleCheck>input[value='" + selectedTimeSlots[i] + "']").attr("checked", true)
						}
					} else {
						$("#timesMultipleCheck>input[value='" + $("input[name='selectTime']").val() + "']").attr("checked", true)
					}
				} else {
					$("#timesMultipleCheck>input[value='" + $("input[name='selectTime']").val() + "']").attr("checked", true)
				}
				$("#timesMultipleCheck").find("input").checkboxradio({
					icon: false,
				})

				$("#tabs").tabs({
					active: "#tabs-2",
					activate: function (event, ui) {
						if (ui.newPanel.attr("id") != "tabs-2") return
						let teachers = getCachedTeachers()
						$("#teacherTab")
							//searchoptions:{sopt:['eq','ne','le','lt','gt','ge','bw','bn','cn','nc','ew','en']}
							.jqGrid({
								data: teachers,
								datatype: "local",
								height: 240,
								colNames: ["查", "类型", "排名", "Name", "爱", "分", "标", "率%", "收藏数", "学", "教龄", "好", "差", "龄", "更新"],
								colModel: [
									//
									{
										name: "batchNumber",
										index: "batchNumber",
										width: 45,
										sorttype: "float",
										align: "right",
										searchoptions: {
											sopt: ["cn"],
										},
										formatter: function formatter(value, options, rData) {
											let date = dayjs(value)
											if (date.isValid()) {
												return `<span title='${date.format("YY-M-D H:m:s")}'>${date.format("HHmmss")}</span>`
											}
											return value
										},
									}, //
									{
										name: "type",
										index: "type",
										width: 55,
										sorttype: "string",
										align: "left",
										searchoptions: {
											sopt: ["cn"],
											defaultValue: $(".s-t-top-list .li-active").text() == "收藏外教" ? "" : $(".s-t-top-list .li-active").text(),
										},
										formatter: function formatter(value, options, rData) {
											if (value) return value
											else return "na"
										},
									}, //
									{ name: "rank", index: "rank", width: 40, sorttype: "float", align: "right", searchoptions: { sopt: ["le"] } }, //
									{
										name: "name",
										index: "name",
										width: 125,
										sorttype: "string",
										formatter: function formatter(value, options, rData) {

											return `<a href='${window.location.protocol}//${window.location.host}/TeacherNew/info/${rData["tid"]}' target='_blank' style='color:blue'>${value ? value : rData["tid"]}</a>`
											// return "<a href='http://www.51talk.com/TeacherNew/info/" + rData["tid"] + "' target='_blank' style='color:blue'>" + (value ? value : rData["tid"]) + "</a>"
										},
									}, //
									{
										name: "isFavorite",
										index: "isFavorite",
										width: 39,
										sorttype: "string",
										align: "left",
										searchoptions: { sopt: ["cn"] },
										formatter: function formatter(value, options, rData) {
											if (value) return "收藏"
											else return ""
										},
									}, //
									{ name: "indicator", index: "indicator", width: 50, sorttype: "float", align: "right", searchoptions: { sopt: ["ge"] } }, //
									{ name: "label", index: "label", width: 45, align: "right", searchoptions: { sopt: ["ge"] } }, //
									{ name: "thumbUpRate", index: "thumbUpRate", width: 35, align: "right", sorttype: "float", searchoptions: { sopt: ["ge"] } }, //
									{ name: "favoritesCount", index: "favoritesCount", width: 35, align: "right", sorttype: "float", searchoptions: { sopt: ["ge"] } }, //
									{ name: "sLevel", index: "sLevel", width: 85, sorttype: "string", align: "left", searchoptions: { sopt: ["cn", "nc"] } }, //
									{ name: "tAge", index: "tAge", width: 25, sorttype: "float", align: "right", searchoptions: { sopt: ["ge"] } }, //
									{ name: "thumbUp", index: "thumbUp", width: 45, align: "right", sorttype: "float", searchoptions: { sopt: ["ge"] } }, //
									{ name: "thumbDown", index: "thumbDown", width: 30, sorttype: "float", align: "right" }, //
									{ name: "age", index: "age", width: 30, sorttype: "float", align: "right", searchoptions: { sopt: ["le", "ge", "eq"] } }, //
									{
										name: "updateTime",
										index: "updateTime",
										width: 35,
										sorttype: "Date",
										align: "right",
										searchoptions: { sopt: ["cn"] },
										formatter: function formatter(value, options, rData) {
											if (value) {
												return dayjs(value).fromNow(true)
												// let d = Date.now() - value;
												// if (d < 1000 * 60) {
												// 	return "刚刚";
												// } else if (d < 1000 * 60 * 60) {
												// 	return (d / 60000).toFixed(0) + "分";
												// } else if (d < 1000 * 60 * 60 * 24) {
												// 	return (d / 3600000).toFixed(0) + "时";
												// } else {
												// 	return (d / 86400000).toFixed(0) + "天";
												// }
											} else return "na"
										},
									},
								],
								multiselect: false,
								rowNum: 10,
								rowList: [5, 10, 20, 30],
								pager: "#pager5",
								sortname: "batchNumber desc,indicator desc",
								viewrecords: true,
								multiSort: true,
								sortorder: "desc",
								grouping: false,
								// shrinkToFit: false,
								responsive: true,
								del: true,
								//refresh: true,
								// autowidth: true,
								width: 830,
								//caption: "",,
							})
							.jqGrid("filterToolbar", {
								searchOperators: true,
							})[0]
							.triggerToolbar()
						if (settings.isListPage) {
							$.each($(".item"), function (i, item) {
								let jqEl = $(item)
								let tid = jqEl.find(".teacher-details-link a").attr("href").replace(`${window.location.protocol}//${window.location.host}/TeacherNew/info/`, "")
								let t = teachers.find((currentValue, index, arr) => {
									return currentValue.tid == tid
								})
								let lb = jqEl.find(".teacher-name>label:eq(3)")
								if (lb.length == 0) jqEl.find(".teacher-name").html(`${jqEl.find(".teacher-name").html()}| ${getRankHtml(t)}`)
								else lb.replaceWith(getRankHtml(t))
							})
						}
						if (settings.isDetailPage) {
							let t = teachers.find((currentValue, index, arr) => {
								return currentValue.tid == getTId()
							})
							$("#teacherRank").html(getRankHtml(t))
						}
					},
				})
				let uiFilters_top = getUiFilters()
				executeFilters(uiFilters_top)
				$("#_tAge").html(uiFilters_top.age1 + " - " + uiFilters_top.age2)
				$("#_tLabelCount").html(uiFilters_top.l1 + " - " + uiFilters_top.l2)
				$("#_tfc").html(uiFilters_top.fc1 + " - " + uiFilters_top.fc2 + "")
				$("#_thumbUpRate").html(uiFilters_top.rate1 + "% - " + uiFilters_top.rate2 + "%")
			} catch (ex) {
				console.debug(ex + "")
				throw ex
			} finally {
				next()
			}
		})

		//弹出信息框
		submit(function (next) {
			$(".s-t-list").before($(".s-t-page").prop("outerHTML"))
			$("#tabs>div:first").append($(".s-t-page").prop("outerHTML"))
			sortElementsByIndicator(desc)
			$("#tabs").tabs("option", "active", 1)
			if (settings.isDetailPage) {
				$("#tabs").tabs("option", "disabled", [0])
			}
			$("#filterDialog").dialog({
				width: "850",
			})
			$("#filterDialog").parent().scrollFix()
			$("#filterDialog").dialog("open")
			next()
		})
	}
	if (settings.isCoursePage) {
		submit(function (next) {
			$(".course_lock").removeClass("course_lock").addClass("course_unlock")
			$("img.course_mask").removeClass("course_mask").attr("src", "")
			next()
		})
	}
}

; (function (loadScript) {


	Promise.resolve()

		//.then(data => setUpPace(loadScript))
		.then(data => {
			Pace.Options = {
				ajax: false, // disabled
				document: false, // disabled
				eventLag: false, // disabled
				elements: {
					selectors: ["#filterDialog"],
				},
			}
		})
		.then(data => listMain(loadScript))
		.then(data => main())
		.catch(er => console.log('catched errors: ', er))
	// .catch(e => {
	// 	alert('Erron on loading script >>:' + e)
	// })




})((src, cb) => {
	return new Promise((resolve, reject) => {
		try {
			let docu = unsafeWindow.document || window.document
			const tag = docu.createElement("script")
			const container = docu.head || docu.body

			tag.type = "text/javascript"
			//	tag.async = async
			tag.crossorigin = "use-credentials"
			tag.src = src

			tag.onload = () => resolve({ loaded: true, error: false })
			tag.onerror = () => reject({
				loaded: false,
				error: true,
				message: `Failed to load script with src ${src}`,
			})

			container.appendChild(tag)
		} catch (error) {
			reject(error)
		}
	})
})
function asc(a, b) {
	let av = $(a).attr("indicator")
	let bv = $(b).attr("indicator")
	if (!av || !bv) return 0
	return $(a).attr("indicator").toFloat() > $(b).attr("indicator").toFloat() ? 1 : -1
}
function desc(a, b) {
	let av = $(a).attr("indicator")
	let bv = $(b).attr("indicator")
	if (!av || !bv) return 0
	return $(a).attr("indicator").toFloat() > $(b).attr("indicator").toFloat() ? -1 : 1
}
function sortElementsByIndicator(sortBy) {
	let container = $(".s-t-content.f-cb"),
		sortedElements = container.find(".item").detach().sort(sortBy)
	container.append(sortedElements)
}

/**
 * @typedef {import('./global').TypeofTeacher} Teacher
 * @param {JQuery<Element>} jqr
 */
function getCachedTeachers() {
	/**
	 * @type Array<Teacher>
	 */
	let teachers = []
	$.each(GM_listValues(), function (i, item) {
		if (item.startsWith("tinfo-")) {
			let t = GM_getValue(item)
			t.tid = item.slice(6, item.length)
			teachers.push(t)
		}
	})
	let indexs = {}
	teachers = teachers
		.sort(function (t1, t2) {
			if (t1.indicator == t2.indicator) return t1.favoritesCount > t2.favoritesCount ? -1 : 1
			return t1.indicator > t2.indicator ? -1 : 1
		})
		.map((val, idx) => {
			if (isNaN(indexs[val.type])) {
				indexs[val.type] = 1
			} else {
				indexs[val.type] += 1
			}
			val.rank = indexs[val.type]
			return val
		})
	return teachers
}
function getRankHtml(t) {
	if (t) {
		let colorIf = ""
		if (t.rank <= conf.markRankRed) {
			colorIf = "style = 'color:red'"
		}
		return `<label title='在同类别教师中的排名' ${colorIf}> ${t.rank}名</label>`
	} else {
		return `<label title='未找到该教师' > N名</label>`
	}
}
