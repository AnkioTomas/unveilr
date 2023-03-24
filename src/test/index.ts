import { PathController } from '@core/controller/PathController'
import { matchScripts } from '@utils/matchScripts'
import * as parserWxml from '@/lib/wxml-parser/src/parserWxml'

const ctrl = PathController.make('files/watermark-test/watermark.html')
const data = matchScripts(ctrl.readSync('utf8'))
parserWxml(data, 'files/watermark-test').then((result) => {
  JSON.stringify(result).length === 50462 && console.log('√ 改动不会影响结果')
})

export {}
