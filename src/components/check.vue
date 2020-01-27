
<template>
  <div  id="notice-container">
  <br />

  <br />
  <h2 class="text-xs-center">Expiry node</h2>
  <br />
<h2>Quiz</h2>
  <div  v-for="blog in this.expired" class="single-blog">
   <h3>{{ blog.key }}</h3>
  </div>

  <h2>Poll</h2>
    <div  v-for="blog in this.expired_poll" class="single-blog">
     <h3>{{ blog.key }}</h3>
    </div>



<!--<v-btn v-on:click="clickButton" id="noticeButton" class="blue lighten-2 mt-5" dark large>fire</v-btn>-->




  </div>
</template>

<script>

import firebase from 'firebase';


export default {
  components:{

  },

data(){
      return{
expired:[],
expired_poll:[],

            }
      },
      methods:{


    },


    created()
    {
    var self = this;
    var returnArr = [];

var nowDate = new Date().toISOString().substr(0, 10);
//console.log(nowDate);

    var storeData = firebase.database().ref("quiz");

    storeData.on("value", function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
    var childData = childSnapshot.val();
    var id=childData.id;
  var  expiryDate = childData.expiry_date;
//    //console.log("Expiry date: "+ expiryDate);

    if (nowDate > expiryDate)
    {
    storeData.orderByChild("expiry_date").equalTo(expiryDate).on("child_added", function(snapshot) {
    var item = snapshot.val();
    item.key = snapshot.key;
    returnArr.push(item);
   //console.log("Array: "+returnArr);
    });
    }
});
self.$http.get("https://djcsi-3e43d.firebaseio.com/expiredQuiz.json").then(function(data){
 var pollId;
  var self=this;
  pollId=Math.max(...Object.keys(data.body));
 this.pollId=pollId+1;
  var PushData = firebase.database().ref("expiredQuiz");
    PushData.child(this.pollId).set(this.expired).then(function(){
    //console.log("Data Inserted");
    });
});

});
//console.log("Array: "+returnArr);
this.expired = returnArr;
//console.log("expired node: "+this.expired);





               //Delete

                 storeData.on("value", function(snapshot) {
                 snapshot.forEach(function(childSnapshot) {
                 var childData = childSnapshot.val();
                 var id=childData.id;
                 var  expiryDate = childData.expiry_date;
               //  //console.log("Expiry date: "+ expiryDate);
                 if (nowDate > expiryDate)
                 {
                 storeData.orderByChild("expiry_date").equalTo(expiryDate)
                     .once('value').then(function(snapshot) {
                         snapshot.forEach(function(childSnapshot) {
                         //remove each child
                         storeData.child(childSnapshot.key).remove();
                     });
                 });
                 }
                 else
                 {
               //  //console.log("No");
                 }

                 });
                 });




//polls

var returnArray = [];

var pollData = firebase.database().ref("polls");

pollData.on("value", function(snapshot) {
snapshot.forEach(function(childSnapshot) {
var childData = childSnapshot.val();
var id=childData.id;
var  expiryDate_poll = childData.expiry_date;
//    //console.log("Expiry date: "+ expiryDate);

if (nowDate > expiryDate_poll)
{
pollData.orderByChild("expiry_date").equalTo(expiryDate_poll).on("child_added", function(snapshot) {
var item = snapshot.val();
item.key = snapshot.key;
returnArray.push(item);
//console.log("Array: "+returnArray);
});
}
});
self.$http.get("https://djcsi-3e43d.firebaseio.com/expiredPoll.json").then(function(data){
var pollId;
var self=this;
pollId=Math.max(...Object.keys(data.body));
this.pollId=pollId+1;
var PushData = firebase.database().ref("expiredPoll");
PushData.child(this.pollId).set(this.expired_poll).then(function(){
//console.log("Data Inserted");
});
});

});
//console.log("Array: "+returnArray);
this.expired_poll = returnArray;
//console.log("expired node: "+this.expired_poll);


           //Delete

             pollData.on("value", function(snapshot) {
             snapshot.forEach(function(childSnapshot) {
             var childData = childSnapshot.val();
             var id=childData.id;
             var  expiryDate_poll = childData.expiry_date;
           //  //console.log("Expiry date: "+ expiryDate_poll);
             if (nowDate > expiryDate_poll)
             {
             pollData.orderByChild("expiry_date").equalTo(expiryDate_poll)
                 .once('value').then(function(snapshot) {
                     snapshot.forEach(function(childSnapshot) {
                     //remove each child
                     pollData.child(childSnapshot.key).remove();
                 });
             });
             }
             else
             {
           //  //console.log("No");
             }

             });
             });





},
      }
</script>

<style>
#show-blogs{
max-width:800px;
margin: 0 auto;
}
.single-blog{
padding:20px;
margin:20px 0;
box-sizing: border-box;
background: #eee;

}
input[type="text"], textarea{
display: block;
width: 100%;
padding: 8px;
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
  width: 28%;
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

#poll-block
{ margin: 20px auto;
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
