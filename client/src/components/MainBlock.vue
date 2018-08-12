<template>
  <div>
    <div class='mainSection'>
      <h4 class='waiting' v-if='waiting'>Идет загрузка...</h4>
      <div class='menu' v-if='isActiveMenu'>
        <ul>
          <li @click='activeDivision'><router-link to="mainPage" class='link'>Главная</router-link></li>
          <li @click='activeDivision'><router-link to="companies" class='link'>Компании</router-link></li>
          <li @click='activeDivision'><router-link to="events" class='link'>События</router-link></li>
          <li @click='activeDivision'><a href='#' class='link acc'>{{currentNameUser}}</a></li>
          <li @click='logout'><span class='link'>Выйти</span></li>
        </ul>
      </div>
    </div>
    <router-view v-if='this.$store.state.arrayOfEvents && this.$store.state.arrayOfCompanies'>

    </router-view>
  </div>
</template>

<script>
  export default {
    name: 'MainBlock',
    data () {
      return {
        currentComponent: 'login',
        isActiveMenu: true,
        allInfoOfEvent: '',
        currentNameUser : '',
        waiting: true,
      }
    },
    methods: {
      activeDivision(event) {
        let collection = document.getElementsByClassName('link');
        for( let elem of collection ) {
          elem.removeAttribute('style');
        }
        event.target.style.color = 'red';
        return;
      },
      logout() {
        localStorage.removeItem('token');
        this.isActiveMenu = false;
        fetch(`http://localhost:3000/api/logout`, {
          method : 'GET',
          credentials: 'include'
        })
        .then(res => {
          if(res) {
            return res.json();
          }
        })
        .then(data => {
          if( data.message == 'successfully logout' ) {
            this.$emit("changeAuthBlock");
          }
        })
        .then( () => {
          this.$router.push('/');
        })
        .catch(error => console.log(error))
        return;
      }
    },
    created() {
      this.waiting = true;
      fetch(`http://localhost:3000/api/db/users/${localStorage.getItem('token')}`, {
        method : 'GET',
        credentials: 'include'
      })
      .then(res => {
        if(res) {
          return res.json();
        }
      })
      .then(data => {
        if(data) {
          this.currentNameUser = data.login;
        }
      })
      .then(() => {
        return  fetch('http://localhost:3000/api/db/events', {
            method : 'GET',
            credentials: 'include',
        })
      })
      .then(res => res.json())
      .then(data => {
          this.$store.dispatch('processingEvents', data); //сортировка ивентов
      })
      fetch('http://localhost:3000/api/db/companies', {
        method : 'GET',
        credentials: 'include'
      })
      .then(res => {
        if( res ) {      
          return res.json();
        } else {
          return '';
        }
      })
      .then(data => {
        this.$store.dispatch("processingGettingCompanies", data);
        this.waiting = false; 
      })
      .catch(error => alert(error))
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

  .menu a, span {
    margin: 50px 0 0 0px;
  }

  .menu a, span {
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

  .menu a:hover, span:hover {
    background: rgb(209, 174, 184);
    color: white;
  }

  .acc{
    color:blueviolet;
  }

  .waiting{
    display: block;
    position: fixed; 
    left: 0;
    top: 0;
    width: 100%; 
    height: 100%; 
    overflow: auto;
    margin-left: 150px;
    color: coral;
    font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
    font-size: 23px;
  }
</style>
