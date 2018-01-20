<template>
  <div class="main" v-loading="loading">
    <div class="msg">
       <p>活动信息：社区居委会活动室</p> 
       <p>温馨提示：请携带有效证件前往，如身份证</p>
    </div>
    <div class="fillout">
       <el-row>
          <el-col :span="12">
            <p>居民姓名</p>
            <el-input v-model="user" placeholder="请输入内容"></el-input>
          </el-col>
           <el-col :span="12">
            <p>居民电话</p>
            <el-input v-model="phone" placeholder="请输入内容"></el-input>
          </el-col>
       </el-row>
       <el-row>
         <p>输入备注信息</p>
            <el-input v-model="ps" placeholder="请输入内容"></el-input>
       </el-row>
       <el-row class="btn">
           <button @click="wantTo">报名参加</button>
       </el-row>
    </div>
  </div>
</template>

<script>
import {formatDate} from '../../../../../../../utils/format';
export default {
    data () {
      return {
        user: '',
        phone: '',
        ps: '',
        loading: false
      }
    },
    methods: {
      wantTo () {
        if (this.user) {
          if (/^1[3|4|5|8|7][0-9]\d{4,8}$/.test(this.phone)) {
              this.$http.post('/admin/wantbir', {
                user: this.user,
                phone: this.phone,
                ps: this.ps,
                time: formatDate(new Date())
              }).then((res) => {
                this.loading = true;
                if (res.data == 'success') {
                  this.$message('保存成功');
                  this.user = '';
                  this.phone = '';
                  this.ps = '';
                  this.loading = false;
                } else if (res.data == 'already') {
                  this.$message('该用户已经存在');
                  this.loading = false;
                }
              })
          } else {
            this.$message('手机号码的格式不对');
          }
           
        } else {
          this.$message('必须输入用户名');
          this.loading= false;
        }
        
      }
    }
}
</script>

<style scoped>
 .main{
   margin-left: 10px;
 }
 .fillout,.msg{
    background: #fff;
    margin-top: 10px;
    padding: 20px
 }
 p{
   line-height: 30px;
 }
 .el-input{
   width:90%;
   margin-bottom: 20px;
 }
 .btn{
   text-align: center;
 }
 .btn button{
   padding: 7px 10px;
   background: #11B2B6;
   color: #fff;
   border-radius: 5px;
   border: none;
   outline: none
 }
</style>
