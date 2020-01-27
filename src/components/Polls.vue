
<template>
  <div id="notice-container">
  <Navbar></Navbar>
    <br>
    <v-form v-if="!submitted">
  <u><h2 class="text-xs-center">Add Polls</h2></u>

    <label class="noticeLabel">Poll Question</label>
    <v-text-field placeholder="Enter Question" v-model.lazy="polls.question"
    class="noticeText"
    :rules="[() => !!polls.question || 'This field is required']"
     required></v-text-field>

    <label class="noticeLabel">Option 1</label>
    <v-text-field class="noticeText" placeholder="Enter Option 1" v-model="polls.options[0]" :rules="[() => !!polls.options[0] || 'This field is required']" ></v-text-field>
    <label class="noticeLabel">Option 2</label>
    <v-text-field class="noticeText" placeholder="Enter Option 2" v-model="polls.options[1]" :rules="[() => !!polls.options[0] || 'This field is required']" ></v-text-field>

    <label class="noticeLabel">Start Date</label>
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
          placeholder="Enter Start Date"
          class="noticeText"
          v-model="polls.start_date"
          prepend-icon="event"
          readonly
        ></v-text-field>
        <v-date-picker v-model="polls.start_date" @input="modal_start = false" scrollable>
          <v-spacer></v-spacer>
        </v-date-picker>
      </v-dialog>
    </v-flex>
    </v-layout>

    <label class="noticeLabel">Expiry Date</label>
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
              placeholder="Enter Expiry Date"
              class="noticeText"
              v-model="polls.expiry_date"
              prepend-icon="event"
              readonly
            ></v-text-field>
            <v-date-picker v-model="polls.expiry_date" @input="modal_expire = false" scrollable>
            <v-spacer></v-spacer>
          </v-date-picker>
        </v-dialog>
      </v-flex>
    </v-layout>

<div id="poll-block">
    <v-layout row wrap class="light--text">
    <label class="noticeLabel">Show Results of Polls to Users </label>
    <v-checkbox  v-model="polls.showResults" ></v-checkbox>
    </v-layout>
</div>
    <br />
    <br />

    <v-btn v-on:click.prevent="post" id="noticeButton" class="blue lighten-2 mt-5" dark large>Submit</v-btn>
    <div v-if="submitted">
    <h3>Thankyou for submitting!</h3>
    </div>
    </v-form>

<v-btn id="pollsButton" v-on:click="editPolls" class="blue lighten-2 mt-5" dark large>Edit</v-btn>

    <div id="preview-container">
      <div id="preview">
      <h3>Preview your Poll</h3>
      <br />
      <p class="preview-para">Quiz Question: {{polls.question}}</p>
      <p class="preview-para">Poll Options:</p>

      <p class="preview-para">1: {{polls.options[0]}}</p>
      <p class="preview-para">2: {{polls.options[1]}}</p>


      <p class="preview-para">Start date: {{polls.start_date}}</p>
      <p class="preview-para">Expiry date: {{polls.expiry_date}}</p>
      <p class="preview-para">Show Polls Results: {{polls.showResults}}</p>
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
    polls:{
    question:"",
    options:[],
    start_date:"",
    expiry_date:"",
    results:[0,0],
    showResults:true,
        },
    pollId:0,
    start_date: new Date().toISOString().substr(0, 10),
    expiry_date:new Date().toISOString().substr(0, 10),
    model_start: false,
    modal_expire: false,
    submitted:false,
          }
    },

    submittableDateTime () {
    const start_date= new Date(this.start_date)
    const expiry_date= new Date(this.expiry_date)
    return start_date
    return expiry_date
    },
  methods:{

    post:function(){

    if(this.polls.question===''){
      alert("Please enter the question");
    }
    else if(this.polls.start_date===''){
      alert("Please enter the start date");
    }
    else if(this.polls.expiry_date===''){
      alert("Please enter the expiry date");
    }
    else if(this.polls.options[0]===''){
      alert("Please enter the option 1");
    }
    else if(this.polls.options[1]===''){
      alert("Please enter the option 2 ");
    }
else{
       this.$http.get("https://djcsi-b13a9.firebaseio.com/polls.json").then(function(data){
         //console.log(data);
         var pollId;
         var self=this;
         pollId=Math.max(...Object.keys(data.body));
         this.pollId=pollId+1;
        var storeData=firebase.database().ref("polls");

          storeData.child(this.pollId).set(this.polls).then(function(){
            self.pollsArray[0].question='';

          });


      });
      alert("Submitted Sucessfully");
//this.submitted=true;
this.$router.push('Home');
    }
    },

    editPolls:function(){
      this.$router.push('editPolls');
    },


  },

}
</script>

<style lang="css" scoped >

#pollsButton{
  display: block;
  width: 15%;
  padding: 8px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 30px;
  margin-top: 30px;
}



#poll-block{
margin: 20px auto;
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

  #poll-block{ margin: 20px auto;
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
