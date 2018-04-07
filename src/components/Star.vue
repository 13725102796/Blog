<template>
  <div class="container">
    <div class="level">
      <span class="stars">
        <i class="text-icon icon-star"></i>
        <i class="text-icon icon-star"></i>
        <i class="text-icon icon-star"></i>
        <i class="text-icon icon-star"></i>
        <i class="text-icon icon-star-gray">
          <i class="text-icon icon-star-half"></i>
        </i>
        <em class="star-text">4.5</em>
      </span>
      <span class="level-score">分</span>
    </div>
  </div>
</template>
<style lang="sass" scoped>
  .level
    color: #fa952f
    display: block
    // margin: .1rem auto .14rem .1rem
    text-align: left
    .stars 
      display: inline-block
      color: #f90
      i
        font-size: $title-size
        vertical-align: 0rem
        display: inline-block
      .text-icon
        font-family: base_icon
        display: inline-block
        vertical-align: top
        font-style: normal
      .text-icon.icon-star:after
        content: '★'         
      .text-icon.icon-star-gray
        position: relative
        &:after
          color: #E2E2E2
          content: '★'
        .icon-star-half
          position: absolute
          left: 0
          width: .23rem
          overflow: hidden
          &:after
            content: '★'

      em
        font-style: normal
        margin-left: .08rem
        vertical-align: -0rem
        font-size: $small-size
    .level-score
      margin-left: -.05rem
      vertical-align: -0px
      font-size: $small-size
      
        
</style>

