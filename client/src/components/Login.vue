<template>
    <div class='auth' id='auth'>
        <div class='authBlock'>
            <div class='login'>
                <label for="login">Login</label>
                <input type="text" id='login' v-model='login' class='form-control'>
            </div>
            <div class='password'>
                <label for="password">Password</label>
                <input type="password" id='password' v-model='password' class='form-control'>
            </div>
        </div>
        <input type="button" @click='submitUser' class='submit btn btn-outline-danger' value='Вход'>
    </div>
</template>
<script>
    import axios from 'axios';
    export default {
        props:['activeLogin', 'activeMenu'],
        data(){
            return{
                login : '',
                password : '',
                entry : false,
                isActiveLogin: this.activeLogin,
                isActiveMenu : this.activeMenu
            }
        },
        methods:{
            submitUser(){
                this.entry = !this.entry;
                this.isActiveLogin = false;
                this.isActiveMenu = true;
                this.$emit('successfulEntry', this.entry, this.isActiveLogin, this.isActiveMenu);
                return; 
            }
        }
    }
</script>

<style scoped>

    .authBlock{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
    }
    
    .auth{
        display: flex;
        flex-direction: column;
        align-items: center;
        font-family: Arial, Helvetica, sans-serif;
        font-size: 16px;
        margin: 0 auto;
        justify-content: space-between;
    }

    input{
        width: 250px;
        height: 23px;
    }

    .login{
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 350px;
        margin-bottom: 10px;
    }

    .password{
        display: flex;
        width: 350px;
        justify-content: space-between;
        align-items: center;
    }

    label{
        margin-right: 25px;
    }

    .submit{
        width: 65px;
        height: 30px;
        text-align: center;
        margin: auto;
        margin-top: 55px;
    }

    .login{
        display: flex;
        /* justify-content: center; */
        margin-top: 250px;
    }
</style>