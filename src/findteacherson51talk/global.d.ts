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
		clean<T>(deleteValue: T): Array<T>;
	}
	interface number {
		toString(num: number): number;
	}
	interface string {
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
