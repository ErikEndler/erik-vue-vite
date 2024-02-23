<script setup lang="ts">
import { markRaw, reactive, ref, watch, computed } from 'vue'
import TextInput from '@/components/TextInput.vue'
import { Form } from 'vee-validate'
import { useModal } from '@/composables/useModal'
import ModalForm, { type ConfigModalForm } from '@/components/modals/ModalForm.vue'
import { useI18n } from 'vue-i18n'

const modal = useModal()
const { t } = useI18n()

const state = reactive({
  bill: 0,
  people: 1,
  tip: 5,
  tipCustom: 0,
  personTotal: 0,
  tipPerson: 0
})
function openModalCustom() {
  modal.component.value = markRaw(ModalForm)
  modal.showModal()
}

function changeCustomTip(value: number) {
  state.tipCustom = value
  selectTip(value)
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

const config = computed(() => {
  return ref<ConfigModalForm>({
    valueCustom: state.tipCustom,
    label: t('tipCalculator.modal.label'),
    title: t('tipCalculator.modal.title'),
    type: 'number',
    classInput: 'input-tip',
    classLabel: 'label-tip',
    classModal: 'page-tipe',
    classHeader: 'page-tipe'
  })
})

defineExpose({
  state
})
</script>
<template>
  <div class="page-tipe">
    <Teleport to="#modal">
      <component
        :is="modal.component.value"
        :displayProp="modal.show.value"
        :config="config.value"
        @confirmeModal="changeCustomTip"
        @closeModal="modal.hideModal"
      />
    </Teleport>
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
                :label="$t('tipCalculator.fields.bill')"
                placeholder="0"
                id="bill"
              />
              <label class="mt-4" for="percent">{{ $t('tipCalculator.fields.selectTip') }}</label>
              <div class="row mt-3 row-cols-3">
                <div class="col-4">
                  <button
                    id="tip-5"
                    @click="selectTip(5)"
                    class="btn btn-custom btn-primary"
                    :class="selectedButton(5)"
                    type="button"
                  >
                    5%
                  </button>
                </div>
                <div class="col">
                  <button
                    id="tip-10"
                    @click="selectTip(10)"
                    class="btn btn-custom btn-primary"
                    :class="selectedButton(10)"
                    type="button"
                  >
                    10%
                  </button>
                </div>
                <div class="col">
                  <button
                    id="tip-15"
                    @click="selectTip(15)"
                    class="btn btn-custom btn-primary"
                    :class="selectedButton(15)"
                    type="button"
                  >
                    15%
                  </button>
                </div>
                <div class="col mt-1">
                  <button
                    id="tip-25"
                    @click="selectTip(25)"
                    class="btn btn-custom btn-primary"
                    :class="selectedButton(25)"
                    type="button"
                  >
                    25%
                  </button>
                </div>
                <div class="col mt-1">
                  <button
                    id="tip-50"
                    @click="selectTip(50)"
                    class="btn btn-custom btn-primary position-relative"
                    :class="selectedButton(50)"
                    type="button"
                  >
                    50%
                  </button>
                </div>
                <div class="col mt-1">
                  <button
                    id="tip-custom"
                    @click="openModalCustom()"
                    class="btn btn-custom btn-primary btn-tip-custom"
                    :class="selectedButton(state.tipCustom)"
                    type="button"
                  >
                    <span v-if="state.tipCustom > 0">{{ state.tipCustom }}%</span>
                    <span v-else> {{ $t('tipCalculator.fields.custom') }}</span>
                  </button>
                </div>
              </div>
              <div class="row mt-2"></div>
              <TextInput
                v-model:value="state.people"
                classInput="input-tip"
                nameProp="people"
                type="number"
                :label="$t('tipCalculator.fields.numberOfPeople')"
                placeholder="0"
                id="people"
              />
            </Form>
          </div>
        </div>
        <div class="col-12 col-lg-6">
          <div class="card card-3">
            <div class="row my-5 card-3-child">
              <div class="row result-label">
                {{ $t('tipCalculator.fields.tipAmount') }} <br />
                {{ $t('tipCalculator.fields./person') }}
              </div>
              <div class="row text-coin result">
                {{ $n(state.tipPerson, 'currencyFormat') }}
              </div>
            </div>
            <div class="row my-3 card-3-child">
              <div class="row result-label">
                {{ $t('tipCalculator.fields.total') }} <br />
                {{ $t('tipCalculator.fields./person') }}
              </div>
              <div class="row text-coin result">
                {{ $n(state.personTotal, 'currencyFormat') }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="card row card-4">
      <h1 class="center"><b>Info</b></h1>
      <p>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
        been the industry's standard dummy text ever since the 1500s, when an unknown printer took a
        galley of type and scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
        It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum
        passages, and more recently with desktop publishing software like Aldus PageMaker including
        versions of Lorem Ipsum.
      </p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.page-tipe {
  font-family: 'Space Mono', monospace;
  background-color: var(--Light-grayish-cyan) !important;
  font-size: 20px;
  font-weight: 700;
  color: var(--Very-dark-cyan);
}
::v-deep(.page-tipe) {
  font-family: 'Space Mono', monospace;
  background-color: var(--Light-grayish-cyan) !important;
  font-size: 20px;
  font-weight: 700;
  color: var(--Very-dark-cyan);
}
::v-deep(body) {
  background-color: var(--Light-grayish-cyan) !important;
}
::v-deep(.label-tip) {
  font-size: 14px;
  color: var(--Dark-grayish-cyan) !important;
  border-style: none;
}
::v-deep(.input-tip) {
  padding: 8px 5px !important;
  text-align-last: right;
  color: var(--Very-dark-cyan) !important;
  border: 2px solid var(--Strong-cyan);
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
}
::v-deep(.btn-custom) {
  background-color: var(--Very-dark-cyan);
  font-size: 18px;
  font-weight: 500;
}
.btn-tip-custom:hover:before {
  content: 'CUSTOM';
}
.btn-tip-custom:hover span {
  display: none;
}
::v-deep(.btn-custom:hover) {
  background-color: var(--Strong-cyan);
  color: var(--Very-dark-cyan);
  border: none;
  font-size: 18px;
  font-weight: 700;
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
  justify-content: center;
}
.card-3-child {
  margin: 20px 0;
  height: 50%;
  justify-content: center;
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
.card-4 {
  margin: 2rem;
}
.result {
  color: var(--Strong-cyan);
  font-size: 35px;
}
.result-label {
  min-width: 139px;
  color: var(--Light-grayish-cyan);
  font-size: 15px;
  text-align: center;
  justify-content: center;
  align-items: center;
}
.text-coin {
  overflow-wrap: break-word;
  word-wrap: break-word;

  -ms-word-break: break-all;
  /* This is the dangerous one in WebKit, as it breaks things wherever */
  word-break: break-all;
  /* Instead use this non-standard one: */
  word-break: break-word;

  /* Adds a hyphen where the word breaks, if supported (No Blink) */
  -ms-hyphens: auto;
  -moz-hyphens: auto;
  -webkit-hyphens: auto;
  hyphens: auto;

  display: flex;
  text-align: center !important;
  justify-content: center;
  align-items: center;
}
</style>
