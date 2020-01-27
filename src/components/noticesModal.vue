<template lang="html">
  <div id="notices-modal">

      <b-modal id="noticesModal" size ="lg" centered title="Edit notices!" @ok="handleOk" @cancel="handleCancel" v-model="showModal"  :no-close-on-backdrop="true"  :hide-header-close="true" :no-close-on-esc="true">

        <b-form>
              <b-form-group id="noticeNameLabel" label="notice Name:" class="noticesModalLabel"></b-form-group>
                <b-form-input id="noticeNameInput" type="text" v-model="clickedItem[0]" required placeholder="Enter notice name">
                </b-form-input>
                <b-form-group id="noticeURLLabel" label="URL:" class="noticesModalLabel"></b-form-group>
                <b-form-input id="noticeURLInput" type="text" v-model="clickedItem[1]" required placeholder="Enter url">
                </b-form-input>
                <b-form-group id="noticeSelectLabel" label="Select file:" class="noticesModalLabel"></b-form-group>
                <input type="file" name="urlInput" ref="file"  v-on:change="handleFileUpload()">

      </b-form>
   </b-modal>
 </div>
</template>

<script>
import bModal from 'bootstrap-vue/es/components/modal/modal';
import bForm from 'bootstrap-vue/es/components/form/form';
import bFormInput from 'bootstrap-vue/es/components/form-input/form-input';
import bFormGroup from 'bootstrap-vue/es/components/form-group/form-group';
import firebase from 'firebase';

export default {

  props:{
    'showNoticesModal':Boolean,
    'clickedItem':Array
  },
  components:{
    'b-modal':bModal,
    'b-form':bForm,
    'b-form-input':bFormInput,
    'b-form-group':bFormGroup
  },
  data() {
    return {
      showModal: this.showNoticesModal,
      file:'',
      fileName:''
    }
  },
  watch: {
    showNoticesModal: function (val) {
      this.showModal = val;

    }
  },
  methods:{
    handleOk(){
        var self=this;
        if(self.fileName!=''){
          self.deleteExistingAndAddNew();

        }else{
          self.updateData();
          //this.$emit('changeStatus',false);
        }


     },
    handleCancel(){
      this.$emit('changeStatus',false);
    },
    deleteExistingAndAddNew:function(){
          var self=this;
          var storageRef = firebase.storage().refFromURL(this.clickedItem[1]);
          storageRef.delete().then(function(){
            self.uploadFile();
        }).catch(function(error){
            //console.log(error);
      });
    },
    uploadFile:function(){
      var self=this;
      //console.log('upload file: '+self.file);
      var storageRef = firebase.storage().ref(self.fileName);
      var uploadTask = storageRef.put(self.file);
          uploadTask.on('state_changed', function(snapshot){


        }, function(error) {

      }, function() {
          uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
          self.clickedItem[1]=downloadURL;
          self.updateData();
        });
     });

    },
    updateData:function(){
      var self=this;
      var ref = firebase.database().ref('notices/'+self.clickedItem[2]);
      ref.update({
        'name':self.clickedItem[0],
        'url':self.clickedItem[1]
      }).then(function(){

          //console.log('Updated in the db');
          self.$emit('changeStatus',false);
          self.$emit('emitEvent');
      }).catch(function(error){
          //console.log(error);
      });
    },
    handleFileUpload:function(){
        this.file = this.$refs.file.files[0];
        this.fileName=this.file.name;
        //console.log(this.fileName);

      }
  }
}

</script>

<style lang="css" scoped>
.noticesModalLabel{
  margin-top:20px;
}
</style>
