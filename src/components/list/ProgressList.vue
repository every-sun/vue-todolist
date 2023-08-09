<template>
    <div ref="scrollDiv" class="px-3 shadow-inner h-[78vh] mx-60 flex flex-col overflow-scroll scroll-smooth">
        <p class="text-center p-20" v-if="list.length == 0">진행중인 일이 없습니다.</p>
        <ItemSection v-for="object in list" :key="object.deadline" :object="object" :id="object.deadline" />
    </div>
</template>
<script setup>
import { useStore } from 'vuex';
import { computed } from 'vue';
import ItemSection from '../item/ItemSection.vue';

const store = useStore();

const list = computed(() => {
    let result = [];
    for (let i = 0; i < store.state.list.length; i++) {
        const data = store.state.list[i].items.filter((e) => !e.isCompleted);
        if (data.length > 0) {
            result.push({ deadline: store.state.list[i].deadline, items: [...data] });
        }
    }
    console.log(result);
    return result;
});

</script>
