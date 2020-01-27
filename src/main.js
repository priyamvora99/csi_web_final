import Vue from 'vue'
import App from './App.vue'
import firebase from 'firebase';
import VueRouter from 'vue-router'
import Routes from './routes';
import VueResource from 'vue-resource'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import JsonExcel from 'vue-json-excel'
import XLSX from 'xlsx'

Vue.component('downloadExcel', JsonExcel);



//Router initialization
Vue.use(VueRouter);

//Vue Resource initialization
Vue.use(VueResource);

//BootStrap Vue
Vue.use(BootstrapVue);

Vue.use(Vuetify);


//Router object
const router=new VueRouter({
  routes:Routes,
  mode:'history'
});



//Firebase configuration details!
var config = {
    apiKey: "AIzaSyD_HVgshSGHzlX1O0lW2Ndqdzx4Unse0Kg",
    authDomain: "djcsi-b13a9.firebaseapp.com",
    databaseURL: "https://djcsi-b13a9.firebaseio.com",
    projectId: "djcsi-b13a9",
    storageBucket: "djcsi-b13a9.appspot.com",
    messagingSenderId: "894161111425",
    appId: "1:894161111425:web:25b1d0c0663d58dda4c080"
};
firebase.initializeApp(config);

new Vue({
  el: '#app',
  render: h => h(App),
  router:router
})
