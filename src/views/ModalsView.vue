<script setup lang="ts">
import { markRaw, reactive, ref } from 'vue'
import { useModal } from '@/composables/useModal'
import ModalConfirme from '@/components/modals/ModalConfirme.vue'
import ModalForm, { type ConfigModalForm } from '@/components/modals/ModalForm.vue'

const state = reactive({
  valueEdit: ''
})

const modal = useModal()

const config = ref<ConfigModalForm>({
  valueCustom: '',
  title: 'Modal Form'
})

const openModalConfirme = () => {
  modal.component.value = markRaw(ModalConfirme)
  modal.showModal()
}
const openModalValue = () => {
  modal.component.value = markRaw(ModalForm)
  modal.showModal()
}
function update(value: any) {
  if (modal.component.value === markRaw(ModalForm)) state.valueEdit = value
}
</script>

<template>
  <div class="page">
    <Teleport to="#modal">
      <component
        :is="modal.component.value"
        :displayProp="modal.show.value"
        :config="config"
        @confirmeModal="update"
        @closeModal="modal.hideModal"
      />
    </Teleport>
    <div id="titleModals" class="center"><h1>Modals</h1></div>
    <div class="mt-5">
      <div class="row align-items-center">
        <div class="col align-self-center text-center about">
          <p>
            {{ $t('modals.description.p1') }}
            <a href="https://vuejs.org/guide/built-ins/teleport.html" target="_blank"> Link </a>
          </p>
          <!-- <p>{{ $t('modals.description.p2') }}<a href="">Link</a></p> -->
          <p>
            {{ $t('modals.description.p3') }}
            <a
              href="https://github.com/ErikEndler/erik-vue-vite/blob/main/src/views/ModalsView.vue"
              target="_blank"
            >
              Link
            </a>
          </p>
          <p>{{ $t('modals.description.p4') }}</p>
          <div class="text-start">
            <code class="code">
              <span>
                &#60;Teleport to="#modal"&#62; <br />
                <span>&emsp;&emsp;&#60;component</span> <br />
                <span>&emsp;&emsp;&emsp;&emsp;:is="modal.component.value"</span> <br />
                <span>&emsp;&emsp;&emsp;&emsp;:displayProp="modal.show.value"</span> <br />
                <span>&emsp;&emsp;&emsp;&emsp;:config="config"</span> <br />
                <span>&emsp;&emsp;&emsp;&emsp;@confirmeModal="update"</span> <br />
                <span>&emsp;&emsp;&emsp;&emsp;@closeModal="modal.hideModal"</span> <br />
                <span>&emsp;&emsp;/&#62;</span> <br />
                <span>&#60;/Teleport&#62;</span>
              </span>
            </code>
          </div>
        </div>
        <div class="col align-self-center text-center">
          <div class="main-card">
            <div id="modalConfirme" class="my-cards">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">{{ $t('modals.card1.title') }}</h5>
                  <p id="" class="card-text">
                    {{ $t('modals.card1.description') }}
                  </p>
                  <button id="" class="btn btn-primary" @click="openModalConfirme">
                    {{ $t('modals.card1.button') }}
                  </button>
                </div>
              </div>
            </div>
            <div id="" class="my-cards">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">{{ $t('modals.card2.title') }}</h5>
                  <p id="" class="card-text">
                    {{ $t('modals.card2.description') }}
                    <span class="value-edit">{{ state.valueEdit }}</span>
                  </p>
                  <button id="" class="btn btn-primary" @click="openModalValue">
                    {{ $t('modals.card2.button') }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.about {
  text-align: center;
  margin: 2rem 5% 2rem 5%;
  padding: 1rem;
  box-shadow: 0px 0px 8px 2px var(--Violet);
  border-radius: 1em;
  min-width: 332px;
}
.code {
  display: flex;
  justify-content: center;
}
.value-edit {
  color: var(--Soft-blue);
}
.main-card {
  margin: 2rem 0 2rem 0;
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
.page {
  margin: 1rem;
}

.card-title {
  color: var(--Pale-Blue);
}
.card-text {
  color: var(--Desaturated-blue);
}
</style>
