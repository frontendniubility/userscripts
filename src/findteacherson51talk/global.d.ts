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
		toString(format: string): string;
	}

	interface Array<T> {
		clean(deleteValue: T): Array<T>;
	}
	interface Number {
		toString(num: number): number;
	}
	interface String {
		toFloat(): number;
		toInt(): number;
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
		parameters(url: string): TypeOfParameters;
	}
}

declare interface TypeOfParameters {
	[paramName: string]: string | number | Array<any>;
}
export {};
