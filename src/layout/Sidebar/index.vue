<template>
  <div :class="{ 'has-logo': themeConfig.showLogo }">
    <logo :is-collapse="isCollapse" v-if="themeConfig.showLogo" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <u-menu />
    </el-scrollbar>
  </div>
</template>

<script lang="ts" setup>
import { useSettingStore } from '@/store/modules/setting'
import { computed } from 'vue'
import logo from './components/Logo.vue'
import UMenu from './components/Menu.vue'

const SettingStore = useSettingStore()
const isCollapse = computed(() => !SettingStore.isCollapse)

const themeConfig = computed(() => SettingStore.themeConfig)

</script>

<style lang="scss">

</style>

