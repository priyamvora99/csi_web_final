<template lang="html">
  <div id="edit-quiz">
    <Navbar></Navbar>
    <h2 class="text-xs-center" id="editQuizHeading">Edit Quiz</h2>
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
      this.$http.get("https://djcsi-b13a9.firebaseio.com/quiz.json").then(function(data){

        var propData=[];
        var tableFields=['question','answer','point_weight','start_date','expiry_date','value 0','value 1','value 2'];

         Object.keys(data.body).forEach(function(idx){
           var optionNumber=0;
           var valNumber=0;
           var optionsObject=Object.assign({},data.body[idx].options);
           data.body[idx].quizNumber=idx;
           Object.keys(optionsObject).forEach(function(index){
             data.body[idx]["option "+optionNumber]=optionNumber;

             data.body[idx]["value "+valNumber]=optionsObject[optionNumber];
              optionNumber+=1;
              valNumber+=1;

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
      showModal:"quiz",
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
