
<template>
  <div id="notice-container">
  <Navbar></Navbar>
    <br>
    <v-form v-if="!submitted">

    <u><h2 class="text-xs-center">Add Quiz</h2></u>

    <label class="noticeLabel">Quiz Question</label>
    <v-text-field class="noticeText" value="Question" placeholder="Enter Question" v-model.lazy="blog.question" :rules="[() => !!blog.question || 'This field is required']" required/>


    <label class="noticeLabel">Option 1</label>
    <v-text-field class="noticeText" value="option1" placeholder="Enter Option 1" v-model="blog.options[0]"  :rules="[() => !!blog.options[0] || 'This field is required']" />
    <label class="noticeLabel">Option 2</label>
    <v-text-field class="noticeText" value="option2" placeholder="Enter Option 2" v-model="blog.options[1]" :rules="[() => !!blog.options[1] || 'This field is required']" />
    <label class="noticeLabel">Option 3</label>
    <v-text-field class="noticeText" value="option3" placeholder="Enter Option 3" v-model="blog.options[2]" :rules="[() => !!blog.options[2] || 'This field is required']" />
    <label class="noticeLabel">Option 4</label>
    <v-text-field class="noticeText" value="option4" placeholder="Enter Option 4" v-model="blog.options[3]" :rules="[() => !!blog.options[3] || 'This field is required']" />

    <label class="noticeLabel">Points for the Question</label>
    <v-text-field class="noticeText" value="point_weight" placeholder="Enter Points" v-model="blog.point_weight" :rules="[() => !!blog.point_weight || 'This field is required']" v-on:keypress="isNumber(event)" />

    <label class="noticeLabel">Answer for the Quiz Question</label>
    <v-text-field  class="noticeText" value="answer" placeholder="Enter Answer" v-model="blog.answer" :rules="[() => !!blog.answer || 'This field is required']" />

    <label class="noticeLabel">Start Date</label>
    <v-layout row wrap>
    <v-flex>
      <v-dialog
        ref="dialog"
        v-model="modal_start"
        :return-value.sync="date"
        persistent
        lazy
        full-width
        width="290px"
      >
        <v-text-field
          slot="activator"
          class="noticeText"
          placeholder="Enter Start Date"
          v-model="blog.start_date"
          prepend-icon="event"
          readonly
        ></v-text-field>
        <v-date-picker v-model="blog.start_date" @input="modal_start = false" scrollable>
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
            persistent
            lazy
            full-width
            width="290px"
          >
            <v-text-field
              slot="activator"
              placeholder="Enter Expiry Date"
              class="noticeText"
              v-model="blog.expiry_date"
              prepend-icon="event"
              readonly
            ></v-text-field>
            <v-date-picker v-model="blog.expiry_date" @input="modal_expire = false" scrollable>
              <v-spacer></v-spacer>
            </v-date-picker>
          </v-dialog>
        </v-flex>
        </v-layout>
    <br />
    <br />

    <v-btn v-on:click.prevent="post" id="noticeButton" class="blue lighten-2 mt-5" dark large>Submit</v-btn>

    <div v-if="submitted">
    <h3>Thankyou your Submitting</h3>
</div>
    </v-form>


<!--<v-btn v-on:click="editQuiz" id="noticeButton" class="blue lighten-2 mt-5" dark large>Edit</v-btn>-->

    <div id="preview-container">
      <div id="preview">
      <h3>Preview your Quiz </h3>
      <br />
      <p class="preview-para">Quiz Question:{{blog.question}}</p>
      <p class="preview-para">Start date:{{blog.start_date}}</p>
      <p class="preview-para">Expiry Date:{{blog.expiry_date}}</p>
      <p class="preview-para">Quiz Points: {{blog.point_weight}}</p>
      <p class="preview-para">Quiz Answer: {{blog.answer}}</p>
      <p class="preview-para">Quiz Options:</p>

      <p class="preview-para">1: {{blog.options[0]}}</p>
      <p class="preview-para">2: {{blog.options[1]}}</p>
      <p class="preview-para">3: {{blog.options[2]}}</p>
      <p class="preview-para">4: {{blog.options[3]}}</p>


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
    date:'',
    blog:{
    question:"",
    options:[],
    point_weight:0.0,
    start_date:"",
    expiry_date:"",
    answer:"",
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
        alert("cLLed");
    const start_date= new Date(this.start_date)
    const expiry_date= new Date(this.expiry_date)
    //splitDate()
    return start_date
    return expiry_date
    },
  methods:{
    splitDate:function() {
        const date1 = new Date(this.start_date);
        const date = date1.getDate() + "/" + (date1.getMonth() + 1) + "/" + (date1.getFullYear());
        //console.log(date);
    },  
    post:function(){

    if(this.blog.question===''){
      alert("Please enter the question");
    }
    else if(this.blog.start_date===''){
      alert("Please enter the start date");
    }
    else if(this.blog.expiry_date===''){
      alert("Please enter the expiry date");
    }
    else if(this.blog.options[0]===''){
      alert("Please enter the option 1");
    }
    else if(this.blog.options[1]===''){
      alert("Please enter the option 2 ");
    }
    else if(this.blog.options[2]===''){
      alert("Please enter the option 3 ");
    }
    else if(this.blog.options[3]===''){
      alert("Please enter the option 4 ");
    }
    else if(this.blog.point_weight==0.0){
      alert("Please enter the points for quiz ");
    }
    else if(this.blog.answer===''){
      alert("Please enter the answer ");
    }

else{
      this.$http.get("https://djcsi-b13a9.firebaseio.com/quiz.json").then(function(data){
        // //console.log(data);
        var pollId;
        var self=this;
        pollId=Math.max(...Object.keys(data.body));
        this.pollId=pollId+1;
        var storeData=firebase.database().ref("quiz");
        var date1 = new Date(this.blog.start_date);
         self.blog.start_date = date1.getDate() + "/" + (date1.getMonth() + 1) + "/" + (date1.getFullYear());
        self.blog.start_date=self.blog.start_date.toString();
        date1 = new Date(this.blog.expiry_date);
         self.blog.expiry_date = date1.getDate() + "/" + (date1.getMonth() + 1) + "/" + (date1.getFullYear());
        self.blog.expiry_date=self.blog.expiry_date.toString();

        self.blog.point_weight = Number(self.blog.point_weight);
        // //console.log("date"+date);
          storeData.child(this.pollId).set(this.blog).then(function(){
          //  self.pollsArray[0].question='';
            self.$router.push('Home');
          });


      });
      alert("Submitted Sucessfully");
//this.submitted=true;
    }
    },

    editQuiz:function(){        
         this.$router.push('editQuiz');
       },


       isNumber: function(evt) {
             evt = (evt) ? evt : window.event;
             var charCode = (evt.which) ? evt.which : evt.keyCode;
             if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
               evt.preventDefault();
             } else {
               return true;
             }
           },


  },

}
</script>

<style  lang="css" scoped >


#quizButton{
  display: block;
  width: 15%;
  padding: 8px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 30px;
  margin-top: 30px;
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

  ul.a {
  list-style-type: circle;
}
</style>
