<template>
  <div id="edit-video">
    <Navbar></Navbar>
    <br>
    <form v-on:submit.prevent="getData">
      <h2 class="text-xs-center" id="editVideosHeading">Edit Video</h2>
      <editTable v-bind:propData="propData" v-bind:showModal="showModal" v-bind:fields="fields" v-on:anotherEvent="anotherEvent($event)"> </editTable>
      <br>
    </form>
  </div>
</template>

<script>
  import firebase from 'firebase';
  import Navbar from './Navbar.vue';
  import editTable from './editTable.vue';
export default {
  components:{
    'Navbar':Navbar,
    'editTable':editTable

  },
  created(){
    this.getData();
  },
  data (){
    return{
      // showDropdown:false,
      // loaded:false,
      // selectKey:0,
      // listName:'',
      // showRatings:true,
      // showThumb:true,
      // showManualTextbox:false,
      // playListNames:[],
      // play:'default',
      // ratings:0,
      // thumb:'',
      // playlistNumber:0,
      // videoNumber:0,
      // videos:[
      //   {videoName:'',youtubeId:''}
      // ]
      propData:[],
      showModal:"videos",
      fields:[]
    }
  },
  methods:{
    anotherEvent:function(){
      this.getData();
      //console.log("emitting");
    },
    getData:function(){
      var self=this;
      this.$http.get("https://djcsi-b13a9.firebaseio.com/videoCategories.json").then(function(data){

        var propData=[];
        var tableFields=['name','youtubeId','playListName','rating','thumb'];
        Object.keys(data.body).forEach(function(idx){
          data.body[idx].videos.map(function(video, videoIdx) {
            video["key"] = idx;
            video["videoIndex"] = videoIdx;
            video["playListName"] = data.body[idx].name;
            video["rating"]=data.body[idx].rating;
            video["thumb"]=data.body[idx].thumb;
          });
          
          propData.push(...data.body[idx].videos);
          self.propData=propData;
        });
        self.fields=tableFields;
        //console.log(self.propData);
      });
    }
  },
}
</script>

<style lang="css">
#editVideosHeading{
  display: block;
  width: 25%;
  padding: 8px;
  margin: auto;
  font-size: 18px;
}
</style>
