<template>
<nav>
      <ul>
          <li v-if="showHome"><router-link to="/Home" exact>Home</router-link></li>
          <li v-if="showAddRole"><router-link to="/addRole" exact>Add Role</router-link></li>
          <li v-if="showQuiz"><router-link to="/Quiz" exact>Quiz</router-link></li>
          <li v-if="showPolls"><router-link to="/Polls" exact>Polls</router-link></li>
          <li v-if="showNotices"><router-link to="/Notices" exact>Notices</router-link></li>
          <li v-if="showProtocols"><router-link to="/Protocols" exact>Protocols</router-link></li>
          <li v-if="showVideos"><router-link to="/Videos" exact>Videos</router-link></li>
          <li v-if="showEvents"><router-link to="/Events" exact>Events</router-link></li>
          <li v-if="showCsiMembers"><router-link to="/csiMemberExcel" exact>CSI Members</router-link></li>
          <li v-if="showParticipants"><router-link to="/participantsExcel" exact>Participants</router-link></li>
          <li v-if="showIntraColleges"><router-link to="/intraColleges" exact>Intra College Events</router-link></li>
          <li v-if="showUserPoints"><router-link to="/userPoints" exact>User Points</router-link></li>
          <li v-if="showQuizCharts"><router-link to="/QuizChart" exact>Quiz Charts</router-link></li>

          <li style="float:right" v-on:click="signOut"><a href="#">SignOut</a><!--<router-link to="/" >SignOut</router-link>--></li>
      </ul>

</nav>
</template>

<script>
import firebase from 'firebase';

const state = {
  showHome: false,
  showAddRole: false,
  showQuiz: false,
  showPolls: false,
  showNotices:false,
  loaded: false,
  showVideos:false,
  showProtocols:false,
  showEvents:false,
  showCsiMembers:false,
  showParticipants:false,
  showIntraColleges: false,
  showUserPoints: false,
  showQuizCharts: false
}
export default {
  data () {
    return state;

  },
  methods:{
    loadNavbar:function(){
      //console.log("Show home: "+state.showHome);
      var self=this;
      firebase.auth().onAuthStateChanged(function(user) {
      if (user) {

        //console.log(user);
        var uid;
        var userRole;
        var accessList=[];
        //console.log("navbar load ", self.loaded);
        if (user != null && !self.loaded) {

          uid = user.uid;

          self.$http.get("https://djcsi-b13a9.firebaseio.com/userRoles.json").then(function(data){
              //console.log("Test one");
            userRole=data.body[uid];
            self.$http.get("https://djcsi-b13a9.firebaseio.com/accessList/"+userRole+".json").then(function(data1){
              //console.log("Test two");
              //console.log(data1);
              if(data1 && data1.body){
                self.showHome=true;
                for(var i=0;i<data1.body.length ;i++) {
                    if(data1.body[i] === "addRole")
                      self.showAddRole=true;
                    else if(data1.body[i] === "Quiz")
                      self.showQuiz = true;
                    else if(data1.body[i] === "Polls")
                      self.showPolls = true;
                    else if (data1.body[i]=="Notices")
                      self.showNotices=true;
                      else if(data1.body[i]=="Videos")
                        self.showVideos=true;
                      else if(data1.body[i]=="Protocols")
                      self.showProtocols=true;
                      else if(data1.body[i]=="Events")
                      self.showEvents=true;
                      else if(data1.body[i]=="csiMemberExcel")
                      self.showCsiMembers=true;
                      else if(data1.body[i]=="participantsExcel")
                      self.showParticipants=true;
                      else if(data1.body[i]=="intraColleges")
                      self.showIntraColleges = true;
                      else if(data1.body[i]=="userPoints")
                      self.showUserPoints = true;
                      else if(data1.body[i]=="QuizChart")
                      self.showQuizCharts = true;

                }
                self.showSignout=true;
                self.loaded = true;

              }
            });
        });
      }
  } else{

  }
});

    },
    signOut:function(){
      var self=this;
        firebase.auth().signOut().then(function() {
          //console.log("Signout 1",self.loaded);

          self.loaded=false;
          self.showHome=false;
          self.showAddRole=false;
          self.showQuiz=false;
          self.showPolls=false;
          self.showNotices=false;

          self.showVideos=false;
          self.showProtocols=false;
          self.showEvents=false;
          self.showCsiMembers=false;
          self.showParticipants=false;
          self.showSignout=false;
          self.showIntraColleges = false;
          self.showUserPoints = false;
          self.showQuizCharts = false;

          //console.log("Signout 2",self.loaded);
            self.$router.push('/');
            }).catch(function(error) {
                //console.log(error);
            });
    },

  },

  mounted(){
      this.loadNavbar();
  }
}
</script>

<style scoped>
ul
{
list-style-type:none;
text-align:center;
margin:0;
}
li
{
display:inline-block;
margin:0 10px;
}
a{
color: #fff;
text-decoration:none;
padding:6px 8px;
border-radius:10px;
}
nav{
background: #1976d2;
padding:14px 0;
margin-bottom: 40px;
}
header{
    background: lightgreen;
    padding: 10px;
}
h1{
    color: #222;
    text-align: center;
}

.router-link-active{
background: #e1f5fe;
color: #444;
}

</style>
