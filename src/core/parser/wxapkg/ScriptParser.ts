import { BaseParser } from '../BaseParser'
import { PathController, ProduciblePath } from '@core/controller/PathController'
import { WxapkgKeyFile } from '@/enum'
import { traverseScriptWorker } from '@core/workers/traverseScript'

export class ScriptParser extends BaseParser {
  private scripts: string[]
  constructor(path: ProduciblePath) {
    super(path)
  }
  private getScripts() {
    const guessScripts = new Set<string>()
    const rootScripts: string[] = [
      WxapkgKeyFile.APP_SERVICE,
      WxapkgKeyFile.APPSERVICE_APP,
      WxapkgKeyFile.GAME,
      WxapkgKeyFile.SUBCONTEXT,
      WxapkgKeyFile.PLUGIN,
    ]
    const basenameRE = /\S+\.appservice\.js$/
    const eachFn = (p: ProduciblePath) => {
      const ctrl = PathController.make(p)
      if (!ctrl.isFile) return
      if (ctrl.suffixWithout !== 'js') return
      const basename = ctrl.basename
      if (!basenameRE.test(basename) && !rootScripts.includes(basename)) return
      guessScripts.add(ctrl.unixpath)
    }
    rootScripts.forEach((p) => eachFn(this.pathCtrl.join(p)))
    this.pathCtrl.deepListDir().forEach(eachFn)
    this.logger.info(`Detected ${String(guessScripts.size).blue} script files to be parsed`)
    this.scripts = [...guessScripts]
  }

  async parse(): Promise<void> {
    this.getScripts()
    const wCtrl = traverseScriptWorker()
    this.scripts.forEach((p) => {
      wCtrl.addTask((r) => r.traverseScript(p))
    })
    // await wCtrl.forEach((r) => this.saver.add(r.data))
    await wCtrl.start(true)
  }
}
new ScriptParser('files/wxa8da525af05281f3-boos直聘/__APP__').parse()
