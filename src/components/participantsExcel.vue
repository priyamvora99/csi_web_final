
<template>
  <div  id="notice-container">
  <navbar></navbar>
  <br />
<u><h2 class="text-xs-center">All Details of CSI  Participants</h2></u>
<br/>
<v-btn v-on:click="onexportcsiweek" id="noticeButton" class="blue lighten-2 mt-5" dark large>Download Excel for CSI WEEK </v-btn>
<v-btn v-on:click="onexportcds0" id="noticeButton" class="blue lighten-2 mt-5" dark large>Download Excel for CDS 0 </v-btn>
<v-btn v-on:click="onexportcds1" id="noticeButton" class="blue lighten-2 mt-5" dark large>Download Excel for CDS1 </v-btn>
<v-btn v-on:click="onexportiv" id="noticeButton" class="blue lighten-2 mt-5" dark large>Download Excel for IV </v-btn>

  </div>
</template>

<script>
import XLSX from 'xlsx';
import Navbar from './Navbar.vue';
import firebase from 'firebase';


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

data(){
      return{
cds0:[],
cds1:[],
csiweek:[],
iv:[],
propData:[],
fields:[],

        }
      },
      methods:{

      onexportcds0 () {
      // On Click Excel download button
        // export json to Worksheet of Excel
        // only array possible

        var cds0WS = XLSX.utils.json_to_sheet(this.cds0)
      //  var cds1WS = XLSX.utils.json_to_sheet(this.cds1)

        // A workbook is the name given to an Excel file
        var wb = XLSX.utils.book_new() // make Workbook of Excel

        // add Worksheet to Workbook
        // Workbook contains one or more worksheets
        XLSX.utils.book_append_sheet(wb, cds0WS, 'cds0') // sheetAName is name of Worksheet
        //XLSX.utils.book_append_sheet(wb, cds1WS, 'cds1')

        // export Excel file
        XLSX.writeFile(wb, 'book.xlsx') // name of the file is 'book.xlsx'
      },

      onexportcds1 () {

    var cds1WS = XLSX.utils.json_to_sheet(this.cds1)
        var wb = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(wb, cds1WS, 'cds1')

        XLSX.writeFile(wb, 'book.xlsx')
      },



      onexportcsiweek () {

        var csiweekWS = XLSX.utils.json_to_sheet(this.csiweek)
        var wb = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(wb, csiweekWS, 'csiweek')
        XLSX.writeFile(wb, 'book.xlsx')

},


      onexportiv () {
        var ivWS = XLSX.utils.json_to_sheet(this.iv)
        var wb = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(wb, ivWS, 'iv')
        XLSX.writeFile(wb, 'book.xlsx')
      },





    },
        created()
        {

                var self = this;


  //Code Shastra 0


          this.$http.get('https://djcsi-b13a9.firebaseio.com/participants/cds_0_20.json').then(function(data){
          var cds0=[];
          var tableFields=['csi_member','leader_college','leader_email','member 0','member 1','member 2','member 3','leader_phone','leader_name','team_name','price','status'];

           Object.keys(data.body).forEach(function(idx){
             var memberNumber=0;
             var membersObject=Object.assign({},data.body[idx].members);
             Object.keys(membersObject).forEach(function(index){                
                data.body[idx]["member "+memberNumber] = membersObject[memberNumber].name;
                memberNumber += 1;
             });

             cds0.push(data.body[idx]);
             self.cds0=cds0;

         });
         self.fields=tableFields;
      //   //console.log(self.cds0);

          });



// Code Shastra 1


        this.$http.get('https://djcsi-b13a9.firebaseio.com/participants/cds_1.json').then(function(data){
        var cds1=[];
        var tableFields=['csi_member','leader_college','leader_email','member 0','member 1','member 2','member 3','leader_phone','leader_name','team_name','price','status'];

         Object.keys(data.body).forEach(function(idx){
           var memberNumber=0;
           var membersObject=Object.assign({},data.body[idx].members);
           Object.keys(membersObject).forEach(function(index){
             data.body[idx]["member "+memberNumber]=membersObject[memberNumber];
              memberNumber+=1;

           });

           cds1.push(data.body[idx]);
           self.cds1=cds1;

       });
       self.fields=tableFields;
    //   //console.log(self.cds1);

        });


// IV DATA

        this.$http.get('https://djcsi-b13a9.firebaseio.com/participants/iv.json').then(function(data){
        var iv=[];
         Object.keys(data.body).forEach(function(idx){
           iv.push(data.body[idx]);
           self.iv=iv;
       });
    //   //console.log(self.iv);
        });


// CSI WEEK

        this.$http.get('https://djcsi-b13a9.firebaseio.com/participants/csi_week_19.json').then(function(data){

        var csiweek=[];
        var tableFields=['course_details','csi_member','email','event 0','event 1','event 2','event 3','event 4','name','phone','price','status'];

         Object.keys(data.body).forEach(function(idx){
           var eventNumber=0;
           var eventsObject=Object.assign({},data.body[idx].events);
           Object.keys(eventsObject).forEach(function(index){
             data.body[idx]["event "+eventNumber]=eventsObject[eventNumber];
              eventNumber+=1;

           });

           csiweek.push(data.body[idx]);
           self.csiweek=csiweek;

       });
       self.fields=tableFields;
    //   //console.log(self.csiweek);

        });



        },

  }
</script>

<style>
#show-blogs{
max-width:800px;
margin: 0 auto;
}
.single-blog{
padding:20px;
margin:20px 0;
box-sizing: border-box;
background: #eee;

}
input[type="text"], textarea{
display: block;
width: 100%;
padding: 8px;
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
  width: 28%;
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

#poll-block
{ margin: 20px auto;
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
