<template>
    <div class="active_main">
        <el-tabs type="border-card">
  <el-tab-pane label="活动介绍">
     <introduce/>
  </el-tab-pane>
  <el-tab-pane label="邀请居民">
    <invite/>
  </el-tab-pane>
  <el-tab-pane label="居民报名">
      <sign/>
  </el-tab-pane>
  <el-tab-pane label="活动总结">
      <sum/>
  </el-tab-pane>
</el-tabs>
    </div>
</template>

<script>
import introduce from './punlic-active/introduce';
import invite from './punlic-active/invite';
import sign from './punlic-active/sign';
import sum from './punlic-active/sum';
export default {
    components: {
        introduce,
        invite,
        sign,
        sum
    }
};
</script>

<style>
.active_main{
  background: #fff;
  margin-left: 10px;

}
</style>
