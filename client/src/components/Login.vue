<template>
    <div class='auth' id='auth'>
        <div class='logo' v-if='isActiveLogo'>
            <h4>DenisCRM</h4>
        </div>
        <form action=''>
            <div class='login'>
                <label for="login">Login</label>
                <input type="text" id='login' v-model='$v.login.$model' class='form-control' name='login' :class='{error: !($v.login.required && $v.login.minLength)}'>
            </div>
            <div class='password'>
                <label for="password">Password</label>
                <input type="password" id='password' v-model='$v.password.$model' class='form-control' name='password' :class='{error: !($v.password.required && $v.password.minLength)}'>
            </div>
        </form>
        <div class='loading' v-if='isLoading'>
            <h4>Loading...</h4>
        </div>
        <input type="button" @click='submitUser' class='submit btn btn-outline-danger' value='Вход'>
    </div>
</template>
<script>
    import Axios from 'axios';
    import { required, minLength } from 'vuelidate/lib/validators';
    export default {
        props:['activeLogin', 'activeMenu'],
        data() {
            return {
                login : '',
                password : '',
                entry : false,
                isActiveLogin : this.activeLogin,
                isActiveMenu : this.activeMenu,
                isLoading: false,
                collection_events: [],
                isActiveLogo: true,
            }
        },
        methods: {
            submitUser() {
                if( !this.$v.login.$invalid, !this.$v.password.$invalid ) {
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
                        if(data._id !== undefined) {
                            this.isLoading = false;
                            localStorage.setItem('token', data._id);
                            this.$emit('logged', true);
                        } else {
                            alert('error!');
                            this.isLoading = false;
                            this.$emit('logged', false);
                        }
                    })
                    .catch(error => {
                        this.isLoading = false;
                        alert(error);
                    })
                    this.$emit('successfulEntry', this.entry, this.isActiveLogin, this.isActiveMenu);
                    return;
                } else {
                    alert('Введите корректные данные!');
                    return;
                }
            }
        },
        validations: {
            login: {
                required,
                minLength: minLength(4)
            },
            password: {
                required,
                minLength: minLength(6)
            }
        }
    }
</script>

<style scoped>

    .error{
        border: 1px solid red;
    }

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
</style>