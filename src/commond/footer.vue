<template lang="html">
  <div id="container">
    <router-link class="bar" to="Home" :class="[tag == 1 && 'active' ]">
      <i class="icon icon1"></i>
      <p>首页</p>
    </router-link>
    <!-- <router-link class="bar" to="/" :class="[tag == 2 && 'active' ]">
      <i class="icon icon2"></i>
      <p>附近</p>
    </router-link>
    <router-link class="bar" to="/" :class="[tag == 3 && 'active' ]">
      <i class="icon icon3"></i>
      <p>发现</p>
    </router-link> -->
    <router-link class="bar" to="/Order" :class="[tag == 4 && 'active' ]">
      <i class="icon icon4"></i>
      <p>订单</p>
    </router-link>
    <router-link class="bar" to="/My" :class="[tag == 5 && 'active' ]">
      <i class="icon icon5"></i>
      <p>我的</p>
    </router-link>
  </div>
</template>
<script>

export default {
  name: 'Footer',
  props: {
    tag: {
      types: Number,
      default: 1
    }
  },
  mounted (){

  },
  methods: {
    
  }
  
}
</script>

<style lang="sass" scoped>
  @import '~@/assets/css/mixin.sass'
  @mixin icon 
    margin: 0 auto
    text-align: center
    display: block
    width: .6rem
    height: .6rem
    background-size: 100%
  @mixin bg-size 
    background-size: 100%
    //高亮字体颜色
  @mixin color  
    color: red
  #container
    padding: 5px 0
    position: fixed
    left: 0
    right: 0
    bottom: 0
    display: flex
    flex-wrap: wrap  
    font-size: .6em
    color: #666
    border-top: 1px solid $border-color  
    background: #fff
    .active
      color: red
    .bar
      flex: 1
      .icon1
        background: url('./../assets/img/nav.jpg') no-repeat
        
      .icon2
        background: url('./../assets/img/nav.jpg') no-repeat
       
      .icon3
        background: url('./../assets/img/nav.jpg') no-repeat
        
      .icon4
        background: url('./../assets/img/nav.jpg') no-repeat
        
      .icon5
        background: url('./../assets/img/nav.jpg') no-repeat
        
      .icon
        +icon 
      &.active .icon1
        background: url('./../assets/img/nav1.jpg') no-repeat
        +bg-size
      &.active .icon2
        background: url('./../assets/img/nav1.jpg') no-repeat
        +bg-size
      &.active .icon3
        background: url('./../assets/img/nav1.jpg') no-repeat
        +bg-size
      &.active .icon4
        background: url('./../assets/img/nav1.jpg') no-repeat
        +bg-size
      &.active .icon5
        background: url('./../assets/img/nav1.jpg') no-repeat
        +bg-size
        

</style>