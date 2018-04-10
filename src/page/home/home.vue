<template>
  <div class="wrapper Home">
    <Scroll :on-infinite="onInfinite">
    <section class="swiperBox">
      <div class="top-swiper">
        <swiper :options="swiperOption">
          <swiper-slide>
            <div class="slide-item">
              <img src="@/assets/img/swiper.jpg" >
            </div>
          </swiper-slide>
          <swiper-slide>
            <div class="slide-item">
              <img src="@/assets/img/swiper.jpg" >
            </div>
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>   
      </div>
    </section>
    <section class="nav">
      <router-link to="/Store" class="item">
        <img src="@/assets/img/nav1.jpg" width="100%" height="100%" />
        <p>KTV</p>
      </router-link>
      <li class="item">
        <img src="@/assets/img/nav1.jpg" width="100%" height="100%" />
        <p>美食</p>
      </li>
      <li class="item">
        <img src="@/assets/img/nav1.jpg" width="100%" height="100%" />
        <p>美食</p>
      </li>
      <li class="item">
        <img src="@/assets/img/nav1.jpg" width="100%" height="100%" />
        <p>美食</p>
      </li> 
      <li class="item">
        <img src="@/assets/img/nav1.jpg" width="100%" height="100%" />
        <p>美食</p>
      </li> 
    </section>
    <section class="more">
      <p class="m-title">—— 猜你喜欢 ——</p>
      <!-- <GoodCard /> -->
      <!-- <shop-card />
      
      <shop-card />
      <shop-card /> -->
      <div class="like-box">
        
          <!-- <a v-for="(item, index) in ktvStore" :key="index" :href="'http://'+item.store_id+'.dev-ktv.ffun360.com?webarea=ktv'"> -->
            <shop-card 
              v-for="item in like" :key="item.store_id"
              :shopData = "{
                title: item.title,
                address: item.address,
                pic: item.pic
              }"
            />
          <!-- </a> -->
        
      </div>
    </section>
    
    
    
    </Scroll>
    <section class="bottom"></section>
    <Footer :tag="'1'" />
  </div>
</template>
<script>
import Footer from '@/commond/footer.vue'
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import GoodCard from '@/components/GoodCard.vue'
import ShopCard from '@/components/ShopCard.vue'
import { mapState } from 'vuex'
import Scroll from '@/plugins/scroll/infinite.vue'
export default {
  name: 'Home',
  components: {
    Footer,
    swiper,
    swiperSlide,
    GoodCard,
    ShopCard,
    Scroll
  },
  computed: {
    ...mapState([
      'like'
    ])
  },
  data() {
    return {
      swiperOption: {
        loop: true,
				spaceBetween: 20,
				centeredSlides: true,
				autoplay: {
					delay: 3000,
					disableOnInteraction: false
        },
        pagination: {
            el: '.swiper-pagination'
        }
      }
    }
  },
  created() {
    // if (navigator.geolocation){
    //   navigator.geolocation.getCurrentPosition(this.showPosition,this.showError);
    // }
    // else{
    //   console.log('浏览器不支持')
    // }
  },
  methods: {
    showPosition(position) {
      console.log(position.coords)
    },
    showError(error){
      console.log(error)
    },
    onInfinite(done) {
      var data = []
      setTimeout(()=>{  
        data.length === 0 ? done(0) : done()
        this.$toast('已经滑到底了喔！')    
      },1000)
    },
  }, 
  async created(){
    if(this.like.length === 0 ) {
      setTimeout(()=>{  
        this.$store.dispatch('getLike')
      },1000)
    }    
    
  }


  
}
</script>
<style lang="sass" scoped>
@import '~@/assets/css/home.sass'
</style>

<style lang="sass">
.swiper-container-horizontal > .swiper-pagination-bullets
  bottom: 5px
</style>

