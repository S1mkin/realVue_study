import Vue from 'vue'
import Vuex from 'vuex'
import line from './modules/line'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        line
    }
})