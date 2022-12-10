import QuickEditVue from './components/QuickEdit.vue'

class Plugin {
  #name: string
  // ...
  constructor(name: string) {
    this.name = name
  }
  set name(val: string) {
    this.#name = val
      .replace(/[_\s]+/gi, '-')
      .replace(/[A-Z]/g, '-$1')
      .toLowerCase()
  }
  get name() {
    return this.#name
  }
}

export class QuickEdit extends Plugin {
  constructor() {
    super('quick-edit')
  }

  apply(options) {
    this.core.show()
    const existIndex = this.tabs.findIndex(
      (i) =>
        i.pluginName === this.name && i.page.pageInfo.title === options.title
    )
    if (cur) {
      return existIndex
    }
    return false
  }

  render() {
    return this.vue.h(QuickEditVue)
  }

  registToolbox() {
    if (!this.mw.config.get('wgIsArticle')) {
      return false
    }
    return this.vue.h('button', {
      onClick() {
        this.core.run('quick-edit', { title: this.mw.config.get('wgPageName') })
      },
    })
  }
}
