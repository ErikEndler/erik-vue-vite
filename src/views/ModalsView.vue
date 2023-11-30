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
    <div>
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
        <!-- <div class="my-cards">
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
        </div> -->
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
</style>
