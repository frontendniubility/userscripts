// ==UserScript==
// @name        URLTest
// @version     2023.228.5144344
// @author      jimbo
// @description tampermonkey scripts
// @homepage    https://github.com/niubilityfrontend/userscripts#readme
// @supportURL  https://github.com/niubilityfrontend/findteacherson51talk
// @match       *:*/*
// @match       *127.0.0.1*:*/*
// @match       *localhost*:*/*
// @namespace   https://github.com/niubilityfrontend
// @license     OSL-3.0
// @grant       GM_xmlhttpRequest
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_listValues
// @grant       GM_deleteValue
// @grant       GM_registerMenuCommand
// @require     http://code.jquery.com/jquery-3.4.1.min.js
// @require     https://code.jquery.com/ui/1.12.1/jquery-ui.min.js
// @require     https://cdnjs.cloudflare.com/ajax/libs/pace/1.0.2/pace.min.js
// @require     https://cdnjs.cloudflare.com/ajax/libs/free-jqgrid/4.15.5/i18n/grid.locale-cn.js
// @require     https://cdnjs.cloudflare.com/ajax/libs/free-jqgrid/4.15.5/jquery.jqgrid.min.js
// @require     https://greasyfork.org/scripts/388372-scrollfix/code/scrollfix.js?version=726657
// @require     https://greasyfork.org/scripts/389774-gm-config-toolbar/code/gm_config_toolbar.js?version=730739
// @downloadURL https://gitee.com/tsharp/userscripts/raw/master/dist/URLTest.user.js
// @updateURL   https://gitee.com/tsharp/userscripts/raw/master/dist/URLTest.meta.js
// ==/UserScript==

/*! For license information please see URLTest.user.js.LICENSE.txt */
(()=>{var e,c,o,n,i;e="https://www.w3schools.com/jsref/tryit.asp?Filename=tryjsref_decodeuri&color[0]=red&color[1]=green&selection=1&selection=2&selection=3#testhashzhong中文",c=encodeURI(e),o=decodeURI(c),n=new URL(e).searchParams,i="Encoded URI: "+c+"<br>Decoded URI: "+o+"<br> JSON"+JSON.stringify(n),$("<div></div>").appendTo("body").html(i),n.forEach((function(e,c,o){console.log("".concat(e," ").concat(c," "))})),$("#timesMultipleCheck").find("input").checkboxradio({icon:!1}),$("#btns").eq(0).button({icon:"ui-icon-seek-next",showLabel:!0}).click((function(){$("#timesMultipleCheck>input").each((function(e,c){$(c).prop("checked",!$(c).is(":checked")).change()}))})).end()})();
//# sourceMappingURL=URLTest.user.js.map