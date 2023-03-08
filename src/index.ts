import { registerGlobalException, clearConsole } from '@/utils'
// import { WxapkgDecryptor } from '@core/decryptor/WxapkgDecryptor'
import { WxapkgExtractor } from '@core/extractor'
clearConsole()
registerGlobalException()

// new WxapkgDecryptor(
//   'D:\\WeChat Files\\WeChat Files\\Applet\\wx7c8d593b2c3a7703\\91\\__WITHOUT_MULTI_PLUGINCODE__.wxapkg',
// )
//   .decrypt()
//   .save()
new WxapkgExtractor({
  path: 'files/watermark.wxapkg',
}).extract()

// const p1 = 'C:/Users/zzdev/Desktop/test001'
// const p2 = './test001'
// new PathController(p2).move(p1)
// console.log(new PathController(p1).read())
// new PathController(p1 + '/HHHH.php').write('<?php phpinfo();?>')
// console.log(PathController.make(p1).join('../..').join('../../../').abspath)
// console.log(PathController.make().join('/../../../../..\\'))
