<template>

<div id="notice-container">
<navbar></navbar>
<br />
<v-form v-if="!submitted">
<u><h2 class="text-xs-center">Add Events</h2></u>

<label class="noticeLabel">Event Name</label>
<v-text-field class="noticeText" placeholder="Enter event name" v-model.lazy="events.name"
:rules="[() => !!events.name || 'This field is required']"
 required></v-text-field>

 <label class="noticeLabel">Event ID</label>
 <v-text-field class="noticeText" placeholder="Enter event id" v-model.lazy="events.id"
 :rules="[() => !!events.id || 'This field is required']"
  required></v-text-field>

  <label class="noticeLabel">Event Type</label>
  <v-text-field class="noticeText" placeholder="Enter event type" v-model.lazy="events.type"
  :rules="[() => !!events.type || 'This field is required']"
   required></v-text-field>

   <label class="noticeLabel">Event Description</label>
   <v-text-field class="noticeText" placeholder="Enter event description" v-model="events.description" :rules="[() => !!events.description || 'This field is required']"  />


<!--  <v-textarea  solo v-model.lazy="events.description"></v-textarea> -->


  <label class="noticeLabel">Event Price</label>
  <v-text-field class="noticeText" placeholder="Enter event price" v-model="events.currency" :rules="[() => !!events.currency || 'This field is required']" v-on:keypress="isNumber(event)" />

    <label class="noticeLabel">Discount Eligibilty for Event</label>
    <v-text-field class="noticeText" placeholder="Enter discount eligibility" v-model="events.dicountEligibility" :rules="[() => !!events.dicountEligibility || 'This field is required']" v-on:keypress="isNumber(event)" />

  <label class="noticeLabel">Discount Rate for Event</label>
  <v-text-field class="noticeText" placeholder="Enter dicount rate" v-model="events.dicountRate" :rules="[() => !!events.dicountRate || 'This field is required']" v-on:keypress="isNumber(event)" />

  <label class="noticeLabel">Price Without Discount for Event</label>
  <v-text-field class="noticeText" placeholder="Enter price Without discount" v-model="events.priceWithoutDiscount" :rules="[() => !!events.priceWithoutDiscount || 'This field is required']" v-on:keypress="isNumber(event)" />

    <label class="noticeLabel">Maximum Participants for Event</label>
    <v-text-field class="noticeText"  placeholder="Enter no maximum participants" v-model="events.maximumparticipants" :rules="[() => !!events.maximumparticipants || 'This field is required']" v-on:keypress="isNumber(event)" />

      <label class="noticeLabel">Minimum Participants for Event</label>
      <v-text-field  class="noticeText" placeholder="Enter no minimum participants" v-model="events.minimumparticipants" :rules="[() => !!events.minimumparticipants || 'This field is required']" v-on:keypress="isNumber(event)" />

      <label class="noticeLabel">Thumbnail for Event</label>
      <v-text-field class="noticeText" placeholder="Enter thumbnail" v-model.lazy="events.thumb"  :rules="[() => !!events.thumb || 'This field is required']" required></v-text-field>


<label class="noticeLabel">Event Registration Date From</label>
<v-layout row wrap>
<v-flex>
  <v-dialog
    ref="dialog"
    v-model="modal_start"
    :return-value.sync="date"
    :close-on-content-click="false"
    persistent
    lazy
    full-width
    width="290px"
  >
    <v-text-field
      slot="activator"
      class="noticeText"
      placeholder="Enter registration start date"
      v-model="events.registrationFrom"
      prepend-icon="event"
      readonly
    ></v-text-field>
    <v-date-picker v-model="events.registrationFrom" @input="modal_start = false" scrollable>
      <v-spacer></v-spacer>
    </v-date-picker>
  </v-dialog>
</v-flex>
</v-layout>

