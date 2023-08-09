<template>
    <div class="flex items-center gap-3 justify-between mb-2">
        <div v-if="!isEditMode" class="flex gap-2">
            <label :for="item.id" class="flex-none w-6 h-6 text-indigo-600">
                <CheckBadgeIcon v-if="item.isCompleted" class="fill-indigo-600" />
                <CheckCircleIcon v-else />
            </label>
            <input :id="item.id" type="checkbox" class="hidden" :checked="item.isCompleted"
                @click="$emit('check', item.id)">
            <slot name="num" />
            <p class="text-sm font-medium leading-6 break-all whitespace-pre-line"
                :class="[{ 'line-through': item.isCompleted }]">
                {{ item.content }}
            </p>
        </div>
        <div v-if="!isEditMode" class="flex gap-1">
            <button type="button"
                class="rounded-full bg-indigo-600 p-1 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                @click="$emit('delete', item.id, item.content)">
                <MinusIcon class="w-4 h-4" />
            </button>
            <button type="button"
                class="rounded-full bg-indigo-600 p-1 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                @click="onToggle">
                <PencilSquareIcon class="w-4 h-4" />
            </button>
        </div>
        <form v-if="isEditMode" class="w-full flex items-center justify-between gap-3"
            @submit.prevent="$emit('edit', item.id, newContent, onToggle)">
            <input type="text" ref="inputRef" class="flex-1 rounded-md p-1 border-0 text-gray-900" v-model="newContent" />
            <button type="submit"
                class="rounded-full bg-indigo-600 p-1 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                <PencilSquareIcon class="w-4 h-4" />
            </button>
        </form>
    </div>
</template>

<script setup>
import { ref, onUpdated } from 'vue';
import { MinusIcon, PencilSquareIcon, CheckCircleIcon } from "@heroicons/vue/24/outline";
import { CheckBadgeIcon } from "@heroicons/vue/24/solid";

const props = defineProps({
    item: Object
});
const emits = defineEmits(['check', 'edit', 'delete']);
const isEditMode = ref(false);
const onToggle = () => {
    isEditMode.value = !isEditMode.value;
};
const newContent = ref(props.item.content);
const inputRef = ref(null);
onUpdated(() => {
    inputRef?.value?.focus();
});

</script>

