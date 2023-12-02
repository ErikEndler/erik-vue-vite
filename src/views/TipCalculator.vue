<script setup lang="ts">
import { markRaw, reactive, watch } from 'vue'
import TextInput from '../components/TextInput.vue'
import { Form } from 'vee-validate'
import { useModal } from '@/composables/useModal'
import ModalConfirme from '@/components/modals/ModalConfirme.vue'

const modal = useModal()

const state = reactive({
  bill: 0,
  people: 1,
  tip: 5,
  tipCustom: '',
  personTotal: 0,
  tipPerson: 0
})
function custom() {
  modal.component.value = markRaw(ModalConfirme)
  modal.showModal()
}
function calculateTotal() {
  state.tipPerson = (state.bill * (state.tip / 100)) / state.people
  state.personTotal = state.bill / state.people + state.tipPerson
}
function selectedButton(value: number) {
  if (state.tip === value) return 'btn-custom-select'
  else return ''
}
function selectTip(value: number) {
  state.tip = value
}
watch(
  () => [state.tip, state.people, state.bill],
  () => {
    calculateTotal()
  }
)
</script>
<template>
  <Teleport to="#modal">
    <!-- <ModalConfirme :exibir="modal.show.value" @fechar-modal="modal.hideModal" /> -->
    <component
      :is="modal.component.value"
      :exibir="modal.show.value"
      @fechar-modal="modal.hideModal"
    />
  </Teleport>
  <div class="teste">
    <p class="center">
      SPLI <br />
      TTER
    </p>
    <div class="card card-1 row">
      <div class="row">
        <div class="col-12 col-lg-6">
          <div class="card-2 card">
            <Form>
              <TextInput
                v-model:value="state.bill"
                classInput="input-tip"
                nameProp="bill"
                type="number"
                label="Bill"
                placeholder="0"
              />
              <label class="mt-4" for="percent">Select Tip %</label>
              <div class="row mt-3 row-cols-3">
                <div class="col-4">
                  <button
                    @click="selectTip(5)"
                    class="btn btn-primary"
                    :class="selectedButton(5)"
                    type="button"
                  >
                    5%
                  </button>
                </div>
                <div class="col">
                  <button
                    @click="selectTip(10)"
                    class="btn btn-primary"
                    :class="selectedButton(10)"
                    type="button"
                  >
                    10%
                  </button>
                </div>
                <div class="col">
                  <button
                    @click="selectTip(15)"
                    class="btn btn-primary"
                    :class="selectedButton(15)"
                    type="button"
                  >
                    15%
                  </button>
                </div>
                <div class="col mt-1">
                  <button
                    @click="selectTip(25)"
                    class="btn btn-primary"
                    :class="selectedButton(25)"
                    type="button"
                  >
                    25%
                  </button>
                </div>
                <div class="col mt-1">
                  <button
                    @click="selectTip(50)"
                    class="btn btn-primary position-relative"
                    :class="selectedButton(50)"
                    type="button"
                  >
                    50%
                  </button>
                </div>
                <div class="col mt-1">
                  <button
                    @click="custom()"
                    class="btn btn-primary position-relative"
                    :class="selectedButton(50)"
                    type="button"
                  >
                    CUSTOM
                  </button>
                </div>
                <!-- abrir modal ao clicar custo me escolher porcentagem -->
                <!-- <div class="col">
                  <input
                    placeholder="Custom"
                    :value="state.tipCustom"
                    class="form-control input-tip input-editable"
                    type="text"
                  />
                </div> -->
              </div>
              <div class="row mt-2"></div>
              <TextInput
                v-model:value="state.people"
                classInput="input-tip"
                nameProp="people"
                type="number"
                label="Number of People"
                placeholder="0"
              />
            </Form>
          </div>
        </div>
        <div class="col-12 col-lg-6">
          <div class="card card-3">
            <div class="row my-5">
              <div class="col ms-4 center result-label">
                Tip Amount <br />
                /person
              </div>
              <div class="col text-coin me-4 result">
                {{ $n(state.tipPerson, 'currencyFormat') }}
              </div>
            </div>
            <div class="row my-3">
              <div class="center col ms-3 result-label">
                Total <br />
                /person
              </div>
              <div class="col text-coin me-3 result">
                {{ $n(state.personTotal, 'currencyFormat') }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<!-- <style>
body {
  background-color: var(--Light-grayish-cyan) !important;
}
</style> -->
<style scoped>
.form-control {
  width: 100px;
  height: 45px;
}
::v-deep(body) {
  background-color: var(--Light-grayish-cyan) !important;
}
::v-deep(.input-tip) {
  padding: 8px 5px !important;
  text-align-last: right;
  color: var(--Very-dark-cyan) !important;
  border: 2px solid var(--Strong-cyan);
}
.input-editable {
  position: relative;
  text-align: right;
  margin-top: 0.25rem !important;
  border: 2px solid var(--Strong-cyan);
  font-size: 18px;
  font-weight: 600;
}
.btn-custom-select {
  color: var(--Very-dark-cyan);
  background-color: var(--Strong-cyan) !important;
  border: none;
  font-weight: 600 !important;
}
.btn {
  width: 100px;
  height: 45px;
  background-color: var(--Very-dark-cyan);
  font-size: 18px;
  font-weight: 500;
}
.btn:hover {
  background-color: var(--Strong-cyan);
  color: var(--Very-dark-cyan);
  border: none;
  font-size: 18px;
  font-weight: 700;
}
.teste {
  font-family: 'Space Mono', monospace;
  background-color: var(--Light-grayish-cyan);
  font-size: 20px;
  font-weight: 700;
  color: var(--Very-dark-cyan);
}
.card-2 {
  font-size: 14px;
  color: var(--Dark-grayish-cyan);
  border-style: none;
}
.card-3 {
  width: 100%;
  height: 100%;
  background-color: var(--Very-dark-cyan);
}
.card-1 {
  width: 75%;
  max-width: 750px;
  min-width: 375px;
  border-style: none;
  padding-left: 1rem;
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
  background-color: var(--Very-light-grayish-cyan);
  margin: 5rem auto 2rem auto;
  border-radius: 1rem;
}
.result {
  color: var(--Strong-cyan);
  font-size: 35px;
}
.result-label {
  color: var(--Light-grayish-cyan);
  font-size: 15px;
}
.text-coin {
  text-align: center !important;
}
</style>
