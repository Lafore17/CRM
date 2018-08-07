<template>
  <div id="app" class='wrapper'>
    <router-view 
      @logged='handleLog'
      @receive='getCurrentEvents'
      :name="isAuth ? 'goodAuth' : 'badAuth'"
      :events='currentEvents'>
    </router-view>
  </div>
</template>
 
<script>
  export default {
    name: 'App',
    data () {
      return {
        // isActiveMenu: false,
        // isActiveLogin : true,
        // isActiveLogo: false,
        isAuth: false,
        currentEvents : ''
      }
    },
    methods: {
      handleLog(isLogged) {
        this.isAuth = isLogged;
        return;
      },
      getCurrentEvents(arrayOfEvent){
        this.currentEvents = arrayOfEvent;
        return;
      }
    },
    created() {
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
