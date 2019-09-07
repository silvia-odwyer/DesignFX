import Vue from 'vue'
import Vuex from 'vuex'
import designTemplatesJSON from "@/assets/json/designTemplates.json"

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        prevElementPane: "Shapes",
        designTemplates: designTemplatesJSON["designTemplates"],
        transformer: null,
        canvas_to_json: {
            filename: "Design1",
            elements: {
                rectangles: [],
                circles: [],
                lines : [],
                ellipses: [],
            },
            text: [],
            images: [],
            background: {},
            backgroundColor: "#FFFFFF"
        },
        new_canvas_to_json: {
            filename: "Design1",
            elements: {
                rectangles: [],
                circles: [],
                lines : [],
                ellipses: [],
            },
            text: [],
            images: [],
            background: {},
            backgroundColor: "#FFFFFF"
        },
        user: null,
        userData: null,
        designs: []
    },
    mutations: {
        change(state, prevElementPane) {
            state.prevElementPane = prevElementPane
        },
        setTransformer(state, transformer) {
            state.transformer = transformer
        },
        updateCanvas(state, canvas_to_json) {
            state.canvas_to_json = canvas_to_json
        },
        updateUser(state, user) {
            state.user = user
        },
        updateDesigns(state, designs) {
            state.designs = designs
        },
        updateUserData(state, userData) {
            state.userData = userData
        }
    },
    getters: {
        prevElementPane: state => state.prevElementPane,
        designTemplates: state => state.designTemplates,
        transformer: state => state.transformer,
        user: state => state.user,
        canvas_to_json: state => state.canvas_to_json,
        designs: state => state.designs,
        userData: state => state.userData,
        new_canvas_to_json: state => state.new_canvas_to_json,
    }
})