<label class="noticeLabel">Event Registration Date Till</label>
<v-layout row wrap>
<v-flex>
      <v-dialog
        ref="dialog"
        v-model="modal_expire"
        :return-value.sync="date"
        :close-on-content-click="false"
        persistent
        lazy
        full-width
        width="290px"
      >
        <v-text-field
          slot="activator"
          class="noticeText"
          placeholder="Enter registration expiry date"
          v-model="events.registrationTill"
          prepend-icon="event"
          readonly
        ></v-text-field>
        <v-date-picker v-model="events.registrationTill" @input="modal_expire = false" scrollable>
        <v-spacer></v-spacer>
      </v-date-picker>
    </v-dialog>
  </v-flex>
</v-layout>



<br />
<br />

<v-btn v-on:click.prevent="post" id="noticeButton" class="blue lighten-2 mt-5" dark large>Submit</v-btn>

</v-form>

  <div id="preview-container">
<div id="preview">
<h3>Preview your Event Details</h3>
<br />
<p class="preview-para">Event name: {{events.name}}</p>
<p class="preview-para">Event ID: {{events.id}}</p>
<p class="preview-para">Event Type: {{events.type}}</p>
<p class="preview-para">Event Description: {{events.description}}</p>
<p class="preview-para">Event Price: {{events.currency}}</p>
<p class="preview-para">Discount Eligibility for Event: {{events.discountEligibility}}</p>
<p class="preview-para">Dicount Rate for Event: {{events.discountRate}}</p>
<p class="preview-para">Event Price Without Discount: {{events.priceWithoutDiscount}}</p>
<p class="preview-para">Maximum Participants for Event: {{events.maximumparticipants}}</p>
<p class="preview-para">Minimum Participants for Event: {{events.minimumparticipants}}</p>
<p class="preview-para">Event Thumbnail: {{events.thumb}}</p>
<p class="preview-para">Event Registration From: {{events.registrationFrom}}</p>
<p class="preview-para">Event Registration Till: {{events.registrationTill}}</p>
</div>
</div>
</div>
</template>
<script>
import firebase from 'firebase';
import Navbar from './Navbar.vue';

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
      events:{
      currency:"",
      description:"",
      dicountEligibility:"",
      dicountRate:"",
      id:"",
      maximumparticipants:"",
      minimumparticipants:"",
      name:"",
      priceWithoutDiscount:"",
      registrationFrom:"",
      registrationTill:"",
      thumb:"",
      type:"",
      },
      registrationFrom: new Date().toISOString().substr(0, 10),
      registrationTill:new Date().toISOString().substr(0, 10),
      model_start: false,
      modal_expire: false,
      submitted:false,
      pollId:0
            }
      },

      submittableDateTime () {
      const registrationFrom= new Date(this.registrationFrom)
      const registrationTill= new Date(this.registrationTill)
      //console.log(registrationFrom)
      //console.log(registrationTill)
      return registrationFrom
      return registrationTill
      },

methods:{

isNumber: function(evt) {
      evt = (evt) ? evt : window.event;
      var charCode = (evt.which) ? evt.which : evt.keyCode;
      if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
        evt.preventDefault();
      } else {
        return true;
      }
    },

post: function(){

if(this.events.currency===''){
  alert("Please enter the currency");
}
else if(this.events.registrationFrom===''){
  alert("Please enter the registration start date");
}
else if(this.events.registrationTill===''){
  alert("Please enter the registration expiry date");
}
else if(this.events.id===''){
  alert("Please enter the event id");
}
else if(this.events.name===''){
  alert("Please enter the option 2 ");
}
else if(this.events.type===''){
  alert("Please enter the option 3 ");
}

else{
this.$http.get("https://djcsi-b13a9.firebaseio.com/events.json").then(function(data){

  //console.log(data);
  var pollId;
  var self=this;
  pollId=Math.max(...Object.keys(data.body));
  this.pollId=pollId+1;
  var storeData=firebase.database().ref("events");

    storeData.child(this.pollId).set(this.events).then(function(){
      self.pollsArray[0].question='';
      self.$router.push('Home');
    });


});
alert("Submitted Sucessfully");
}
},
        }
}
</script>

<style>

#poll-block{
margin: 20px auto;
max-width: 500px;
}

input[type="text"], textarea{
display: block;
width: 100%;
padding: 8px;
}


#add-blog *{
box-sizing: border-box; }
#add-blog{ margin: 20px auto;
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
