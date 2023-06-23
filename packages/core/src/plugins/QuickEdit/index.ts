import type { InPageEdit } from '@/index'
import { Service } from 'cordis'
import NaiveuiProvider from '../../components/NaiveuiProvider.vue'
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
    const id = `quick-edit-${payload.title}`
    const wikiPage = ref<WikiPage>()

    this.ctx.modalManager.states.modal.show()

    if (this.ctx.modalManager.states.pages.hasPage(id)) {
      this.ctx.modalManager.states.pages.setIndexById(id)
      return
    }

    const Comp = defineComponent({
      render() {
        return h(NaiveuiProvider, {}, () => h(QuickEdit, { wikiPage: this.wikiPage }, this.$slots))
      },
      setup() {
        return { wikiPage }
      },
      async mounted() {
        this.wikiPage = await self.ctx.WikiPage.newFromTitle(payload.title)
      },
    })

    const modalPage = this.ctx.modalManager.states.pages.addPage({
      id,
      label: `Quick Edit: ${payload.title}`,
      component: Comp,
      data: { wikiPage },
    })
    this.ctx.modalManager.states.pages.setIndexById(id)

    console.info(modalPage)
  }
}
