import { createStore } from 'vuex';
import { v4 as uuidv4 } from 'uuid';
import createPersistedState from 'vuex-persistedstate';
import { basicDateFormat } from '../utils/format';

const store = createStore({
    state: {
        count: 0,
        list: [],  // [{deadline: 2023-08-03, items: [{id: '', date: '', content: '', isCompleted: false, completedAt: false}]}]
    },
    mutations: {
        addData(state, payload) {
            const idx = state.list.findIndex((e) => e.deadline === payload.deadline);
            const object = { id: uuidv4(), date: basicDateFormat(new Date()), content: payload.content, isCompleted: false, completedAt: '' };
            if (idx != -1) {
                state.list[idx].items.push(object)
            } else {
                state.list.push({ deadline: payload.deadline, items: [object] });
            }
            state.count++;
        },
        checkData(state, payload) {
            const idx = state.list.findIndex((e) => e.deadline === payload.deadline);
            if (idx != -1) {
                const itemIdx = state.list[idx].items.findIndex(item => item.id == payload.id);
                state.list[idx].items[itemIdx].isCompleted = !state.list[idx].items[itemIdx].isCompleted;
                if (state.list[idx].items[itemIdx].isCompleted) {
                    state.list[idx].items[itemIdx].completedAt = basicDateFormat(new Date());
                } else {
                    state.list[idx].items[itemIdx].completedAt = '';
                }
            }
        },
        editContent(state, payload) {
            const idx = state.list.findIndex((e) => e.deadline === payload.deadline);
            if (idx != -1) {
                const itemIdx = state.list[idx].items.findIndex(item => item.id == payload.id);
                state.list[idx].items[itemIdx].content = payload.text;
            }
        },
        deleteItem(state, payload) {
            const idx = state.list.findIndex((e) => e.deadline === payload.deadline);
            if (idx != -1) {
                const itemIdx = state.list[idx].items.findIndex(item => item.id == payload.id);
                state.list[idx].items.splice(itemIdx, 1)
            }
            state.count--;
        },
        clearList(state) {
            state.list = [];
            state.count = 0;
        },
        sortList(state) {
            for (let i = 0; i < state.list.length; i++) {
                state.list[i].items.sort((a, b) => a.isCompleted - b.isCompleted);
            }
            state.list.sort((a, b) => {
                const aNum = parseInt(a.deadline.split('-').join(''));
                const bNum = parseInt(b.deadline.split('-').join(''));
                return aNum - bNum;
            });
        }
    },
    plugins: [
        createPersistedState()
    ]
});
export default store;