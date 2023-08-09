<template>
    <div class="flex flex-col my-5">
        <Header @change="onCompChange" :comp="activeComp" />
        <Transition name="fade" mode="out-in">
            <component :is="comps[activeComp]"></component>
        </Transition>
    </div>
</template>

<script setup>
import Header from './Header.vue';
import AllList from './list/AllList.vue';
import CompletedList from './list/CompletedList.vue';
import ProgressList from './list/ProgressList.vue';
import { ref } from 'vue';
const comps = {
    CompletedList,
    ProgressList,
    AllList,
}
const activeComp = ref('AllList');
const onCompChange = (name) => {
    activeComp.value = name;

}
</script>
<style>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s ease;
}


.fade-leave-to {
    opacity: 0;
    transform: translateY(-10px);
}
</style>