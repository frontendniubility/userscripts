import { TeacherInfo, TeacherInfoBase } from "./common";
import "./jqueryextend";

///88
export const maxRate: number, minRate: number, maxLabel: number, minLabel: number, maxFc: number, minFc: number, maxAge: number, minAge: number

export function getLeftPageCount(): number;

export function getAutoNextPagesCount(): number;

export function updateTeacherinfoToUI(jqel: JQuery<HTMLDivElement>, tinfo: TeacherInfo): void;

export function executeFilters(uifilters: TypeOfUiFilter): void;

export function getUiFilters(): TypeOfUiFilter;
declare interface TypeOfUiFilter {
	l1: number;
	l2: number;
	rate1: number;
	rate2: number;
	age1: number;
	age2: number;
	fc1: number;
	fc2: number;
}
/**
 * @param {JQuery<Element>} jqel
 * @returns {TeacherInfoList}
 */
export function getTeacherInfoFromListPageUI(jqel: JQuery<HTMLDivElement>): TeacherInfoBase;

export function isStopShowboxAndAutoGetNextTimeTeachers(): boolean;

export function addCheckbox(val: string, lbl: string, group: string): void;
