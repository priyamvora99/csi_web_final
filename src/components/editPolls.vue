<template lang="html">
  <div id="edit-polls">
    <Navbar></Navbar>
    <h2 class="text-xs-center" id="editPollsHeading">Edit Polls</h2>
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
      this.$http.get("https://djcsi-b13a9.firebaseio.com/polls.json").then(function(data){

        var propData=[];
        var tableFields=['question','start_date','expiry_date','option 0','option 1','result 0','result 1'];

         Object.keys(data.body).forEach(function(idx){
           var optionNumber=0;
           var resNumber=0;
           var optionsObject=Object.assign({},data.body[idx].options);
           var resultsObject=Object.assign({},data.body[idx].results);
           data.body[idx].pollNumber=idx;
           Object.keys(optionsObject).forEach(function(index){
             data.body[idx]["optionIndex "+optionNumber]=optionNumber;
             data.body[idx]["option "+optionNumber]=optionsObject[optionNumber];
             data.body[idx]["result "+resNumber]=resultsObject[optionNumber];
              optionNumber+=1;
              resNumber+=1;

           });

           propData.push(data.body[idx]);
           self.propData=propData;


       });
       self.fields=tableFields;
       //console.log(self.propData);
       
    });
  }
},
  data(){
    return{
      propData:[],
      showModal:"polls",
      fields:[]
    }
  }
}
</script>

<style lang="css" scoped>
#editQuizHeading{
  display: block;
  width: 25%;
  padding: 8px;
  margin: auto;
  font-size: 18px;
}
</style>
