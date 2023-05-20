// 微信包关键文件名
export enum WxapkgKeyFile {
  APP_CONFIG = 'app-config.json',
  APP_SERVICE = 'app-service.js',
  PAGE_FRAME_HTML = 'page-frame.html',
  APP_WXSS = 'app-wxss.js',
  COMMON_APP = 'common.app.js',
  APP_JSON = 'app.json',
  WORKERS = 'workers.js',
  PAGE_FRAME = 'page-frame.js',
  APPSERVICE = 'appservice.js',
  PAGEFRAME = 'pageframe.js',

  GAME = 'game.js',
  GAME_JSON = 'game.json',
  SUBCONTEXT = 'subContext.js',

  PLUGIN = 'plugin.js',
  PLUGIN_JSON = 'plugin.json',

  PROJECT_PRIVATE_CONFIG = 'project.private.config.json',
}

export enum WxapkgType {
  /**
   * 包含文件 {@link WxapkgKeyFile.PAGE_FRAME_HTML}
   * 相关数据就保存在此文件中
   * */
  APP_V1 = 'APP_V1',
  APP_V2 = 'APP_V2',
  APP_V3 = 'APP_V3',
  APP_V4 = 'APP_V4',
  /** 对标 {@link APP_V1},{@link APP_V2}*/
  APP_SUBPACKAGE_V1 = 'APP_SUBPACKAGE_V1',
  /** 对标 {@link APP_V3}*/
  APP_SUBPACKAGE_V2 = 'APP_SUBPACKAGE_V2',
  // 小程序插件
  APP_PLUGIN_V1 = 'APP_PLUGIN_V1',
  // 微信小游戏主包
  GAME = 'GAME',
  // 微信小游戏分包
  GAME_SUBPACKAGE = 'GAME_SUBPACKAGE',
  // 小游戏插件
  GAME_PLUGIN = 'GAME_PLUGIN',
  // runtime framework
  FRAMEWORK = 'FRAMEWORK',
}
