<template>
    <div class='wrapper_of_boxInfos'>
        
        <h1>Ближайшие события:</h1>
        <div class='main_page'> 
            <h4 class='waiting' v-if='waiting'>
                Идет загрузка...
            </h4>
            <div class='box_of_info' v-for='(elem, index) in array_of_events' :key="index">
                <h4>{{elem.title}}</h4>
                <h4>{{elem.status}}</h4>
                <p>{{elem.type}}</p>
                <p>{{elem.description}}</p>
                <p>{{elem.date}}</p>
                <div class='button'>
                    <input type="button" value='Перейти' class='btn btn-outline-danger' @click='createEvent'>
                </div>
            </div>  
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                content : '',
                array_of_events: '',
                waiting: true
            }
        },
        methods: {
            createEvent(event){
                this.content = event.target.parentNode.parentNode.children[0].children[0].innerText;
                console.log(this.content)
                this.$router.push('create_event');
            }
        },
        created() {
            this.waiting = true;
            fetch('http://localhost:3000/api/db/events',{
                method : 'GET',
                credentials: 'include',
            })
            .then(res => res.json())
            .then(data => {
                this.array_of_events = data;
                this.waiting = false;  
            })
            .catch(error => alert(error))
        }
    }
</script>

<style scoped>

    .wrapper_of_boxInfos{
        display: flex;
        flex-direction: column;
        align-items: center;
        font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
        padding-top: 50px;
    }

    .main_page{
        width: 60%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .box_of_info{
        border: 1px solid black;
        margin-left: 15px;
        margin-top: 15px;
    }

    .button{
        display: flex;
        align-items: flex-end;
        margin-bottom: 15px;
        margin-right: 15px;
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

