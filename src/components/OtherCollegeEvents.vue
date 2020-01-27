
<template>
  <div id="notice-component">
  <Navbar></Navbar>
    <br>
    <form>
    
    <u><h2 class="text-xs-center">Add Other College Events</h2></u>
      <label class="noticeLabel">Event Name:</label><v-text-field value="noticeName" required v-model="eventsArray[0].name" class="noticeText" placeholder="Enter event name"/>
      <label class="noticeLabel">Event Organizer:</label><v-text-field value="noticeName" required v-model="organizer" class="noticeText" placeholder="Enter event name"/>
      <label class="noticeLabel">Upload header image: </label><input type="file" name="urlInput" ref="file"  v-on:change="handleFileUpload()" class="noticeText">
      <label class="noticeLabel">Date of the event:</label>
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
                placeholder="Enter date of the event"
                class="noticeText"
                v-model="event.date"
                prepend-icon="event"
                readonly                
                ></v-text-field>
                <v-date-picker v-model="event.date" @input="modal_start = false" scrollable></v-date-picker>
            </v-dialog>
    </v-flex>
    </v-layout>
    <label class="noticeLabel">Venue:</label><v-text-field value="noticeName" required v-model="venue" class="noticeText" placeholder="Enter venue"/>
    <label class="noticeLabel">Link:</label><v-text-field value="noticeName" required v-model="link" class="noticeText" placeholder="Enter the link for further reference"/>
      <v-btn v-on:click.prevent="postFileAndGetURL" id="noticeButton" class="blue lighten-2 mt-5" dark large>Submit</v-btn>
      <v-btn id="noticeButton" v-on:click="editNotices" class="blue lighten-2 mt-5" dark large>Edit</v-btn>
    </form>
    <div id="preview-container">
      <div id="preview">
          <h3 id="previewHeading">Preview Data</h3>
          <br />
          <p class="preview-para">Event Name: {{this.eventsArray[0].name}}</p>
          <p class="preview-para">Event Organizer: {{this.organizer}}</p>
          <p class="preview-para">Selected File: {{this.fileName}}</p>
          <p class="preview-para">Event Date: {{this.event.date}}</p>
          <p class="preview-para">Venue: {{this.venue}}</p>
          <p class="preview-para">Link for further details: {{this.link}}</p>
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

  data (){
    return{
      event: {
          date:""
      },
      date: new Date().toISOString().substr(0, 10),
      modal_start: false,  
      eventsArray:[{name:'',url:''}],
      ID: 0,
      venue:'',
      link:'',
      file:'',
      fileName:'',
      organizer: ''
    }
  },
  submittableDateTime () {
    const date= new Date(this.date);
    return date;
  },
  methods:{
    postFileAndGetURL:function(){
      var self = this;
      if(this.fileName===''){
        alert("Select a file to upload");
      }else{
        var fileName = this.fileName;
        var storageRef = firebase.storage().ref('intracollege_images/'+fileName);
        var uploadTask = storageRef.put(this.file);
        uploadTask.on('state_changed', function(snapshot){
      }, function(error) {

      }, function() {

        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {

        self.eventsArray[0].url=downloadURL;
        //console.log('Test',self.eventsArray[0].url);

        self.insertToDatabase();
      });
   });
  }
},
  handleFileUpload:function(){
      this.file = this.$refs.file.files[0];
      this.fileName=this.file.name;
      //console.log(this.file);

    },
    insertToDatabase:function(){
      this.$http.get("https://djcsi-3e43d.firebaseio.com/intracolleges.json").then(function(data){
            
        //console.log(data);               
        var self=this;
        var ID = Math.max(...Object.keys(data.body));
        this.ID = ID + 1;
        var storeData=firebase.database().ref("intracolleges");

          storeData.child(this.ID).set({
            name: this.eventsArray[0].name,
            by: this.organizer,
            Date: this.event.date,
            link: this.link,
            Venue: this.venue,
            image: this.eventsArray[0].url

          }).then(function(){
            self.eventsArray[0].name='';
            self.$router.push('Home');
          });

      });
    },
    editNotices:function(){
     this.$router.push('editNotices');
   }
  },

}
</script>

<style scoped >
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
