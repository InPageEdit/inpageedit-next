import { Service } from 'cordis'
import { createApp } from 'vue'
import { InPageEdit } from '../..'
import App from './App.vue'
import { useModalStore, usePagesStore } from './states'

declare module 'cordis' {
  interface Context {
    modalManager: ModalManagerService
  }
}

export class ModalManagerService extends Service {
  readonly app = createApp(App)
  readonly rootElement = document.createElement('div')
  readonly pinia = createPinia()

  constructor(public ctx: InPageEdit) {
    super(ctx, 'modalManager')
  }

  start(): void | Promise<void> {
    const root = this.rootElement
    const app = this.app
    const pinia = this.pinia

    root.id = 'ipe-modalManager'
    this.ctx.root.rootElement.appendChild(root)

    app.use(pinia)
    app.mount(root)

    console.info('ModalManagerService', 'init ok', this)
  }

  stop(): void | Promise<void> {
    this.app.unmount()
    this.rootElement.remove()
  }

  get states() {
    return {
      modal: useModalStore(this.pinia),
      pages: usePagesStore(this.pinia),
    }
  }
}
