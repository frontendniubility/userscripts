import {

  TeacherInfo,
  TeacherInfoBase,

} from './common';
import './jqueryextend';


export const maxrate: Number,
  minrate: Number,
  maxlabel: Number,
  minlabel: Number,
  maxfc: Number,
  minfc: Number,
  maxage: Number,
  minage: Number;



export function getLeftPageCount(): number

export function getAutoNextPagesCount(): number

export function updateTeacherinfoToUI(jqel: JQuery<HTMLDivElement>, tinfo: TeacherInfo): void;

export function executeFilters(uifilters: TypeOfUiFilter): void;

export function getUiFilters(): TypeOfUiFilter;
declare interface TypeOfUiFilter {
  l1: Number,
  l2: Number,
  rate1: Number,
  rate2: Number,
  age1: Number,
  age2: Number,
  fc1: Number,
  fc2: Number,
}
/** 
 * @param {JQuery<Element>} jqel 
 * @returns {TeacherInfoList}
 */
export function getTeacherInfoFromListPageUI(jqel: JQuery<HTMLDivElement>): TeacherInfoBase

export function isStopShowboxAndAutoGetNextTimeTeachers(): boolean

export function addCheckbox(val: String, lbl: string, group: string): void;
