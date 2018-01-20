<template>
  <div class="swiper">
    <div class="block">
    <el-carousel :interval="4000" type="card" height="200px">
    <el-carousel-item v-for="(item, k) in activeMsg" :key="k">
        <h2>"社区活动"</h2>
        <h3>{{ item.content }}</h3>
        <p>活动时间: {{ item.startDate }}</p>
      </el-carousel-item>
  </el-carousel>
  </div>
  </div>
</template>

<script>
export default {
    data () {
      return {
        activeMsg: []
      }
    },
    created () {
      this.$http.post('/admin/activity/activeIntroduce').then((res) => {
        if (res.data.msg == 'success') {
          this.activeMsg = res.data.list;
        }
      })
    }
};
</script>

<style scoped>
.swiper{
  margin-left: 10px;
  background: #fff;
  height: 200px;
}

.el-carousel{
  width:90%;
  margin-left: 5%;
}
h2,h3,p{
  text-align: center;
}
.el-carousel__item{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #11B2B6;
  color: #fff;
}
.el-carousel__arrow .el-carousel__arrow--left{
  left: 1px;
}
.el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    margin: 0;
  }

</style>
