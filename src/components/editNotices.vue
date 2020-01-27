<template lang="html">
  <div id="edit-protocols">
    <Navbar></Navbar>
    <h2 class="text-xs-center" id="editNoticesHeading">Edit Notices</h2>
    <editTable v-bind:propData="propData" v-bind:showModal="showModal" v-bind:fields="fields" v-on:anotherEvent="anotherEvent($event)"> </editTable>
    <br>
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
  methods:{
    anotherEvent:function(){
      this.getData();
      //console.log("emitting");
    },
    getData:function(){
      var self=this;
      this.$http.get("https://djcsi-b13a9.firebaseio.com/notices.json").then(function(data){
        var propData=[];
        var tableFields=['name','url'];

         Object.keys(data.body).forEach(function(idx){
            data.body[idx].key=idx;
             propData.push(data.body[idx]);

         });
            //console.log(propData);
           self.propData=propData;
           self.fields=tableFields;

          //console.log('Edit notices: '+self.propData);

      });

    }
  },
  data(){
    return{
      propData:[],
      showModal:"notices",
      fields:[]
    }
  }
}
</script>

<style lang="css" scoped>
#editNoticesHeading{
  display: block;
  width: 25%;
  padding: 8px;
  margin: auto;
  font-size: 18px;
}
</style>
