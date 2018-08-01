import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'

import mainPage from './MainPage';
import eventPage from './ListOfEvents';
import companiesPage from './ListOfCompanies';
import Login from './components/Login';
import MainBlock from './components/MainBlock';
import createEvent from './addEvent';

Vue.use(VueRouter);

const routes = [
    {
      path : '/',
      components : {
        default: Login,
        goodAuth: MainBlock,
        badAuth: Login
      },
      children: [
        {
          path: 'companies',
          component: companiesPage
        },
        {
          path: 'mainPage',
          component: mainPage
        },
        {
          path: 'events',
          component: eventPage
        },
        {
          path: 'login',
          component: Login
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
  render: h => h(App)
});
