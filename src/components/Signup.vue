<template>
  <div id="signup-app">
    <div class="wrapper fadeInDown">
        <div id="formContent">

            <h2 class="inactive underlineHover loginHeading">
              <router-link to="/">LogIn </router-link>
            </h2>
            <h2 class="loginActive loginHeading">SignUp</h2>


              <div class="fadeIn first">
                <img src="../assets/userIcon.png" id="icon" alt="User Icon" />
              </div>

          <!-- Login Form -->
              <form v-on:submit.prevent="signupUser">

                <font-awesome icon="user"></font-awesome>
                <input type="text" id="login" class="fadeIn second loginText" name="login" placeholder="Enter email" required v-model="userEmail" >
                <br>
                <font-awesome icon="unlock"></font-awesome>
                <input type="password" id="password" class="fadeIn third loginText" name="login" placeholder="Enter password" v-model="userPassword" required>
                <input type="submit" class="fadeIn fourth loginButton" value="Register">
                <div class="alertStyle">
                  <b-alert variant="danger" dismissible fade :show="signupFailure">{{signupStatus}}</b-alert>
                </div>
              </form>

          <!-- Remind Passowrd -->
          <!--    <div id="formFooter">
                  <a class="underlineHover" href="#">Forgot Password?</a>
              </div>-->

      </div>
    </div>

  </div>
</template>

<script>
  import firebase from 'firebase';
  import BootstrapVue from 'bootstrap-vue';
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
  import { library } from '@fortawesome/fontawesome-svg-core'
  import { faUser } from '@fortawesome/free-solid-svg-icons'
  import { faUnlock } from '@fortawesome/free-solid-svg-icons'
  import Home from './Home.vue';


  library.add(faUser);
  library.add(faUnlock);

export default {

  components:{
    'font-awesome':FontAwesomeIcon,
    'Home':Home

  },
  data () {
    return {
        userEmail:'',
        userPassword:'',
        signupSuccess:false,
        signupFailure:false,
        signupStatus:''
    }
  },
  methods:{
    signupUser:function(){
      var self=this;
      self.signupFailure=false;
          firebase.auth().createUserWithEmailAndPassword(this.userEmail, this.userPassword).then(function(){
            self.signupSuccess=true;
            self.signupFailure=false;
            self.signupStatus='Signed into the system';
            self.$router.push('/')
          }).catch(function(error) {

          var errorCode = error.code;
          var errorMessage = error.message;
          self.signupSuccess=false;
          self.signupFailure=true;
          self.signupStatus='User already exists.';
        });
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Poppins');
@import './assets/login.css';

</style>
