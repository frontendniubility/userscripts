import { config } from "./bestteacher_gm_toolbar"
import { configExprMilliseconds, getBatchNumber, getLabelByItems, getLabelCount, getSession, getTeacherInfoFromDetailPage, getTId, setSession, settings, submit } from "./common"
import "./jqueryextend"

config.onsave = cfg => {
	// conf = cfg;
	console.debug(cfg)
	try {
		// test it
		new Function("t", `return ${cfg.calcIndicator}`)({})
	} catch (error) {
		console.debug(error)
		alert(`计算公式错误，排名计算方式使用默认公式。Error:${error}`)
		return false
	}

	GM_setValue("_getBatchNumber", 0)

	$("#autoGetNextPage").text("自动获取" + getAutoNextPagesCount() + "页")
}
let maxRate = 0,
	minRate = 99999,
	maxLabel = 0,
	minLabel = 9999999,
	maxFc = 0,
	minFc = 999999,
	maxAge = 0,
	minAge = 99999

function getLeftPageCount() {
	let pages = Number($(".s-t-page>.next-page:first").prev().text())
	let curr = Number($(".s-t-page>.active:first").text())
	if (pages) return pages - curr
	else return 0
}

function getAutoNextPagesCount() {
	let pages = getLeftPageCount()
	if (settings.pageMaxCount > pages) return pages
	else return settings.pageMaxCount
}

function updateTeacherInfoToUI(jqEl, tinfo) {
	if (!isNaN(tinfo.label)) {
		if (tinfo.label > maxLabel) maxLabel = tinfo.label
		if (tinfo.label < minLabel) minLabel = tinfo.label
	}
	if (tinfo.favoritesCount && !isNaN(tinfo.favoritesCount)) {
		if (tinfo.favoritesCount > maxFc) maxFc = tinfo.favoritesCount
		if (tinfo.favoritesCount < minFc) minFc = tinfo.favoritesCount
	}
	if (!isNaN(tinfo.thumbUpRate)) {
		if (tinfo.thumbUpRate > maxRate) maxRate = tinfo.thumbUpRate
		if (tinfo.thumbUpRate < minRate) minRate = tinfo.thumbUpRate
	}
	if (!isNaN(tinfo.age)) {
		if (tinfo.age > maxAge) maxAge = tinfo.age
		if (tinfo.age < minAge) minAge = tinfo.age
	}

	jqEl.attr("teacherInfo", JSON.stringify(tinfo))
	jqEl.find(".teacher-name").html(
		jqEl.find(".teacher-name").html() +
		`<br /><label title='评论标签数量'>${tinfo.label}</label>|<label title='好评率'>${tinfo.thumbUpRate}%</label>
      | <label title='收藏数量'>${tinfo.favoritesCount} </label> `,
	)
	// jqEl.find(".teacher-age").html(jqEl.find(".teacher-age").html() + " | <label title='收藏数量'>" + tinfo.favoritesCount + "</label>");
	jqEl.attr("indicator", tinfo.indicator)
}

function executeFilters(uiFilters) {
	let tCount = 0,
		hideCount = 0
	console.debug("-----uiFilters", uiFilters)
	$.each($(".item"), function (i, item) {
		let node = $(item)
		let tInfoJson = node.attr("teacherInfo")
		if (!tInfoJson) {
			return true
		}
		let tinfo = JSON.parse(tInfoJson)
		var isShown = true
		if (!isNaN(tinfo.thumbUpRate)) isShown = tinfo.thumbUpRate >= uiFilters.rate1 && tinfo.thumbUpRate <= uiFilters.rate2 && isShown
		if (!isNaN(tinfo.label)) isShown = tinfo.label >= uiFilters.l1 && tinfo.label <= uiFilters.l2 && isShown
		if (!isNaN(tinfo.age)) isShown = tinfo.age >= uiFilters.age1 && tinfo.age <= uiFilters.age2 && isShown
		if (!isNaN(tinfo.favoritesCount)) isShown = tinfo.favoritesCount >= uiFilters.fc1 && tinfo.favoritesCount <= uiFilters.fc2 && isShown

		if (isShown) {
			if (node.is(":hidden")) {
				//如果node是隐藏的则显示node元素，否则隐藏
				node.show().animate({ left: "+=50" }, 3500).animate({ left: "-=50" }, 3500)
			} else {
				//nothing todo
			}
			tCount++
		} else {
			console.debug("Hide---------------", tinfo)
			node.css("color", "white").hide(500)
			hideCount++
		}
	})
	$("#tCount").text(tCount)
	$("#tHideCount").text(hideCount)
}

