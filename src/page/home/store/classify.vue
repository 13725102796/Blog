<template>
  <div class="container">
    <!-- <p :class="[tag === '全部' && 'active']" @click="handleSelect('全部')">全部</p>
    <p :class="[tag === 'ktv' && 'active']" @click="handleSelect('ktv')">ktv</p>
    <p :class="[tag === '美业' && 'active']" @click="handleSelect('美业')">美业</p>
    <p :class="[tag === '酒店' && 'active']" @click="handleSelect('酒店')">酒店</p> -->
    <Select @changeText="changeText" />
  </div>
</template>
<script>
import Select from '@/components/select.vue'
export default {
  data(){
    return {
      tag: '全部',
    }
  },
  components: {
    Select
  },
  methods: {
    changeText(tag) {
      this.tag = tag
      this.$emit("changeText", 'classify', this.tag)
    }
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


