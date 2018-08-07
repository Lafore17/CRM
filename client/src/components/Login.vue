<template>
    <div class='auth' id='auth'>
        <form action=''>
            <div class='login'>
                <label for="login">Login</label>
                <input type="text" id='login' v-model='login' class='form-control' name='login'>
            </div>
            <div class='password'>
                <label for="password">Password</label>
                <input type="password" id='password' v-model='password' class='form-control' name='password'>
            </div>
        </form>
        <div class='loading' v-if='isLoading'>
            <h4>Loading...</h4>
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
                isActiveLogin : this.activeLogin,
                isActiveMenu : this.activeMenu,
                isLoading: false
            }
        },
        methods:{
            submitUser(){
                this.isLoading = true;
                fetch('http://localhost:3000/api/login', {
                    method : 'POST',
                    headers:{
                        'Accept': 'application/json',
                        'Content-Type' : 'application/json'
                    },
                    credentials: 'include',
                    body: JSON.stringify({
                        login: this.login,
                        password: this.password
                    })
                })
                .then(res => res.json())
                .then(data => { 
                    if(data._id !== undefined){
                        localStorage.setItem('token', data._id);
                        this.isLoading = false;
                        this.$emit('logged', true);
                    }else{
                        alert('error!');
                        this.isLoading = false;
                        this.$emit('logged', false);
                    }
                })
                .catch(error => {
                    this.isLoading = false;
                    console.log(error);
                })
                // this.entry = !this.entry;
                // this.isActiveLogin = false;
                // this.isActiveMenu = true;
                this.$emit('successfulEntry', this.entry, this.isActiveLogin, this.isActiveMenu);
                return; 
            }
        }
    }
</script>

<style scoped>

    form{ 
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
        margin-top: 250px;
    }

</style>