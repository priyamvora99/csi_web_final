
<template>
  <div id="notice-component">
  <Navbar></Navbar>
    <br>
    <form>
    <!--  <h2 class="text-xs-center" id="noticeHeading">Add Notice</h2>-->
    <u><h2 class="text-xs-center">Add Notices</h2></u>
      <label class="noticeLabel">Name:</label><v-text-field value="noticeName" required v-model="noticesArray[0].name" class="noticeText" placeholder="Enter notice name"/>
      <label class="noticeLabel">Select a file </label><input type="file" name="urlInput" ref="file"  v-on:change="handleFileUpload()" class="noticeText">
      <v-btn v-on:click.prevent="postFileAndGetURL" id="noticeButton" class="blue lighten-2 mt-5" dark large>Submit</v-btn>
      <v-btn id="noticeButton" v-on:click="editNotices" class="blue lighten-2 mt-5" dark large>Edit</v-btn>
    </form>
    <div id="preview-container">
      <div id="preview">
          <h3 id="previewHeading">Preview Data</h3>
          <br />
          <p class="preview-para">Notice Name: {{this.noticesArray[0].name}}</p>
          <p class="preview-para">Selected File: {{this.fileName}}</p>


      </div>
    </div>
   <!-- <form v-on:submit.prevent="postFileAndGetURL">


      <p>Name:</p><input type="text" name="nameInput" placeholder="Enter notice name" required v-model="noticesArray[0].name"/>
      <p>Select a file </p><input type="file" name="urlInput" ref="file"  v-on:change="handleFileUpload()">
      <input type="submit" v-on:click=""/>
    </form> -->
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
      noticesArray:[{name:'',url:''}],
      noticeId:0,
      file:'',
      fileName:''
    }
  },
  methods:{
    postFileAndGetURL:function(){
      var self=this;
      if(this.fileName===''){
        alert("Select a file to upload");
      }else{
        var fileName=this.fileName;

        var storageRef = firebase.storage().ref(fileName);

        var uploadTask = storageRef.put(this.file);
        uploadTask.on('state_changed', function(snapshot){


      }, function(error) {

    }, function() {

        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {

        self.noticesArray[0].url=downloadURL;
        //console.log('Test',self.noticesArray[0].url);

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
      this.$http.get("https://djcsi-b13a9.firebaseio.com/notices.json").then(function(data){

        //console.log(data);
        var noticeId;
        var self=this;
        noticeId=Math.max(...Object.keys(data.body));
        this.noticeId=noticeId+1;
        var storeData=firebase.database().ref("notices");

          storeData.child(this.noticeId).set({
            name:this.noticesArray[0].name,
            url:this.noticesArray[0].url
          }).then(function(){
            self.noticesArray[0].name='';
            self.$router.push('Home');
          });;


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
