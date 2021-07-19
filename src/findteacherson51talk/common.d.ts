/**
 * current page's URL
 */
export const url: string
/**
 * 页面设置信息
 */
export const settings: TypeOfSetting

declare interface TypeOfSetting {
  /**
   * current page's URL
   */
  url: string
  /**
   * 教师ID
   */
  tid: string
  /**
   * 自动获取时的最大页数
   */
  pageMaxCount: number
  /**
   * 是否是教师详细页
   */
  isDetailPage: true | false
  /**
   * 是否是列表页面
   */
  isListPage: true | false
  /**
   * 是否是课程页面
   */
  isCoursePage: true | false
}
/**
 * 获取教师ID
 */
export function getTId(): string

/**
 * 获取sessionStorage中存储值，如果不存在则设置
 * @param key 
 * @param func 
 */
export function getOrSetSession(key: string, func: Function | object): any

declare type Callback<T> = (key: string) => T

/**
 *
 * @param key
 * @param func
 */
export function getorAddSession<T>(key: string, func: Callback<T> | T): T

/**
 * 暂停当前线程delay毫秒
 */
declare function sleep(delay: number): void

/**
 * 获取排序标识的编号
 */
export function getBatchNumber(): string

/**
 * 获取教师信息存储标识 tinfo- + gettid()
 */
export function getinfokey(): string

/**
 * 获取标签的汇总总数
 * @param  {JQuery<HTMLLabelElement>} jqLabelElement the all html page elements
 * @returns {number}
 */
export function getLabelCount(jqLabelElement: JQuery<HTMLLabelElement>): number

/**
 * 获取标签的分类值
 * @param  {JQuery<HTMLSpanElement>} jqLabelSpanList the all html page elements
 * @returns  {TypeOfLabels}
 */
export function getLabelByItems(jqLabelSpanList): TypeOfLabels

/*********************** */

/**
 *从详细页面获取教师信息
 *
 * @param  {TeacherInfo} [tinfo_saved={}] 当前存储的教师信息
 * @param {JQuery<Document>} jqr 详细页面的Jquery对象
 * @param {TeacherInfo} [tinfo_latest={}] 需要覆盖详细页信息的教师信息
 * @return {TeacherInfo}  教师信息
 */
export function getTeacherInfoFromDetailPage(
  tinfo_saved: TeacherInfo,
  jqr: JQuery<Document>,
  tinfo_latest: TeacherInfo
): TeacherInfo

declare type NextFunction = (next: NextFunction) => void
/**
 * 提交一个函数到全局的执行队列,func中必须调用next()方法进行执行队列中的下一个函数
 */
export function submit(func: NextFunction): void

declare type TypeOfKey =
  | '表情丰富'
  | '耐心讲解'
  | '善于鼓励'
  | '适当纠错'
  | '善用教具'
  | '拓展知识点'
  | '善于举例'
  | '易于理解'
  | '有问必答'
  | '发音标准'
  | '环境专业'
  | '装饰特效'
  | '衣着得体'
  | '会说中文';

/**
 * Type of labels
 */
declare interface TypeOfLabels {
  /**
   * description
   */
  (property: TypeOfKey): number
}
/**
 *
 */
declare interface TeacherInfoBase {
  label: number
  labels: TypeOfLabels
  name: string
  type: '收藏外教' | '优选外教' | '全球外教'
  batchNumber: number
  isfavorite: true | false | null
  updateTime: number
}

declare interface TeacherInfo extends TeacherInfoBase {
  teacherStar: number
  certificaties: string
  suitables: Array<string>
  thumbup: number
  thumbdown: number
  thumbupRate: number
  indicator: number
  slevel: string
  favoritesCount: number
  tage: number
  age: number
  rank: number
}
