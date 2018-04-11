<template>
  <div class="container" v-show="show">
    <div class="position">
      <p :class="[!show && 'leave']">{{msg}}</p>
    </div>   
  </div>
</template>
<script>
export default {
  data(){
    return {
      show: true,
      msg: ''
    }
  },
  methods: {
    delayed(msg,ms){
      
      this.msg = msg 
      setTimeout(()=>{
        this.show = false
      },ms)
    }
  },
  // mounted(){
  //   setTimeout(()=>{
  //     this.show = false
  //   }, 2500)
  // }
}
</script>
<style lang="sass" scoped>
@import '~@/assets/css/mixin.sass'
.container
  +mask(rgba(0,0,0,.3),9999)
  .position
    position: fixed
    left: 50%
    top: 50%
    transform: translate3d(-50%,-50%,0)
    font-size: $desc-size
    color: $desc-color
    p   
      padding: .5rem 1rem
      background: #fff
      transform-style: preserve-3d
      -webkit-animation: entry 1s ease
    .leave
      -webkit-animation: leave .5s ease
@keyframes entry 
  from 
    opacity: 0
    transform: rotateY(70deg)
  to 
    opacity: 1
    transform: rotateY(0deg)
@keyframes leave
  to 
    opacity: 0
    transform: rotateY(-70deg)
</style>


