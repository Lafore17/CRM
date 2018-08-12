<template>
    <div class='list_of_events'>
        <h4 class='waiting' v-if='waiting'>Ждите...</h4>
        <datepicker 
            :inline="true" 
            @selected='look' 
            :value="state.date" 
            :monday-first='true' 
            :highlighted="highlighted">
        </datepicker>
        <div class='nearlyEventsBlock'>
            <h4>Ближайшие события:</h4>
            <div class='main_page'> 
                <div class='box_of_info' v-for='(event, index) in monthlyEvents' :key="index"> 
                    <h5>{{event.title}}</h5>
                    <p>{{event.status}}</p>
                    <p>{{event.type}}</p>
                    <p>{{event.description}}</p>
                    <p>{{event.date}}</p>
                    <div class='button_with_phoneNumber'>
                        <input type="button" value='Перейти' class='btn btn-outline-danger' @click='getCurrentEvent'>
                        <span>{{event.phone}}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>   
</template>

<script>
    import Datepicker from 'vuejs-datepicker';
    export default {
        data() {
            return {
                waiting: false,
                monthlyEvents: [],
                state : {
                    date: new Date()
                },
                highlighted: {}
            }
        },
        components: {
            Datepicker
        },
        methods: {
            look(value) {
                console.log(value);
                return;
            },
            getCurrentEvent(event) {
                this.$store.dispatch('getInfoBlock', {
                    block: event.target.parentNode.parentNode,
                    target:  event.target.value
                });
                this.$router.push('create_event');
                return;
            }
        },
        created() {
            this.highlighted = {
                arr : this.$store.state.arrayOfEvents,
                customPredictor(date) {
                    for( let event of this.arr ) {
                        if ( date.getMonth() + 1 == event.date.slice(6, 7) && date.getFullYear() == event.date.slice(0, 4) && date.getDate() - 1 == event.date.slice(8, 10) ) {                                
                            return true;
                        }
                    }  
                }
            }
            for( let event of this.$store.state.arrayOfEvents ) {
                if( event.date.slice(6, 7) == this.state.date.getMonth() + 1 && event.date.slice(0, 4) == this.state.date.getFullYear() ) {
                    this.monthlyEvents.push(event);
                }
            }
            for( let event of this.monthlyEvents ) {
                for( let company of this.$store.state.arrayOfCompanies ) {
                    if( event.company === company.name ) {
                        event.phone = company.phone;
                    }
                }
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

    .vdp-datepicker__calendar .cell {
        height: 75px;
    }

    .nearlyEventsBlock {
        width: 50%;
        padding-top: 50px;
    }

    .nearlyEventsBlock > h4 {
        text-align: center;
        width: 80%;
    }

    .main_page {
        width: 80%;
        height: 25%;
    }

    .list_of_events {
        display: flex;
        flex-direction: row;
    }

    .vdp-datepicker {
        margin-left: 100px;
        width: 50%;
    }

    .button_with_phoneNumber {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        margin-top: 25px;
    }

    .button_with_phoneNumber span {
        margin-right: 15px;
    }

    .box_of_info {
        margin-left: 15px;
        margin-top: 10px;
        border-bottom: 0.5px solid black;
    }

    .button_with_phoneNumber input {
        margin-bottom: 10px;
    }
    
    .box_of_info{
        font-size: 12px;
    }
</style>

