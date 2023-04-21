![logo](./images/logo.svg)<br>
[![badge](https://img.shields.io/badge/r3x5ur-unveilr-red)][repo]
[![license](https://img.shields.io/github/license/r3x5ur/unveilr?v=2)][repo]
[![languages](https://img.shields.io/github/languages/top/r3x5ur/unveilr)][repo]
[![visitor](https://visitor-badge.glitch.me/badge?page_id=https://github.com/r3x5ur/unveilr)][repo]
[![visitor](https://img.shields.io/github/commit-activity/m/r3x5ur/unveilr)][repo]
[![release](https://img.shields.io/github/downloads/r3x5ur/unveilr/total)][release]
[![vul](https://img.shields.io/snyk/vulnerabilities/github/r3x5ur/unveilr)][repo]

## ！！！声明！！！
**本程序仅供于学习交流，请使用者遵守《中华人民共和国网络安全法》，勿将此工具用于非法操作，开发者不负任何连带法律责任。如有任何侵权相关问题，请联系作者**

### :loud_sound:公告
- 删除 `npm` 包
- 提高使用门槛，不再提供使用方面的问题解答

### ✨新版本特性

- 🔥支持自动解密(`windows`从路径上提取`wxAppId`)
- 🔥自动合并子包
- 🔥支持解析最新版`wxapkg` (`APP_V3`/`APP_V4`/`APP_SUBPACKAGE_V2`)
- 🔥支持解析最新版小程序插件 (`APP_PLUGIN_V1`)
- 🔥采用`@babel/core`直接解析语法树，精准提取源码(`1.x`是正则提取)
- 🔥使用`Threadjs`做的线程池，`cpu`直接干到顶(🤡解析语法树特别吃`cpu`)

### ✅安装方法

下载可执行文件

- 从[下载地址][release]下载对应操作系统的可执行文件
- 具体参数看下面[参数详解](#%E5%8F%82%E6%95%B0%E8%AF%A6%E8%A7%A3)


### 📝参数详解

- 子命令默认为 `wx`

| 子命令  | 参数                        | 解释                                             |
|------|---------------------------|------------------------------------------------|
|      | `-l, --log-level <level>` | 设置日志等级 `debug`，`info`，`warn`，`error` 默认 `info` |
|      | `-v, --version`           | 打印版本号并退出                                       |
| `wx` | `<packages...>`           | `wxapkg`的路径，可以是多个，也可以是一个目录                     |
| `wx` | `-i, --appid <appid>`     | 解密`windows`上的 `wxapkg`时需要提供**🔥已经支持自动从路径中提取**  |
| `wx` | `-f, --format`            | 是否需要格式化解析出来的代码                                 |
| `wx` | `--no-clear-decompile`    | 不清除反编译时的残留文件                                   |
| `wx` | `--no-clear-save`         | 不清除之前的编译结果                                     |
| `wx` | `--no-parse`              | 只提取`wxapkg`中的文件，不进行反编译                         |
| `wx` | `-d, --depth <depth>`     | 设置从目录中查找`wxapkg`的深度默认: `1` 设置为`0`时不限制深度        |
| `wx` | ` -o, --output <path>`    | 设置反编译输出目录                                      |
| `wx` | `--clear-output`          | 当输出目录不为空时程序将终止，提供该参数表示强制清空输出目录                 |

### 💡使用示例
- 提高使用门槛，不再提供示例

### [:bulb:提交问题](https://github.com/r3x5ur/wxapkg-unpacker/issues)

### [:memo:更改日志](https://github.com/r3x5ur/wxapkg-unpacker/blob/master/CHANGELOG.md)

### 💬其他说明

- 本程序现在使用的开源协议是 [GPL-3.0](https://www.gnu.org/licenses/gpl-3.0.html)

### 🍻特别感谢

- [wxappUnpacker](https://github.com/qwerty472123/wxappUnpacker)
- [pc_wxapkg_decrypt](https://github.com/BlackTrace/pc_wxapkg_decrypt)
- [mac_wxapkg_decrypt](https://github.com/TinyNiko/mac_wxapkg_decrypt)


[repo]:https://github.com/r3x5ur/unveilr

[release]:https://github.com/r3x5ur/unveilr/releases
