<template lang="html">
  <div id="edit-protocols">
    <Navbar></Navbar>
    <h2 class="text-xs-center" id="editProtocolsHeading">Edit Protocols</h2>
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
      this.$http.get("https://djcsi-b13a9.firebaseio.com/protocols.json").then(function(data){
        var propData=[];
        var tableFields=['name','url'];

         Object.keys(data.body).forEach(function(idx){
            data.body[idx].key=idx;
             propData.push(data.body[idx]);

         });
            //console.log(propData);
           self.propData=propData;
           self.fields=tableFields;

          //console.log('Edit protocols: '+self.propData);

      });

    }
  },
  data(){
    return{
      propData:[],
      showModal:"protocols",
      fields:[]
    }
  }
}
</script>

<style lang="css" scoped>
#editProtocolsHeading{
  display: block;
  width: 25%;
  padding: 8px;
  margin: auto;
  font-size: 18px;
}
</style>
