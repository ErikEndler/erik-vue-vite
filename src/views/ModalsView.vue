<script setup lang="ts">
import { markRaw } from 'vue'
import { useModal } from '@/composables/useModal'
import ModalConfirme from '@/components/modals/ModalConfirme.vue'

const modal = useModal()

const openModal = () => {
  modal.component.value = markRaw(ModalConfirme)
  modal.showModal()
}
</script>

<template>
  <div class="pagina">
    <Teleport to="#modal">
      <!-- <ModalConfirme :exibir="modal.show.value" @fechar-modal="modal.hideModal" /> -->
      <component
        :is="modal.component.value"
        :exibir="modal.show.value"
        @fechar-modal="modal.hideModal"
      />
    </Teleport>
    <div id="title" class="center"><h1>Modals</h1></div>
    <div class="mt-5">
      <div class="main-card">
        <div class="my-cards">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">{{ $t('modals.card1.title') }}</h5>
              <p class="card-text">
                {{ $t('modals.card1.description') }}
              </p>
              <button class="btn btn-primary" @click="openModal">
                {{ $t('modals.card1.button') }}
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
  justify-content: flex-start;
  margin-left: 4rem;
  margin-right: 4rem;
}
.my-cards {
  flex: auto;
  min-height: 200px;
  max-width: 400px;
  background: var(--Violet) !important;
  border-radius: 1em;
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
.btn-primary {
  background-color: var(--Dark-blue);
  color: var(--Pale-Blue);
}
.pagina {
  margin: 1rem;
}

.card-title {
  color: var(--Pale-Blue);
}
.card-text {
  color: var(--Desaturated-blue);
}
</style>
