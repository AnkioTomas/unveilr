import { BaseParser } from '../BaseParser'
import { ProduciblePath } from '@core/controller/PathController'
import { traverseWxml } from '@core/workers/traverseWxml'

export class WxmlParser extends BaseParser {
  constructor(path: ProduciblePath) {
    super(path)
  }

  async parse(): Promise<void> {
    const code = `function gz$gwx_XC_3_1(){
if( __WXML_GLOBAL__.ops_cached.$gwx_XC_3_1)return __WXML_GLOBAL__.ops_cached.$gwx_XC_3_1
__WXML_GLOBAL__.ops_cached.$gwx_XC_3_1=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
Z([3,'container'])
Z([3,'user-info'])
Z([3,'item'])
Z([3,'姓名'])
Z([3,'请输入姓名'])
Z([[6],[[7],[3,'userInfo']],[3,'name']])
Z(z[2])
Z([3,'证件号码'])
Z([3,'请输入证件号码'])
Z([[6],[[7],[3,'userInfo']],[3,'cardNumberEnc']])
Z([[6],[[7],[3,'agencyData']],[3,'length']])
Z(z[2])
Z([3,'代办人姓名'])
Z(z[4])
Z([[6],[[7],[3,'agencyData']],[1,0]])
Z(z[10])
Z(z[2])
Z([3,'联系电话'])
Z(z[8])
Z([[6],[[7],[3,'agencyData']],[1,1]])
Z([3,'searchIsAgency'])
Z([3,'primary-btn'])
Z([a,[3,'display:'],[[2,'?:'],[[6],[[7],[3,'agencyData']],[3,'length']],[1,'none'],[1,'block']]])
Z([3,'查询本人被代办信息'])
Z([3,'calcelAgency'])
Z(z[21])
Z([a,z[22][1],[[2,'?:'],[[2,'!'],[[6],[[7],[3,'agencyData']],[3,'length']]],[1,'none'],[1,'block']]])
Z([3,'清除本人被代办信息'])
Z([3,'tips'])
Z([3,' 说明：如果您的健康码存在被代办情况，您可以通过此功能查询并解除代办关系。 '])
Z(z[1])
Z(z[2])
Z(z[3])
Z([3,'getUserInput'])
Z([3,'name'])
Z([3,'10'])
Z(z[4])
Z([[6],[[7],[3,'agencyInfo']],[3,'name']])
Z(z[2])
Z(z[7])
Z(z[33])
Z([3,'cardNumber'])
Z([3,'18'])
Z(z[8])
Z([3,'idcard'])
Z([[6],[[7],[3,'agencyInfo']],[3,'cardNumber']])
Z([[6],[[7],[3,'agencyData1']],[3,'length']])
Z(z[2])
Z(z[12])
Z(z[4])
Z([[6],[[7],[3,'agencyData1']],[1,0]])
Z(z[46])
Z(z[2])
Z(z[17])
Z(z[8])
Z([[6],[[7],[3,'agencyData1']],[1,1]])
Z([3,'otherAgency'])
Z(z[21])
Z([a,z[22][1],[[2,'?:'],[[6],[[7],[3,'agencyData1']],[3,'length']],[1,'none'],[1,'block']]])
Z([3,'查询他人被代办信息'])
Z([3,'otherCancel'])
Z(z[21])
Z([a,z[22][1],[[2,'?:'],[[2,'!'],[[6],[[7],[3,'agencyData1']],[3,'length']]],[1,'none'],[1,'block']]])
Z([a,[3,'清除'],[[6],[[7],[3,'agencyInfo']],[3,'name']],[3,'被代办信息']])
Z(z[28])
Z([3,' 说明：如您家人或朋友存在被代办情况，您可查询并为其解除代办关系。为他人解除代办关系需由被代办人本人或其监护人知情同意后操作。 '])
})(__WXML_GLOBAL__.ops_cached.$gwx_XC_3_1);return __WXML_GLOBAL__.ops_cached.$gwx_XC_3_1
}`
    await traverseWxml({ code })
    return void 0
  }
}

if (require.main === module) {
  new WxmlParser('files/_468736192_311/app-wxss.js').parse()
}
