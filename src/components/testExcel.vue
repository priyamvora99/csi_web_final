
<template>
  <div  id="notice-container">
  <navbar></navbar>
  <br />

<!--<v-btn v-on:click="onexportcds0" id="noticeButton" class="v-btn theme--light">Download Excel for CDS 0 </v-btn>
<v-btn v-on:click="onexportcds1" id="noticeButton" class="v-btn theme--light">Download Excel for CDS1 </v-btn>-->
<v-btn v-on:click="onexportcsiweek" id="noticeButton" class="v-btn theme--light">Download Excel for CSI WEEK </v-btn>
<!--<v-btn v-on:click="onexportiv" id="noticeButton" class="v-btn theme--light">Download Excel for IV </v-btn>-->

<br />
<h2 class="text-xs-center">All Details of CSI Participants</h2>
<br />



<h3>CSI WEEK</h3>
<div v-for="blog in testArray1" class="single-blog">
 <p>{{ blog.course_name }}</p>
</div>



  </div>
</template>

<script>
import firebase from 'firebase';
import XLSX from 'xlsx'
import Navbar from './Navbar.vue';
import editTable from './editTable.vue';

export default {
  components:{
    'Navbar':Navbar,
    'editTable':editTable,
  },

data(){
      return{
csiweek:{},
testArray1:[],
propData:[],
fields:[]
      }
      },
      methods:{


      onexportcsiweek () {

        var csiweekWS = XLSX.utils.json_to_sheet(this.propData)

        var wb = XLSX.utils.book_new()


        XLSX.utils.book_append_sheet(wb, csiweekWS, 'csiweek')

        XLSX.writeFile(wb, 'book.xlsx')
      },




    },
        created()
        {
        var self = this;
        this.$http.get('https://djcsi-b13a9.firebaseio.com/participants/csi_week.json').then(function(data){

        var propData=[];
        var tableFields=['course_details','csi_member','email','event 0','event 1','event 2','event 3','event 4','name','phone','price','status'];

         Object.keys(data.body).forEach(function(idx){
           var eventNumber=0;
           var eventsObject=Object.assign({},data.body[idx].events);
           Object.keys(eventsObject).forEach(function(index){
             data.body[idx]["event "+eventNumber]=eventsObject[eventNumber];
              eventNumber+=1;
//console.log(data.body[idx].csi_member);
           });

           propData.push(data.body[idx]);
           self.propData=propData;

       });
       self.fields=tableFields;
       //console.log(self.propData);

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
