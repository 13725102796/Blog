<template>
  <div class="ShopCard">
    <div class="m-box">
      <div class="flex">
        <div class="left">
          <img src="./../assets/img/like.jpg">
        </div>
        <div class="right">
          <div class="name clearfix">
            <p class="f-left">华莱士就会发生空间的话费卡科技时代开发士大夫似da</p>
          </div>
          <div class="desc">
            <Star />
          </div>
          <div class="price">
            <div class="f-left">
              <!-- <span class="price-icon"></span> -->
              <span class="price"><strong>19.9</strong>元起</span>
              <!-- <span class="discount">5.9折</span> -->
            </div>
            <div class="f-right">白云绿地中心</div>         
          </div>
        </div>
      </div>
      <div class="footer">
        <p class="left"></p>
        <p class="desc-content">集散地和飞机喀什的发生的空间法兰克上的花费时间的</p>
      </div>
    </div>
  </div>
</template>
<script>
import Star from '@/components/Star.vue'
export default {
  name: 'ShopCard',
  components: {
    Star
  },
  props: {
    shopData: {
      types: Array,
      default() {
        return {
          
        }
      }
    }
  }
}
</script>
<style lang="sass" scoped>
@import '~@/assets/css/mixin.sass'
@mixin green
  color: #06c1ae
@mixin size-color
  color: $desc-color 
  font-size: $desc-size
.footer 
  display: flex
  padding: .25rem .5rem
  .left
    width: 19%
  .desc-content
    color: $desc-color
    font-size: $small-size
    +no-wrap
    &:before
      content: '订'
      display: inline-block
      background: #f5716e
      color: #fff
      font-size: $small-size
      padding: .05rem
      border-radius: .02rem
      line-height: 1
      margin-right: .1rem

.m-box
  background: #fff
  // +border-line(1px,top)
  margin-top: .15rem
  .flex
    +flex 
    padding: .6em .2rem .4em .2rem
    +border-line(1px,bottom)
    .left
      // width: 25%
      // flex: 1
      // margin: 0 .2rem
      width: 1.7rem
      height: 1.7rem  
      img
         width: 100%
         height: 100% 
    .right
      width: 80%
      // flex: 2
      padding-left: .2rem
      .name   
        // margin-top: 4px
        .f-left
          color: $title-color
          font-weight: normal
          width: 100%
          font-size: $title-size
          overflow: hidden
          text-overflow: ellipsis
          white-space: nowrap
          margin-left: -5px
      .desc
      .price
        .f-left
          span
            display: inline-block
          .price-icon
            +green
            font-size: .6em
          .price
            +green
            font-size: .7em
            strong
              font-size: .48rem
              font-weight: 500
              margin-right: 2px
          .discount
            border: 1px solid #F29A43
            font-size: .7em
            color: #F29A43
            padding: 1px 2px
            border-radius: 2px
            // margin-top: -4px
        .f-right
          color: $desc-color
          font-size: $small-size
          vertical-align: bottom

</style>

