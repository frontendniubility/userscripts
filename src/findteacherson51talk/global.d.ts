
declare global {

  interface Object {
    /**
     * 替换所有
     * @param search 旧值
     * @param replacement 被替换值
     */
    replaceAll(search: string, replacement: string): string;
  }
  interface Date {
    toString(format: string): string
  }

  interface Array<T> {
    clean<T>(deleteValue: T): Array<T>
  }
  interface Number {
    toString(num: number): Number
  }
  interface string {
    toFloat(): Number;
    toInt(): Number;
    /**
     * 
     * @param arr 
     */
    includesAny(...arr: any[]): boolean;
    /**
     * 替换所有
     * @param search 旧值
     * @param replacement 被替换值
     */
    replaceAll(search: string, replacement: string): string;
  }


  interface window {
    parameters(url: string): TypeOfParameters
  }
}

declare interface TypeOfParameters {
  [paramName: string]: string | Number | Array<any>
}
export { }
