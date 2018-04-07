<template>
  <div class="wrapper Order">
    <div class="nav">
      <div class="list">
        <span class="item" :class="[tag === 1 && 'active']"  @click="handleNav(1)">全部</span>
        <span class="item" :class="[tag === 2 && 'active']"  @click="handleNav(2)">待付款</span>
        <span class="item" :class="[tag === 3 && 'active']"  @click="handleNav(3)">待使用</span>
        <span class="item" :class="[tag === 4 && 'active']"  @click="handleNav(4)">待评价</span>
        <span class="item" :class="[tag === 5 && 'active']"  @click="handleNav(5)">退款/售后</span>
        <span class="item" :class="[tag === 6 && 'active']"  @click="handleNav(6)">退款/售后</span>
        <span class="item" :class="[tag === 7 && 'active']"  @click="handleNav(7)">退款/售后</span>    
        <div class="line" :style="{left: (tag-1)*20 + '%'}"></div>
      </div>
      
    </div>
    <order-card />
    <order-card />
    <div class="botton"></div>
    <Footer :tag="'4'" />
  </div>
</template>
<script>
import Footer from '@/commond/footer.vue'
// import BScroll from 'better-scroll'
import OrderCard from '@/components/OrderCard.vue'
export default {
  components: {
    Footer,
    OrderCard
  },
  data(){
    return {
      tag: 1,
      // BScrollOption: {
			// 	scrollY: false,
			// 	scrollX: true,
			// 	click: true
			// },
    }
   
  },
  methods: {
    handleNav(tag) {
      this.tag = tag
    }
  },
  created() {
    // const scroll = new BScroll('.list')
  }
  
}
</script>
<style lang="sass" scoped>
.active
  color: $green-color

.nav 
  overflow: hidden
  margin-bottom: .4rem
  height: 44px
  .list  
    font-size: $desc-size 
    color: #111 
    background: #fff    
    overflow-y: hidden
    overflow-x: auto
    height: 55px
    position: relative
    display: flex
    width: 100%
    .item
      flex: 0 0 20%    
      line-height: 44px
      box-sizing: border-box
.line 
  display: block
  height: 2px
  width: 16%
  border-radius: 8px
  background-color: $green-color
  position: absolute
  bottom: 11px
  margin: 0 2%
  // z-index: 9999
  transition: left .3s ease-in
</style>

