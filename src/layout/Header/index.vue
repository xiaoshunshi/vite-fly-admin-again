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
          <el-icon class="icon" v-if="isCollapse" @click="handleCollapse">
            <expand />
          </el-icon>
          <el-icon class="icon" v-else @click="handleCollapse">
            <fold />
          </el-icon>
        </div>
        <u-hamburger />
      </div>
      <div class="right">
        <u-header-search class="right-item-menu" />
        <u-screen-full class="right-item-menu" />

        <el-dropdown @command="commandAction">
          <span class="el-dropdown-link">
            <el-avatar :src="userInfo.avatar" :size="30" style="margin-right: 6px" />{{
              userInfo.username
            }}
            <el-icon class="el-icon--right">
              <arrow-down />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <!-- <el-dropdown-item :command="2">
                <el-icon>
                  <Edit />
                </el-icon>修改密码
              </el-dropdown-item> -->
              <el-dropdown-item :command="1">
                <el-icon>
                  <SwitchButton />
                </el-icon>退出登录
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>

    </div>
    <!-- 下方tag导航 -->
    <tag-views v-if="showTag" />

  </div>
</template>

<script lang="ts" setup>
// import { UserFilled } from '@element-plus/icons-vue'
import { ElMessageBox, ElMessage } from 'element-plus'
import { useSettingStore } from '@/store/modules/setting'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import UMenu from '../Sidebar/components/Menu.vue'
import UHamburger from '@/components/u-Hamburger/index.vue'
// 头部搜索组件
import UHeaderSearch from '@/components/u-headerSearch/index.vue'
// 全屏组件
import UScreenFull from '@/components/u-screenfull/index.vue'
import { useUserStore } from '@/store/modules/user'
import { usePermissionStore } from '@/store/modules/permission'
import TagViews from '../TagsView/index.vue'

const SettingStore = useSettingStore()
const isCollapse = computed(() => !SettingStore.isCollapse)
// menu 布局
const mode = computed(() => SettingStore.themeConfig.mode)
// 切换显示
// 显示 tag
const showTag = computed(() => SettingStore.themeConfig.showTag)
const handleCollapse = () => {
  SettingStore.setCollapse(isCollapse.value)
}
const person = ref()
const router = useRouter()
const PermissionStore = usePermissionStore()
const UserStore = useUserStore()
type userInfoType = {
  id: number;
  avatar: string;
  username: string;
  phone: string;
  email: string;
  identity: string;
  roles: string[];
}
const userInfo = computed((): userInfoType => UserStore.userInfo as userInfoType)
const commandAction = (key: number) => {
  switch (key) {
    case 1:
      logOut()
      break
    case 2:
      person.value.show()
      break
    default: break
  }
}
const logOut = async() => {
  ElMessageBox.confirm('确定退出登录吗？', '退出登录', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(async() => {
      try {
        router.push({ path: '/login' })
        await UserStore.logout()
        PermissionStore.clearRoutes()
        // TagsViewStore.clearVisitedView()
        ElMessage({
          type: 'success',
          message: '退出登录成功！'
        })
      } catch (e) { }
    })
    .catch(() => { })
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

