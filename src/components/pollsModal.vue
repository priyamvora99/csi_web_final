<template lang="html">
  <div id="polls-modal">
    <b-modal id="pollsModal" size ="lg" centered title="Edit polls!" @ok="handleOk" @cancel="handleCancel" v-model="showModal"  :no-close-on-backdrop="true"  :hide-header-close="true" :no-close-on-esc="true">

     <b-form>
            <b-form-group id="questionNameLabel" label="Question: " class="pollsModalLabel"></b-form-group>
              <b-form-input id="questionInput" type="text" v-model="clickedItem[2]" required placeholder="Enter question">
              </b-form-input>
                <b-form-group id="optionLabel" label="Option Number 0:" class="pollsModalLabel"></b-form-group>
              <b-form-input id="optionInput" type="text" v-model="clickedItem[8]" required placeholder="Enter option">
              </b-form-input>
              <b-form-group id="optionLabel" label="Option Number 1:" class="pollsModalLabel"></b-form-group>
              <b-form-input id="optionInput" type="text" v-model="clickedItem[11]" required placeholder="Enter option">
              </b-form-input>


              <b-form-group id="dateLabel" label="Start Date:" class="pollsModalLabel"></b-form-group>
              <b-form-input id="dateInput" type="text" v-model="clickedItem[5]" required placeholder="Enter start date">
              </b-form-input>
              <b-form-group id="dateLabel" label="End date:" class="pollsModalLabel"></b-form-group>
              <b-form-input id="dateInput" type="text" v-model="clickedItem[0]" required placeholder="Enter end date">
              </b-form-input>

              <b-form-group id="resultLabel" label="Result 0:" class="pollsModalLabel"></b-form-group>
              <b-form-input id="resultInput" type="text" v-model="clickedItem[9]" required placeholder="Enter result">
              </b-form-input>

              <b-form-group id="resultLabel" label="Result 1:" class="pollsModalLabel"></b-form-group>
              <b-form-input id="resultInput" type="text" v-model="clickedItem[12]" required placeholder="Enter result">
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
  created(){
      //console.log(this.clickedItem);
  },
  props:{
    'showPollsModal':Boolean,
    'clickedItem':Array
  },
  components:{
    'b-modal':bModal,
    'b-form':bForm,
    'b-form-input':bFormInput,
    'b-form-group':bFormGroup
  },
  data(){
    return{
      showModal: this.showPollsModal
    }
  },
  watch: {
    showPollsModal: function (val) {
      this.showModal = val;

    }
  },
  methods:{
    handleOk(){
       var self=this;
       var ref = firebase.database().ref('polls/'+self.clickedItem[6]);
       ref.update({

         'expiry_date':self.clickedItem[0],

         'question':self.clickedItem[2],
         'start_date':self.clickedItem[5]
       }).catch(function(err){
         //console.log(err);
       }).then(function(){
         var ref1 = firebase.database().ref('polls/'+self.clickedItem[6]+'/options');
         ref1.update({
           '0':self.clickedItem[8],
           '1':self.clickedItem[11]
         }).catch(function(err1){
            //console.log(err1);
         }).then(function(){
           var ref2 = firebase.database().ref('polls/'+self.clickedItem[6]+'/results');
           ref2.update({
             '0':self.clickedItem[9],
             '1':self.clickedItem[12]
           }).catch(function(err2){
             //console.log(err2);
           }).then(function(){
             self.$emit('changeStatus',false);
             self.$emit('emitEvent');
           })

         });
       });
     },
    handleCancel(){
      this.$emit('changeStatus',false);
    }
  }

}
</script>

<style lang="css" scoped>
.pollsModalLabel{
  margin-top:5px;
}
</style>
