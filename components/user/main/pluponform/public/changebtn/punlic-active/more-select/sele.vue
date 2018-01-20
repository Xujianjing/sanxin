<template>
  <div>
            <el-select v-model="prov" placeholder="请选择" @change="changeProv(prov)">
                <el-option
                  v-for="item in provList"
                  :key="item.value"
                  :value="item.name">
                </el-option>
          </el-select>
            <el-select v-model="city" placeholder="请选择" @change="changeCity(city)">
                <el-option
                  v-for="item in cityList"
                  :key="item.value"
                  :value="item.name">
                </el-option>
          </el-select>
            <el-select v-model="area" placeholder="请选择" @change="changeArea">
                <el-option
                  v-for="item in areaList"
                  :key="item.value"
                  :value="item">
                </el-option>
          </el-select>
       </div>
</template>

<script>
export default {
    props:{
        'provList':{
            type: Array
        }
    },
    data () {
        return {
            cityList: [],
            areaList: [],
            prov: '',
            city: '',
            area: ''
        }
    },
    methods: {
        changeProv (val) {
            this.city = '';
            this.area = '';
            this.provList.forEach((item, inx) => {
                
                if (item.name == val) {
                    this.cityList = item.city;
                }
            })
        },
        changeCity (val) {
            this.cityList.forEach((item, inx) => {
                
                if (item.name == val) {
                    this.areaList = item.area;
                }
            })
        },
        changeArea () {
            this.collectInfo();
        },
        collectInfo () {
            if (this.prov && this.city && this.area) {
                this.$emit('getCity', {
                    prov: this.prov,
                    city: this.city,
                    area: this.area
               })
            } else {
                
            }
        }
    }
}
</script>

<style scoped>
.el-select {
   width:150px;
 }
</style>
