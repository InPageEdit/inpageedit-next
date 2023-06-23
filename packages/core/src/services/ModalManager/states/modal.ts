export const useModalStore = defineStore('modal', () => {
  const isShow = ref(false)
  const toggle = () => {
    isShow.value = !isShow.value
  }
  const show = () => {
    isShow.value = true
  }
  const hide = () => {
    isShow.value = false
  }

  return {
    isShow,
    toggle,
    show,
    hide,
  }
})
