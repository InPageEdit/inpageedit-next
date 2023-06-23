<template lang="pug">
.ipe-modalManager
  .ipe-modalManager-container(v-show='modalStates.isShow')
    .modal-backdrop(@click='modalStates.hide()')
    .modal-body
      .modal-header
        .modal-title Modal Title
        a.modal-close(@click='modalStates.hide()') ×
      .modal-content
        .tabber
          .tabber-tabs
            a.tabber-tab(
              v-for='(tab, index) in pageStates.pages',
              :key='index',
              @click='pageStates.curIndex = index',
              :class='{ active: index === pageStates.curIndex }'
            ) {{ tab.label || tab.id }}
          template(v-for='(tab, index) in pageStates.pages', :key='index')
            Component.modal-inner(v-show='pageStates.curIndex === index', :is='tab.component')
      .modal-footer
        pre.debug {{ pageStates.pages?.[0]?.id }}
</template>

<script setup lang="ts">
import { useModalStore } from './states/modal'
import { usePagesStore } from './states/pages'

const modalStates = useModalStore()
const pageStates = usePagesStore()
</script>

<style scoped lang="sass">
.ipe-modalManager-container
  font-size: 16px
  position: fixed
  top: 0
  left: 0
  width: 100%
  height: 100%
  z-index: 1000

.modal-backdrop
  position: absolute
  top: 0
  left: 0
  width: 100%
  height: 100%
  background-color: rgba(255, 255, 255, 0.5)
  z-index: 0

.modal-body
  position: absolute
  display: flex
  flex-direction: column
  top: 50%
  left: 50%
  transform: translate(-50%, -50%)
  width: 90vw
  height: 75vh
  max-width: 1280px
  background-color: #fff
  border-radius: 0.5em
  border: 1px solid rgba(0, 0, 0, 0.1)
  box-shadow: 1em 1em 2em rgba(0, 0, 0, 0.1)
  overflow: hidden
  z-index: 1

.modal-header
  display: flex
  justify-content: space-between
  align-items: center
  padding: 1em
  border-bottom: 1px solid rgba(0, 0, 0, 0.1)

.modal-title
  font-size: 1.125em
  font-weight: 700

.modal-close
  cursor: pointer
  font-size: 1.5em
  font-weight: 700
  color: #ff5a5f
  transition: color 0.2s ease-in-out
  &:hover
    color: #ff767b
    text-decoration: none

.modal-content
  // padding: 1em
  // height: calc(100% - 3.5em)
  flex: 1
  overflow-y: auto

.modal-footer
  display: flex
  align-items: center
  padding: 1em
  border-top: 1px solid rgba(0, 0, 0, 0.1)
  background-color: #f5f5f5

.tabber
  display: flex
  flex-direction: column
  height: 100%

.tabber-tabs
  display: flex
  flex-direction: row
  justify-content: flex-start
  align-items: center
  border-bottom: 1px solid rgba(0, 0, 0, 0.1)

.tabber-tab
  cursor: pointer
  display: inline-block
  padding: 0.5em 1em
  color: #333
  transition: color 0.2s ease-in-out
  &:hover
    color: #1e90ff
    text-decoration: none
  &.active
    color: #1e90ff
    text-decoration: none
    box-shadow: inset 0 -2px 0 #1e90ff
</style>
