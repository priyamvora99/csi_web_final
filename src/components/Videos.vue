<template>
  <div id="video-component">
    <Navbar></Navbar>
    <!-- <p>Playlist Name: </p><input type="text" name="playlistName" placeholder="Enter name for playlist" required v-model="playlistName"><br> -->
    <br>
    <!--<h2 class="text-xs-center">Add a Quiz for CSI</h2>-->
    <form>
      <!--<h2 class="text-xs-center" id="videosHeading">Add Video</h2>-->
      <u><h2 class="text-xs-center">Add Videos</h2></u>

      <select v-if="showDropdown" v-model="play" @change="onChange()" :key="selectKey" id="videosSelect">
        <option value="default">Please Select an Option</option>
        <option>Add new</option>
        <option v-for="playList in this.playListNames" :value="playList.key">{{playList.name}}</option>
      </select>
      <br>
      <div>
         <label v-if="showManualTextbox" class="videosLabel">Playlist name:</label><v-text-field value="playListName" v-model="listName" class="videosText" v-if="showManualTextbox" placeholder="Enter playlist name" required/><br>
      </div>

      <label v-if="showRatings" class="videosLabel" >Ratings:</label><v-text-field value="ratings" v-model="ratings" class="videosText" v-if="showRatings" placeholder="Enter ratings" required/><br>
      <label v-if="showThumb" class="videosLabel">Thumb:</label><v-text-field value="thumbnail" v-model="thumb" class="videosText" v-if="showThumb" placeholder="Enter thumbnail" required/><br>
      <label class="videosLabel">Video name: </label><v-text-field value="videoName" class="videosText" placeholder="Enter video name" required v-model="videos[0].videoName"/><br>
      <label class="videosLabel">Youtube Id: </label><v-text-field value="youtubeId" class="videosText" placeholder="Enter youtube id" required v-model="videos[0].youtubeId"/><br>
      <v-btn v-on:click.prevent="postData" id="videosButton" class="blue lighten-2 mt-5" dark large>Submit</v-btn>
      <v-btn id="videosButton" class="blue lighten-2 mt-5" dark large v-on:click="goToEdit">Edit</v-btn>
    </input>
    </form>
    <div id="preview-container">
      <div id="preview">
          <h3 id="previewHeading">Preview Data</h3>
          <br />
          <p class="preview-para" v-if="showManualTextbox">Playlist Name: {{this.listName}}</p>
          <p class="preview-para" v-if="showRatings">Ratings: {{this.ratings}}</p>
          <p class="preview-para" v-if="showThumb">Thumbnai: {{this.thumb}}</p>
          <p class="preview-para">Video Name: {{this.videos[0].videoName}}</p>
          <p class="preview-para">Youtube Id: {{this.videos[0].youtubeId}}</p>

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

  created(){
    this.populateDropdown();
    this.showDropdown=false;
  },
  data (){
    return{
      showDropdown:false,
      loaded:false,
      selectKey:0,
      listName:'',
      showRatings:true,
      showThumb:true,
      showManualTextbox:false,
      playListNames:[],
      play:'default',
      ratings:0,
      thumb:'',
      playlistNumber:0,
      videoNumber:0,
      videos:[
        {videoName:'',youtubeId:''}
      ]
    }
  },
  methods:{
    postData:function(){

      if(this.play!='Add new'){
          var self=this;
          var ref = firebase.database().ref('videoCategories');
          var key = this.play;
          //console.log(key);
          self.$http.get("https://djcsi-b13a9.firebaseio.com/videoCategories/"+key+"/videos.json").then(function(videosData){
              var videoNumber;
              videoNumber=Math.max(...Object.keys(videosData.body));
              this.videoNumber=videoNumber+1;
              //console.log(this.videoNumber);
              var ref1 = firebase.database().ref('videoCategories/'+key+'/'+'videos');
              ref1.child(self.videoNumber).set({
                name:self.videos[0].videoName,
                youtubeId:self.videos[0].youtubeId
              });
              this.listName='';
              this.ratings=0;
              this.thumb='';
              this.videos[0].videoName='';
              this.videos[0].youtubeId='';
            });
      }else{

        var self=this;
        this.$http.get("https://djcsi-b13a9.firebaseio.com/videoCategories.json").then(function(data){
          //console.log(data);
            var playlistNumber;
            playlistNumber=Math.max(...Object.keys(data.body));
            self.playlistNumber=playlistNumber+1;
            //console.log(self.playlistNumber);
            var ref = firebase.database().ref('videoCategories');
            ref.child(self.playlistNumber).set({
              name:self.listName,
              rating:self.ratings,
              thumb:self.thumb

            });
            var ref1=firebase.database().ref('videoCategories/'+self.playlistNumber);
            ref1.child("videos/0").set({
              name:self.videos[0].videoName,
              youtubeId:self.videos[0].youtubeId
            }).then(function(){
              self.populateDropdown();
              self.listName='';
              self.ratings=0;
              self.thumb='';
              self.videos[0].videoName='';
              self.videos[0].youtubeId='';
            });


      });

   }

    },
    populateDropdown:function(){

      var self=this;


        this.$http.get("https://djcsi-b13a9.firebaseio.com/videoCategories.json").then(function(data){
          self.playListNames=[];
          //console.log(data);
          Object.keys(data.body).forEach(function(key){
            if(data.body[key]) {
              self.playListNames.push({
                key: key,
                name: data.body[key].name
              });
            }
          });
          self.showDropdown=true;
          self.loaded=true;
          self.selectKey+=1;

      });



  },
  onChange:function(){
    if(this.play == "default") {
      return;
    }
    if(this.play=='Add new'){
      this.showManualTextbox=true;
      this.showRatings=true;
      this.showThumb=true;
    }else{
      this.showManualTextbox=false;
      this.showRatings=false;
      this.showThumb=false;
    }
  },
  goToEdit:function(){
    this.$router.push('editVideos');
  }
},


}
</script>

<style scoped>
  .videosText{
  display: block;
  width: 50%;
  padding: 6px;
  margin: auto;
  }

  #videosSelect{
    display: block;
    width: 25%;
    padding: 10px;
    margin-left:auto;
    margin-right: auto;
    margin-top: 20px;
    border:1px solid black
  }
  .videosLabel{
    display: block;
    margin: 20px 0 10px;
    text-align: left;
    width: 50%;
    padding: 6px;
    margin: auto;

  }
  #videosButton{
    display: block;
    width: 15%;
    padding: 8px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 15px;
  }
  #videosHeading{
    display: block;
    width: 25%;
    padding: 8px;
    margin: auto;
    font-size: 18px;
  }
  #preview{
    padding: 10px 20px;
    border: 1px dotted #ccc;
    margin-left:auto;
    margin-right:auto;
    margin-top: 20px;
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
</style>
