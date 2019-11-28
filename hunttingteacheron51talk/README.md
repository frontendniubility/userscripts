# 51Talk.辅助选老师-有效经验值|好评率|年龄|Top 5
## 快速开始

![instructions](https://raw.githubusercontent.com/niubilityfrontend/userscripts/master/hunttingteacheron51talk/quickstart.png)

## 功能 What

![instructions](https://raw.githubusercontent.com/niubilityfrontend/userscripts/master/hunttingteacheron51talk/Instructions.png)
![instructions](https://raw.githubusercontent.com/niubilityfrontend/userscripts/master/hunttingteacheron51talk/Instructions2.png)

### 页签Sorted Teachers **主要功能**
表格形式列出所有缓存教师信息，点击列头均可排序，第二行有简单过滤功能，自己琢磨一下
列说明
- '排名' 教师在其分类下的排名
- 'type' 教师类别-优选、收藏、欧美
- 'name' 教师姓名， **点击可以转到教师的详细信息页**
- 'indicator' 排序指标= 有效经验值x好评率+收藏数
- '标签' 有效经验值
- '率‰' 好评率
- '收藏数' 收藏数
- '学' 适合学生级别
- '教' 教师教龄
- '好' 好评数
- '差' 差评数
- 'age' 教师年龄
- ‘更新’ ：教师信息的更新时间
- ‘批号 ’： 这是查询的批号，最近一次的查询数值最大，与选择的课程时间一一对应，如果更换课程时间或者关闭浏览器，这个值将会变化

### 页签Searching Teachers
 - 升序/降序 可进行切换展示顺序，排序按指标进行排序
 - 缓存过期时间（小时） 如果缓存时间超过此时间后将自动重新获取小时信息，默认12个小时
 - 清除缓存 在初始化阶段会获取所有教师的详细信息并缓存，点击清空缓存按钮后将清空本地缓存并执行搜索
 - 建议 可转到github提出建议或者bug（需要Github登陆）
 - ？ 帮助按钮，打开Github的详细说明页面
 - 自动获取10页 点击后自动获取后边10页的教师信息并缓存，可以在Sorted Teachers页面看到
 - 四个滑动条可以调节不同的值来过滤老师 

### 页面优化
- 显示教师年龄
- 有效经验值=所有标签数量求和后除以5的近似整数，显示在教师名字下方【优选外教推荐值为300以上，欧美外教推荐100以上】
- 好评率=好评数/总评论数，因教师本人可以删除某个时间点之前的所有评论，所以好评率仅代表最近一段时间的老师的表现【推荐值为97%以上】
- 收藏人数=收藏该教师的人数，推荐值暂无，如有建议请告诉我。
- 年龄后边显示排序指标=有效经验值X好评率+收藏人数，即历史上评价标签数与最近表现的乘积加上被收藏人数，作为排序参考【推荐优选外教3000以上，欧美外教500以上】
- 教师信息全屏显示，根据屏幕大小在横屏下尽可能多的显示教师
- 教师姓名及年龄处紧凑显示
- 搜索条件处紧凑显示
- 自动解锁课程，可预习所有课程

## 如何使用 How
- 这是一个油猴（tampermonkey）脚本，需要先学习如何安装使用油猴（如果这是你的第一次，只要学会了，你一定会爱上他），学习/安装油猴请移步[Greasyfork中文网站](https://greasyfork.org/zh-CN)
- 此脚本的发布地址：[Greasyfork](https://greasyfork.org/zh-CN/scripts/388276-%E8%BE%85%E5%8A%A9%E9%80%89%E8%80%81%E5%B8%88-%E6%9C%89%E6%95%88%E7%BB%8F%E9%AA%8C%E5%80%BC-%E5%A5%BD%E8%AF%84%E7%8E%87-%E5%B9%B4%E9%BE%84-top-5)
- 安装油猴浏览器插件后，极力推荐安装一个Userscript+的脚本，他可以根据你浏览的网站，列出所有可以使用的脚本，由你选择安装与否。[Userscript+ from greasyfork](https://greasyfork.org/zh-CN/scripts/24508-userscript-show-site-all-userjs)

## 更新日志
- v1.1.8 2019-11-28 add feature - show the rank of teachers by teacher type
- [v1.0.21](https://greasyfork.org/zh-CN/scripts/388276-51talk选择最好最合适的老师-经验-好评率-年龄-收藏数?version=744811) 2019-10-29 - Add feture: record the search batch and sorted teachers within this batch
-   [v1.0.20](https://greasyfork.org/zh-CN/scripts/388276-51talk选择最好最合适的老师-经验-好评率-年龄-收藏数?version=744806) 2019-10-29 - use ES6 andd add futrue stoping auto get next page[D[D
-   [v1.0.19](https://greasyfork.org/zh-CN/scripts/388276-51talk选择最好最合适的老师-经验-好评率-年龄-收藏数?version=744800) 2019-10-29 - add feture ability to sort teacher by seach batch
-   [v1.0.19](https://greasyfork.org/zh-CN/scripts/388276-51talk选择最好最合适的老师-经验-好评率-年龄-收藏数?version=744580) 2019-10-28 - change cache time to 168 hours
-   [v1.0.19](https://greasyfork.org/zh-CN/scripts/388276-51talk选择最好最合适的老师-经验-好评率-年龄-收藏数?version=744579) 2019-10-28 - show the second tab -list page as the default
-   [v1.0.19](https://greasyfork.org/zh-CN/scripts/388276-51talk选择最好最合适的老师-经验-好评率-年龄-收藏数?version=744573) 2019-10-28 - add feture - sort the available teachers on top of list
-   [v1.0.18](https://greasyfork.org/zh-CN/scripts/388276-51talk选择最好最合适的老师-经验-好评率-年龄-收藏数?version=744545) 2019-10-28 - fix tiny bug
-   [v1.0.17](https://greasyfork.org/zh-CN/scripts/388276-51talk选择最好最合适的老师-经验-好评率-年龄-收藏数?version=741521) 2019-10-17 - format code
-   [v1.0.17](https://greasyfork.org/zh-CN/scripts/388276-51talk选择最好最合适的老师-经验-好评率-年龄-收藏数?version=741520) 2019-10-17 - fixed bug the cache time shown error when never set
-   [v1.0.15](https://greasyfork.org/zh-CN/scripts/388276-51talk选择最好最合适的老师-经验-好评率-年龄-收藏数?version=741219) 2019-10-16 - add new feature that shouw the pages index in the dialog window
-   [v1.0.15](https://greasyfork.org/zh-CN/scripts/388276-51talk选择最好最合适的老师-经验-好评率-年龄-收藏数?version=740726) 2019-10-14 - fix bug- update faverited count in detail pages
-   [v1.0.14](https://greasyfork.org/zh-CN/scripts/388276-51talk选择最好最合适的老师-经验-好评率-年龄-收藏数?version=740703) 2019-10-14 - fixed bug: the help link can't be opened
-   [v1.0.14](https://greasyfork.org/zh-CN/scripts/388276-51talk选择最好最合适的老师-经验-好评率-年龄-收藏数?version=740693) 2019-10-14 - fixed bug- update detailed info before show the list of teachers
-   [v1.0.13](https://greasyfork.org/zh-CN/scripts/388276-51talk选择最好最合适的老师-经验-好评率-年龄-收藏数?version=739840) 2019-10-11 - fixed bug updating in detailed page, the type shouldn't proccess
-   [v1.0.12](https://greasyfork.org/zh-CN/scripts/388276-51talk选择最好最合适的老师-经验-好评率-年龄-收藏数?version=736801) 2019-09-29 - JUST FORMATE CODE
-   [v1.0.12](https://greasyfork.org/zh-CN/scripts/388276-51talk选择最好最合适的老师-经验-好评率-年龄-收藏数?version=736416) 2019-09-27 - add js to detail pages[D[D[D[D[D[D[D[D[D[D[D[Dteachers' detail pages
-   [v1.0.11](https://greasyfork.org/zh-CN/scripts/388276-51talk选择最好最合适的老师-经验-好评率-年龄-收藏数?version=735823) 2019-09-25 - optimized the update time and link color
- v1.0.2 2019-9-3 add system config for auto get next page's count
- v1.0.1 2019-9-3 - Modified the up rate to permillage ‰
- v1.0.0 2019-8-27 - released a first stable version 
- v0.1.33 2019-8-26 - add searching function to teacher list grid
- v0.1.28 2019-8-23 - list and sort all teachers your searched recently
- v0.1.26 2019-8-19 -增加滑块，根据收藏人数过滤教师
- v0.1.25 2019-8-19 -增加加载时页面顶部的进度条提示
- v0.1.18 2019-8-15 -清空缓存时仅清空老师信息缓存，增加12小时后教师信息缓存自动失效
- v0.1.14 2019-8-14 -紧凑显示教师列表，过滤条件【有效经验值、好评率】仅仅缓存最小值，切换页面后最大值恢复为当前页面中最大值
- v0.1.8 2019-8-14 - 教师列表全屏显示
- v0.1.7 2019-08-13 - 页面布局，使第一个slot不被遮挡
- v0.1.6 2019-08-13 - 默认按降序排列；增加清空缓存功能
- v0.1.4 2019-08-13 - fixed bug when click the link to suggest new feature
- v0.1.1 20190812 add fixed position when scrolling
- v0.1.0 20190812 finally submit version 0.1
- v0.0.17 20190812 搜索框下增加分页

## 起源
这是一个以51talk为基础的辅助插件，不会更改51talk任何信息，仅为广大同学提供51talk不愿提供的功能。51talk会尽力推荐新人，那些真正好的老师并不容易搜索出来。所以....使用2个晚上写了这个插件。

当然，很多学习英语的同学并不会使用油猴插件，请自己搜索学习，安装插件后首推安装“Userscript+ : 显示当前网站所有可用的UserJS脚本 Jaeger”脚本。它可以自动推荐适合当前网站的脚本供你选择。

如有有任何建议，请发送email到 happycoder@foxmail.com
