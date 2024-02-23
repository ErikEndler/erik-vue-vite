<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import Tr from '@/i18n/translation'

const { t, locale } = useI18n()

const supportedLocales = Tr.supportedLocales

const switchLanguage = async (event: Event) => {
  const newLocale = (event.target as HTMLInputElement).value
  await Tr.switchLanguage(newLocale)
}
defineExpose({
  switchLanguage
})
</script>

<template>
  <select id="select-language" class="form-select form-select-sm" @change="switchLanguage($event)">
    <option
      v-for="sLocale in supportedLocales"
      :key="`locale-${sLocale}`"
      :value="sLocale"
      :selected="locale === sLocale"
      :id="sLocale"
    >
      {{ t(`locale.${sLocale}`) }}
    </option>
  </select>
</template>
<style scoped lang="scss">
.form-select {
  --bs-form-select-bg-img: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23dee2e6' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m2 5 6 6 6-6'/%3e%3c/svg%3e") !important;

  --bs-body-bg: var(--Very-Dark-Blue);
  --form-select-indicator-color: white;
  border: 1px solid var(--White-text) !important;
  color: var(--White-text) !important;
}
</style>
