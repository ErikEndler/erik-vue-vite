<script setup lang="ts">
import { computed, reactive } from 'vue'
import router from '@/router'
import LanguageSwitcher from '@/components/LanguageSwitcher.vue'

const state = reactive({
  showNavBar: false
})

function goTo(destiny: string) {
  router.push({ name: destiny })
}

function clickNavBar() {
  state.showNavBar = !state.showNavBar
}
// const show = computed(() => (state.showNavBar ? 'show' : ''))
const collapse = computed(() => (state.showNavBar ? '' : 'collapse'))
defineExpose({
  clickNavBar,
  goTo
})
</script>

<template>
  <div id="myHeader">
    <nav class="navbar navbar-dark navbar-expand-lg">
      <div class="container-fluid">
        <button
          id="navbarToggler"
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
        <div class="navbar-collapse" :class="collapse" id="navbarTogglerCollapse">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link" aria-current="page" id="homeNavLink" @click="goTo('Home')">{{
                $t('nav.home')
              }}</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" id="simpleFormNavLink" @click="goTo('SimpleForm')">{{
                $t('nav.simple-form')
              }}</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" id="modalsNavLink" @click="goTo('Modals')">{{
                $t('nav.modals')
              }}</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" id="tipCalculatorNavLink" @click="goTo('TipCalculator')"
                >Tip Calculator</a
              >
            </li>
            <li class="nav-item">
              <LanguageSwitcher id="languageSwitcher"></LanguageSwitcher>
            </li>
          </ul>
          <div class="d-flex">
            <input
              id="input-search-nav-bar"
              class="form-control me-2"
              type="search"
              :placeholder="$t('nav.search')"
              aria-label="Search"
            />
            <button id="btn-search-nav-bar" class="btn btn-outline-success">
              {{ $t('nav.search') }}
            </button>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<style scoped>
.myHeader {
  position: sticky;
  top: 0;
  z-index: 100;
  background: var(--Very-dark-blue);
}
.nav-item {
  margin: auto;
}
a {
  cursor: pointer;
  color: var(--Pale-Blue);
}
.nav-link {
  color: var(--Pale-Blue);
}
a:hover {
  color: gold;
}
.navbar-toggler-icon {
  color: var(--Pale-Blue);
}
</style>
