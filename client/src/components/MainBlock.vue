<template>
  <div>
    <div class='logo' v-if='isActiveLogo'>
      <h4>DenisCRM</h4>
    </div>
    <div class='mainSection'>
      <div class='menu' v-if='isActiveMenu'>
        <ul>
          <li @click='activeDivision'><router-link to="mainPage" class='link' active-class="active">Главная</router-link></li>
          <li @click='activeDivision'><router-link to="companies" class='link'>Компании</router-link></li>
          <li @click='activeDivision'><router-link to="events" class='link'>События</router-link></li>
          <li @click='activeDivision'><a href='#' id='accaunt'>Аккаунт</a></li>
          <li @click='activeDivision'><router-link to="login" class='link'>Выйти</router-link></li>
        </ul>
      </div>
        <!-- <div class='section'>
            <component :is="'login'" 
            :activeLogin='isActiveLogin' 
            :activeMenu='isActiveMenu' 
            @successfulEntry='getMainSection'>
        </component> -->
        <!-- </div> -->
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
    name: 'MainBlock',
    data () {
      return {
        currentComponent: 'login',
        isActiveMenu: true,
        isActiveLogin : true,
        isActiveLogo: false //!!!
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
      },
      activeDivision(event){
        // event.target.classList.toggle('active');
      }
    }
}    
</script>

<style scoped>

  .active{
    color: red;
  }

  .active-class{
    color: yellow;
  }

  .router-link-active, .router-link-exact-active{
    color: yellow;
  }

  .link{
    text-decoration: none;
    color: grey;
  }

  .logo{
    font-size: 25px;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    padding-top: 35px;
    padding-left: 30px;
    height: 90px;
    width: 100%;
    padding-bottom: 30px;
    color: rgb(218, 113, 113);
    background-color: rgb(138, 83, 83);
    position: fixed;
  }

  .menu{
    padding: 15px;
    padding-right: 20px;
    overflow: hidden;
    background: rgb(221, 188, 188);
    height: 100%;
    box-shadow: 2px 2px 8px rgba(0,0,0,.1);
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    position: fixed;
    z-index: 100;
  }

  .menu ul{
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .menu a {
    margin: 50px 0 0 0px;
  }

  .menu a {
    text-decoration: none;
    display: block;  
    font-size: 15px;
    color: rgba(0,0,0,.6);
    padding: 5%;
    position: relative;
    transition: .1s linear;
    cursor: pointer;
    height: 30%;
    width: 80px;
  }

  .menu a:hover {
    background: rgb(209, 174, 184);
    color: white;
  }

  /* .menu a:focus {
    background: rgb(209, 174, 184);
    color: red;
  } */
  
</style>
