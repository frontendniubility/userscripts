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
     pageCount: conf.pageCount,
     isDetailPage: url.includes("teachernew"),
     isListPage: url.includes("reservenew"),
     isCoursePage: url.includes("study_center"),
 };

 let configExprMilliseconds = 3600000 * conf.tInfoExprHours; //缓存7天小时
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



 function getBatchNumber() {
     var cur = Date.now();
     if (conf.newBatcherKeyMinutes <= 0) cur;
     let saved = parseInt(GM_getValue('_getBatchNumber'));
     if (!saved || (Date.now() - saved) > conf.newBatcherKeyMinutes * 600000) {
         GM_setValue('_getBatchNumber', cur)
         return cur;
     }
     return saved;
 }



 function getinfokey() {
     return "tinfo-" + gettid();
 }


 function calcIndicator(tinfo) {
     if (isNaN(tinfo.label)) tinfo.label = 0;
     if (isNaN(tinfo.thumbupRate)) tinfo.thumbupRate = 0;
     if (isNaN(tinfo.favoritesCount)) tinfo.favoritesCount = 0;
     return Math.ceil((tinfo.label * tinfo.thumbupRate) / 100) + tinfo.favoritesCount
 }

 function calcThumbRate(tinfo) {
     if (isNaN(tinfo.thumbdown)) tinfo.thumbdown = 0;
     if (isNaN(tinfo.thumbup)) tinfo.thumbup = 0;

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
 function getTeacherInfoFromDetailPage(tinfo_saved = {}, jqr, tinfo_latest = {}) {

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
         labels: jqr.find('.t-d-label>span').map(function (i, v) {
                 var r = /([\u4e00-\u9fa5]+)\s*\(\s*(\d+)\)/gi.exec(v.innerHTML);
                 return {
                     key: r[1],
                     value: r[2]
                 };
             }).get()
             .reduce(function (meta, item) {
                 if (meta[item.key]) meta[item.key] += Number(item.value);
                 meta[item.key] = Number(item.value);
                 return meta;
             }, {}),

     }
     if (jqr.find(".evaluate-content-left span").length >= 3) {

         tinfo.thumbup = Number(jqr.find(".evaluate-content-left span:eq(1)").text().match(num).clean("")[0]);
         tinfo.thumbdown = Number(jqr.find(".evaluate-content-left span:eq(2)").text().match(num).clean("")[0]);
         tinfo.thumbupRate = calcThumbRate(tinfo);

         tinfo.thumbupRate = calcThumbRate(tinfo);
         tinfo.indicator = calcIndicator(tinfo);

         tinfo.slevel = jqr.find(".sui-students").text();
     }
     tinfo.favoritesCount = Number(jqr.find(".clear-search").text().match(num).clean("")[0]);
     tinfo.isfavorite = jqr.find(".go-search.cancel-collection").length > 0;

     tinfo.name = jqr.find(".t-name").text().trim();
     var agesstr = jqr.find(".teacher-name-tit > .age.age-line").text().match(num).clean("");
     tinfo.tage = Number(agesstr[1]);
     tinfo.age = Number(agesstr[0]);
     tinfo.batchNumber = getBatchNumber();
     tinfo = $.extend({}, tinfo_saved, tinfo, tinfo_latest);

     console.log(tinfo)

     jqr.find(".teacher-name-tit").prop("innerHTML", function (i, val) {
         return `${val}
<span class="age age-line"><label title='指标'>${tinfo_saved.indicator}</label></span>
<span class="age age-line"><label title='好评率'>${tinfo_saved.thumbupRate}%</label></span>
<span class="age age-line"><label title='被赞数量'>${tinfo_saved.thumbup}</label></span>
<span class="age age-line"><label title='被踩数量'>${tinfo_saved.thumbdown}</label></span>
<span class="age age-line"><label title='评论标签数量'>${tinfo_saved.label}</label></span>
<span class="age age-line"><label title='在同类别教师中的排名'><span id="teacherRank"></span></label></span>
  `;
     });
     return tinfo;
 }

 export {
     url,
     settings,
     configExprMilliseconds,
     num,
     gettid,
     sleep,
     getBatchNumber,

     getinfokey,
     submit,
     getTeacherInfoFromDetailPage
 }