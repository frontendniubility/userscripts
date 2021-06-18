import {
    GM_config
} from './gm_config.js'

const config = GM_config([{
        key: "pagecount",
        label: "最大页数 (自动获取时)",
        default: 20,
        type: "dropdown",
        values: [0, 5, 10, 20, 50, 1000],
    },
    {
        key: "newBatcherKeyHours",
        label: "排名缓存（小时）,0为每次更新",
        default: 24,
        type: "dropdown",
        values: [0, 1, 2, 3, 5, 10, 24, 168, 168000],
    },
    {
        key: "tinfoexprhours",
        label: "教师数据缓存过期时间（小时）",
        default: 139,
        type: "dropdown",
        values: [0, 1, 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 179, 181, 191, 193, 197, 199],
    },
    {
        key: "markRankRed",
        label: "突出前N名教师的名次",
        default: 100,
        type: "dropdown",
        values: [5, 10, 30, 50, 120, 500, 3000, 5000, 10080],
    },
    {
        key: "version",
        type: "hidden",
        default: 1,
    },
]);
let conf = config.load();
config.onsave = (cfg) => {
    conf = cfg;
    $("#autogetnextpage").text("自动获取" + getAutoNextPagesCount() + "页");
};
GM_registerMenuCommand("设置", config.setup);

export {
    conf
}