function getUiFilters() {
	let [l1, l2] = $("#labelSlider").slider("values")
	let [rate1, rate2] = $("#thumbUpRateSlider").slider("values")
	let [age1, age2] = $("#tAgeSlider").slider("values")
	let [fc1, fc2] = $("#fcSlider").slider("values")

	return { l1, l2, rate1, rate2, age1, age2, fc1, fc2 }
}

/**
 * @param {JQuery<Element>} jqEl
 * @returns {TeacherInfoList}
 */
function getTeacherInfoFromListPageUI(jqEl) {
	let label = getLabelCount(jqEl.find(".label")),
		labels = getLabelByItems(jqEl.find(".label>span")),
		name = jqEl.find(".teacher-name").text(),
		type = $(".s-t-top-list .li-active").text(),
		batchNumber = getBatchNumber()
	if (type == "收藏外教") {
		let isFavorite = true
		return {
			label,
			name,
			batchNumber,
			isFavorite,
			labels,
		}
	} else
		return {
			label,
			name,
			batchNumber,
			type,
			labels,
		}
}

if (settings.isListPage) {
	$(".item-top-cont").prop("innerHTML", function (i, val) {
		return val.replaceAll("<!--", "").replaceAll("-->", "")
	})
	// 自动获取时,显示停止按钮
	submit(function (next) {
		let totalPages = Number($(".s-t-page:last>a:last").prev().text()),
			curPageId = window.parameters().pageID ? window.parameters().pageID : 1,
			remainPages = totalPages - curPageId
		let autoNextPageCount = getSession("autoNextPageCount", 0)

		if (autoNextPageCount > 0 && $(".s-t-page>.next-page").length > 0) {
			let dialog = $(`<div id="dialog-confirm" title="是否停止自动搜索老师?">
<p><span class="ui-icon ui-icon-alert" style="float:left; margin:12px 12px 20px 0;"></span>
<b>正在根据您的选择自动获取教师信息</b><br><br>
剩余${sessionStorage.getItem("selectedTimeSlotsRemain")}/${sessionStorage.getItem("selectedTimeSlotsTotal")}个时段，<br><br>
当前时段约${totalPages * 28}个教师，获取第${curPageId}/${totalPages}页，进度${Math.floor((curPageId / totalPages) * 100)}%,<br>

</p>
</div>`)
			dialog.appendTo("body")
			dialog.dialog({
				resizable: false,
				height: "auto",
				width: 400,
				modal: false,
				buttons: {
					停止获取: function () {
						sessionStorage.removeItem("selectedTimeSlots")
						setSession("autoNextPageCount", 0)
						$(this).dialog("close")
					},
					[`取后${(remainPages * 0.25).toFixed(0)}页`]: function () {
						sessionStorage.removeItem("selectedTimeSlots")
						setSession("autoNextPageCount", (remainPages * 0.25).toFixed(0))
						$(this).dialog("close")
					},
					[`取后${(remainPages * 0.5).toFixed(0)}页`]: function () {
						sessionStorage.removeItem("selectedTimeSlots")
						setSession("autoNextPageCount", (remainPages * 0.5).toFixed(0))
						$(this).dialog("close")
					},
					[`取后${(remainPages * 0.75).toFixed(0)}页`]: function () {
						sessionStorage.removeItem("selectedTimeSlots")
						setSession("autoNextPageCount", (remainPages * 0.75).toFixed(0))
						$(this).dialog("close")
					},
				},
			})
		}
		next()
	})

	//获取列表中数据
	$(".item").each(function (index, el) {
		submit(function (next) {
			Pace.track(function () {
				let jqEl = $(el)
				let tid = getTId(jqEl.find(".teacher-details-link a").attr("href"))
				let tInfoKey = "tinfo-" + tid

				/** @type {TeacherInfoList|TeacherInfo} */
				let tinfo = getTeacherInfoFromListPageUI(jqEl)

				/** @type {TeacherInfo} */
				let tinfo_saved = GM_getValue(tInfoKey)
				if (tinfo_saved) {
					let now = Date.now()
					if (!tinfo_saved.updateTime) {
						tinfo_saved.updateTime = new Date(1970, 1, 1).getTime()
					}
					tinfo = $.extend({}, tinfo_saved, tinfo)

					if (now - tinfo_saved.updateTime < configExprMilliseconds) {
						updateTeacherInfoToUI(jqEl, tinfo)
						GM_setValue(tInfoKey, tinfo)
						next()
						return true
					}
				}
				// ajax 请求一定要包含在一个函数中
				let start = Date.now()
				$.ajax({
					url: `${window.location.protocol}//${window.location.host}/TeacherNew/teacherComment?tid=${tid}&type=bad&has_msg=1`,
					type: "GET",
					dateType: "html",
					success: function (r) {
						let jqr = $(r)
						tinfo = getTeacherInfoFromDetailPage(tinfo, jqr, {})
						jqr.remove()
						updateTeacherInfoToUI(jqEl, tinfo)
						GM_setValue(tInfoKey, tinfo)
					},
					error: function (data) {
						console.debug("xhr error when getting teacher " + JSON.stringify(jqEl) + ",error msg:" + JSON.stringify(data))
					},
				}).always(function () {
					while (Date.now() - start < 600) {
						continue
					}
					next()
				})
			})
		})
	})

	submit(function (next) {
		//翻页
		let autoNextPageCount = getSession("autoNextPageCount", 0)
		if (autoNextPageCount > 0) {
			setSession("autoNextPageCount", autoNextPageCount - 1)
			if ($(".s-t-page>.next-page").length == 0) {
				setSession("autoNextPageCount", 0)
				if (isStopShowBoxAndAutoGetNextTimeTeachers()) return
			} else {
				$(".s-t-page .next-page")[0].click()
				return false
			}
		} else {
			if (isStopShowBoxAndAutoGetNextTimeTeachers()) return
		}
		next()
	})
}

