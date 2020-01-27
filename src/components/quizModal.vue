<template lang="html">
  <div id="quiz-modal">
    <b-modal id="quizModal" size ="lg" centered title="Edit Quiz!" @ok="handleOk" @cancel="handleCancel" v-model="showModal"  :no-close-on-backdrop="true"  :hide-header-close="true" :no-close-on-esc="true">

     <b-form>
            <b-form-group id="questionNameLabel" label="Question: " class="quizModalLabel"></b-form-group>
              <b-form-input id="questionInput" type="text" v-model="clickedItem[4]" required placeholder="Enter question">
              </b-form-input>
               <b-form-group id="optionLabel" label="Option Number 0:" class="quizModalLabel"></b-form-group>
              <b-form-input id="optionInput" type="text" v-model="clickedItem[8]" required placeholder="Enter option">
              </b-form-input>
              <b-form-group id="optionLabel" label="Option Number 1:" class="quizModalLabel"></b-form-group>
              <b-form-input id="optionInput" type="text" v-model="clickedItem[10]" required placeholder="Enter option">
              </b-form-input>
              <b-form-group id="optionLabel" label="Option Number 2:" class="quizModalLabel"></b-form-group>
              <b-form-input id="optionInput" type="text" v-model="clickedItem[12]" required placeholder="Enter option">
              </b-form-input>
              <b-form-group id="pointWeightLabel" label="Point weight:" class="quizModalLabel"></b-form-group>
              <b-form-input id="pointWeightInput" type="text" v-model="clickedItem[3]" required placeholder="Enter point weight">
              </b-form-input>
              <b-form-group id="dateLabel" label="Start Date:" class="quizModalLabel"></b-form-group>
              <b-form-input id="dateInput" type="text" v-model="clickedItem[5]" required placeholder="Enter start date">
              </b-form-input>
              <b-form-group id="dateLabel" label="End date:" class="quizModalLabel"></b-form-group>
              <b-form-input id="dateInput" type="text" v-model="clickedItem[1]" required placeholder="Enter end date">
              </b-form-input>
              <b-form-group id="answerLabel" label="Answer :" class="quizModalLabel"></b-form-group>
              <b-form-input id="answerInput" type="text" v-model="clickedItem[0]" required placeholder="Enter answer">
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
    'showQuizModal':Boolean,
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
      showModal: this.showQuizModal
    }
  },
  watch: {
    showQuizModal: function (val) {
      this.showModal = val;

    }
  },
  methods:{
    handleOk(){
       var self=this;
       var ref = firebase.database().ref('quiz/'+self.clickedItem[6]);
       ref.update({
         'answer':self.clickedItem[0],
         'expiry_date':self.clickedItem[1],
         'point_weight':self.clickedItem[3],
         'question':self.clickedItem[4],
         'start_date':self.clickedItem[5]
       }).catch(function(err){
         //console.log(err);
       }).then(function(){
         var ref1 = firebase.database().ref('quiz/'+self.clickedItem[6]+'/options');
         ref1.update({
           '0':self.clickedItem[8],
           '1':self.clickedItem[10],
           '2':self.clickedItem[12]
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

<style lang="css" scoped>
.quizModalLabel{
  margin-top:5px;
}
</style>
