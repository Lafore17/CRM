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
                        class='form-control'
                        v-model='searchContent'>
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
                    </tr>
                </thead>
                <tbody>  
                    <tr v-for='(par, index) in arr' :key="index">
                        <td>{{par.name}}</td>
                        <td>{{par.email}}</td>
                        <td>{{par.contact}}</td>
                        <td>{{par.phone}}</td>
                        <td>{{par.site}}</td>
                        <div class='btns'>
                            <input 
                                type="button" 
                                value="events" 
                                class='events btn btn-outline-info'
                                @click='getEvents'>
                            <input 
                                type="button" 
                                value="upd" 
                                class='upd btn btn-outline-info' 
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
                <form class='formBlock'>
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
                        value='создать событие' 
                        class='btn btn-danger width' 
                        @click='create_event'>
                    <input 
                        type="text" 
                        placeholder='Поиск по заголовку'
                        class='searchDate'
                        v-model='searchEvent'
                        @input='getWantedEvents'>
                </div>
                <table>
                    <thead>
                        <tr>
                            <td>Заголовок</td>
                            <td>Тип</td>
                            <td>Описание</td>
                            <td>Дата</td>
                            <td>Итог</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-if='!searchEvent' v-for='(event, index) in $store.state.rightArrayEvents' :key="index">
                            <td>{{event.title}}</td>
                            <td>{{event.type}}</td>
                            <td>{{event.description}}</td>
                            <td>{{event.date}}</td>      
                            <td>{{event.status}}</td>
                        </tr>
                        <tr v-if='searchEvent' v-for='(event, index) in array_of_events' :key="index">
                            <td>{{event.title}}</td>
                            <td>{{event.type}}</td>
                            <td>{{event.description}}</td>
                            <td>{{event.date}}</td>      
                            <td>{{event.status}}</td>
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
            },
            arr() {
                return this.$store.state.arrayOfCompanies.filter(company => company.name.startsWith(this.searchContent) )
            }
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
                creatingCompany: '',
                waiting: false,
                searchContent: '',
                searchEvent: '',
                array_of_events: []
            }
        },
        methods: {
            getWantedEvents() {
                this.array_of_events = [];
                for( let event of this.$store.state.arrayOfEvents ) {
                    if( this.searchEvent === event.title) {
                        this.array_of_events.push(event);
                    }
                }
                return;
            },
            changePage() { // pagination argument "page"
                this.$emit('page-changed', page);
                return;
            },
            cancelModal() {
                if (event.target == document.getElementById('modal')) {
                    this.isActiveModal = false;
                }
                return;
            },
            updateCompany(event) {
                this.$store.dispatch('getTarget', event.target.value);
                this.isActiveModal = true;
                this.$store.dispatch('processingFindingId', event.target.parentNode.parentNode);
                this.name_of_company = event.target.parentNode.parentNode.children[0].innerText;
                this.email = event.target.parentNode.parentNode.children[1].innerText;
                this.contact_person = event.target.parentNode.parentNode.children[2].innerText;
                this.phone = event.target.parentNode.parentNode.children[3].innerText;
                this.site = event.target.parentNode.parentNode.children[4].innerText;
                return;
            },
            cancelModalEvents() {
                if (event.target == document.getElementById('modalEvents')) {
                    this.isActiveModalEvents = false;
                }
                return;
            },
            getEvents(event) {
                this.isActiveModalEvents = true;
                this.$store.dispatch('processingNameOfCompany', event.target.parentNode.parentNode.children[0].innerText);    //получение нужной компании
                this.$store.dispatch('processingSearchingEvents');   // нужные ивенты для текущей компании
                return;
            },
            createCompany() {
                this.isActiveModal = true;
                this.name_of_company = '';
                this.email = '';
                this.contact_person = '';
                this.phone = '';
                this.site = '';
                return;
            },
            create_event(event) {
                this.$store.dispatch('getTarget', event.target.value);
                this.$router.push('create_event');
                return;
            },
            postCompany() {
                if( this.$store.state.target == 'upd' ) {
                    this.isActiveCreatingCompany = true;
                    fetch(`http://localhost:3000/api/db/companies/${this.$store.state.currentID_of_companies}`, {
                        method : 'PUT',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type' : 'application/json'
                        },
                        credentials: 'include',
                        body: JSON.stringify({
                            name: this.name_of_company,
                            email: this.email,
                            contact: this.contact_person,
                            phone: this.phone,
                            site: this.site
                        })
                    })
                    .then( () => {
                        this.isActiveCreatingCompany = false;
                        this.creatingEvent = false;
                        this.name_of_company = '';
                        this.email = '';
                        this.contact_person = '';
                        this.phone = '';
                        this.site = '';
                        return fetch('http://localhost:3000/api/db/companies', {
                            method : 'GET',
                            credentials: 'include',
                        })
                    })
                    .then( res => res.json() )
                    .then( data => this.$store.dispatch("processingGettingCompanies", data))
                    .catch( error => alert(error) ) 
                } else {
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
                            site: this.site,
                            email: this.email
                        }),
                    })
                    .then(() => {
                        this.isActiveCreatingCompany = false;
                    })
                    .then(() => {
                        return fetch('http://localhost:3000/api/db/companies', {
                            method : 'GET',
                            credentials: 'include',
                        })
                    })
                    .then(res => res.json())
                    .then(data => {
                        this.$store.dispatch("processingGettingCompanies", data); 
                    })
                    .catch(error => console.log(error))

                    this.name_of_company = '';
                    this.contact_person = '';
                    this.phone = '';
                    this.site = '';
                    this.email = '';
                }
            }
        }
    }
