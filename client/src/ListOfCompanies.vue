<template>
    <div class='wrapper'>
        <h3 v-if='waiting' class='waitingTitle'>Подождите...</h3>
        <div class='table_of_companies'>
            <div class='button_with_searcher'>
                <input 
                    type="button" 
                    value='Создать компанию' 
                    class='btn btn-danger' 
                    id='add_company'
                    @click='createCompany'>
                <form class='control'>
                    <input 
                        type="text" 
                        placeholder="Поиск по названию" 
                        class='form-control'>
                </form>
            </div>
            
            <table>
                <thead>
                    <tr>
                        <td>Название</td>
                        <td>Почта</td>
                        <td>Лицо</td>
                        <td>Номер телефона</td>
                        <td>Сайт</td>
                        <!-- <p>{{array_of_companies}}</p> -->
                    </tr>
                </thead>
                <tbody>
                    <tr v-for='(par, index) in array_of_companies' :key="index">
                        <td>{{par.name}}</td>
                        <!-- <td>{{par.email}}</td> -->
                        <td>{{par.contact}}</td>
                        <td>{{par.phone}}</td>
                        <td>{{par.site}}</td>
                        <div class='btns'>
                            <input 
                                type="button" 
                                value="events" 
                                class='events btn btn-outline-info' 
                                id='events' 
                                @click='getEvents'>
                            <input 
                                type="button" 
                                value="upd" 
                                class='upd btn btn-outline-info' 
                                :id='par.name' 
                                @click='updateCompany'>
                        </div>
                    </tr>
                </tbody>
            </table>
            <div class='pagination'>
                <div class='pagination_left'>
                    <a href="#" @click='changePage(prevPage)'>Left</a>
                </div>
                <div class='pagination_left'>
                    <a href="#" @click='changePage(nextPage)'>Right</a>
                </div>
            </div>
        </div>
        <div class='modal' v-if='isActiveModal' id='modal' @click='cancelModal'>
            <div class='content_of_modal'>
                <span class="close" @click='isActiveModal = false'>&times;</span>
                <h4>Компания:</h4>
                <form>
                    <div>
                        <label for="title_of_company">Name of Company</label>
                        <input type="text" id='title_of_company' v-model='name_of_company'>
                    </div>
                    <div> 
                        <label for="Site">Site</label>
                        <input type="text" id='site' v-model='site'>
                    </div>
                    <div>
                        <label for="Contact person">Contact person</label>
                        <input type="text" id='contact_person' v-model='contact_person'>
                    </div>
                    <div>
                        <label for="Phone number">Phone number</label>
                        <input type="text" id='phone_number' v-model='phone'>
                    </div>
                    <div>
                        <label for="email">Email</label>
                        <input type="email" id='email' v-model='email'>
                    </div>
                </form>
                <h4 v-if='isActiveCreatingCompany'>Создание...</h4>
                <div class='submit_info_of_company'>
                    <input type="button" value='Submit' class='btn btn-danger' id='submit' @click='postCompany'>
                </div>
            </div>
        </div>
        <div class='events_modal' v-if='isActiveModalEvents' id='modalEvents' @click='cancelModalEvents'>
            <div class='content_of_modal_events'>
                <span class="close" @click='isActiveModalEvents = false'>&times;</span>
                <div class='searcher_with_btn'>
                    <input 
                        type="button" 
                        value='Cоздать событие' 
                        class='btn btn-danger' 
                        id='addEvents' 
                        @click='create_event'>
                    <input 
                        type="text" 
                        placeholder='Поиск по дате' 
                        id='search_with_date' 
                        class='searchDate'>
                </div>
                <table>
                    <thead>
                        <tr>
                            <td>Компания</td>
                            <td>Тип</td>
                            <td>Описание</td>
                            <td>Дата</td>
                            <td>Итог</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for='(pap, index) in papa' :key="index">
                            <td>{{pap.name}}</td>
                            <td>{{pap.type}}</td>
                            <td>{{pap.descr}}</td>
                            <td>{{pap.date}}</td>
                            <td>{{pap.conclusion}}</td>
                        </tr>
                    </tbody>
                </table>
                <div class='pagination_events'>
                    <div class='pagination_events_left'>
                        <a href="#" @click='changePageEvents(prevPage)'>Left</a> 
                    </div>
                    <div class='pagination_events_left'>
                        <a href="#" @click='changePageEvents(nextPage)'>Right</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
