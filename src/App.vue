<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
</script>

<template>
  <NavBar class="myHeader" />
  <RouterView class="myContent" />
</template>

<style>
#app {
  display: flex;
  flex-flow: column;
  height: 100vh;
}
.myHeader {
  flex-grow: 0;
  flex-basis: auto;
}
.myContent {
  flex-grow: 1;
  flex-basis: auto;
}
.myfooter {
  flex-grow: 0;
  flex-basis: 100px;
}
</style>
