<template>
    <div class='content_of_event'>
        <h4>Событие:</h4>
        <form>
            <div>
                <label for="title_of_event">Title of Event</label>
                <input type="text" id='title_of_company' v-model='title'>
            </div>
            <div> 
                <label for="date">Date</label>
                <input type="text" id='date' v-model='date'>
            </div>
            <div>
                <label for="type">Type</label>
                <input type="text" id='type' v-model='type'>
            </div>
            <div>
                <label for="description">Description</label>
                <input type="text" id='description' v-model='description'>
            </div>
            <div>
                <label for="staus">Status</label>
                <input type="text" id='status' v-model='status'>
            </div>
        </form>
        <div class='submit_info_of_company'>
            <input 
                type="button" 
                value='Submit' 
                class='btn btn-danger' 
                id='submit'
                @click='createEvent'>
            <h3 class='creatingEvent' v-if='creatingEvent'>Создание...</h3>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                title: '',
                type: '',
                date: '',
                description: '',
                status: '',
                creatingEvent: false,
                currentEvents: ''
            }
        },
        methods:{
            createEvent(){
                this.creatingEvent = true;
                fetch('http://localhost:3000/api/db/events', {
                    method : 'POST',
                    headers:{
                        'Accept': 'application/json',
                        'Content-Type' : 'application/json'
                    },
                    credentials: 'include',
                    body: JSON.stringify({
                        title: this.title,
                        type: this.type,
                        date: this.date,
                        description: this.description,
                        status: this.status
                    }),
                })
                .then(() => {
                    this.creatingEvent = false;
                    this.title = '';
                    this.type = '';
                    this.date = '';
                    this.description = '';
                    this.status = '';
                })
                // fetch('http://localhost:3000/api/db/events',{
                //     method : 'GET',
                //     credentials: 'include',
                // })
                // .then(res => res.json())
                // .then(data => {
                //     this.array_of_companies = data;  
                // })
            }
        }
    }
</script>

<style scoped>

    .content_of_event{
        margin-left: 100px;
        display: flex;
        flex-direction: column;
        width: 80%;
        margin: 0 auto;
        justify-content: center;
        font-family: Arial, Helvetica, sans-serif;
        font-size: 16px;
        padding-top: 60px;
    }

    h4{
        text-align: center;
    }

    form{
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 15px;
    }

    form div{
        display: flex;
        width: 40%;
        justify-content: space-between;
        margin-top: 25px;
    }

    .submit_info_of_company{
        margin: 0 auto;
        margin-top: 45px; 
    }

    label{
        margin-bottom: 0;
        font-family: Arial, Helvetica, sans-serif;
    }

    .creatingEvent{
        color: coral;
        font-family:Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
        margin-top: 25px;
    }
</style>

