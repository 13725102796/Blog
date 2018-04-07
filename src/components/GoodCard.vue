<template>
  <div class="GoodCard">
    <div class="m-box">
      <div class="flex">
        <div class="left">
          <img src="./../assets/img/like.jpg">
        </div>
        <div class="right">
          <div class="name clearfix">
            <p class="f-left">华莱士</p>
            <p class="f-right"> <500m </p>
          </div>
          <div class="desc">
            <p>这是商品描述福建省电话费就是看到就废了时代峻峰破案时代峻峰is降低皮肤就爱上当会计法四大家佛哦啊四季度房价搜到积分</p>
          </div>
          <div class="price">
            <div class="f-left">
              <!-- <span class="price-icon"></span> -->
              <span class="price">￥<strong>19.9</strong></span>
              <span class="discount">5.9折</span>
            </div>
            <div class="f-right">
              已售61223
            </div>         
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'GoodCard',
}
</script>
<style lang="sass" scoped>
@import '~@/assets/css/mixin.sass'
@mixin green
  color: #06c1ae
@mixin size-color
  color: $desc-color 
  font-size: $desc-size
.m-box
  +border-line(1px,top)
  .flex
    +flex 
    padding: .6em 0 
    .left
      width: 25%
      img
        width: 2.1rem
        height: 2.2rem    
    .right
      width: 75%
      padding: 0 4px
      .name   
        margin-top: 4px
        .f-left
          color: #111
          font-weight: 550
          font-size: $title-size
        .f-right
          +size-color
          padding-top: 2px
          font-size: .8em
      .desc
        +size-color
        text-align: left
        padding: .17rem 0
        p 
          display: -webkit-box
          -webkit-box-orient: vertical
          -webkit-line-clamp: 2
          overflow: hidden
      .price
        .f-left
          span
            display: inline-block
          .price-icon
            +green
            font-size: .6em
          .price
            +green
            font-size: .8em
            strong
              font-size: .62rem
              font-weight: 500
          .discount
            border: 1px solid #F29A43
            font-size: .7em
            color: #F29A43
            padding: 1px 2px
            border-radius: 2px
            // margin-top: -4px
        .f-right
          +size-color
          margin-top: 2px
</style>
