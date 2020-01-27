<template lang="html">
  <div id="video-modal">

      <b-modal id="videosModal" size ="lg" centered title="Edit Videos!" @ok="handleOk" @cancel="handleCancel" v-model="showModal"  :no-close-on-backdrop="true"  :hide-header-close="true" :no-close-on-esc="true">

        <b-form>
              <b-form-group id="playListNameLabel" label="Playlist Name:" class="videosModalLabel"></b-form-group>
                <b-form-input id="playListNameInput" type="text" v-model="clickedItem[4]" required placeholder="Enter playlist name">
                </b-form-input>
                <b-form-group id="videoNameLabel" label="Video Name:" class="videosModalLabel"></b-form-group>
                <b-form-input id="videoNameInput" type="text" v-model="clickedItem[0]" required placeholder="Enter video name">
                </b-form-input>
          <b-form-group id="youtubeLabel" label="Youtube Id:" class="videosModalLabel"></b-form-group>
            <b-form-input id="youtubeIdInput" type="text" v-model="clickedItem[1]" required placeholder="Enter youtube id">
            </b-form-input>
          <b-form-group id="rating" label="Rating:" class="videosModalLabel"></b-form-group>
          <b-form-input id="rating" type="text" v-model="clickedItem[5]" required placeholder="Enter rating">
          </b-form-input>
          <b-form-group id="thumb" label="Thumb:" class="videosModalLabel"></b-form-group>
          <b-form-input id="thumb" type="text" v-model="clickedItem[6]" required placeholder="Enter thumb">
          </b-form-input>
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
    'showVideosModal':Boolean,
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
      showModal: this.showVideosModal
    }
  },
  watch: {
    showVideosModal: function (val) {
      this.showModal = val;

    }
  },
  methods:{
    handleOk(){
       var self=this;
       var ref = firebase.database().ref('videoCategories/'+self.clickedItem[2]);
       ref.update({
         'name':self.clickedItem[4],
         'rating':self.clickedItem[5],
         'thumb':self.clickedItem[6]
       }).catch(function(err){
         //console.log(err);
       }).then(function(){
         var ref1 = firebase.database().ref('videoCategories/'+self.clickedItem[2]+'/videos/'+self.clickedItem[3]);
         ref1.update({
           'name':self.clickedItem[0],
           'youtubeId':self.clickedItem[1]
         }).catch(function(err1){
            //console.log(err1);
         }).then(function(){
            self.$emit('changeStatus',false);
            self.$emit('emitEvent');
         });
       });    },
    handleCancel(){
      this.$emit('changeStatus',false);
    }
  }
}
</script>

<style scoped>
  .videosModalLabel{
    margin-top:20px;
  }
</style>
