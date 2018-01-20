<template>
<div>
  <p><span>居民详情</span> <span class="blue" @click="addMark">邀请居民</span> </p>
   <el-table
    ref="multipleTable"
    :data="$store.state.resident_list"
    tooltip-effect="dark"
    v-loading="loading"
    style="width: 100%"
    @selection-change="handleSelectionChange">
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
   <el-table-column
      prop="name"
      label="居民姓名"
      width="120">
    </el-table-column>
    <el-table-column
      prop="tel"
      label="联系电话"
      width="120">
    </el-table-column>
    <el-table-column
      prop="sex"
      label="性别"
      width="100"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="msg"
      label="短信通知"
      width="100"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="ps"
      label="备注信息"
      width="100"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">备注</el-button>
          <el-button
          size="mini"
          >详情</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
  background
  layout="prev, pager, next"
  @current-change="currentChange"
  :total="$store.state.res_len">


</el-pagination>

<div class="mark" v-if="isShow">
            <section>
                <h2>添加居民 <span @click.stop="isShow = !isShow">X</span></h2>
                <div class="markCont">
                    <p>居民信息 <input type="text" placeholder="请输入用户姓名或手机号"  v-model.trim="userMessage"> <button @click="invite">查询</button></p>
                    <el-table
    ref="multipleTable"
     v-show="isInvite"
    :data="searchList"
    tooltip-effect="dark"
    style="width: 100%"
    @selection-change="handleSelectionChange2">
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
   <el-table-column
      prop="name"
      label="居民姓名"
      width="120">
    </el-table-column>
    <el-table-column
      prop="tel"
      label="联系电话"
      width="120">
    </el-table-column>
    <el-table-column
      prop="sex"
      label="性别"
      width="100"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="ps"
      label="备注信息"
      width="100"
      show-overflow-tooltip>
    </el-table-column>
  </el-table>
       <p><button v-show="isInvite" @click="pushbir">邀请</button></p>
                </div>
            </section>
         
        </div>
  </div>
</template>

<script>
import {getCookie} from '../../../../../../../utils/utils';
export default {
     data () {
      return {
        tableData: [],
        multipleSelection: [],
        multipleSelection2: [],
        page: 1,
        ps: '备注',
        loading: false,
        isShow: false,
        userMessage: '',
        searchList: [],
        isInvite: false
      }
    },
    methods: {
        currentChange (page) {
          this.page = page;
          this.$store.dispatch('changeList', {
              'page': page,
              'count': 10
          })
        },
        toggleSelection(rows) {
            if (rows) {
              rows.forEach(row => {
                this.$refs.multipleTable.toggleRowSelection(row);
              });
            } else {
              this.$refs.multipleTable.clearSelection();
            }
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        handleSelectionChange2(val) {
            this.multipleSelection2 = val;
            console.log(this.multipleSelection2)
        },
        handleDelete(index, row) {
           this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    this.$http.post('/admin/residentDele', {
                        'id': row.id,
                        'page': this.page,
                        'count': 10,
                        'token': getCookie('token'),
                        'aut': this.$store.state.authority
                      }).then((res) => {
                        if (res.data.msg === 'success') {
                            this.$store.commit('residentList', res.data.data);
                        } else if (res.data.msg === 'error') {
                            alert('登录时间失效');
                            let nowPath = this.$route.name
                            this.$router.push({name: 'login', params: {
                              from: nowPath
                            }})
                            return;
                        } else {
                            alert(res.data.msg);
                        }
                    });
                }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });    
        },
        handleEdit (index, row) {
          this.$prompt('请输入备注', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            inputPattern:  /\S+/,
            inputErrorMessage: '最好输入1-5个字符'
          }).then(({ value }) => {
          this.loading = true;
          let that = this;
           setTimeout(function () {
              that.$message({
                type: 'success',
                message: '备注添加成功: ' + value
              });
              that.$store.dispatch('change_ps', {
                  'id': row.id,
                  'page': that.page,
                  'count': 10,
                  'ps': value
              });
              that.loading = false;
           }, 1000)
          
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '取消输入'
            });       
          });
        },
        addMark () {
          this.isShow = true
        },
        invite () {
            let errors = '';
            let reg = /1[3,5,8,9][0-9]{9}/
            if (!this.userMessage) {
                errors = '请输入查询信息'
            }
            if (errors) {
                this.$alert(errors, '消息提示');
            } else {
                this.$http.post('/admin/search', {
                    msg: this.userMessage
                })
                .then(res => {
                    if (res.data.code === 0) {
                        this.$alert('未查到相关信息', '提示信息', {
                            callback: () => {
                               this.userMessage = '',
                               this.searchList = [];
                            }
                        })
                    } else {
                        this.isInvite = true;
                        this.isShowA = true
                        this.searchList = res.data.list;
                    }
                })
            }
        },
        pushbir () {
          this.$http.post('/admin/pushbir', this.multipleSelection2).then((res) => {
            this.$message(res.data);
          })
          this.userMessage = '';
          this.isShow = false;
          this.searchList = [];

        }
    },
    created () {
       this.$store.dispatch('changeList', {
              'page': this.page,
              'count': 10
        })
    }
}
</script>

<style scoped>
    .ols ul li{
      display: inline-block;
      margin-left: 10px;
      
    }
    .ols ul{
      margin-top: 20px;
    }
    .mark, .addps_mark{
  z-index: 999;
  position: fixed;
  top:0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0,.5)
}
section{
    background: #fff;
    width: 50%;
    height:auto; 
    margin:10% auto;
}
section h2{
    font-size: 18px;
    line-height: 50px;
    background: lightseagreen;
    color:#fff;
    padding-left:20px;
    position: relative;
}
h2 span{
    position: absolute;
    right: 20px;
    background: rgba(0,0,0,.5);
    width: 25px;
    height:25px;
    border-radius: 50%;
    text-align: center;
    line-height: 25px;
    font-weight: normal;
    font-size: 14px;
    top:13px;
}
h2 span:hover, .markCont button:hover, .invitation >h1 span:hover{
    cursor: pointer;
}
.markCont{
    padding:20px;
    text-align: center;
}
.markCont p {
    font-size: 18px;
}
.markCont input{
    padding: 10px;
    width:50%;
    margin:0 10px;
}
.markCont button{
    border:none;
    padding: 8px 30px;
    background: lightseagreen;
    color:#fff;
    font-size: 18px;
    vertical-align: middle;
}
.markCont ul {
    width: 100%;
}
.markCont ul li {
    line-height: 40px;
}
</style>
