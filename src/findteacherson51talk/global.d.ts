declare global {
	// interface Array<T> {
	// 	clean(deleteValue: T): Array<T>;
	// }
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

declare interface TypeofTeacher {
	/**
	 * 查询批次
	 */
	batchNumber: number;
	/**
	 * 教师类型
	 */
	type: string;
	/**
	 * 排名 根据indicator计算，并且按类型分类的排名
	 */
	rank: number;
	/**
	 * 姓名
	 */
	name: string;
	/**
	 * 是否被自己收藏
	 */
	isfavorite: string;
	/**
	 * 根据配置的公式进行计算分值
	 */
	indicator: number;
	/**
	 * 被评价标签
	 */
	label: string;
	/**
	 * 好评率
	 */
	thumbupRate: number;
	/**
	 * 被收藏的次数
	 */
	favoritesCount: number;
	/**
	 * 教学登记
	 */
	slevel: string;
	/**
	 * 教书年龄
	 */
	tage: number;
	/**
	 *差评数
	 */
	thumbup: number;
	/**
	 * 好评率
	 */
	thumbdown: number;
	/**
	 * 教师年龄
	 */
	age: number;
	/**
	 * 数据刷新时间
	 */
	updateTime: Date;
}
export { TypeofTeacher };

