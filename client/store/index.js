import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state:{
        target: '',
        infoBlock: '',
        arrayOfEvents: '',
        currentCompany: '',
        rightArrayEvents: [],
        eventID: '',
        currentID_of_event: '',
        arrayOfCompanies: ''
    },
    mutations:{
        getTarget(state, target) {
            state.target = target;
            return;
        },
        getInfoBlock(state, infoBlock) {
            state.infoBlock = infoBlock;
            return;
        },
        getEvents(state, events) {
            state.arrayOfEvents = events.sort((a, b) => {
                let c = new Date(a.date);
                let d = new Date(b.date);
                return c - d;
            });
            return;
        },
        getNameOfCompany(state, title) {
            state.currentCompany = title;
            return;
        },
        searchingEvents(state) {
            state.rightArrayEvents = [];
            for( let event of state.arrayOfEvents ) {
                if( event.company === state.currentCompany ) {
                    state.rightArrayEvents.push(event);
                }
            }
            return;
        },
        getID(state, data) {
            let nameEvent = data.children[0].innerText;
            for( let event of state.arrayOfEvents ) {
                if( event.title === nameEvent ) {
                    state.currentID_of_event = event._id;
                }
            }
            return;
        },
        getCompanies(state, companies){
            state.arrayOfCompanies = companies;
            return;
        }
    },
    actions:{
        getTarget({commit}, target) {
            commit('getTarget', target);
            return;
        },
        getInfoBlock({commit}, obj) {
            commit('getTarget', obj.target);
            commit('getInfoBlock', obj.block);
            commit('getID', obj.block);
            return;
        },
        processingEvents({commit}, arrayEvent) {
            commit('getEvents', arrayEvent);
            return;
        },
        processingNameOfCompany({commit}, title) {
            commit('getNameOfCompany', title);
            return;
        },
        processingSearchingEvents({commit}){
            commit('searchingEvents');
            return;
        },
        processingGettingCompanies({commit}, companies){
            commit("getCompanies", companies);
            return;
        }
    }
})