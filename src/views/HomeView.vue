<script setup lang="ts">
import router from '../router'

function goTo(destiny: string) {
  router.push({ name: destiny })
}
</script>

<template>
  <div class="pagina">
    <div id="title" class="center"><h1>Welcome to Erik's vue3 project</h1></div>
    <div class="about">
      <p>{{ $n(1456, 'currencyFormat') }}</p>
      <p>{{ $t('about.donations', { donations: $n(1456, 'currencyFormat') }) }}</p>
      <p>{{ $t('home.description.p1') }}</p>
      <p>{{ $t('home.description.p2', { bootstrap: '5.3' }) }}</p>
      <p>{{ $t('home.description.p3') }}</p>
    </div>
    <div>
      <div class="main-card">
        <div class="my-cards">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">{{ $t('home.card1.title') }}</h5>
              <p class="card-text">
                {{ $t('home.card1.description') }}
              </p>
              <button class="btn btn-primary" @click="goTo('Home')">
                {{ $t('home.card1.button') }}
              </button>
            </div>
          </div>
        </div>
        <div class="my-cards">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">{{ $t('home.card2.title') }}</h5>
              <p class="card-text">
                {{ $t('home.card2.description') }}
              </p>
              <button class="btn btn-primary">
                {{ $t('home.card2.button') }}
              </button>
            </div>
          </div>
        </div>
        <div class="my-cards">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">{{ $t('home.card2.title') }}</h5>
              <p class="card-text">
                {{ $t('home.card2.description') }}
              </p>
              <button class="btn btn-primary">
                {{ $t('home.card2.button') }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.pagina {
  margin: 1rem;
}
.main-card {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
.my-cards {
  flex: 1 0 400px;
}
.card {
  height: 100%;
  background-color: var(--background-dark-2) !important;
  border-radius: 1em;
  color: var(--text-dark-1);
}
.about {
  text-align: center;
  margin: 2rem 20% 2rem 20%;
  padding: 1rem;
  box-shadow: 0px 0px 8px 2px #2c3e50;
  border-radius: 1em;
}
</style>
