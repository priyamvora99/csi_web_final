<template>
  <div id="login-app">
    <div class="wrapper fadeInDown">
        <div id="formContent">

            <h2 class="loginActive loginHeading"> LogIn </h2>



              <div class="fadeIn first">
                <img src="../assets/userIcon.png" id="icon" alt="User Icon" />
              </div>

          <!-- Login Form -->
              <form v-on:submit.prevent="loginUser">
                <font-awesome icon="user"></font-awesome>
                <input type="text" id="login" class="fadeIn second loginText" name="login" placeholder="Enter email" required v-model="userEmail" >
                <br>
                <font-awesome icon="unlock"></font-awesome>
                <input type="password" id="password" class="fadeIn third loginText" name="login" placeholder="Enter password" v-model="userPassword" required>

                <input type="submit" class="fadeIn fourth loginButton" value="Log In">
                <div class="alertStyle">

                  <b-alert variant="danger" dismissible fade :show="loginFailure">{{loginStatus}}</b-alert>
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
      loginSuccess:false,
      loginFailure:false,
      loginStatus:''
    }
  },
  methods:{
    loginUser:function(){

          var self = this;
          self.loginFailure=false;
          firebase.auth().signInWithEmailAndPassword(this.userEmail, this.userPassword).then(function(){
            //console.log(self.userEmail);
            self.loginSuccess=true;
            self.loginFailure=false;
            self.loginStatus='Logged in successfully';
            self.$router.push('Home');


          }).catch(function(error) {
            //console.log(error);
          var errorCode = error.code;
          var errorMessage = error.message;
          self.loginSuccess=false;
          self.loginFailure=true;
          self.loginStatus='Invalid username or password';

        });
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Poppins');
@import './assets/login.css';


</style>
