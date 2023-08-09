<template>
    <div class="px-3 pt-4 shadow-inner h-[78vh] bg-red-50 mx-60 flex flex-col overflow-scroll scroll-smooth gap-1">
        <p class="text-center p-20" v-if="list.length == 0">완수한 일이 없습니다.</p>
        <CompletedItem v-for="(item, index) in list" :item="item" :key="item.id">
            <template #num>
                <p class='text-slate-400 line-through self-start'>{{ index + 1 }}</p>
            </template>
        </CompletedItem>
    </div>
</template>

<script setup>
import { useStore } from 'vuex';
import { computed } from 'vue';
import CompletedItem from '../item/CompletedItem.vue';

const store = useStore();

const list = computed(() => {
    let result = [];
    for (let i = 0; i < store.state.list.length; i++) {
        const data = store.state.list[i].items.filter((e) => e.isCompleted);
        result.push(...data);
    }
    result.sort((a, b) => {
        const aNum = parseInt(a.completedAt.split('-').join(''));
        const bNum = parseInt(b.completedAt.split('-').join(''));
        return aNum - bNum;
    });
    return result;
});

</script>