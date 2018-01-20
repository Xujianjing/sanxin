<template>
  <div>
    <swiper-item/>
    <p><button :class="{'bg': changePage === 'activesignItem'}" @click="toActive">活动信息与报名</button>
      <button :class="{'bg': changePage === 'residentItem'}" @click="toResident">人员管理</button></p>
    <components :is="changePage"/>
  </div>
</template>

<script>
import swiperItem from './swiper/swiper';
import residentItem from './changebtn/resident/resident';
import activesignItem from './changebtn/activesign/activesign';

export default {
    components: {
        swiperItem,
        residentItem,
        activesignItem
    },
    data () {
        return {
            changePage: 'residentItem'
        }
    },
    methods: {
        toActive () {
            this.changePage = 'activesignItem'
        },
        toResident () {
            this.changePage = 'residentItem'
        }
    },
    created () {
        this.$http.get('/admin/menu/entry').then((res) => {
            this.$store.commit('change_list', res.data);
        });
    }  
};
</script>

<style scoped>
p{
    text-align: center;
    margin: 20px 0;
}
    button{
        padding: 7px 20px;
        margin-left: 20px;
        line-height: 25px;
        border:1px solid #11B2B6;
        border-radius: 5px;
        color: #11B2B6;
        background: #f2f2f2;
        outline: none;
  }
  .bg{
      background: #11B2B6;
      color: #fff;
  }
</style>
