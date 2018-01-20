<template>
  <div class="msg_main">
         <h2>基本信息</h2>
         <el-row>
                <el-col :span="10"><span>责任人</span></el-col> 
                 
                <el-col :span="4">
                  <el-dropdown trigger="click">
                    <span class="el-dropdown-link">
                      选择责任人<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <p class="drop_menu"><input type="text"> <i class="icon iconfont icon-fangdajing"></i></p>
                      <el-dropdown-item>张鑫 188801145 街道办事处</el-dropdown-item>
                      <el-dropdown-item>张鑫 188801145 街道办事处</el-dropdown-item>
                      <el-dropdown-item>张鑫 188801145 街道办事处</el-dropdown-item>
                      <el-dropdown-item>张鑫 188801145 街道办事处</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </el-col>

               <el-col :span="10"><span>责任人单位</span></el-col>
               <el-input placeholder="请输入内容" value="张鑫 188801145"> 街道办事处</el-input>
           
         </el-row>
         <el-row>
             <p><span>温馨提示</span>   </p>
             <el-input placeholder="请输入内容" value="文本框"></el-input>
         </el-row>
         <pro-item v-for="(v, i) in num" :key="i" v-on:addPro="result" :inx='i' v-on:del="delPro">
           
         </pro-item>
         
         <el-row class="publish_btn">
             <el-button type="primary">保存并发布</el-button>
         </el-row>
      </div>
</template>

<script>
import proItem from '../../../public-pro/pro.vue';
export default {
    components: {
        proItem
    },
    data () {
        return {
            num: [{'isdel':false}],
            imageUrl: ''
        };
    },
    methods: {
        result () {
            this.num.push({'isdel': true});
        },
        delPro (inx) {
            this.num.splice(inx, 1);
            console.log(this.num);
        }
    }
};
</script>

<style scoped>
.msg_main{
  background: #fff;
  margin-left: 10px;
  padding: 30px 20px;
}
h2{
    font-size: 15px;
}
.el-row {
    margin-bottom: 20px;
    line-height: 40px;
    font-size: 14px;
  }
  p.warnMsg{
      color: #aaa;
      font-size: 12px;
  }
  .publish_btn{
      text-align: center;
  }
  .drop_menu{
      text-align: center;
      position: relative;
  }
  .drop_menu i.icon{
      position: absolute;
      top: 5px;
      right: 20px;
  }
  .drop_menu input{
      border-radius: 5px;
      border:1px solid #ccc;
      width:90%;
      line-height: 25px;
  }
  span{
      color: #aaa;

  }
  span.blue{
      color: #11B2B6;
      margin-left: 10px;
  }
  span.el-dropdown-link{
      color: #333;
      font-size: 12px;
  }
  span.del{
      color: #f00;
  }
  .control{
  text-align: right;
}
h1{
    font-size: 14px;
}
h1 span.blue{
    color: #11B2B6;
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
