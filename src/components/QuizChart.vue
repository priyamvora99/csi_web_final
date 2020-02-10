<template>
    <div id="notice-component">
    <Navbar></Navbar>
        <br/>
        <form>
            <u><h2 class="text-xs-center">Quiz Details</h2></u>

            <h5 class="text-xs-center" style="margin-top: 3vh;">Select an option:</h5>
            <select id="dropdown">
                <option>Please select an option</option>
                <option v-for="quiz in this.quizNumbers" :value="quiz.key">{{quiz.question}}</option>
            </select>
            
            <p class="preview-para"><strong>{{this.count}}</strong> people answered this quiz! </p>
            <v-btn v-on:click="showChart" id="noticeButton" class="blue lighten-2 mt-5" dark large>Get the chart! </v-btn>

            <div id="chart-container">
                <canvas id="myChart" width="400" height="400"></canvas>
            </div>            
        </form>
    </div>
</template>
<script>

import firebase from 'firebase';
import Navbar from './Navbar.vue';
import Chart from 'chart.js';

export default {        
    components: {
        'Navbar': Navbar,                       
    },
    beforeCreate() {
        var self = this;
        firebase.auth().onAuthStateChanged(function(user) {
            if(!user) 
                self.$router.push('/');       
        });        
    },
    created() {
        this.populateDropdown();        
        this.myChartData = {
            type: 'pie',
            data: {
                labels: ['Select an option and render the chart!'],
                backgroundColor: 'rgb(25, 133, 210)',                                    
                borderColor: 'rgb(25, 133, 210)',
                data : ['Sample Data'],
            },
            options: {},
        };
    },
    data() {
        return {          
            count: 0,  
            countYes: 0,
            countNo: 0,
            selectedValue: 0,
            quizNumbers: [],
            myChartData: {}
        }        
    },
    mounted() {                   
        this.renderChart();
    },                
    methods: {
        showChart() {            
            var self = this; 

            var temp = document.getElementById('dropdown');
            self.selectedValue = temp.options[temp.selectedIndex].value;                  
            self.count = 50;
            self.countYes = 35;
            self.countNo = 15;
                                         
            var data = firebase.database().ref("quizAnswer");
            data.on("value", function(snapshot) {
                snapshot.forEach(function(childSnapshot){                   
                    var check = childSnapshot.hasChild(self.selectedValue.toString());                    
                    if(check) { 
                        self.count++;                     
                        if(childSnapshot.val()[self.selectedValue].points != 0)
                            self.countYes++;
                        else
                            self.countNo++;
                    }                                        
               });
            });

            var i = 0;       
            while(true) {                
                if(self.quizNumbers[i].key == self.selectedValue)
                    break;
                i++;
            }

            self.myChartData = {
                type: 'pie',
                data: {
                    labels: ['Correct Answers','Incorrect Answers'],
                    datasets: [{
                        backgroundColor: ['rgb(25, 133, 210)','rgba(71, 183,132,.5)'],
                        borderColor: ['rgb(25, 133, 210)','rgba(71, 183,132,.5)'],
                        data: [self.countYes.toString(), self.countNo.toString()]
                    }],
                },
                options: {
                    legend: {
                        labels: {defaultFontSize: 5}
                    }
                },
            };
            self.renderChart();            
        },
        populateDropdown() {
            var self = this;     

            this.$http.get("https://djcsi-b13a9.firebaseio.com/quiz.json").then(function(data){                                                                       
                Object.keys(data.body).forEach(function(key){                    
                    var temp = data.body[key].start_date.split("/");                                        
                    if(Number(temp[0]) > 1 && Number(temp[1]) >= 2 && Number(temp[2]) >= 2020) {                                                                        
                        self.quizNumbers.push({
                            key: key,
                            question: data.body[key].question,                                                                                   
                        });                        
                    }                    
                });                
            });            

        },
        renderChart() {
            var self = this;
            var value = self.myChartData;
            var mychart = new Chart('myChart', {
                type: value.type,
                data: value.data,
                options: value.options,
            });        
            //mychart.defaults.global.defaultFontSize = 6;
        }                
    }
}
</script>

<style scoped >
  #chart-container {
      max-height: 20%;
      margin-bottom: 10px;
      text-align: center;
      display: block;      
  }  
  #myChart {     
      max-height: 40%;
      max-width: 40%;               
      margin-left: 30%;
  }
  #dropdown{
    display: block;
    width: 80%;
    padding: 10px;
    margin-left:auto;
    margin-right: auto;
    margin-top: 20px;
    border:1px solid black
  }
  #preview{
    padding: 10px 20px;
    border: 1px dotted #ccc;
    margin:auto;
    display: inline-block;
    width: 50%;
  }
  #previewHeading{
    margin-top: 10px;
    text-align: center;
  }
  #preview-container{
    text-align: center;
  }
  .preview-para{
    text-align: center;
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
