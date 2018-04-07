<template>
  <div class="container">
    <p :class="[tag === '全部' && 'active']" @click="handleSelect('全部')">全部</p>
    <p :class="[tag === 'ktv' && 'active']" @click="handleSelect('ktv')">ktv</p>
    <p :class="[tag === '美业' && 'active']" @click="handleSelect('美业')">美业</p>
    <p :class="[tag === '酒店' && 'active']" @click="handleSelect('酒店')">酒店</p>
  </div>
</template>
<script>
export default {
    data(){
    return {
      tag: '全部',
    }
  },
  methods: {
    handleSelect (tag) {
      this.tag = tag
      this.$emit("changeText", this.tag)
    }
  }
}
</script>
<style lang="sass" scoped>
@import '~@/assets/css/mixin.sass'
.active 
  color: $green-color
.container
  background: #fff
  font-size: $small-size
  color: #777 
  position: absolute
  top: 0
  left: 0

  width: 100%
  // z-index: 99
  +border-line(1px,bottom)
  p
    text-align: left
    padding: .2rem .7rem

</style>


