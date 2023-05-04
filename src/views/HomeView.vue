<script setup lang="ts">
import router from '../router'

function goSimpleForm() {
  router.push({ name: 'simpleForm' })
}
</script>

<template>
  <div class="pagina">
    <div id="title" class="center"><h1>Welcome to Erik's vue3 project</h1></div>
    <div>
      <div class="row">
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
      </div>
    </div>
  </div>
</template>
<style scoped>
.pagina {
  margin: 1rem;
}
</style>
