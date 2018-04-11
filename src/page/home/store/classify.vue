<template>
  <div class="container">
    <!-- <p :class="[tag === '全部' && 'active']" @click="handleSelect('全部')">全部</p>
    <p :class="[tag === '全部' && 'active']" @click="handleSelect('ktv')">ktv</p>
    <p :class="[tag === '美业' && 'active']" @click="handleSelect('美业')">美业</p>
    <p :class="[tag === '酒店' && 'active']" @click="handleSelect('酒店')">酒店</p> -->
    <Select @changeText="changeText" :tagData="tagData" />
  </div>
</template>
<script>
import Select from '@/components/select.vue'
import Scroll from '@/plugins/scroll/scroll.vue'
import ShopCard from '@/components/ShopCard.vue'
import { mapState } from 'vuex'
export default {
  data(){
    return {
      tagData: [
        '全部',
        '美业',
        'ktv',
        '酒店'
      ]
    }
  },
  computed: {
    ...mapState([
      'ktvStore'
    ])
  },
  components: {
    Select,
    Scroll,
    ShopCard
  },
  methods: {
    changeText(tag) {
      this.tag = tag
      this.$emit("changeText", 'classify', this.tag)
      //执行渲染操作 跟据tag去对应分发哪个
      //
      
      // this.$loading()
      // const self = this
      // setTimeout(async ()=>{
      //   console.log(this)
      //   await this.$store.dispatch('getKtvStore')
      //   //这个要更据获取数据的返回值判断 
      //   if(self.ktvStore.length === 0) {
      //     self.noMore = true
      //   }
      //   self.$loading(false)
      // },2000)
    },
  }
}
</script>
<style lang="sass" scoped>
.container 
  // position: absolute
  // background: #fff
  // left: 0 
  // top: 0
  // min-height: 3rem
  // max-height: 10rem
  // width: 100%
// @import '~@/assets/css/mixin.sass'
// .active 
//   color: $green-color
// .container
//   background: #fff
//   font-size: $small-size
//   color: #777 
//   position: absolute
//   left: 0 
//   top: 0
//   width: 100%
//   z-index: 99
//   +border-line(1px,bottom)
//   p
//     text-align: left
//     padding: .2rem .7rem

</style>


