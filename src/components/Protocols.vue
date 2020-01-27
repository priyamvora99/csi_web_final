<template>
  <div id="protocol-component">
  <Navbar></Navbar>
    <br>
    <form>
    <!--  <h2 class="text-xs-center" id="protocolHeading">Add Protocol</h2> -->
    <u><h2 class="text-xs-center">Add Protocols</h2></u>
      <label class="protocolLabel">Name:</label><v-text-field value="protocolName" required v-model="protocolsArray[0].name" class="protocolText" placeholder="Enter protocol name"/>
      <label class="protocolLabel">Select a file </label><input type="file" name="urlInput" ref="file"  v-on:change="handleFileUpload()" class="protocolText ">
      <v-btn  v-on:click.prevent="postFileAndGetURL"  id="protocolButton" class="blue lighten-2 mt-5" dark large>Submit</v-btn>
      <v-btn id="protocolButton" class="blue lighten-2 mt-5" dark large v-on:click="editProtocols">Edit</v-btn>
    </form>

    <div id="preview-container">
      <div id="preview">
          <h3 id="previewHeading">Preview Data</h3>
          <br />
          <p class="preview-para">Protocol Name: {{this.protocolsArray[0].name}}</p>
          <p class="preview-para">Selected File: {{this.fileName}}</p>


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
      protocolsArray:[{name:'',url:''}],
      protcolId:0,
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

        self.protocolsArray[0].url=downloadURL;
        //console.log('Test',self.protocolsArray[0].url);

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
      this.$http.get("https://djcsi-b13a9.firebaseio.com/protocols.json").then(function(data){
        var self=this;
        //console.log(data);
        var protocolId;
        protocolId=Math.max(...Object.keys(data.body));
        this.protocolId=protocolId+1;
        var storeData=firebase.database().ref("protocols");

          storeData.child(this.protocolId).set({
            name:this.protocolsArray[0].name,
            url:this.protocolsArray[0].url
          }).then(function(){
            self.protocolsArray[0].name='';
            self.$router.push('Home');
          });


      });
    },
    editProtocols:function(){
  this.$router.push('editProtocols');
}
  },

}
</script>

<style scoped>
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
    .protocolText{
    display: block;
    width: 50%;
    padding: 6px;
    margin-left:auto;
    margin-right:auto;
    margin-top:20px;
    }

    .protocolLabel{
      display: block;
      margin: 20px 0 10px;
      text-align: left;
      width: 50%;
      padding: 6px;
      margin-left: auto;
      margin-right: auto;
      margin-top: 20px;

    }
    #protocolButton{
      display: block;
      width: 15%;
      padding: 8px;
      margin-left: auto;
      margin-right: auto;
      margin-bottom: 30px;
      margin-top: 30px;
    }
    #protocolHeading{
      display: block;
      width: 25%;
      padding: 8px;
      margin: auto;
      font-size: 18px;
    }
</style>
