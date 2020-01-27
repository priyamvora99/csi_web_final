<template>
  <div id="app">
    <router-view></router-view>

  </div>
</template>

<script>
import Login from './components/Login.vue';
import Signup from './components/Signup.vue';


export default {
  components:{
    'loginComponent':Login,
    'signupComponent':Signup,
  },

  data () {
    return {

    }
  }
}
</script>

<style>

</style>
