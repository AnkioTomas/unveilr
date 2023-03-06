// 微信包关键文件名
export enum WxapkgKeyFile {
  APP_CONFIG = 'app-config.json',
  APP_SERVICE = 'app-service.js',
  PAGE_FRAME_HTML = 'page-frame.html',
  APP_WXSS = 'app-wxss.js',
  APPSERVICE_APP = 'appservice.app.js',
  APP_JSON = 'app.json',
  APP = 'app.js',
  WORKERS = 'workers.js',
  PAGE_FRAME = 'page-frame.js',
  WEBVIEW_APP = 'webview.app.js',

  GAME = 'game.js',
  GAME_JSON = 'game.json',
  SUBCONTEXT = 'subContext.js',

  PLUGIN = 'plugin.js',
  PLUGIN_JSON = 'plugin.json',
}

export enum WxapkgType {
  /**
   * 包含文件 {@link WxapkgKeyFile.PAGE_FRAME_HTML}
   * 相关数据就保存在此文件中
   * */
  APP_V1 = 'APP_V1',
  /**
   * 包含文件 {@link WxapkgKeyFile.PAGE_FRAME} <br/>
   * 其内容为 `var __pageFrameJsStartTime__ = Date.now();`
   * 相关数据保存在 {@link WxapkgKeyFile.APP_WXSS} 中
   * */
  APP_V2 = 'APP_V2',
  /**
   * 包含文件 {@link WxapkgKeyFile.PAGE_FRAME} <br/>
   * 其内容为 `/*This file is left intentionally blank*!/`
   * 相关数据保存在 {@link WxapkgKeyFile.APP_WXSS} 中, 但是结构好像不同
   * */
  APP_V3 = 'APP_V3',
  /** 对标 {@link APP_V1},{@link APP_V2}*/
  APP_SUBPACKAGE_V1 = 'APP_SUBPACKAGE_V1',
  /** 对标 {@link APP_V3}*/
  APP_SUBPACKAGE_V2 = 'APP_SUBPACKAGE_V2',
  // 微信小游戏主包
  GAME = 'GAME',
  // 微信小游戏分包
  GAME_SUBPACKAGE = 'GAME_SUBPACKAGE',
  // 插件
  PLUGIN = 'PLUGIN'
}

