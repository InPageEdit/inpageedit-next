import type { DefineComponent, RendererNode } from 'vue'

export interface ToolboxOption {
  name: string
  icon: DefineComponent | RendererNode
  label: string
  action: () => void | Promise<void>
  children?: ToolboxOption[]
}

export const useToolboxStore = defineStore('toolbox', () => {
  const options = ref<ToolboxOption[]>([])

  const curName = ref<string>('')
  // 递归查询形如 a/b/c 的选项
  const getOptionsByName = (name: string) => {
    const levels = name.split('/')
    let cur = options.value
    for (const level of levels) {
      const option = cur.find((option) => option.name === level)
      cur = option?.children ?? cur
    }

    console.info('ToolboxService', 'getOptionsByName', name, cur)
    return cur
  }

  const curOptions = computed(() => getOptionsByName(curName.value) ?? options.value)
  const parentName = computed(() => {
    const levels = curName.value.split('/')
    if (levels.length === 1) return ''
    return levels.slice(0, -1).join('/')
  })

  const addOption = (option: ToolboxOption, parentName?: string) => {
    const parent = parentName ? getOptionsByName(parentName) : options.value
    if (!parent) return
    parent.push(option)
    console.info('ToolboxService', 'addOption', option, parent)
  }
  const removeOption = (name: string) => {
    const parent = getOptionsByName(parentName.value)
    if (!parent) return
    const index = parent.findIndex((option) => option.name === name)
    if (index === -1) return
    parent.splice(index, 1)
  }

  const isShow = ref(false)
  const show = () => {
    isShow.value = true
  }
  const hide = () => {
    isShow.value = false
  }
  const toggle = () => {
    isShow.value = !isShow.value
  }

  return {
    options,
    curName,
    curOptions,
    parentName,
    addOption,
    removeOption,
    isShow,
    show,
    hide,
    toggle,
  }
})
