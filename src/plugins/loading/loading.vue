<template>
  <div class="loading" v-show="show">
    <span></span>  
    <span></span>  
    <span></span>  
    <span></span>  
    <span></span>
  </div>
</template>
<script>
export default {
  data(){
    return {
      show: true
    }
  },
  methods: {
    open() {
      this.show = true
    },
    close() {
      this.show = false
    }
  }
}
</script>
<style scoped>
.loading{            
            height: .6rem;   
            padding: .5rem 0 
        }   
        .loading span{   
            display: inline-block;   
            width: 2px;   
            height: 100%;   
            background: lightgreen;   
            -webkit-animation: load 1s ease infinite;   
        }   
        @-webkit-keyframes load{   
            0%,100%{   
                height: .4rem;   
                background: lightgreen;   
            }   
            50%{   
                height: .6rem;   
                margin: -3px 0;   
                background: lightblue;   
            }   
        }   
        .loading span:nth-child(2){   
            -webkit-animation-delay:0.2s;   
        }   
        .loading span:nth-child(3){   
            -webkit-animation-delay:0.4s;   
        }   
        .loading span:nth-child(4){   
            -webkit-animation-delay:0.6s;   
        }   
        .loading span:nth-child(5){   
            -webkit-animation-delay:0.8s;   
        }   
  
</style>


