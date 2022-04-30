<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header>
      <div>后台管理系统</div>
      <el-button type="danger" @click="logout">退出</el-button>
    </el-header>

    <!-- 页面主体 -->
    <el-container>
      <!-- 左侧边栏 -->
      <el-aside width="200px">
        <!-- 侧边栏菜单区域 -->
        <el-menu
          background-color="#333744"
          text-color="#fff"
          active-text-color="#409eff"
          :unique-opened="true"
          :router="true"
          :default-active="activePath"
        >
          <!-- 一级菜单 -->
          <el-submenu
            :index="item.id + ''"
            v-for="item in menuList"
            :key="item.id"
          >
            <!-- 一级菜单模板区域 -->
            <template slot="title">
              <!-- 图标 -->
              <i class="el-icon-s-tools"></i>
              <!-- 文本 -->
              <span>{{ item.authName }}</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item
              :index="'/' + subItem.path"
              v-for="subItem in item.children"
              :key="subItem.id"
              @click="saveNavState('/' + subItem.path)"
            >
              <!-- 二级菜单模板区域 -->
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-menu"></i>
                <!-- 文本 -->
                <span>{{ subItem.authName }}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>

      <!-- 右侧内容主体 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import {getNavLists} from '@/api/home'
export default {
  data() {
    return {
      menuList: [],
      // 被激活的链接地址
      activePath: "",
    };
  },
  created() {
    this.getNav()
    // this.activePath = window.sessionStorage.getItem('activePath')
  },
  methods: {
    // 退出
    logout() {
      window.localStorage.clear();
      this.$router.push("/login");
    },
    // 获取全部菜单
    async getNav() {
      const res = await getNavLists()
      // console.log(11, res);      
      if(res.data.meta.status !== 200) return this.$message.error(res.data.meta.msg)
      this.menuList = res.data.data
    },
    // 保存链接的激活状态
    saveNavState(activePath) {
      // window.sessionStorage.setItem('activePath', activePath)
      // this.activePath = activePath
    },
  },
};
</script>

<style scoped>
.home-container {
  height: 100vh;
}
.el-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #373d41;
  color: #fff;
}
.el-aside {
  background-color: #999;
}
.el-aside .el-menu {
  border-right: none;
}
.el-main {
  background-color: #eaedf1;
}
</style>
