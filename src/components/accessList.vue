<template>
  <div id="notice-container">
  <navbar></navbar>
<br/>
<u><h2 class="text-xs-center">Add New Role</h2></u>


              <form >

               <label class="noticeLabel">Enter role name</label>
               <v-text-field class="noticeText" v-on:keypress="isSpace(event)" v-model.lazy="roleName"
               placeholder="Eg :- events"
                required></v-text-field>
<br />
                <h5 class="text-xs-center">Enter your Access List</h5>


    <v-checkbox  label="Add Role" class="noticeText" value="addRole" v-model="roleArray[0]" ></v-checkbox>
    <v-checkbox  label="Quiz" class="noticeText" value="Quiz" v-model="roleArray[1]" ></v-checkbox>
    <v-checkbox  label="Polls" class="noticeText" value="Polls" v-model="roleArray[2]" ></v-checkbox>
    <v-checkbox  label="Notices" class="noticeText" value="Notices" v-model="roleArray[3]" ></v-checkbox>
    <v-checkbox  label="Protocols" class="noticeText" value="Protocols" v-model="roleArray[4]" ></v-checkbox>
    <v-checkbox  label="Videos" class="noticeText" value="Videos" v-model="roleArray[5]" ></v-checkbox>
    <v-checkbox  label="Events" class="noticeText" value="Events" v-model="roleArray[6]" ></v-checkbox>
    <v-checkbox  label="CSI Members Excel" class="noticeText" value="csiMemberExcel" v-model="roleArray[7]" ></v-checkbox>
    <v-checkbox  label="CSI Participants Excel" class="noticeText" value="participantsExcel" v-model="roleArray[8]" ></v-checkbox>
    <v-checkbox  label="Intra College Events" class="noticeText" value="intraColleges" v-model="roleArray[9]" ></v-checkbox>
     <v-checkbox  label="User Points" class="noticeText" value="userPoints" v-model="roleArray[10]" ></v-checkbox>

                <v-btn v-on:click.prevent="post" id="noticeButton" class="blue lighten-2 mt-5" dark large>Submit </v-btn>

              </form>




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
        roleArray:[],
          roleName:"",

}
  },
  methods:{
  post:function(){
  var self = this;
    this.$http.get("https://djcsi-b13a9.firebaseio.com/accessList.json").then(function(data){
      //console.log(data);
      var storeData=firebase.database().ref("accessList");
        storeData.child(this.roleName).set(this.roleArray).then(function(){
          self.roleName='';
          self.roleArray[0]='';
          self.roleArray[1]='';
          self.roleArray[2]='';
          self.roleArray[3]='';
          self.roleArray[4]='';
          self.roleArray[5]='';
          self.roleArray[6]='';
          self.roleArray[7]='';
          self.roleArray[8]='';
          self.roleArray[9]='';
          self.roleArray[10] = '';
          self.$router.push('Home');
        });


    });

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
    this.userID = user.uid;
        //console.log(this.userID);
        return this.userID;
      }
    });


    this.$http.get("https://djcsi-b13a9.firebaseio.com/userRoles.json").then(function(data){
      //console.log(data);
      var newRole = {};
      newRole[this.userID] = this.roleName;


      var storeData=firebase.database().ref("userRoles");
        storeData.update(newRole).then(function(){
          self.roleName='';

        });



    });


alert("submitted");
  },
  isSpace: function(evt){
   evt = (evt) ? evt : window.event;
  if (evt.key === ' ' || evt.key === 'Spacebar') {
     evt.preventDefault()
   }
   else {
     return true;
   }
   }

  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Poppins');
@import './assets/login.css';

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


#poll-block *{
box-sizing: border-box;
 }

#poll-block{ margin: 20px auto;
max-width: 500px;
}

label{
display: block;
margin: 20px 0 10px;
}

input[type="text"] {
display: block;
width: 100%;
padding: 8px;
}

#preview{
padding: 10px 20px;
border: 1px dotted #ccc;
margin:30px 0;
}

h3
{
margin-top:10px;
}

</style>
