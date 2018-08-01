<template>
    <div class='wrapper_of_boxInfos'>
        <h1>Ближайшие события:</h1>
        <div class='main_page'> 
            <div class='box_of_info'> <!-- массив ближайших событий --> 
                <h3>data</h3>
                <h4>title</h4>
                <p>description</p>
            </div>
            <div class='button'>
                <input type="button" value='Перейти' class='btn btn-outline-danger' @click='createEvent'>
            </div>
        </div>
        <!-- <router-view></router-view> -->
    </div>
</template>

<script>
    export default {
        props:[],
        data(){
            return{
                content : ''
            }
        },
        methods:{
            createEvent(event){
                this.content = event.target.parentNode.parentNode.children[0].children[0].innerText;
                console.log(this.content)
                this.$router.push('create_event');
            }
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
        border: 1px solid black;
        width: 60%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    .box_of_info{
        margin-left: 15px;
        margin-top: 5px;
    }

    .button{
        display: flex;
        align-items: flex-end;
        margin-bottom: 15px;
        margin-right: 15px;
    }

</style>

