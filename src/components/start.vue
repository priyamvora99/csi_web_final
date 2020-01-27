<template>


<div id="app">
  <v-app light>
   <v-toolbar class="black">
    <img src="http://djcsi.co.in/images/logo.png" alt="Vuetify.js" height="40">

   </v-toolbar>
   <v-content>
     <section>
       <v-parallax src="https://www.htmlcsscolor.com/preview/gallery/00FFFF.png" height="600">
         <v-layout
           column
           align-center
           justify-center
           class="white--text"
         >
           <img src="http://djcsi.co.in/images/cube1.png" alt="Vuetify.js" height="200">
           <br />
          <h1 class="black--text mb-2 display-1 text-xs-center">Welcome to DJCSI's Web-Portal</h1>
        <!--   <div class="subheading mb-3 black--text text-xs-center">DJCSI represents Computer Society of India at the college level and it is affiliated with Dwarkadas J. Sanghvi College of Engineering.
</div>-->
          <br />
          <br />
          <br /><v-btn
             class="blue lighten-2 mt-5"
             dark
             large
             href="/Login"
           >
             Login to Get Started
           </v-btn>
         </v-layout>
       </v-parallax>
     </section>

     <section>
       <v-layout
         column
         wrap
         class="my-5"
         align-center
       >         <v-flex xs12>
           <v-container grid-list-xl>
             <v-layout row wrap align-center>
               <v-flex xs12 md4>
                 <v-card class="elevation-0 transparent">
                   <v-card-text class="text-xs-center">
                     <v-icon x-large class="blue--text text--lighten-2">color_lens</v-icon>
                   </v-card-text>
                   <v-card-title primary-title class="layout justify-center">
                     <div class="headline text-xs-center">Capitalize</div>
                   </v-card-title>
                   <v-card-text>
              CSI attempts to capitalize on the abundant talent
               and ideas and give others a platform to showcase their perceptions.     </v-card-text>
                 </v-card>
               </v-flex>
               <v-flex xs12 md4>
                 <v-card class="elevation-0 transparent">
                   <v-card-text class="text-xs-center">
                     <v-icon x-large class="blue--text text--lighten-2">flash_on</v-icon>
                   </v-card-text>
                   <v-card-title primary-title class="layout justify-center">
                     <div class="headline">Stimulate</div>
                   </v-card-title>
                   <v-card-text>
                    CSI aspires to stimulate,
                    spark new ideas and ignite the concept of innovation amongst today's generation.
                   </v-card-text>
                 </v-card>
               </v-flex>
               <v-flex xs12 md4>
                 <v-card class="elevation-0 transparent">
                   <v-card-text class="text-xs-center">
                     <v-icon x-large class="blue--text text--lighten-2">build</v-icon>
                   </v-card-text>
                   <v-card-title primary-title class="layout justify-center">
                     <div class="headline text-xs-center">Inspire</div>
                   </v-card-title>
                   <v-card-text>
CSI aims to inspire, act and engage and truly believes in the precept ,
 "To be inspired is great, to inspire is incredible
                   </v-card-text>
                 </v-card>
               </v-flex>
             </v-layout>
           </v-container>
         </v-flex>
       </v-layout>
     </section>

  <!--   <section>
       <v-parallax src="assets/section.jpg" height="380">
         <v-layout column align-center justify-center>
           <div class="headline black--text mb-3 text-xs-center">Web development has never been easier</div>
           <em>Kick-start your application today</em>
           <v-btn
             class="blue lighten-2 mt-5"
             dark
             large
             href="/pre-made-themes"
           >
             Get Started
           </v-btn>
         </v-layout>
       </v-parallax>
     </section>
-->
     <section>
       <v-container grid-list-xl>
         <v-layout row wrap justify-center class="my-5">
           <v-flex xs12 sm4>
             <v-card class="elevation-0 transparent">
               <v-card-title primary-title class="layout justify-center">
                 <div class="headline"> DJ CSI</div>
               </v-card-title>
               <v-card-text>
DJCSI represents Computer Society of India at the college level and it is affiliated with Dwarkadas J. Sanghvi College of Engineering.
               </v-card-text>
             </v-card>
           </v-flex>
           <v-flex xs12 sm4 offset-sm1>
             <v-card class="elevation-0 transparent">
               <v-card-title primary-title class="layout justify-center">
                 <div class="headline">Contact us</div>
               </v-card-title>

               <v-list class="transparent">
              <!--    <v-list-tile>
                   <v-list-tile-action>
                    <v-icon class="blue--text text--lighten-2">phone</v-icon>
                   </v-list-tile-action>
                   <v-list-tile-content>
                     <v-list-tile-title>777-867-5309</v-list-tile-title>
                   </v-list-tile-content>
                 </v-list-tile> -->
                 <v-list-tile>
                   <v-list-tile-action>
                     <v-icon class="blue--text text--lighten-2">place</v-icon>
                   </v-list-tile-action>
                   <v-list-tile-content>
                     <v-list-tile-title>DJSCE Vileparle, Mumbai</v-list-tile-title>
                   </v-list-tile-content>
                 </v-list-tile>
                 <v-list-tile>
                   <v-list-tile-action>
                     <v-icon class="blue--text text--lighten-2">email</v-icon>
                   </v-list-tile-action>
                   <v-list-tile-content>
                     <v-list-tile-title>djcsi1920@gmail.com</v-list-tile-title>
                   </v-list-tile-content>
                 </v-list-tile>
               </v-list>
             </v-card>
           </v-flex>
         </v-layout>
       </v-container>
     </section>


     <section>
       <v-layout
         column
         wrap
         class="my-5"
         align-center
       >
      <v-flex xs12 sm4 class="my-3">
         <div class="text-xs-center">
         <h2 class="headline">Get our App </h2>
         <span class="subheading">
         <br >
         <a href="https://play.google.com/store/apps/details?id=com.djcsi.csiapp&hl=en"><img src="https://cdn-images-1.medium.com/max/1600/1*OIIv4FEjJQMqh-zEPhtlYA.png" alt="Vuetify.js" height="100">
         </a> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
         <a href="https://itunes.apple.com/us/app/djcsi/id1330145865?mt=8"><img src="https://upload.wikimedia.org/wikipedia/commons/5/5d/Available_on_the_App_Store_%28black%29.png" alt="Vuetify.js" height="100">
          </a>
           </span>
         </div>
       </v-flex>