</script>

<style scoped>

    .formBlock input{
        margin-right: 200px;
    }

    .formBlock label{
        margin-left: 200px;
    }

    .loading {
        margin-bottom: 15px;
    }

    .pagination, .pagination_events {
        width: 100%;
        height: 44px;
        display: flex;
        justify-content: space-around;
        margin: 50px auto 60px;
    }

    .pagination_left, .pagination_right, .pagination_events_left, .pagination_events_right {
        width: 20%;
    }
    
    .pagination a, .pagination_events a {
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

    .pagination a:hover, .pagination_events a:hover {
        border-color: #ea4c89;
        color: #ea4c89;
    }

    .table_of_companies {
        margin-left: 300px;
        font-size: 16px;
        font-family: Arial, Helvetica, sans-serif;
        width: 1200px;
        padding-top: 50px;
    }

    .events, .upd {
        margin-left: 7px;
    }

    .btns {
        display: flex;
        flex-direction: row;
    }

    .button_with_searcher {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        width: 76%;
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

    .content_of_modal, .content_of_modal_events {
        background-color: #fefefe;
        margin: 10% auto; 
        padding: 20px;
        border: 1px solid #888;
        width: 70%; 
        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .close {
        color: #aaa;
        float: right;
        font-size: 28px;
        font-weight: bold;
        display: flex;
        justify-content: flex-end;
    }

    .close:hover, .close:focus {
        color: black;
        text-decoration: none;
        cursor: pointer;
    }

    .content_of_modal h4, .content_of_modal_events h4 {
        text-align: center;
    }

    .content_of_modal form, .content_of_modal_events form {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
    }

    .content_of_modal form div, .content_of_modal_events form div {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin-top: 15px;
    }

    .content_of_modal input, .content_of_modal_events input {
        /* margin-right: 80px; */
        margin-top: 5px;
        width: 200px;
    }

    #submit {
        width: 100px;
        text-align: center;
    }

    #addEvents {
        width: 150px;
        text-align: center;
    }

    .submit_info_of_company {
        display: flex;
        justify-content: center;
        margin-top: 35px;
    }

    label {
        font-size: 17px;
        margin-left: 90px;
    }

    #search_with_date {
        width: 200px;
    }

    .searcher_with_btn {
        display: flex;
        justify-content: space-between;
        flex-direction: row;
        margin-top: 5px;
    }

    .waitingTitle {
        padding-left: 150px;
        color: coral;
        font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
    }

    table {
        font-family: "Lucida Sans Unicode", "Lucida Grande", Sans-Serif;
        font-size: 14px;
        border-radius: 10px;
        border-spacing: 0;
        text-align: center;
        margin-top: 25px;
    }

    th {
        background: #BCEBDD;
        color: white;
        text-shadow: 0 1px 1px #2D2020;
        padding: 10px 20px;
    }

    th, td {
        border-style: solid;
        border-width: 0 1px 1px 0;
        border-color: white;
        width: 250px;
    }

    th:first-child, td:first-child {
        text-align: left;
    }
    
    th:first-child {
        border-top-left-radius: 10px;
    }

    th:last-child {
        border-top-right-radius: 10px;
        border-right: none;
    }

    td {
        padding: 10px 20px;
        background: #F8E391;
        width: 185px;
    }

    tr td:last-child {
        border-right: none;
    }

    thead td{
        background-color: rgb(221, 188, 188);
    }

</style>

