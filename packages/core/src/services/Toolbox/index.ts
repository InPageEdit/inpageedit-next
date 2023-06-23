import { type App as VueApp } from 'vue'
import type { InPageEdit } from '@/index'
import { Service } from 'cordis'
import App from './App.vue'
import { useToolboxStore } from './states/toolbox'

declare module 'cordis' {
  interface Context {
    toolbox: ToolboxService
  }
}

export class ToolboxService extends Service {
  readonly app: VueApp
  readonly rootElement = document.createElement('div')
  readonly pinia = createPinia()

  constructor(readonly ctx: InPageEdit) {
    super(ctx, 'toolbox')
    this.app = createApp(App, { ctx })
  }

  start(): void | Promise<void> {
    const root = this.rootElement
    const app = this.app
    const pinia = this.pinia

    root.id = 'ipe-toolbox'
    this.ctx.root.rootElement.appendChild(root)

    app.use(pinia)
    app.mount(root)

    console.info('ToolboxService', 'init ok', this)
  }

  stop(): void | Promise<void> {
    this.app.unmount()
    this.rootElement.remove()
  }

  get states() {
    return useToolboxStore(this.pinia)
  }
}
