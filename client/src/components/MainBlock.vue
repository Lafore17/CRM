<template>
  <div>
    <div class='logo' v-if='isActiveLogo'>
      <h4>DenisCRM</h4>
    </div>
    <div class='mainSection'>
      <div class='menu' v-if='isActiveMenu'>
        <ul>
          <li @click='activeDivision'><router-link to="mainPage" class='link'>Главная</router-link></li>
          <li @click='activeDivision'><router-link to="companies" class='link'>Компании</router-link></li>
          <li @click='activeDivision'><router-link to="events" class='link'>События</router-link></li>
          <li @click='activeDivision'><a href='#' id='accaunt'  class='link'>Аккаунт</a></li>
          <li @click='activeDivision'><router-link to="login" class='link'>Выйти</router-link></li>
        </ul>
      </div>
    </div>
    <router-view 
      :arrayEvents='events'>
    </router-view>
  </div>
</template>

<script>
  export default {
    name: 'MainBlock',
    props:['events'],
    data () {
      return {
        currentComponent: 'login',
        isActiveMenu: true,
        isActiveLogo: false,
      }
    },
    methods:{
      activeDivision(event){
        let collection = document.getElementsByClassName('link');
        for( let elem of collection ) {
          elem.removeAttribute('style');
        }
        event.target.style.color = 'red';
        return;
      }
    },
    created(){
      fetch('http://localhost:3000/api/db/events', {
        method : 'GET',
        credentials: 'include'
      })
      .then(res => {
        // console.log(res);
        if( res ){
          return res.json();
        }else{
          return '';
        }
      })
      .then(data => {
        // this.isLoading = false;
        // this.$emit('logged', true);
        console.log('events - ' + JSON.stringify(data))
        // this.$emit('receiveEv', JSON.stringify(data));
      })
      
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
