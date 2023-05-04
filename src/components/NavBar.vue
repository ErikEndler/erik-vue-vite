<script setup lang="ts">
import { computed, reactive } from 'vue'
import router from '../router'

const state = reactive({
  showNavBar: false
})

function goHome() {
  router.push({ name: 'home' })
}
function goSimpleForm() {
  router.push({ name: 'simpleForm' })
}
function clickNavBar() {
  state.showNavBar = !state.showNavBar
}
const show = computed(() => (state.showNavBar ? 'show' : ''))
const collapse = computed(() => (state.showNavBar ? '' : 'collapse'))
</script>
<template>
  <div>
    <nav class="navbar navbar-expand-lg bg-dark">
      <div class="container-fluid">
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo01"
          aria-controls="navbarTogglerDemo01"
          aria-expanded="false"
          aria-label="Toggle navigation"
          @click="clickNavBar()"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="navbar-collapse" :class="collapse" id="navbarTogglerDemo01" style="">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link" aria-current="page" @click="goHome()">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" @click="goSimpleForm()">Simple Form</a>
            </li>
          </ul>
          <div class="d-flex">
            <input
              class="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button class="btn btn-outline-success">Search</button>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<style scoped>
a {
  cursor: pointer;
  color: var(--text-dark-2);
}
.nav-link {
  color: var(--text-dark-2);
}
a:hover {
  color: gold;
}
</style>
