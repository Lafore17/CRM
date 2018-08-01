<template>
    <div class='list_of_events'>
        <datepicker :inline="true" @selected='look'></datepicker>
        <div class='nearlyEventsBlock'>
            <h4>Ближайшие события:</h4>
            <div class='main_page'> 
                <div class='box_of_info'> <!-- массив ближайших событий --> 
                    <h3>data</h3>
                    <h4>title</h4>
                    <p>description</p>
                </div>
                <div class='button_with_phoneNumber'>
                    <input type="button" value='Перейти' class='btn btn-outline-danger' @click='getCurrentEvent'>
                    <span>Phone_Number</span>
                </div>
            </div>
        </div>
    </div>   
</template>

<script>
    import Datepicker from 'vuejs-datepicker';
    export default {
        data(){
            return{

            }
        },
        components:{
            Datepicker
        },
        methods:{
            look(value){
                console.log(value);
            },
            getCurrentEvent(){
                this.$router.push('create_event');
            }
        }
    }
</script>

<style>

    .vdp-datepicker__calendar {
        margin-left: 70px;
        height: 87vh;
        width: 70%;
        border: none;
        padding-top: 50px;
    }

    .vdp-datepicker__calendar .cell{
        height: 75px;
    }

    .nearlyEventsBlock{
        width: 50%;
        padding-top: 50px;
    }

    .nearlyEventsBlock>h4{
        text-align: center;
        width: 80%;
    }

    .main_page{
        border: 1px solid black;
        width: 80%;
        height: 25%;
    }

    .list_of_events{
        display: flex;
        flex-direction: row;
    }

    .vdp-datepicker{
        margin-left: 100px;
        width: 50%;
    }

    .button_with_phoneNumber{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }

    .button_with_phoneNumber span{
        margin-right: 15px;
    }

    .box_of_info{
        margin-left: 15px;
    }

    .button_with_phoneNumber input{
        margin-left: 15px;
        margin-bottom: 5px;
    }
    
</style>

