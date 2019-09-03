import Vue from 'vue'
import Vuex from 'vuex'
import designTemplatesJSON from "@/assets/json/designTemplates.json"

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        prevElementPane: "Shapes",
        designTemplates: designTemplatesJSON["designTemplates"],
    },
    mutations: {
        change(state, prevElementPane) {
            state.prevElementPane = prevElementPane
        }
    },
    getters: {
        prevElementPane: state => state.prevElementPane,
        designTemplates: state => state.designTemplates,
    }
})
