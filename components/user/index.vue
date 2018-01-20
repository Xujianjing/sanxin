<template>
  <el-container>
    <el-aside>
        <aside-item/>
    </el-aside>
    <el-main>
        <main-item/>
    </el-main>
  </el-container>
</template>

<script>
import asideItem from './menu/menu.vue';
import mainItem from './main/main.vue';
export default {
    components: {
      asideItem,
      mainItem
    }
}
</script>

<style scoped>
aside.el-aside{
    height: 100%;
    width: 200px!important;
}
.el-aside .el-row{
  overflow: hidden;
  overflow-y: scroll
}
main{
  background: #eee;
  padding: 0;
  margin: 0;
}
</style>
