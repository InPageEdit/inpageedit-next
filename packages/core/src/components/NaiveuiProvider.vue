<template>
  <NConfigProvider :theme-overrides="themeOverrides" :locale="zhCN" :date-locale="dateZhCN">
    <NMessageProvider :max="5" placement="top">
      <NNotificationProvider :max="5" placement="bottom-left">
        <NDialogProvider>
          <slot />
        </NDialogProvider>
      </NNotificationProvider>
    </NMessageProvider>
  </NConfigProvider>
</template>

<script setup lang="ts">
import {
  type GlobalThemeOverrides,
  NConfigProvider,
  NMessageProvider,
  NNotificationProvider,
  zhCN,
  dateZhCN,
} from 'naive-ui'

const themeOverrides = ref<GlobalThemeOverrides>({})
</script>

<style scoped lang="sass"></style>
