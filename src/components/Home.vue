<template>
<div id="app">
  <Navbar></Navbar>
  <br >
  <br>
<section>
<v-layout
  column
  align-center
  justify-center
  class="white--text"
>
  <img src="http://www.rsmhawaii.com/wp-content/uploads/2016/02/techguy-avatar.png" alt="Vuetify.js" height="200">
</v-layout>
</section>

<br><br>
<!-- <h1 class="text-xs-center">Welcome to the DJCSI Web Portal</h1> -->
<h1 class="text-xs-center">Welcome to the DJCSI web Portal: {{this.userName}}</h1>
  </div>
</template>

<script>
import Navbar from './Navbar.vue';
import signOut from '../mixins/signout';
import firebase from 'firebase';
export default {

  components:{
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


  data(){
  return{
userID:"",
userName:"",
}
  },
  mixins:[signOut],

created() {
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
this.userID = user.uid;
this.userName = user.email;
    //console.log(this.userID);
    //console.log(this.userName);
    return this.userID;
  }
});


admin.auth().getUser(user.uid)
  .then(function(userRecord) {
    //console.log(userRecord.toJSON());
  });


}


}
</script>

<style scoped>

</style>
