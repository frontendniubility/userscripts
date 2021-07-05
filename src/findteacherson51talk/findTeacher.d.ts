

type TypeOfKey = '表情丰富' | '耐心讲解' | '善于鼓励' | '适当纠错' | '善用教具' | '拓展知识点' | '善于举例' | '易于理解' | '有问必答' | '发音标准' | '环境专业' | '装饰特效' | '衣着得体' | '会说中文'
interface LabelCollection {

  [key: TypeOfKey]: number

}

interface TeacherInfoList {
  label: number,
  labels: LabelCollection,
  name: string,
  type: '收藏外教' | '优选外教' | '全球外教',
  batchNumber: number,
  isfavorite: true | false | null,
}

interface TeacherInfo extends TeacherInfoList {

  updateTime: number,

  teacherStar: number,
  certificaties: string,
  suitables: Array<string>,
  thumbup: number,
  thumbdown: number,
  thumbupRate: Float,
  indicator: number,
  slevel: string,
  favoritesCount: number,
  tage: number,
  age: number,

}



type DayOfTheWeek = "sunday" | "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday";

type DayOfTheWeekMap<T> = { [day in DayOfTheWeek]: T };

const chores: DayOfTheWeekMap<string> = {
  "sunday": "do the dishes",
  "monday": "walk the dog",
  "tuesday": "water the plants",
  "wednesday": "take out the trash",
  "thursday": "clean your room",
  "friday": "mow the lawn",
  "saturday": "relax",
};

const workDays: DayOfTheWeekMap<boolean> = {
  "sunday": false,
  "monday": true,
  "tuesday": true,
  "wednesday": true,
  "thursday": true,
  "friday": true,
  "saturday": false,
};