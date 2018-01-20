<template>
   <div class="resident">
       <el-table
            :data="tableData"
            stripe
            style="width: 100%">
            <el-table-column
            prop="user"
            label="居民姓名"
            width="180">
            </el-table-column>
            <el-table-column
              prop="phone"
              label="联系电话"
              width="180">
            </el-table-column>
            <el-table-column
              prop="ps"
              label="备注信息">
            </el-table-column>
            <el-table-column
              prop="time"
              label="报名时间">
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
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
          :total="$store.state.invite_len">
        </el-pagination>


   </div>
</template>

<script>
export default {
    data() {
      return {
        tableData: []
      }
    },
    methods: {
      handleDelete (index, row) {
        this.$http.post('/admin/delbir', {user: row.user}).then((res) => {
          if (res.data === 'success') {
             this.$message('删除成功');
             this.$http.post('/admin/birthday').then((res) => {
               this.$store.state.invite_len = res.data.len;
                this.tableData = res.data.list;
              })
          }
        })
      },
      currentChange (page) {
          // this.page = page;
          // this.$store.dispatch('changeList', {
          //     'page': page,
          //     'count': 10
          // })
      }
    },
    created () {
      this.$http.post('/admin/birthday').then((res) => {
        this.$store.state.invite_len = res.data.len;
        this.tableData = res.data.list;
      })
    }
}
</script>

<style scoped>
  .resident{
    margin-left: 10px;
  }
</style>
