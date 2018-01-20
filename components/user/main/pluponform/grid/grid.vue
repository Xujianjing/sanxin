<template>
  <h1>grid</h1>
</template>

<script>
export default {
    created () {
        this.$http.get('/admin/menu/grid').then((res) => {
            this.$store.commit('change_list', res.data);
        });
    }  
};
</script>

<style>

</style>
