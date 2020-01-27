<template>
  <div id="signup-app">
  <navbar></navbar>
<br/>
<u><h2 class="text-xs-center">Add New Role</h2></u>
    <div class="notice-component">

          <!-- Login Form -->
              <form >
               <label class="noticeLabel">Email id</label>
               <div class="noticeText">
               <input type="text" class="fadeIn third loginText" placeholder="abc@gmail.com" required v-model="userEmail" >
               </div>
              <!-- <v-text-field class="noticeText" v-model.lazy="userEmail"
               placeholder="abc@gmail.com"
               :rules="[() => !!userEmail || 'This field is required']"
                required></v-text-field> -->


                <label class="noticeLabel">Password</label>
                <div class="noticeText">
                <input type="password" class="fadeIn third loginText" placeholder="********" v-model="userPassword" required>
                </div>
              <!--  <v-text-field class="noticeText" v-model.lazy="userPassword"
                placeholder="********"
                :rules="[() => !!userPassword || 'This field is required']"
                 required></v-text-field> -->

                  <v-btn v-on:click.prevent="signupUser" id="noticeButton" class="blue lighten-2 mt-5" dark large>Submit </v-btn>
                <div class="alertStyle">
                  <b-alert variant="danger" dismissible fade :show="signupFailure">{{signupStatus}}</b-alert>
                </div>
              </form>

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
  import Navbar from './Navbar.vue';


  library.add(faUser);
  library.add(faUnlock);

export default {

  components:{
    'font-awesome':FontAwesomeIcon,
    'Home':Home,
    'Navbar':Navbar

  },


  beforeCreate(){
     var self=this;
     firebase.auth().onAuthStateChanged(function(user) {
       if(!user){
         self.$router.push('/');

       }
     });

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
            self.$router.push('/accessList')
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


  #poll-block{ margin: 20px auto;
  max-width: 500px;
  }

  #preview{
    padding: 10px 20px;
    border: 1px dotted #ccc;
    margin:auto;
    display: inline-block;
    width: 50%;
  }
  #previewHeading{
    margin-top:10px;
    text-align: left;
  }
  #preview-container{
    text-align: center;
  }
  .preview-para{
    text-align: left;
    margin-top: 10px;
  }
  .noticeText{
  display: block;
  width: 50%;
  padding: 6px;
  margin-left:auto;
  margin-right:auto;
  margin-top:20px;
  }

  .noticeLabel{
    display: block;
    margin: 20px 0 10px;
    text-align: left;
    width: 50%;
    padding: 6px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 20px;

  }
  #noticeButton{
    display: block;
    width: 15%;
    padding: 8px;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 30px;
    margin-top: 30px;
  }
  #noticeHeading{
    display: block;
    width: 25%;
    padding: 8px;
    margin: auto;
    font-size: 18px;
  }

</style>
