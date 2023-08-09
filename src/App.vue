<template>
  <div class="flex flex-col h-screen elative overflow-hidden">
    <Content />
    <Footer class="absolute bottom-0" />
  </div>
</template>

<script setup>
import Content from './components/Content.vue';
import Footer from './components/Footer.vue';

</script>