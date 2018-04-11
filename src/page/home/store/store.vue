<template>
  <div class="wrapper Store">
    <Header />
    <div class="top">
      <div class="list-nav">
        <p class="item" :class="[tag === 'Classify' ? 'active' : 'icon']" @click="handleNav('Classify')">{{classify}}</p>
        <span class="line"></span>
        <p class="item" :class="[tag === 'Near' ? 'active' : 'icon']" @click="handleNav('Near')">{{near}}</p>
        <span class="line"></span>
        <p class="item" :class="[tag === 'Sort' ? 'active' : 'icon']" @click="handleNav('Sort')">{{sort}}</p>
        <span class="line"></span>
        <p class="item" :class="[tag === 'Select' ? 'active' : 'icon']" @click="handleNav('Select')">{{select}}</p>
      </div>
      <div class="nav-contain">
        <transition name="router-fade">
          <keep-alive>
            <router-view @changeText="changeText" ></router-view>
          </keep-alive>
        </transition>
      </div>
      <div id="loading"></div>
    </div>
    <!-- <div id="loading"></div> -->
    <div class="card-box">
      <Scroll :on-refresh="onRefresh" :on-infinite="onInfinite" >
        <!-- <a v-for="(item, index) in ktvStore" :key="index" :href="'http://'+item.store_id+'.dev-ktv.ffun360.com?webarea=ktv'"> -->
          <shop-card 
            v-for="item in ktvStore" :key="item.store_id"
            :shopData = "{
              title: item.store_announcement,
              address: item.detail_address,
              pic: item.store_logo_url
            }"
          />
        <!-- </a> -->
      </Scroll>
    </div>
    <div class="mask" v-if="tag !== 'Store'" @click="back"></div>
    <div class="nomore" :class="[noMore ? 'leave' : 'entry']"><p> 没有数据了噢！</p></div>
  </div>
</template>
<script>
import Header from '@/commond/header.vue'
import ShopCard from '@/components/ShopCard.vue'
import { mapState } from 'vuex'
import Scroll from '@/plugins/scroll/scroll.vue'
export default {
  name: 'Store',
  components: {
    Header,
    ShopCard,
    Scroll
  },
  data(){
    return {
      tag: 'Store',
      classify: '全部',
      near: '附近',
      sort: '智能排序',
      select: '筛选',
      // scroll 需要的参数
      counter : 1, //默认已经显示出15条数据 count等于一是让从16条开始加载
      // num : 15,  // 一次显示多少条
      // pageStart : 0, // 开始页数
      // pageEnd : 0, // 结束页数
      listdata: [], // 下拉更新数据存放数组
      downdata: [],  // 上拉更多的数据存放数组
      noMore: false,
      dispatch: 'getKtvStore',
    }
  },
  computed: {
    ...mapState([
      'ktvStore'
    ])
  },
  methods: {
    handleNav(tag) { 
      this.tag = this.tag === tag ? 'Store' : tag
      this.$router.push({name: this.tag})
    },
    changeText(type,text) {
      console.log(type +',' + text)
      this[type] = text
      //根据type.text 去对应请求,他们的数据。通过vuex去管理替换和保存
      //保存分发的方法
      this.dispatch = type + text
      console.log(this.dispatch)

      this.back()
    },
    back(){
      this.tag = 'Store'
      this.$router.push({name: this.tag})
    },
    onRefresh(done) {
      //接受一个done的回调函数 ，请求完数据后，就调用
      
      setTimeout(()=>{
        done()
      },3000)
       // call done  
    },
    onInfinite(done) {
      this.getData('getKtvStore', done)
    },
    getData(method,done) {
      // this.$store.dispatch(method)
      setTimeout(()=>{
        if(true) {
          done(0)
          this.$toast('已经滑到底了喔！') 
        } else {
          done()
        }
      },1000)
    }
  },
  mounted(){
    this.$loading()
    const self = this
    setTimeout(async ()=>{
      console.log(this)
      await this.$store.dispatch('getKtvStore')
      //这个要更据获取数据的返回值判断
      if(self.ktvStore.length === 0) {
        self.noMore = true
      }
      self.$loading(false)
    },2000)
  },
}
</script>
<style lang="sass" scoped>
@import '~@/assets/css/mixin'
.active
  color: $green-color
  &:after
    border-top: 0!important
    border-bottom: .15rem solid $green-color
    margin-bottom: .04rem
.list-nav 
  display: flex
  background: #fff
  padding: .25rem 0
  color: #777
  .item
    flex: 1 
    font-size: $small-size
    &:after
      content: ""
      width: 0
      height: 0
      display: inline-block
      border-left: .09rem solid transparent
      border-right: .09rem solid transparent
      border-top: .15rem solid #B7B7B7
      margin-left: .12rem    
  .line 
    // color: #999
    display: inline-block
    width: 1px
    border-right: 1px solid #f0efed

.nav-contain 
  background: #fff
  +border-line(1px,top)
  position: relative
.top 
  position: relative
  z-index: 99
.mask 
  +mask 
.nomore 
  font-size: $small-size
  padding: .3rem 0
  color: #888
  display: none
.leave 
  display: block
  -webkit-animation: leave 2s ease
  animation-fill-mode: forwards
@keyframes entry 
  from 
    opacity: 0
    transform: translateX(-20%)
  to 
    opacity: 1
    transform: translateX(0)
@keyframes leave
  0%,100% 
    opacity: 0
    transform: translateY(-20%)
  30%,70%
    opacity: 1
    transform: translateX(0)
.router-fade-enter-active, .router-fade-leave-active 
  transition: all .5s ease


.router-fade-enter, .router-fade-leave-to
  opacity: 0


</style>


