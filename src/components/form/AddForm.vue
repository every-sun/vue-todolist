<template>
    <form class="my-3 flex gap-4" @submit.prevent="onSubmit">
        <input type="text" name="name" id="name" ref="inputRef" v-model="newValue"
            class="flex-1 rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="할일 입력" />
        <div class="flex flex-col"><label for="deadline" class="text-xs text-slate-900">Deadline</label>
            <input type="date" :min="today" id="deadline" v-model="deadlineValue">
        </div>
        <button type="submit"
            class="rounded-md bg-indigo-600 p-2 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            <PlusIcon class="h-5 w-5" aria-hidden="true" />
        </button>
    </form>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import { PlusIcon } from '@heroicons/vue/20/solid';
import { basicDateFormat } from '../../utils/format';
const newValue = ref('');
const deadlineValue = ref(basicDateFormat(new Date()));
const inputRef = ref(null);
const store = useStore();
const emits = defineEmits(['scroll']);
const onSubmit = () => {
    if (newValue.value.length < 1) return;
    store.commit('addData', {
        content: newValue.value,
        deadline: deadlineValue.value
    });
    newValue.value = '';
    emits('scroll', deadlineValue.value);
};
onMounted(() => {
    inputRef.value.focus();
});
const today = basicDateFormat(new Date());
</script>