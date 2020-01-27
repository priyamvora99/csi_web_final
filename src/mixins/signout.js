import firebase from 'firebase';

export default{
  computed:{
  signoutUser:function(){
    var self=this;
      firebase.auth().signOut().then(function() {
          self.$router.push('/');
          }).catch(function(error) {

          });
      }
  },

}
