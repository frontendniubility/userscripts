import {
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
    submit,
    getTeacherInfoFromDetailPage
} from './common.es6';

if (settings.isDetailPage) {
    function processTeacherDetailPage(jqr) {

        let tinfo_saved = GM_getValue(getinfokey(), {});
      
        tinfo_saved = getTeacherInfoFromDetailPage(tinfo_saved, jqr, {});

        GM_setValue(getinfokey(), tinfo_saved);

    }
    submit(function (next) {
        processTeacherDetailPage($(document));
        next();
    });
}