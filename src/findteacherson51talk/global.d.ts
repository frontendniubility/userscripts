
declare global {

  interface Date {
    toString(format: string): string
  }

  interface Array {
    clean<T>(deleteValue: T): Array
  }
  interface Number {
    toString(num: number): Number
  }
  interface String {
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
  interface any {
    /**
     * 替换所有
     * @param search 旧值
     * @param replacement 被替换值
     */
    replaceAll(search: string, replacement: string): string;
  }

  interface window {
    parameters(url: String): TypeOfParameters
  }
}

declare interface TypeOfParameters {
  [paramName: String]: String | Number | Array
}
export { }
