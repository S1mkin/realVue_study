export default {
    actions: {
        pushLine(ctx) {
            ctx.commit('increment')
        }
    },
    mutations: {
        incLinePushCounter(state) {
            state.LinePush++;
        },
        clearLinePushCounter(state) {
            state.LinePush = 0;
        }
    },
    state: {
        line: [],
        LinePush: 0
    },
    getters: {
        getLine(state) {
            return state.line
        },
        getCountPush(state) {
            return state.LinePush
        },
        getLineToTheEnd(state) { 
            let result = 20 - state.LinePush; /* this.levelSettings[this.level-1].lines */
            if (result < 0) result = 0;
            return result;
        },
    }, 
}