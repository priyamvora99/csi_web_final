<template>
  <div id="edit-table">
    <b-table striped hover :items="propData" @row-clicked="clickHandler" :fields="fields"></b-table>

    <videos-modal :showVideosModal="showVideosModal" v-on:changeStatus="changeStatus($event)" v-on:emitEvent="emitEvent($event)" :clickedItem="clickedItem"></videos-modal>
    <protocols-modal :showProtocolsModal="showProtocolsModal" v-on:changeStatus="changeStatus($event)" v-on:emitEvent="emitEvent($event)" :clickedItem="clickedItem"></protocols-modal>
    <notices-modal :showNoticesModal="showNoticesModal" v-on:changeStatus="changeStatus($event)" v-on:emitEvent="emitEvent($event)" :clickedItem="clickedItem"></notices-modal>
    <quiz-modal :showQuizModal="showQuizModal" v-on:changeStatus="changeStatus($event)" v-on:emitEvent="emitEvent($event)" :clickedItem="clickedItem"></quiz-modal>
    <polls-modal :showPollsModal="showPollsModal" v-on:changeStatus="changeStatus($event)" v-on:emitEvent="emitEvent($event)" :clickedItem="clickedItem"></polls-modal>
  </div>
</template>

<script>
  import bTable from "bootstrap-vue/es/components/table/table";
  import videosModal from "./videosModal.vue";
  import protocolsModal from "./protocolsModal.vue";
  import noticesModal from "./noticesModal.vue";
  import quizModal from "./quizModal.vue";
  import pollsModal from "./pollsModal.vue"

export default {
  created(){
    //console.log('edit table: '+this.propData);
    //console.log(this.showModal);
  },
  props:{
    propData:Array,
    showModal:String,
    fields:Array
  },
  components:{
    'b-table':bTable,
    'videos-modal':videosModal,
    'protocols-modal':protocolsModal,
    'notices-modal':noticesModal,
    'quiz-modal':quizModal,
    'polls-modal':pollsModal
  },
  data(){
    return{
        showVideosModal:false,
        showProtocolsModal:false,
        showNoticesModal:false,
        showQuizModal:false,
        showPollsModal:false,
        modalType: this.showModal,
        clickedItem:[]
    }
  },
  methods:{
    clickHandler:function(item,idx){
      this.clickedItem=Object.values(item);
      //console.log(this.clickedItem);
      this.showVideosModal = this.modalType === 'videos';
      this.showProtocolsModal=this.modalType==='protocols';
      this.showNoticesModal=this.modalType=='notices';
      this.showQuizModal=this.modalType=='quiz';
      this.showPollsModal=this.modalType=='polls';
    },
    changeStatus:function(val){
      this.showVideosModal=val;
      this.showProtocolsModal=val;
      this.showNoticesModal=val;
      this.showQuizModal=val;
      this.showPollsModal=val;
    },
    emitEvent:function(data){
      this.$emit('anotherEvent');
    }
  }

}
</script>

<style lang="css">
</style>
