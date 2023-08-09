<template>
    <div class="flex flex-col self-center w-4/6">
        <div class="w-full flex items-center relative">
            <div class="mb-4 flex justify-center items-center flex-1">
                <ChevronLeftIcon class="h-10 w-10 fill-indigo-600 cursor-pointer"
                    @click="$emit('change', comp === 'AllList' ? 'ProgressList' : (comp === 'CompletedList' ? 'AllList' : 'ProgressList'))" />
                <div class="w-[120px] h-[30px] relative text-center">
                    <h1 class="text-slate-900 text-xl">
                        {{ comp === 'AllList' ? 'TODOLIST' : (comp === 'ProgressList' ? 'Progress' : 'Completed') }}
                    </h1>
                </div>
                <ChevronRightIcon class="h-10 w-10 fill-indigo-600 cursor-pointer"
                    @click="$emit('change', comp === 'AllList' ? 'CompletedList' : (comp === 'ProgressList' ? 'AllList' : 'CompletedList'))" />
            </div>
            <div v-if="comp === 'AllList'"
                class="absolute right-0 rounded p-1 font-semibold flex gap-4 justify-between shadow-sm border border-sky-100">
                <button @click="store.commit('sortList')">
                    <Bars3BottomLeftIcon class="w-5 h-5 " />
                </button>
                <button @click="clearMethod">
                    <TrashIcon class="w-5 h-5" />
                </button>
            </div>
        </div>
        <div class="w-full py-4" @mouseover="isTooltipShow = true" @mouseout="isTooltipShow = false">
            <div class="w-full h-1 bg-slate-200 border rounded-lg relative">
                <div class="h-full rounded-lg bg-gradient-to-r from-yellow-200 via-purple-500 to-pink-500 ease-linear duration-300"
                    :style="{ width: `${count === 0 ? 0 : parseInt((completedCount / count) * 100)}%` }">
                </div>
                <p v-if="isTooltipShow"
                    class="before:content-[''] before:absolute before:-top-1.5 before:left-[2px] before:w-[10px] before:h-[12px] before:bg-black before:rounded-tl-[10px] before:rounded-tr-[100px] absolute -bottom-8 -right-6 p-1 bg-black text-xs opacity-80 text-white rounded-md">
                    {{
                        `진행률 ${progressWidth} (${completedCount}/${count})` }}</p>
            </div>
        </div>
    </div>
</template>
<script setup>
import { computed, ref, watchEffect } from 'vue';
import { useStore } from 'vuex';
import { TrashIcon, Bars3BottomLeftIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/24/solid';
defineProps(['comp']);
defineEmits(['change']);

const store = useStore();
const completedCount = computed(() => {
    let count = 0;
    for (let i = 0; i < store.state.list.length; i++) {
        count += store.state.list[i].items.filter((e) => e.isCompleted == true).length;
    }
    return count;
})
const count = computed(() => store.state.count);
const progressWidth = ref(`${count.value === 0 ? 0 : parseInt((completedCount.value / count.value) * 100)}%`);
watchEffect(() => {
    progressWidth.value = `${count.value === 0 ? 0 : parseInt((completedCount.value / count.value) * 100)}%`;
});
const clearMethod = () => {
    if (window.confirm('목록을 비우시겠습니까?')) {
        store.commit('clearList')
    }
}
const isTooltipShow = ref(false);

</script>