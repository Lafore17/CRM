import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import store from '../store/index';
import mainPage from './MainPage';
import eventPage from './ListOfEvents';
import companiesPage from './ListOfCompanies';
import Login from './components/Login';
import MainBlock from './components/MainBlock';
import createEvent from './addEvent';
import Vuelidate from 'vuelidate';

Vue.use(VueRouter);
Vue.use(Vuelidate);

const routes = [
    {
      path : '/',
      props: true,
      components : {
        default: Login,
        goodAuth: MainBlock,
        badAuth: Login
      },
      children: [
        {
          path: 'companies',
          component: companiesPage,
          props: true,
        },
        {
          path: 'mainPage',
          component: mainPage,
          props: true,
        },
        {
          path: 'events',
          component: eventPage
        },
        {
          path: 'create_event',
          component: createEvent
        }
      ]
    }
];

const router = new VueRouter({
  mode: 'history',
  routes
});

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});