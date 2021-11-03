"use strict";

(self["webpackChunkuserscripts"] = self["webpackChunkuserscripts"] || []).push([ [ 318 ], {
    318: (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
        __webpack_require__.r(__webpack_exports__);
        var _common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(541);
        function processTeacherDetailPage(jqr) {
            var tinfo_saved = GM_getValue((0, _common__WEBPACK_IMPORTED_MODULE_0__.yy)(), {});
            tinfo_saved = (0, _common__WEBPACK_IMPORTED_MODULE_0__.$g)(tinfo_saved, jqr, {});
            GM_setValue((0, _common__WEBPACK_IMPORTED_MODULE_0__.yy)(), tinfo_saved);
        }
        if (_common__WEBPACK_IMPORTED_MODULE_0__.Xd.isDetailPage) {
            (0, _common__WEBPACK_IMPORTED_MODULE_0__.Ps)((function(next) {
                processTeacherDetailPage($(document));
                next();
            }));
        }
    }
} ]);