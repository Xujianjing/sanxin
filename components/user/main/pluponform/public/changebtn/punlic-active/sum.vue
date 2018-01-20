<template>
  <div>
      <h1>请输入栏目名称 <span class="blue">编辑</span> <span class="blue">添加栏目</span> <span>预览</span></h1>
      <section class="el-upload avatar-uploader">
          <label for="fileMsg"><input type="file" id="fileMsg"></label>
          <i class="el-icon-plus avatar-uploader-icon"></i>
      </section>
  </div>
</template>

<script>
export default {

};
</script>

<style scoped>
h1{
    font-size: 14px;
}
h1 span.blue{
    color: skyblue;
}
section{
    width: 100%;
    height: 80px;
    border:1px solid #ccc;
    position: relative;
}
section input{
    display: none;
}
section label {
    width: 100%;
    height: 100%;
    position: absolute;
    left:0;
}
.el-icon-plus{
    line-height: 80px;
    font-size: 50px;
    color:#ccc;
}
</style>
