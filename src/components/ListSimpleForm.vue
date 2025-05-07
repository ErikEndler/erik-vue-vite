<script setup lang="ts">
import type { SimpleForm } from '@/types/Interfaces'
import type { PropType } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const props = defineProps({
  list: {
    type: Object as PropType<SimpleForm[]>,
    required: true
  }
})
</script>
<template>
  <div class="m-2">
    <div v-for="item in props.list" :key="item.id">
      <div class="card m-2">
        <ul class="list">
          <li>{{ t('simpleForm.list.id') }} : {{ item.id }}</li>
          <li>{{ t('simpleForm.list.fullName') }} : {{ item.fullName }}</li>
          <li>{{ t('simpleForm.list.email') }} : {{ item.email }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<style>
.list {
  align-items: start;
  text-align: left;
}
</style>
