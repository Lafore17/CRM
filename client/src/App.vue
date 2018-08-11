<template>
  <div id="app" class='wrapper'>
    <router-view 
      @logged='handleLog'
      :name="isAuth||flag ? 'goodAuth' : 'badAuth'" exact
      @changeAuthBlock='getChangingAuth'>
    </router-view>
  </div>
</template>
 
<script>
  export default {
    name: 'App',
    data () {
      return {
        isAuth: false,
        currentEvents : '',
        currentCompanies : '',
      }
    },
    methods: {
      handleLog(isLogged) {
        this.isAuth = isLogged;
        return;
      },
      getCurrentEvents(arrayOfEvent) {
        this.currentEvents = arrayOfEvent;
        return;
      },
      getCurrentCompanies(arrayOfCompanies) {
        this.currentCompanies = arrayOfCompanies;
        return;
      },
      getChangingAuth(){
        this.isAuth = false;
        return;
      }
    },
    created() {
      if( localStorage.getItem('token') ) {
        fetch(`http://localhost:3000/api/db/users/${localStorage.getItem('token')}`, {
          method : 'GET',
          credentials: 'include'
        })
        .then(res => {
          if(res) {
            this.isAuth = true;
            return res.json();
          }
        })
        .then(data => {
          if(data) {
            console.log(data);
          }
        })
        .catch(error => console.log(error))
      }
    },
    beforeCreate() { //как по-другому решить эту проблему???
      if(localStorage.getItem('token')) {
        this.flag = true;
      }else {
        this.flag = false;
      }
    },
  }
</script>

<style>

  body, html, h4, div, a{
    margin: 0;
    padding: 0;
  }

</style>
