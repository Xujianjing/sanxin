<template>
    <div class="btns">
        <p><button :class="{'bg': pages === 'msgItem'}" @click="toMsg">信息管理</button>
      <button :class="{'bg': pages === 'activeItem'}" @click="toActive">主要活动</button></p>
      
      <components :is="pages"></components>
       
    </div>
</template>

<script>
import msgItem from './changebtn/message.vue';
import activeItem from './changebtn/active.vue';
export default {
    components: {
        msgItem,
        activeItem
    },
    data () {
        return {
            pages: 'msgItem'
        }
    },
    methods: {
        toActive () {
            this.pages = 'activeItem';
        },
        toMsg () {
            this.pages = 'msgItem';
        }
    },
    created () {
        this.$http.get('/admin/menu/public').then((res) => {
            this.$store.commit('change_list', res.data);
        })
    }
};
</script>

<style scoped>
.btns p{
  text-align: center;
  margin-bottom: 20px;
}
  
  .control img{
    width: 30px;
    height: 30px;
    border-radius: 50%;
    vertical-align: middle;
  }
button{
    padding: 5px 15px;
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
