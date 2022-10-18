// ==UserScript==
// @name         URLTest
// @version      2019.12.20
// @namespace    https://github.com/niubilityfrontend
// @description
// @author       jimbo
// @license      OSL-3.0
// @supportURL   https://github.com/niubilityfrontend/findteacherson51talk
// @match        *:*/*
// @match        *127.0.0.1*:*/*
// @match        *localhost*:*/*
// @grant        GM_xmlhttpRequest
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_listValues
// @grant        GM_deleteValue
// @grant        GM_registerMenuCommand
// @require      http://code.jquery.com/jquery-3.4.1.min.js
// @require      https://code.jquery.com/ui/1.12.1/jquery-ui.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/pace/1.0.2/pace.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/free-jqgrid/4.15.5/i18n/grid.locale-cn.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/free-jqgrid/4.15.5/jquery.jqgrid.min.js
// @require      https://greasyfork.org/scripts/388372-scrollfix/code/scrollfix.js?version=726657
// @require      https://greasyfork.org/scripts/389774-gm-config-toolbar/code/gm_config_toolbar.js?version=730739
// ==/UserScript==
//
function myFunction() {
  var uri = "https://www.w3schools.com/jsref/tryit.asp?Filename=tryjsref_decodeuri&color[0]=red&color[1]=green&selection=1&selection=2&selection=3#testhashzhong中文";
  var enc = encodeURI(uri);
  var dec = decodeURI(enc);
  var params = new URL(uri).searchParams;
  var res = "Encoded URI: " + enc + "<br>" + "Decoded URI: " + dec + "<br> JSON" + JSON.stringify(params);
  $("<div></div>").appendTo('body').html(res);
  params.forEach(function(val, k, arr) {
    console.log(`${val} ${k} `);
  });
}
myFunction();
$("#timesMultipleCheck").find("input").checkboxradio({
	icon: false,
})
$("#btns").eq(0).button({ icon: 'ui-icon-seek-next', showLabel: true }).click(function() {
  $("#timesMultipleCheck>input").each(function (i, item) {
		$(item).prop("checked", !$(item).is(":checked")).change() //checkboxradio 修改值后，必须调用change才会引发UI更新
  })
}).end();

function test(x = "hello", { a, b }, ...args) {
  console.log(x, a, b, args);
}
