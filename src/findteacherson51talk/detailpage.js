import { getInfoKey, getTeacherInfoFromDetailPage, settings, submit } from "./common"

/**
 * @typedef {import('./common').TeacherInfo} TeacherInfo
 * @param {JQuery<Element>} jqr
 */
function processTeacherDetailPage(jqr) {
	/** @type {TeacherInfo} */
	let tinfo_saved = GM_getValue(getInfoKey(), {})

	tinfo_saved = getTeacherInfoFromDetailPage(tinfo_saved, jqr, {})

	GM_setValue(getInfoKey(), tinfo_saved)
}

if (settings.isDetailPage) {
	submit(function (next) {
		processTeacherDetailPage($(document))
		next()
	})
}
