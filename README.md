![logo](./images/logo.svg)<br>
[![license](https://img.shields.io/github/license/r3x5ur/unveilr)][repo]
[![languages](https://img.shields.io/github/languages/top/r3x5ur/unveilr)][repo]
[![tg](https://img.shields.io/badge/t.me-unveilr-blue)](https://t.me/unveilr)
[![v](https://img.shields.io/endpoint?color=blue&label=visitor&url=https%3A%2F%2Fhits.dwyl.com%2Fr3x5ur%2Funveilr.json)][repo]
[![commit](https://img.shields.io/github/commit-activity/m/r3x5ur/unveilr)][repo]
[![version](https://img.shields.io/github/package-json/v/r3x5ur/unveilr?color=red)][repo]
[![star](https://img.shields.io/github/stars/r3x5ur/unveilr?style=social)][repo]


## 免责声明
- **本程序仅供于学习交流，请使用者遵守《中华人民共和国网络安全法》，勿将此工具用于非法操作，开发者不负任何连带法律责任。**<br/>
- **如有任何侵权相关问题，请联系作者。**<br/>
- **本工具仅面向合法授权的企业安全建设行为，如您需要测试本工具的可用性，请自行搭建测试环境。**<br/>
- **在使用本工具进行时，您应确保该行为符合当地的法律法规，并且已经取得了足够的授权。**

### 什么是unveilr?
> [![Typing SVG](https://readme-typing-svg.herokuapp.com/?size=21&duration=3333&pause=333&color=00F72B&background=000000&multiline=true&width=453&height=75&lines=%24+unveilr;%E3%80%80A%20small%20program%20security%20assessment%20tool)<br>][repo]
> `unveilr` 是一款小程序安全评估工具，支持小程序的代码审计和发现敏感信息泄露、接口未授权等安全问题

### ✅安装方法
- 使用 `node > 12` 环境自行构建
- 不会安装的[![tg](https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Telegram_2019_Logo.svg/15px-Telegram_2019_Logo.svg.png)找我](https://t.me/unveilr)

### 📝参数详解

- 子命令默认为 `wx`
> [![Typing SVG](https://readme-typing-svg.herokuapp.com/?size=21&duration=3333&pause=333&color=00F72B&background=000000&multiline=true&width=453&height=75&lines=%24%20unveilr%20%2Fpath%2Fto%2Fpkg%2Fdir%3B%E3%80%80You%20will%20open%20the%20door%20to%20a%20new%20world)<br>][repo]

| 子命令  | 参数                        | 解释                                             |
|------|---------------------------|------------------------------------------------|
|      | `-l, --log-level <level>` | 设置日志等级 `debug`，`info`，`warn`，`error` 默认 `info` |
|      | `-v, --version`           | 打印版本号并退出                                       |
| `wx` | `<packages...>`           | 包的路径，可以是多个，也可以是一个目录                            |
| `wx` | `-i, --appid <appid>`     | 手动提供`appid` (仅在评估`windows`上的包时有效)              |
| `wx` | `-f, --format`            | 格式化输出                                          |
| `wx` | `--no-clear-decompile`    | 解析后的残留文件将不会被清除                                 |
| `wx` | `--no-clear-save`         | 要保存的路径将不会被清除                                   |
| `wx` | `--no-parse`              | 只提取文件，但不会解析                                    |
| `wx` | `-d, --depth <depth>`     | 设置从目录中查找深度，默认: `1` 设置为`0`时不限制深度                |
| `wx` | ` -o, --output <path>`    | 设置输出目录                                         |
| `wx` | `--clear-output`          | 当输出目录不为空时程序将终止，提供该参数表示强制清空输出目录                 |


### [💡提交问题](https://github.com/r3x5ur/unveilr/issues)

### [📝更改日志](https://github.com/r3x5ur/unveilr/blob/master/CHANGELOG.md)

### 💬其他说明

- 本程序现在使用的开源协议是 [GPL-3.0](https://www.gnu.org/licenses/gpl-3.0.html)
- 使用请标明出处，并遵循开源协议



[repo]:https://github.com/r3x5ur/unveilr
