import { PathController } from '@core/controller/PathController'
import { matchScripts } from '@utils/matchScripts'
import { parseWxml } from '@utils/wxmlParserJs'

const ctrl = PathController.make('files/watermark-test/watermark.html')
const data = matchScripts(ctrl.readSync('utf8'))
parseWxml(data, 'files/watermark-test').then((result) => {
  console.log(JSON.stringify(result).length)
  JSON.stringify(result).length === 50282 && console.log('√ 改动不会影响结果')
})

export {}
