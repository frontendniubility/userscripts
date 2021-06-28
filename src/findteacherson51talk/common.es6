 //*://www.51talk.com/ReserveNew/index*
 //https://www.51talk.com/TeacherNew/info/t26501111
 //https://www.51talk.com/TeacherNew/teacherComment?tid=t26501111&type=all&has_msg=1
 //https://www.51talk.com/TeacherNew/teacherComment?tid=t26501111&type=good&has_msg=1
 //https://www.51talk.com/TeacherNew/teacherComment?tid=t26501111&type=bad&has_msg=1
 //https://www.51talk.com/user/study_center_zx
 //https://www.51talk.com/user/study_center_zy
 //https://www.51talk.com/user/study_center_xx

 import {
     conf,
     config
 } from './bestteacher_gm_toolbar.es6';
 let url = window.location.href.toLocaleLowerCase();
 let settings = {
     url: url,
     tid: url.match(/(t\d+)/g),
     pagecount: conf.pagecount,
     isDetailPage: url.includes("teachernew"),
     isListPage: url.includes("reservenew"),
     isCoursePage: url.includes("study_center"),
 };

 let configExprMilliseconds = 3600000 * conf.tinfoexprhours; //缓存7天小时
 let num = /[0-9]*/g;

 function gettid() {
     return settings.tid;
 }

 function getorAddSession(key, func) {
     if (!(key in sessionStorage)) {
         let data = typeof func == "function" ? func(key) : func;
         sessionStorage.setItem(key, data);
         return data;
     }
     return sessionStorage.getItem(key);
 }

 function sleep(delay) {
     let start = Date.now();
     while (Date.now() - start < delay) {
         continue;
     }
 }


 let asc = function (a, b) {
     let av = $(a).attr("indicator");
     let bv = $(b).attr("indicator");
     if (!av || !bv) return 0;
     return $(a).attr("indicator").toFloat() > $(b).attr("indicator").toFloat() ? 1 : -1;
 };
 let desc = function (a, b) {
     let av = $(a).attr("indicator");
     let bv = $(b).attr("indicator");
     if (!av || !bv) return 0;
     return $(a).attr("indicator").toFloat() > $(b).attr("indicator").toFloat() ? -1 : 1;
 };
 let sortByIndicator = function (sortBy) {
     let sortEle = $(".s-t-content.f-cb .item").sort(sortBy);
     $(".s-t-content.f-cb").empty().append(sortEle);
 };

 function getBatchNumber() {
     var cur = Date.now();
     if (conf.newBatcherKeyHours <= 0) cur;
     let saved = parseInt(GM_getValue('_getBatchNumber'));
     if (!saved || (Date.now() - saved) > conf.newBatcherKeyHours * 3600000) {
         GM_setValue('_getBatchNumber', cur)
         return cur;
     }
     return saved;
 }

 function getLeftPageCount() {
     let pages = Number($(".s-t-page>.next-page:first").prev().text());
     let curr = Number($(".s-t-page>.active:first").text());
     if (pages) return pages - curr;
     else return 0;
 }

 function getAutoNextPagesCount() {
     let pages = getLeftPageCount();
     if (settings.pagecount > pages) return pages;
     else return settings.pagecount;
 }


 function getinfokey() {
     return "tinfo-" + gettid();
 }


 function calcIndicator(tinfo) {
     return Math.ceil((tinfo.label * tinfo.thumbupRate) / 100) + tinfo.favoritesCount;
 }

 function calcThumbRate(tinfo) {
     let all = tinfo.thumbdown + tinfo.thumbup;
     if (all < 1) all = 1;
     return ((tinfo.thumbup + 0.00001) / all).toFixed(2) * 100;
 }

 /**
  * 提交运算函数到 document 的 fx 队列
  */
 function submit(fun) {
     let queue = $.queue(document, "fx", fun);
     if (queue[0] == "inprogress") {
         return;
     }
     $.dequeue(document);
 }
 /**
  * 
  * @param  {JQuery<document>} jqr the all html page elements
  * @returns 
  */
 function getTeacherInfoFromDetailPage(jqr) {

     jqr.find(".teacher-name-tit").prop("innerHTML", function (i, val) {
         return val.replaceAll("<!--", "").replaceAll("-->", "");
     });

     let tinfo = {
         label: (function () {
             let l = 0;
             $.each(jqr.find(".t-d-label").text().match(num).clean(""), function (i, val) {
                 l += Number(val);
             });
             return l;
         })(),
         updateTime: Date.now(),
     }
     if (jqr.find(".evaluate-content-left span").length >= 3) {

         tinfo.thumbup = Number(jqr.find(".evaluate-content-left span:eq(1)").text().match(num).clean("")[0]);
         tinfo.thumbdown = Number(jqr.find(".evaluate-content-left span:eq(2)").text().match(num).clean("")[0]);
         tinfo.thumbupRate = calcThumbRate(tinfo);
         tinfo.slevel = jqr.find(".sui-students").text();
     }
     tinfo.favoritesCount = Number(jqr.find(".clear-search").text().match(num).clean("")[0]);
     tinfo.isfavorite = jqr.find(".go-search.cancel-collection").length > 0;

     tinfo.name = jqr.find(".t-name").text().trim();
     var agesstr = jqr.find(".teacher-name-tit > .age.age-line").text().match(num).clean("");
     tinfo.tage = Number(agesstr[1]);
     tinfo.age = Number(agesstr[0]);

     tinfo.batchNumber = getBatchNumber();

     tinfo.thumbupRate = calcThumbRate(tinfo);
     tinfo.indicator = calcIndicator(tinfo);
     
     return tinfo;
 }

 export {
     url,
     settings,
     configExprMilliseconds,
     num,
     gettid,
     getorAddSession,
     sleep,
     asc,
     desc,
     sortByIndicator,
     getBatchNumber,
     getLeftPageCount,
     getAutoNextPagesCount,
     getinfokey,
     calcIndicator,
     calcThumbRate,
     submit
 }