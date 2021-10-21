// ==UserScript==
// @name BestTeachers
// @version 2021.4.15001
// @namespace https://github.com/niubilityfrontend
// @description 谁是最好的老师？-排序显示，经验值计算|自定义经验值公式|好评率|显示年龄|列表显示所有教师
// @author jimbo
// @license OSL-3.0
// @supportURL https://github.com/niubilityfrontend/bestteacher
// @match *://www.51talk.com/ReserveNew/index*
// @match *://www.51talk.com/TeacherNew/*
// @match *://www.51talk.com/user/*
// @match *
// @grant GM_xmlhttpRequest
// @grant GM_getValue
// @grant GM_setValue
// @grant GM_listValues
// @grant GM_deleteValue
// @grant GM_registerMenuCommand
// @require https://raw.githubusercontent.com/niubilityfrontend/pace/v1.2.4/pace.min.js
// @require https://raw.githubusercontent.com/niubilityfrontend/jquery-scrollfix/master/src/scrollfix.js
// ==/UserScript==

import Vue from "vue";
import vuetify from "./plugins/vuetify"; // path to vuetify export
$("body").append(`<div id="app"></div>`);
$("body").append(`<div id="ee">xxxxxxxxxxxxxxx</div>`);
window.Vue = Vue;
new Vue({
	vuetify,
}).$mount("#app");
