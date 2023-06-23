<template lang="pug">
.ipe-toolbox(:data-options='JSON.stringify(store.options)', :data-cur-name='store.curName')
  .ipe-toolbox-container
    .ipe-toolbox-body(v-if='store.isShow')
      .ipe-toolbox-item(v-for='(item, index) in store.curOptions', :key='index')
        a(@click='handleClick(item)') {{ item.label }}
    .ipe-toolbox-toggler
      a(@click='store.toggle()') {{ store.isShow ? '－' : '＋' }}
</template>

<script setup lang="ts">
import {} from 'vue'
import { useToolboxStore, type ToolboxOption } from './states/toolbox'

const store = useToolboxStore()

function handleClick(item: ToolboxOption) {
  item.action?.()
  if (item.children?.length) {
    store.curName = item.name
  } else {
    store.hide()
  }
}

onMounted(() => {
  store.addOption({
    name: 'test',
    label: '测试',
    icon: () => h('span', '测试'),
    action: () => {
      console.log('test')
    },
  })
})
</script>

<style scoped lang="sass">
// a float toolbox with a list of circle buttons
.ipe-toolbox
  position: fixed
  bottom: 2rem
  right: 2rem
  z-index: 1000

.ipe-toolbox-container
  position: absolute
  bottom: 0
  right: 0
  display: flex
  gap: 1em
  justify-content: flex-end
  align-items: flex-end
  user-select: none

.ipe-toolbox-body
  display: flex
  gap: 1em
  justify-content: flex-end
  align-items: flex-end

.ipe-toolbox-item
  display: flex
  justify-content: center
  align-items: center
  width: 3rem
  height: 3rem
  border-radius: 50%
  background-color: #fff
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.1)
  cursor: pointer
  transition: all 0.2s ease-in-out
  &:hover
    transform: scale(1.1)
    box-shadow: 0 0 1rem rgba(0, 0, 0, 0.1)

.ipe-toolbox-toggler
  display: flex
  justify-content: center
  align-items: center
  width: 3rem
  height: 3rem
  border-radius: 50%
  background-color: #fff
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.1)
  cursor: pointer
  transition: all 0.2s ease-in-out
  &:hover
    transform: scale(1.1)
    box-shadow: 0 0 1rem rgba(0, 0, 0, 0.1)
</style>
