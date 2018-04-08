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
    </div>
    <div id="loading"></div>
    <shop-card 
      v-for="(item, index) in ktvStore" :key="index"
      :shopData = "{
        title: item.store_announcement,
        address: item.detail_address,
        pic: item.store_logo_url
      }"
    />
    <!-- <shop-card /> -->
    <div class="mask" v-if="tag !== 'Store'" @click="back"></div>
  </div>
</template>
<script>
import Header from '@/commond/header.vue'
import ShopCard from '@/components/ShopCard.vue'
import { mapState } from 'vuex'
export default {
  name: 'Store',
  components: {
    Header,
    ShopCard
  },
  data(){
    return {
      tag: 'Store',
      classify: '全部',
      near: '附近',
      sort: '智能排序',
      select: '筛选'
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
      this.back()
    },
    back(){
      this.tag = 'Store'
      this.$router.push({name: this.tag})
    }
  },
  beforeCreate(){
    
  },
  created(){
       
  },
  async mounted(){
    this.$loading()
   await this.$store.dispatch('getKtvStore')
    // console.log(this.ktvStore)
  }
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
.router-fade-enter-active, .router-fade-leave-active 
  transition: all .8s ease


.router-fade-enter, .router-fade-leave-to
  opacity: 0


</style>


