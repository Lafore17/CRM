<template>
  <div id="app" class='wrapper'>
    <router-view :name="isAuth ? 'goodAuth' : 'badAuth'"></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app',
    data () {
      return {
        // currentComponent: 'login',
        isActiveMenu: false,
        isActiveLogin : true,
        isActiveLogo: false, //!!!
        isAuth: true
      }
    },
    components:{
      // login,
      // Main,
      // Login
      // 'main-page' : mainPage,
      // 'events-page' : eventPage,
      // 'copmanies-page' : companiesPage,
      // 'create-event' : createEvent
    },
    methods:{
      getMainSection(entry, activeLogin, activeMenu){
        this.isActiveLogin = activeLogin;
        this.isActiveMenu = activeMenu;
        this.currentComponent = 'main-page';
        return;
      }
    },
    created(){
      // zapros ------ > true : false;
      // isAuth = res;
    }
  }
</script>

<style>

  body, html, h4, div, a{
    margin: 0;
    padding: 0;
  }

</style>
