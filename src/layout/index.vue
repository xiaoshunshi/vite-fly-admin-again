<template>
  <div class="g-container-layout" :class="classObj">
    <div v-if="device === 'mobile' && !isCollapse" class="drawer-bg" @click="handleClickOutside" />
    <sidebar class="sidebar-container" v-if="mode === 'vertical'" />
    <router-view />
  </div>
</template>
<script lang='ts' setup>
import { useResizeHandler } from './hooks/useResizeHandler'
import { useSettingStore } from '@/store/modules/setting'
import { computed } from 'vue'
import Sidebar from './Sidebar/index.vue'

const SettingStore = useSettingStore()
const { device } = useResizeHandler()
// 是否折叠
const isCollapse = computed(() => {
  return !SettingStore.isCollapse
})
const classObj = computed(() => {
  return {
    hideSidebar: !SettingStore.isCollapse,
    openSidebar: SettingStore.isCollapse,
    withoutAnimation: SettingStore.withoutAnimation,
    mobile: device.value === 'mobile'
  }
})
// 移动端点击
const handleClickOutside = () => {
  SettingStore.closeSideBar({ withoutAnimation: false })
}
// const showTag = computed(() => SettingStore.themeConfig.showTag)

const mode = computed(() => SettingStore.themeConfig.mode)

</script>
<style lang='scss' scoped>
  .g-container-layout {
    //display: flex;
    height: 100%;
    width: 100%;
    .main-container {
      //overflow: auto;
      display: flex;
      flex: 1;
      box-sizing: border-box;
      flex-direction: column;
    }
    &.mobile.openSidebar {
      position: fixed;
      top: 0;
    }
  }
  .sidebar-container {
    display: flex;
    flex-direction: column;
  }
  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 90;
  }
  .m-container-content {
    display: flex;
    flex: 1;
    position: relative;
    box-sizing: border-box;
  }
</style>