function isStopShowBoxAndAutoGetNextTimeTeachers() {
	let str = sessionStorage.getItem("selectedTimeSlots")
	if (!str) return false
	let selectedTimeSlots = JSON.parse(str)
	let cur = selectedTimeSlots.shift()
	if (cur) {
		setSession("autoNextPageCount", 500)
		setSession("selectedTimeSlots", selectedTimeSlots)
		setSession("selectedTimeSlotsRemain", selectedTimeSlots.length)
		$('form[name="searchform"]>input[name="selectTime"]').val(cur)
		$('form[name="searchform"]>input[name="pageID"]').val(1)
		$(".go-search").trigger("click")
		return true
	}
	return false
}

function addCheckbox(val, lbl, group) {
	let container = $("#timesMultipleCheck")
	let inputs = container.find("input")
	let id = inputs.length + 1
	$("<input />", {
		type: "checkbox",
		id: "cb" + id,
		value: val,
		name: group,
	}).appendTo(container)
	$("<label />", {
		for: "cb" + id,
		text: lbl ? lbl : val,
	}).appendTo(container)
}

export { addCheckbox, executeFilters, getTeacherInfoFromListPageUI as getTeacherInfoInList, getUiFilters, isStopShowBoxAndAutoGetNextTimeTeachers, maxAge, maxFc, maxLabel, maxRate, minAge, minFc, minLabel, minRate, updateTeacherInfoToUI }
