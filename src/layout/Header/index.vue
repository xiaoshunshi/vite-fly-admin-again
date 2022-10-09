<template>
  <div
    class="m-layout-header"
    :class="[
      SettingStore.themeConfig.fixedHeader ? 'zb-fixed-header' : 'zb-no-fixed-header',
      mode === 'horizontal'
        ? ''
        : isCollapse
          ? 'fixed-header-collapse'
          : 'fixed-header-no-collapse',
    ]"
  >
    <div
      class="header"
      :class="{
        transverseMenu: mode === 'horizontal',
      }"
    >
      <u-menu v-if="mode === 'horizontal'" />
      <div class="left" v-if="mode === 'vertical'">
        <div class="hamburger-container">
          <el-icon class="icon" v-if="isCollapse" @click="handleCollapse"><expand /></el-icon>
          <el-icon class="icon" v-else @click="handleCollapse"><fold /></el-icon>
        </div>
        <u-hamburger />
      </div>
      <div class="right">
        <u-header-search class="right-item-menu" />
        <u-screen-full class="right-item-menu" />

        heaser
      </div>

    </div>
  </div>
</template>

<script lang="ts" setup>
import { useSettingStore } from '@/store/modules/setting'
import { computed } from 'vue'
import UMenu from '../Sidebar/components/Menu.vue'
import UHamburger from '@/components/u-Hamburger/index.vue'
// 头部搜索组件
import UHeaderSearch from '@/components/u-headerSearch/index.vue'
// 全屏组件
import UScreenFull from '@/components/u-screenfull/index.vue'

const SettingStore = useSettingStore()
const isCollapse = computed(() => !SettingStore.isCollapse)
// menu 布局
const mode = computed(() => SettingStore.themeConfig.mode)
// 切换显示
const handleCollapse = () => {
  SettingStore.setCollapse(isCollapse.value)
}
</script>
<style lang="scss" scoped>
  .mobile {
    .m-layout-header {
      left: 0 !important;
      width: 100% !important;
    }
  }
  .icon {
    font-size: 24px;
    cursor: pointer;
  }
  .header {
    height: 50px;
    width: 100%;
    border-bottom: 1px solid #eee;
    display: flex;
    align-items: center;
    padding: 0 10px 0 0;
    box-sizing: border-box;
    justify-content: space-between;
    .left {
      display: flex;
      align-items: center;
      height: 100%;
    }
    .right {
      display: flex;
      align-items: center;
      .right-item-menu {
        margin-right: 22px;
      }
    }
  }
  .zb-fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
  }
  .zb-no-fixed-header {
    width: 100% !important;
  }
  .hamburger-container {
    padding: 0px 15px;
    height: 100%;
    display: flex;
    align-items: center;
    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }
  .m-layout-header {
    width: 100%;
    background: white;
    transition: width 0.28s;
    flex-shrink: 0;
    box-sizing: border-box;
    box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
  }
  .fixed-header-collapse {
    width: calc(100% - 60px);
  }
  .fixed-header-no-collapse {
    width: calc(100% - 210px);
  }
  .el-dropdown {
    display: flex;
    height: 100%;
    align-items: center;
  }
  .el-dropdown-link {
    cursor: pointer;
    color: var(--el-color-primary);
    display: flex;
    align-items: center;
  }
  .transverseMenu {
    display: flex;
    .el-menu {
      overflow: hidden;
    }
    .right {
      display: flex;
      justify-content: flex-end;
      min-width: 300px;
      flex-shrink: 0;
    }
  }
</style>