//пагинация для таблицы компаний и для ивентов. функцию одну и ту же оставить?
    export default {
        computed: {
            nextPage() {
                return this.current + 1;
            },
            prevPage() {
                return this.current - 1;        
            }
            // allCompanies(){
            //     return JSON.parse(this.companies);
            // }
        },
        data() {
            return {
                isActiveModal : false,
                isActiveModalEvents: false,
                name_of_company: '',
                email: '',
                contact_person: '',
                phone: '',
                site: '',
                isActiveCreatingCompany: false,
                // companies: this.arrayCompanies,
                creatingCompany: '',
                waiting: false,
                array_of_companies: '',
                mama:[
                    {
                        name: 'Dima',
                        id: 1,
                        goal: 'win',
                        asd : 'sad',
                        qwe : 'asdasd'
                    }
                ]
            }
        },
        methods: {
            changePage(){ // pagination argument "page"
                this.$emit('page-changed', page)
                // console.log(this.arrayCompanies);
            },
            cancelModal() {
                if (event.target == document.getElementById('modal')) {
                    this.isActiveModal = false;
                }
                return;
            },
            updateCompany() {
                this.isActiveModal = true;
                return;
            },
            cancelModalEvents() {
                if (event.target == document.getElementById('modalEvents')) {
                    this.isActiveModalEvents = false;
                }
                return;
            },
            getEvents() {
                this.isActiveModalEvents = true;
                return;
            },
            createCompany() {
                this.isActiveModal = true;
                
                return;
            },
            create_event() {
                this.$router.push('create_event');
                return;
            },
            postCompany() {
                this.isActiveCreatingCompany = true;
                fetch('http://localhost:3000/api/db/companies', {
                    method : 'POST',
                    headers:{
                        'Accept': 'application/json',
                        'Content-Type' : 'application/json'
                    },
                    credentials: 'include',
                    body: JSON.stringify({
                        name: this.name_of_company,
                        contact: this.contact_person,
                        phone: this.phone,
                        site: this.site
                        //email
                    }),
                })
                .then(() => {
                    this.isActiveCreatingCompany = false;
                })
                .then(() => {
                    return fetch('http://localhost:3000/api/db/companies',{
                        method : 'GET',
                        credentials: 'include',
                    })
                })
                .then(res => res.json())
                .then(data => {
                    this.array_of_companies = data;  
                })
                .catch(error => console.log(error))
                return;
            }
        },
        created(){
            this.waiting = true;
            fetch('http://localhost:3000/api/db/companies', {
                method : 'GET',
                credentials: 'include'
            })
            .then(res => {
                console.log(res);
                if( res ){      
                    return res.json();
                }else{
                    return '';
                }
            })
            .then(data => {
                this.$emit('logged', true);
                this.waiting = false;
                this.array_of_companies = data;
                console.log(this.array_of_companies);
            })
        }
    }
</script>

<style scoped>

    .pagination, .pagination_events{
        width: 100%;
        height: 44px;
        display: flex;
        justify-content: space-around;
        margin: 50px auto 60px;
    }

    .pagination_left, .pagination_right, .pagination_events_left, .pagination_events_right {
        width: 20%;
    }
    
    .pagination a, .pagination_events a{
        display: block;
        text-align: center;
        font-family: Arial, Helvetica, sans-serif;
        font-weight: 300;
        line-height: 42px;
        height: 44px;
        width: 80px;
        font-size: 18px;
        max-width: 150px;
        background-color: transparent;
        border-radius: 4px;
        border: 1px solid #ccc;
        text-decoration: none;
        margin: 0 6px;
        transition: all .2s ease-in-out;
    }

    .pagination a:hover, .pagination_events a:hover{
        border-color: #ea4c89;
        color: #ea4c89;
    }

    .table_of_companies{
        margin-left: 250px;
        font-size: 16px;
        font-family: Arial, Helvetica, sans-serif;
        width: 70%;
        padding-top: 50px;
    }

    table{
        border-collapse: separate;
        border-spacing: 0px 25px; 
    }

    .events, .upd{
        margin-left: 7px;
    }

    .btns{
        display: flex;
        flex-direction: row;
    }

    td{
        border:1px solid black;
        width: 180px;
        height: 10px;
        text-align: center;
    }

    .button_with_searcher{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        width: 83.5%;
    }

    .modal, .events_modal {
        display: block;
        position: fixed; 
        z-index: 1; 
        left: 0;
        top: 0;
        width: 100%; 
        height: 100%; 
        overflow: auto; 
        background-color: rgb(0,0,0); 
        background-color: rgba(0,0,0,0.4); 
    }

    .content_of_modal, .content_of_modal_events{
        background-color: #fefefe;
        margin: 10% auto; 
        padding: 20px;
        border: 1px solid #888;
        width: 70%; 
        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);
    }

    .close {
        color: #aaa;
        float: right;
        font-size: 28px;
        font-weight: bold;
    }

    .close:hover,
    .close:focus {
        color: black;
        text-decoration: none;
        cursor: pointer;
    }

    .content_of_modal h4, .content_of_modal_events h4{
        text-align: center;
    }

    .content_of_modal form, .content_of_modal_events form{
        display: flex;
        flex-direction: column;
    }

    .content_of_modal form div, .content_of_modal_events form div{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin-top: 15px;
    }

    .content_of_modal input, .content_of_modal_events input{
        margin-right: 80px;
        width: 350px;
    }

    #submit{
        width: 100px;
        text-align: center;
    }

    #addEvents{
        width: 150px;
        text-align: center;
    }

    .submit_info_of_company{
        display: flex;
        justify-content: center;
        margin-top: 35px;
    }

    label{
        font-size: 18px;
        margin-left: 100px;
    }

    #search_with_date{
        width: 200px;
    }

    .searcher_with_btn{
        display: flex;
        justify-content: space-between;
        flex-direction: row;
    }

    .waitingTitle{
        padding-left: 150px;
        color: coral;
        font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
    }

</style>

