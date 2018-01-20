<template>
  <div>
    <el-row>
          <div class="tit">
            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
              <el-menu-item index="1"><router-link :to="{name: 'entry'}">一口化受理平台</router-link></el-menu-item>
              <el-menu-item index="2"><router-link :to="{name: 'grid'}">网格化受理平台</router-link></el-menu-item>
              <el-menu-item index="3"><router-link :to="{name: 'public'}">公共管理平台</router-link></el-menu-item>
            </el-menu>      
          </div>
          <div class="control">
                <el-menu class="el-menu-demo" mode="horizontal">
                  <el-menu-item index="1"><i class="icon iconfont icon-lingsheng"></i></el-menu-item>
                  <el-menu-item index="1"><i class="icon iconfont icon-xiaoxi"></i></el-menu-item>
                  <el-menu-item index="1"><img src="../../../assest/1.jpeg" alt=""></el-menu-item>
                  <el-menu-item index="1"><span>管理员</span>{{$store.state.userName}}</el-menu-item>
                  
                  <el-submenu index="2">
                    <template slot="title">我的工作台</template>
                    <el-menu-item index="2-1" @click="toLogin">退出</el-menu-item>
                    <el-menu-item index="2-2" @click="toLogin">登录</el-menu-item>
                  </el-submenu>
                </el-menu>
          </div>

    </el-row>
    <el-row>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>  .....</el-breadcrumb-item>
        <el-breadcrumb-item>{{$store.state.active_tit}}</el-breadcrumb-item>
      </el-breadcrumb>
    </el-row>
    
    <router-view></router-view>
  </div>
</template>

<script>
import {delCookie} from '../../../utils/utils';
export default {
    data () {
      return {
        flag: 'public',
         activeIndex: '3',
      }
    },
    methods: {
        toLogin () {
          console.log(0);
          delCookie('token');
          this.$router.push({'name': 'login'})
        }
    }
};
</script>

<style scoped>
a{
  text-decoration: none;
}
.el-row {
    margin-bottom: 20px;
    line-height: 40px;
  }

.el-row:nth-child(1){
  background: #fff;
}
.el-submenu .el-menu-item{
  text-align: left;
}
.tit{
  float: left;
}
.el-menu--horizontal{
  border-bottom: none;
}
.tit .el-menu--horizontal>.el-menu-item.is-active, .el-menu--horizontal>.el-submenu.is-active .el-submenu__title {
    background: #11B2B6;
    color: #fff;
    border-bottom-color: #fff;
}
.control .el-menu--horizontal>.el-menu-item.is-active, .el-menu--horizontal>.el-submenu.is-active .el-submenu__title {
  border-bottom: 2px solid transparent;
}
.control{
  font-size: 12px;
  float: right;
  color: #666;
}
.control ul li{
  padding:0 3px;
}
i.icon{
  font-size: 18px;
  margin-right: 10px;
}
.control{
  text-align: right;
}
  .control img{
    width: 30px;
    height: 30px;
    border-radius: 50%;
    vertical-align: middle;
  }

</style>
