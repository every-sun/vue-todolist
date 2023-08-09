<template>
    <div class="border-b-2 py-6">
        <p class="text-slate-400 mb-2">{{ object.deadline }}</p>
        <TransitionGroup name="list" tag="ul">
            <Item v-for="(item, index) in object.items" :item="item" :key="item.id" @check="checkMethod" @edit="onEdit"
                @delete="onDelete">
                <template #num>
                    <p :class="[{ 'line-through': item.isCompleted }, 'text-slate-400',]">{{ index + 1 }}</p>
                </template>
            </Item>
        </TransitionGroup>
    </div>
</template>
<script setup>
import Item from './Item.vue';
import { useStore } from 'vuex';
const props = defineProps({
    object: Object
})
const store = useStore();
const checkMethod = (id) => store.commit('checkData', {
    deadline: props.object.deadline,
    id: id
});
const onEdit = (id, text, onToggle) => {
    store.commit('editContent', {
        deadline: props.object.deadline,
        id: id,
        text: text
    });
    onToggle();
};
const onDelete = (id, content) => {
    if (window.confirm(`'${content}'을 삭제하시겠습니까?`)) {
        store.commit('deleteItem', {
            deadline: props.object.deadline,
            id: id,
        })
    }
}
</script>
<style>
.list-enter-active,
.list-leave-active {
    transition: all 0.2s ease;
}

.list-enter-from,
.list-leave-to {
    opacity: 0;
    transform: translateX(-100px);
}
</style>