</v-layout>
</section>

     <v-footer class="blue darken-2">
       <v-layout row wrap align-center>
         <v-flex xs12>
           <div class="white--text ml-3">
             designed with
             <v-icon class="red--text">favorite</v-icon>
             by <a class="white--text" href="http://djcsi.co.in/" target="_blank">DJCSI's Technical Team</a>
           </div>
         </v-flex>
       </v-layout>
     </v-footer>
   </v-content>
 </v-app>
</div>


</template>

<script>



import firebase from 'firebase';


export default {
  components:{

  },

data(){
      return{
// expired:[],
// expired_poll:[],
color:'#00FFFF',
title: 'Your Logo'
            }
      },
      methods:{


    },


//     created()
//     {
//     var self = this;
//     var returnArr = [];

// var nowDate = new Date().toISOString().substr(0, 10);
// //console.log(nowDate);

//     var storeData = firebase.database().ref("quiz");

//     storeData.on("value", function(snapshot) {
//     snapshot.forEach(function(childSnapshot) {
//     var childData = childSnapshot.val();
//     var id=childData.id;
//   var  expiryDate = childData.expiry_date;
// //    //console.log("Expiry date: "+ expiryDate);

//     if (nowDate > expiryDate)
//     {
//     storeData.orderByChild("expiry_date").equalTo(expiryDate).on("child_added", function(snapshot) {
//     var item = snapshot.val();
//     item.key = snapshot.key;
//     returnArr.push(item);
//    //console.log("Array: "+returnArr);
//     });
//     }
// });
// self.$http.get("https://djcsi-3e43d.firebaseio.com/expiredQuiz.json").then(function(data){
//  var pollId;
//   var self=this;
//   pollId=Math.max(...Object.keys(data.body));
//  this.pollId=pollId+1;
//   var PushData = firebase.database().ref("expiredQuiz");
//     PushData.child(this.pollId).set(this.expired).then(function(){
//     //console.log("Data Inserted");
//     });
// });

// });
// //console.log("Array: "+returnArr);
// this.expired = returnArr;
// //console.log("expired node: "+this.expired);





//                //Delete

//                  storeData.on("value", function(snapshot) {
//                  snapshot.forEach(function(childSnapshot) {
//                  var childData = childSnapshot.val();
//                  var id=childData.id;
//                  var  expiryDate = childData.expiry_date;
//                //  //console.log("Expiry date: "+ expiryDate);
//                  if (nowDate > expiryDate)
//                  {
//                  storeData.orderByChild("expiry_date").equalTo(expiryDate)
//                      .once('value').then(function(snapshot) {
//                          snapshot.forEach(function(childSnapshot) {
//                          //remove each child
//                          storeData.child(childSnapshot.key).remove();
//                      });
//                  });
//                  }
//                  else
//                  {
//                //  //console.log("No");
//                  }

//                  });
//                  });




// //polls

// var returnArray = [];

// var pollData = firebase.database().ref("polls");

// pollData.on("value", function(snapshot) {
// snapshot.forEach(function(childSnapshot) {
// var childData = childSnapshot.val();
// var id=childData.id;
// var  expiryDate_poll = childData.expiry_date;
// //    //console.log("Expiry date: "+ expiryDate);

// if (nowDate > expiryDate_poll)
// {
// pollData.orderByChild("expiry_date").equalTo(expiryDate_poll).on("child_added", function(snapshot) {
// var item = snapshot.val();
// item.key = snapshot.key;
// returnArray.push(item);
// //console.log("Array: "+returnArray);
// });
// }
// });
// self.$http.get("https://djcsi-3e43d.firebaseio.com/expiredPoll.json").then(function(data){
// var pollId;
// var self=this;
// pollId=Math.max(...Object.keys(data.body));
// this.pollId=pollId+1;
// var PushData = firebase.database().ref("expiredPoll");
// PushData.child(this.pollId).set(this.expired_poll).then(function(){
// //console.log("Data Inserted");
// });
// });

// });
// //console.log("Array: "+returnArray);
// this.expired_poll = returnArray;
// //console.log("expired node: "+this.expired_poll);


//            //Delete

//              pollData.on("value", function(snapshot) {
//              snapshot.forEach(function(childSnapshot) {
//              var childData = childSnapshot.val();
//              var id=childData.id;
//              var  expiryDate_poll = childData.expiry_date;
//            //  //console.log("Expiry date: "+ expiryDate_poll);
//              if (nowDate > expiryDate_poll)
//              {
//              pollData.orderByChild("expiry_date").equalTo(expiryDate_poll)
//                  .once('value').then(function(snapshot) {
//                      snapshot.forEach(function(childSnapshot) {
//                      //remove each child
//                      pollData.child(childSnapshot.key).remove();
//                  });
//              });
//              }
//              else
//              {
//            //  //console.log("No");
//              }

//              });
//              });





// },
      }


</script>

<style>



#home-block{
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
