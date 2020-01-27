
<template>
  <div id="notice-container">
  <navbar></navbar>
  <br />
  <u><h2 class="text-xs-center">Details of all CSI Members</h2></u>
  <br />
<v-btn v-on:click="onexport_csimembers" id="noticeButton" class="blue lighten-2 mt-5" dark large>Excel for CSI Member Details </v-btn>
<br />

<div v-for="blog in blogs" class="single-blog">
 <h3>{{blog.SAP}} : {{ blog.name }}</h3>
</div>



  </div>
</template>

<script>
import XLSX from 'xlsx'
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
blogs:{},
csiMember_Timestamp:"",
            }
      },
      methods:{

      onexport_csimembers () { // On Click Excel download button


        // export json to Worksheet of Excel
        // only array possible
        var pollsWS = XLSX.utils.json_to_sheet(this.blogs)
      //  var pokemonWS = XLSX.utils.json_to_sheet(this.Datas.pokemons)

        // A workbook is the name given to an Excel file
        var wb = XLSX.utils.book_new() // make Workbook of Excel

        // add Worksheet to Workbook
        // Workbook contains one or more worksheets
        XLSX.utils.book_append_sheet(wb, pollsWS, 'CSI Members') // sheetAName is name of Worksheet
        //XLSX.utils.book_append_sheet(wb, pokemonWS, 'pokemons')

        // export Excel file
        XLSX.writeFile(wb, 'book.xlsx') // name of the file is 'book.xlsx'
      }
    },
          created()
            {

                    var milliseconds = new Date().getTime();
                          //    //console.log(milliseconds);
                    var millis = new Date("Jan 30 2019 00:00:00").getTime();
                    //console.log(millis);
                  
                    var csiMember_Timestamp = [];
                    var returnArr = [];

                    var storeData = firebase.database().ref("userPoints");


                            //------------

                    storeData.on("value", function(snapshot) {
                           snapshot.forEach(function(childSnapshot) {
                            var childData = childSnapshot.val();
                            var id=childData.id;

                            if(childSnapshot.hasChild("csiMember")) {

                                var membershipValidity = childData.csiMember;
                                //console.log("Validity" + membershipValidity);
                                if(milliseconds < membershipValidity) {
                                  var item = childData;
                                  item.key = childData.key;
                                  returnArr.push(item);
                                }
                            }

                          });
                    });

                            //------------
                    this.csiMember_Timestamp = csiMember_Timestamp;


                    this.blogs = returnArr;
                    //console.log("CSI MEMEBERS: "+this.blogs);

}

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
background: #e1f5fe;

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
