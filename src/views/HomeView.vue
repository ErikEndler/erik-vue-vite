<script setup lang="ts">
import router from '../router'

function goSimpleForm() {
  router.push({ name: 'simpleForm' })
}
</script>

<template>
  <div class="pagina">
    <div id="title" class="center"><h1>Welcome to Erik's vue3 project</h1></div>
    <div class="about">
      <p>This project is intended for study and improvement in Vue3 and front-end skills.</p>
      <p>The project uses Vue 3 with Vite with Bootstrap 5.2 using TypeScript.</p>
      <p>Used Pinia to access store.</p>
    </div>
    <div>
      <div class="main-card">
        <div class="my-cards">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Simple Form</h5>
              <p class="card-text">
                Here you will see a simple form that uses vee-validate and yup.
              </p>
              <button class="btn btn-primary" @click="goSimpleForm()">Go Simple Form</button>
            </div>
          </div>
        </div>
        <div class="my-cards">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Special title treatment</h5>
              <p class="card-text">
                With supporting text below as a natural lead-in to additional content.
              </p>
              <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>
          </div>
        </div>
        <div class="my-cards">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Special title treatment</h5>
              <p class="card-text">
                With supporting text below as a natural lead-in to additional content.
              </p>
              <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="row">
        <div class="col-sm-6">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Simple Form</h5>
              <p class="card-text">
                Here you will see a simple form that uses vee-validate and yup.
              </p>
              <button class="btn btn-primary" @click="goSimpleForm()">Go Simple Form</button>
            </div>
          </div>
        </div>
        <div class="col-sm-6">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Special title treatment</h5>
              <p class="card-text">
                With supporting text below as a natural lead-in to additional content.
              </p>
              <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>
          </div>
        </div>
      </div> -->
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
  background-color: var(--background-dark-2);
  border-radius: 1em;
}
.about {
  text-align: center;
  margin: 2rem 20% 2rem 20%;
  padding: 1rem;
  box-shadow: 0px 0px 8px 2px #2c3e50;
  border-radius: 1em;
  // border-style: solid;
  // border-radius: 2em;
  // border-width: 0.005rem;
}
</style>
