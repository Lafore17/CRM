<template>
    <div class='content_of_event'>
        <h4>Событие:</h4>
        <form>
            <div>
                <label for="title_of_event">Title of Event</label>
                <input type="text" id='title_of_company'>
            </div>
            <div> 
                <label for="data">Data</label>
                <input type="text" id='data'>
            </div>
            <div>
                <label for="type">Type</label>
                <input type="text" id='type'>
            </div>
            <div>
                <label for="description">Description</label>
                <input type="text" id='description'>
            </div>
            <div>
                <label for="conclusion">Conclusion</label>
                <input type="email" id='conclusion'>
            </div>
        </form>
        <div class='submit_info_of_company'>
            <input type="button" value='Submit' class='btn btn-danger' id='submit'>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{

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

</style>

