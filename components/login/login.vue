<template>
  <div class="wrap" v-loading='loading'>
    <div class="con">
      <p>userName: <input type="text" v-model="userName"></p>
      <p>passWord: <input type="password" v-model="passWord"></p>
      <p><button @click="loginUser">注册</button> <button @click='toUser'>登陆</button> </p>
      <p></p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import {getCookie, setCookie} from '../../utils/utils';
export default {
    data () {
      return {
        userName: '',
        passWord: '',
        loading: false
      }
    },
    methods: {
      toUser () {
        this.loading = true;
        let that = this;
        let home = this.$route.params.from ? this.$route.params.from : 'public';
        console.log(home);
        setTimeout(function () {
          that.loading = false;
          that.$http.post('/admin/loginUser', {'user': that.userName, 'pwd': that.passWord}).then((res) => {
          alert(res.data.msg);
          if (res.data.code) {
              that.$store.state.userName = res.data.data.loginName; // 数据容器的userName 也重置
              that.$store.commit('change_aut', res.data.data.authority); // 更新当前登陆者的权限
              setCookie({'token':'token', 'val': res.data.data.token}); // 重置cookie
                that.$router.push({'name': home});
          } else {
            that.userName = '';
            that.passWord = '';
          }
        });
        }, 1000)
        
      },
      loginUser () {
        if (this.userName === '' || this.passWord === '') {
          alert('用户名或密码不能为空');
        } else {
            this.$http.post('/admin/logins', {'user': this.userName, 'pwd': this.passWord, 'authority': 'visitor'}).then((res) => {
              if (res.data.code) {
                alert('注册成功');
              }
            });
        }
        
      }
    }
};
</script>

<style scoped>
 div.wrap{
   width:100%;
   height: 100%;
   padding-top: 150px;
 }
 .con{
   width:300px;
   height: 200px;
   margin: 0 auto;
   background: #eee;
   border: 1px solid #ccc;
   border-radius: 10px;
   padding-top: 20px;
 }
 .con p{
   text-align: center;
   line-height: 50px;
 }
 input{
   border:1px solid #ccc;
   line-height: 25px;
   border-radius: 5px;
   padding-left: 10px;
   margin-left: 10px;
   outline: none;
 }
 button{
    line-height: 25px;
    background: #409EFF;
    color: #fff;
    padding: 0 10px;
    border:none;
    border-radius: 5px;
    margin-left: 15px;
 }
</style>
