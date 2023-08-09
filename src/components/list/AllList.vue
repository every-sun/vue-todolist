<template>
    <div>
        <AddForm class="px-60" @scroll="scrollDownFunc" />
        <div ref="scrollDiv" class="px-3 shadow-inner mx-60 h-[70vh] flex flex-col overflow-scroll scroll-smooth">
            <ItemSection v-for="object in list" :key="object.deadline" :object="object" :id="object.deadline" />
        </div>
    </div>
</template>

<script setup>
import AddForm from '../form/AddForm.vue';
import { useStore } from 'vuex';
import { computed, ref } from 'vue';
import ItemSection from '../item/ItemSection.vue';

const store = useStore();
const list = computed(() => store.state.list.filter((e) => e.items.length > 0));

const scrollDiv = ref(null);

const scrollDownFunc = (deadline) => {  // TODO 스크롤
    window.setTimeout(() => {
        if (scrollDiv.value) {
            scrollDiv.value.scrollTop = scrollDiv.value.scrollHeight;
        }
    }, 300)
};
</script>