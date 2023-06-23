import type { DefineComponent, RenderFunction, PropType, Prop } from 'vue'

export type ModalPage<T extends DefineComponent | RenderFunction> = {
  id: string
  label: string
  component: T
  data?: any
}

export const usePagesStore = defineStore('pages', () => {
  const pages = shallowRef<ModalPage<any>[]>([])
  const curIndex = ref(-1)
  const curPage = computed(() => pages.value[curIndex.value])

  const addPage = <T extends DefineComponent | RenderFunction>(page: Omit<ModalPage<T>, 'id'> & { id?: string }) => {
    const pageWithId = {
      id: Math.random().toString(36).slice(2),
      ...page,
    }
    pages.value.push(pageWithId)
    return pageWithId
  }
  const removePage = (id: string) => {
    const index = pages.value.findIndex((page) => page.id === id)
    if (index === -1) return
    pages.value.splice(index, 1)
  }
  const hasPage = (id: string) => pages.value.some((page) => page.id === id)

  const setIndexById = (id: string) => {
    const index = pages.value.findIndex((page) => page.id === id)
    if (index === -1) return
    curIndex.value = index
  }

  return { pages, curIndex, curPage, addPage, removePage, hasPage, setIndexById }
})
