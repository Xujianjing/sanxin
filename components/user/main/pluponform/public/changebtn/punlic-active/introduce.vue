<template>
  <div>
    <div class="content">
      <div class="basic">
         <h1> 基本信息</h1>
            
        <el-upload
          class="avatar-uploader"
          action="http://localhost:3000/file" method="post"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>

        <p class="warnMsg">图片格式：jpg\png 建议尺寸： 宽度大于800px</p>
      </div>
      <div class="introduce">
        <p>活动名称</p>
        <el-input v-model="content" placeholder="请输入内容"></el-input>
        <p>活动日期</p>
        <div class="block">
          <el-date-picker
            v-model="times"
            type="daterange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            default-value="2010-10-01">
          </el-date-picker>
        </div>
          <p>请选择地址</p>
          <select-item :provList="cityList" @getCity="getCity"/>
      </div>
    </div>
         <pro-item v-for="(v, i) in num" v-on:addPro="result" :inx='i' v-on:del="delPro" :key="i"/>

         <el-row class="publish_btn">
             <el-button type="primary" @click="toPush">保存并发布</el-button>
         </el-row>
       </div>
</template>

<script>
import proItem from '../../../../public-pro/pro';
import selectItem from './more-select/sele';
import {formatDate} from '../../../../../../../utils/format';
export default {
    data () {
        return {
            num: [{'isdel':false}],
            imageUrl: '',
            content: '',
            times: '',
            cityList: [],
            activeCity: {}
        };
    },
    components:{
      proItem,
      selectItem
    },
    methods: {
        result () {
            this.num.push({'isdel': true});
        },
        delPro (inx) {
            this.num.splice(inx, 1);
            console.log(this.num);
        },
        handleAvatarSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
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
        },
        toPush () {
            if (!this.content) {
              this.$message('请填写活动内容');
              return;
            }
            if(!this.imageUrl) {
              this.$message('请上传图片');
              return;
            }
            if (!this.activeCity) {
              this.$message('请选择城市');
              return;
            }
            
            let startDate =formatDate(this.times[0]);
            let endDate =formatDate(this.times[1]);
            if (!startDate || !endDate) {
              this.$message('请选择活动时间');
              return;
            }
            this.$http.post('/admin/activity/getByCategory',{
              imageUrl: this.imageUrl,
              imageList: this.$store.state.imgList,
              startDate,
              endDate,
              content: this.content,
              activeCity: this.activeCity
            }).then((res) => {
                this.$message({
                  message: '保存成功',
                  onClose: this.toclose
                });
            })
        },
        toclose () {
            this.imageUrl = '',
            this.content = '',
            this.times = null,
            this.activeCity = {};
            this.$store.state.imgList = [];
        },
        getCity (val) {
          this.activeCity = val;
        }
    },
    created () {
      this.$http.get('/admin/community/location/root').then((res) => {
        this.cityList = res.data;
      })
    }
};
</script>

<style scoped>
 p{
   color: #aaa;
   font-size: 14px;
   line-height: 30px;
 }
 .publish_btn{
   text-align: center;
 }
 .basic{
   width:40%;
   float: left;
 }
 .introduce{
   width: 50%;
   float: left;
   margin-left: 30px;
 }
 .content{
   width:100%;
   height: 230px;
 }
 h1{
   font-size: 16px;
   font-weight: 800;
 }
 .el-range-editor.el-input__inner{
   width:100%;
 }
 .avatar-uploader .el-upload {
  margin: 10px;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 280px;
  height: 130px;
  line-height: 120px;
  text-align: center;
  margin-left: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
}
.avatar {
  width: 280px;
  height: 130px;
  display: block;
}

h1{
    font-size: 14px;
    margin-bottom: 10px;
}
.el-icon-plus{
    line-height: 80px;
    font-size: 50px;
    color:#ccc;
}
p{
    color: #aaa;
    font-size: 12px;
}
</style>
