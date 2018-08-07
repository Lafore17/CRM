<template>
  <div id="app" class='wrapper'>
    <router-view @logged='handleLog' :name="isAuth ? 'goodAuth' : 'badAuth'"></router-view>
  </div>
</template>
 
<script>
  export default {
    name: 'app',
    data () {
      return {
        isActiveMenu: false,
        isActiveLogin : true,
        isActiveLogo: false,
        isAuth: false
      }
    },
    methods:{
      handleLog(isLogged) {
        this.isAuth = isLogged;
        console.log(isLogged);
        return;
      },
      getMainSection(entry, activeLogin, activeMenu){
        this.isActiveLogin = activeLogin;
        this.isActiveMenu = activeMenu;
        this.currentComponent = 'main-page';
        return;
      }
    },
    created(){
      if( localStorage.getItem('token') ) {
        fetch(`http://localhost:3000/api/db/users/${localStorage.getItem('token')}`, {
          method : 'GET',
          headers:{
            'Accept': 'application/json',
            'Content-Type' : 'application/json'
          },
          credentials: 'include'
        })
        .then(res => {
          if(res) {
            this.isAuth = true;
          }
        })
      }
    }
  }
</script>

<style>

  body, html, h4, div, a{
    margin: 0;
    padding: 0;
  }

</style>
