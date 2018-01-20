<template>
  <el-row>
    <el-col :span="24">
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <div class="userMsg">
          <h1>三鑫智慧社区</h1>
          <p>公共管理平台</p>
          <div class="titImg">
              <img src="../../../assest/1.jpeg" alt="">
          </div>
          <p>管理员 {{$store.state.userName}}</p>
      </div>
      <el-submenu v-for="(v,i) in $store.state.menuList" :key="i" :index="i.toString()">
      
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>{{v.name}}</span>
        </template>
            <el-submenu v-for="(val, k) in v.submenus" :key="k" :index="i + '-' + k">
                <template slot="title">{{val.name}}</template>
                    <el-menu-item v-for="(item, keys) in val.submenus" :key="keys" :index="i + '-' + k + '-' + keys" @click="changeTit(item.name)">{{item.name}}</el-menu-item>
            </el-submenu>
      </el-submenu>
      <!-- <el-menu-item v-for="(v,i) in arr" :key="i" :index="i.toString()" v-else>
          <template slot="title">
          <i class="el-icon-location"></i>
          <span>{{v.name}}</span>
        </template>
      </el-menu-item> -->
    </el-menu>
  </el-col>
</el-row>
</template>

<script>
export default {
    data () {
        return {
            arr: []
        }
    },
    methods: {
        changeTit (tit) {
            this.$store.commit('change_tit', tit);
        }
    }
};
</script>

<style scoped>
aside.el-aside,.el-row,.el-col,.el-menu{
    height: 100%;
    width: 200px!important;
}
.userMsg{
    width: 100%;
    height: 140px;
    padding: 30px 0;
    border-bottom: 1px solid #999;
    text-align: center;
}
.userMsg h1{
    font-size: 20px;
    color: #fff;
}
.userMsg p{
    font-size: 14px;
    line-height: 30px;
    color: #fff;
}
.titImg{
    width: 100%;
    text-align: center;
}
.titImg img{
    width: 60px;
    height: 60px;
    border-radius: 50%;
    border: 3px solid #fff;
}
</style>
