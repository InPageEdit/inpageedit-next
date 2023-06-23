import type { InPageEdit } from '@/index'
import { Service } from 'cordis'
import QuickEdit from './components/QuickEdit.vue'
import type { WikiPage } from '../../../../wikipage/src'

declare module 'cordis' {
  interface Context {
    quickEdit: PluginQuickEdit
  }
}

export class PluginQuickEdit extends Service {
  static using = ['toolbox', 'modalManager']

  constructor(readonly ctx: InPageEdit) {
    super(ctx, 'quickEdit')
    // ctx.modalManager
  }

  protected start(): void | Promise<void> {
    this.registerToolbox()
  }

  private registerToolbox() {
    const self = this
    this.ctx.toolbox.states.addOption({
      name: 'quickEdit',
      label: 'Quick Edit',
      icon: h('span', {}, '🖊️'),
      action() {
        self.doEdit({ title: globalThis.mw.config.get('wgPageName') })
      },
    })
  }

  async doEdit(payload?: any) {
    const self = this
    const wikiPage = ref<WikiPage>()

    const Comp = defineComponent({
      render() {
        return h(QuickEdit, { wikiPage: this.wikiPage }, this.$slots)
      },
      setup() {
        return { wikiPage }
      },
      async mounted() {
        this.wikiPage = await self.ctx.WikiPage.newFromTitle(payload.title)
      },
    })

    const modalPage = this.ctx.modalManager.states.pages.addPage({
      component: Comp,
      data: { wikiPage },
    })
    this.ctx.modalManager.states.modal.show()

    console.info(modalPage)
  }
}
