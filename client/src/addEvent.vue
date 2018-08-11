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
                @click='createEvent'>
            <h3 class='creatingEvent' v-if='creatingEvent'>Создание...</h3>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                title: '',
                status: '',
                type: '',
                description: '',
                date: '',
                creatingEvent: false
            }
        },
        methods: {
            createEvent() {
                if( this.$store.state.target == 'создать событие' ) {
                    this.creatingEvent = true;
                    fetch('http://localhost:3000/api/db/events', {
                        method : 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type' : 'application/json'
                        },
                        credentials: 'include',
                        body: JSON.stringify({
                            title: this.title,
                            type: this.type,
                            date: this.date,
                            description: this.description,
                            status: this.status,
                            company: this.$store.state.currentCompany
                        })
                    })
                    .then( () => {
                        this.creatingEvent = false;
                        this.title = '';
                        this.type = '';
                        this.date = '';
                        this.description = '';
                        this.status = '';
                    })
                } else if( this.$store.state.target == 'Перейти' ) {
                    this.creatingEvent = true;
                    fetch(`http://localhost:3000/api/db/events/${this.$store.state.currentID_of_event}`, {
                        method : 'PUT',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type' : 'application/json'
                        },
                        credentials: 'include',
                        body: JSON.stringify({
                            title: this.title,
                            type: this.type,
                            date: this.date,
                            description: this.description,
                            status: this.status,
                            company: this.$store.state.currentCompany
                        })
                    })
                    .then( () => {
                        this.creatingEvent = false;
                        this.title = '';
                        this.type = '';
                        this.date = '';
                        this.description = '';
                        this.status = '';
                    })
                } else {
                    alert(`Пожалуйста, заполните данные поля!`);
                }
                
            }
        },
        created() {
            if( this.$store.state.target == 'Перейти' ) {
                this.title = this.$store.state.infoBlock.children[0].innerText;
                this.status = this.$store.state.infoBlock.children[1].innerText;
                this.type = this.$store.state.infoBlock.children[2].innerText;
                this.description = this.$store.state.infoBlock.children[3].innerText;
                this.date = this.$store.state.infoBlock.children[4].innerText;
            } else {
                this.title = '';
                this.status = '';
                this.type = '';
                this.description = '';
                this.date = '';
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

