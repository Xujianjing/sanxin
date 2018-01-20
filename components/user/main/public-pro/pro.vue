<template>
  <el-row>
       <h1>请输入栏目名称 {{this.inx}} <span class="blue">编辑</span> <span class="blue" @click="addPro">添加栏目</span> <span>预览</span> <span v-if="inx !== 0" @click="del(inx)">删除</span></h1>
            
        <el-upload
  class="avatar-uploader"
  action="http://localhost:3000/file" method="post"
  :show-file-list="false"
  :on-success="handleAvatarSuccess"
  :before-upload="beforeAvatarUpload">
  <img v-if="imageUrl" :src="imageUrl" class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>

        <p class="warnMsg">图片格式：jpg\png 图片大小： 小于200k 建议尺寸： 宽度大于800px</p>

  </el-row>
</template>

<script>
export default {
    name: 'pro',
    props: {
        'inx': {
            type: Number
        }
    },
    data () {
        return {
            imageUrl: ''
        };
    },
    methods: {
        addPro () {
            this.$emit('addPro')
        },
        del (inx) {
            this.$emit('del', inx);
        },
        handleAvatarSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
            this.$store.commit('img_list', this.imageUrl);
        },
       beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg' || 'image/png' || 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 8;

            if (!isJPG) {
            this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 8MB!');
            }
            return isJPG && isLt2M;
      }
    }
}
</script>

<style scoped>
  .avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 900px;
  height: 120px;
  line-height: 120px;
  text-align: center;
  margin:7px 0;
  margin-left: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
}
.avatar {
  width: 900px;
  height: 120px;
  display: block;
}

h1{
    font-size: 14px;
    line-height: 30px;
}
h1 span.blue{
    color: skyblue;
}

.el-icon-plus{
    line-height: 80px;
    font-size: 50px;
    color:#ccc;
}
p{
    color: #aaa;
    font-size: 12px;
    line-height: 30px;
}
</style>
