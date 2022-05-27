
<script setup lang="ts">import { ref } from "vue";

const count = ref(0);
const addHandler = () => {
  count.value++;
};

</script>

<template>
  <div>
    <button @click="addHandler">点击</button>
    <p>{{ count }}</p>
  </div>
</template>

<style lang="scss" scoped>
</style>
