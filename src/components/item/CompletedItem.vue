<template>
    <div class="flex items-center gap-3">
        <slot name="num" />
        <p class="text-sm font-medium leading-6 break-all whitespace-pre-line line-through">
            {{ item.content }}
        </p>
        <p class="flex-none text-xs font-medium leading-6 break-all whitespace-pre-line text-slate-400 self-end">
            완료일: {{ item.completedAt }}
        </p>
    </div>
</template>

<script setup>

const props = defineProps({
    item: Object
});

</script>

