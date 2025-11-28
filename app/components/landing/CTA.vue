<script setup lang="ts">
import type { IndexCollectionItem } from '@nuxt/content'

defineProps<{
  page: IndexCollectionItem
}>()
</script>

<template>
  <UPageCTA
    v-if="page.cta"
    :title="page.cta.title"
    :description="page.cta.description"
    :links="page.cta.links"
    class="bg-[var(--ui-bg-elevated)]/50 rounded-[var(--ui-radius)] overflow-hidden"
  />
</template>
