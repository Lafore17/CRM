<template>
  <div id="app" class='wrapper'>
    <router-view 
      @logged='handleLog'
      @receiveEv='getCurrentEvents'
      @receiveComp='getCurrentCompanies'
      :name="isAuth||flag ? 'goodAuth' : 'badAuth'"
      :events='currentEvents'
      :companies='currentCompanies'>
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
        currentCompanies : ''
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
      },
      getCurrentCompanies(arrayOfCompanies){
        this.currentCompanies = arrayOfCompanies;
        return;
      }
    },
    created() {
      console.log(this.flag)
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
            console.log(JSON.stringify(data))
          }
        })
        .catch(error => console.log(error))
      }
    },
    beforeCreate() { //как по-другому решить эту проблему
      if(localStorage.getItem('token')) {
        this.flag = true;
      }else{
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
