<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import Tr from '@/i18n/translation'

const { t, locale } = useI18n()

const supportedLocales = Tr.supportedLocales

const switchLanguage = async (event) => {
  const newLocale = event.target.value
  await Tr.switchLanguage(newLocale)
}
</script>

<template>
  <select class="form-select form-select-sm" @change="switchLanguage">
    <option
      v-for="sLocale in supportedLocales"
      :key="`locale-${sLocale}`"
      :value="sLocale"
      :selected="locale === sLocale"
    >
      {{ t(`locale.${sLocale}`) }}
    </option>
  </select>
</template>
<style lang="scss">
.form-select {
  color: var(--text-dark-2);
  background-color: var(--background-dark-2);
}
</style>
