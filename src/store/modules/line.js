export default {
    actions: {
        pushLine(ctx) {
            ctx.commit('increment')
        }
    },
    mutations: {
        increment(state) {
            state.LinePush++;
        }
    },
    state: {
        line: [],
        LinePush: 5
    },
    getters: {
        getLine(state) {
            return state.line
        },
        getCountPush(state) {
            return state.LinePush
        }
    }, 
}