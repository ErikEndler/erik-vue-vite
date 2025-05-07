<script setup lang="ts">
import router from '../router'
import { onMounted } from 'vue'
import { useUiStore } from '@/stores/uiStore'
import { useI18n } from 'vue-i18n'

const uiStore = useUiStore()

const { t } = useI18n()

onMounted(() => {
  uiStore.setBackgroundClass('bg-default')
})

function goTo(destiny: string) {
  router.push({ name: destiny })
}
</script>

<template>
  <div class="pagina">
    <div id="title" class="center"><h1>Welcome to Erik's vue3 project</h1></div>
    <div class="about">
      <p>{{ t('home.description.p1') }}</p>
      <p>{{ t('home.description.p2', { bootstrap: '5.3' }) }}</p>
      <p>{{ t('home.description.p3') }}</p>
      <p>{{ t('home.description.p4') }}</p>
      <p>{{ t('home.description.p5') }}</p>
    </div>
    <div>
      <div class="main-card">
        <div class="my-cards">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">{{ t('home.card1.title') }}</h5>
              <p class="card-text">
                {{ t('home.card1.description') }}
              </p>
              <button id="btn-simple-form" class="btn btn-primary" @click="goTo('SimpleForm')">
                {{ t('home.card1.button') }}
              </button>
            </div>
          </div>
        </div>
        <div class="my-cards">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">{{ t('home.card2.title') }}</h5>
              <p class="card-text">
                {{ t('home.card2.description') }}
              </p>
              <button id="btn-modal" class="btn btn-primary" @click="goTo('Modals')">
                {{ t('home.card2.button') }}
              </button>
            </div>
          </div>
        </div>
        <div class="my-cards">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">{{ t('home.card3.title') }}</h5>
              <p class="card-text">
                {{ t('home.card3.description') }}
              </p>
              <button id="btn-simple-form" class="btn btn-primary" @click="goTo('TipCalculator')">
                {{ t('home.card3.button') }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.main-card {
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  justify-content: center;
  margin-left: 4rem;
  margin-right: 4rem;
}
.my-cards {
  flex: auto;
  min-height: 200px;
  max-width: 400px;
  min-width: 400px;
  background: var(--Violet) !important;
  border-radius: 1em;
}
@media (max-width: 900px) {
  .my-cards {
    flex: auto;
    min-height: 200px;
    max-width: 400px;
    min-width: 100%;
    background: var(--Violet) !important;
    border-radius: 1em;
  }
  .main-card {
    display: flex;
    flex-wrap: wrap;
    gap: 30px;
    justify-content: center;
    margin-left: 0;
    margin-right: 0;
  }
}
.card {
  height: calc(100% - 40px);
  margin-top: 40px;
  background-color: var(--Dark-blue) !important;
  border-radius: 1em;
  color: var(--Pale-Blue);
}
.card-body {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
}
.btn {
  margin-top: auto;
}
.card-title {
  color: var(--Pale-Blue);
}
.card-text {
  color: var(--Desaturated-blue);
}
.btn-primary {
  background-color: var(--Dark-blue);
  color: var(--Pale-Blue);
}
.pagina {
  margin: 1rem;
}

.about {
  text-align: center;
  margin: 2rem 15% 2rem 15%;
  padding: 1rem;
  box-shadow: 0px 0px 8px 2px var(--Violet);
  border-radius: 1em;
}
@media (max-width: 960px) {
  .about {
    text-align: center;
    margin: 2rem 0rem 2rem 0rem;
    padding: 1rem;
    box-shadow: 0px 0px 8px 2px var(--Violet);
    border-radius: 1em;
  }
}
</style>
