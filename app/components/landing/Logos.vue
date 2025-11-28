<script setup lang="ts">
import type { IndexCollectionItem } from '@nuxt/content'

defineProps<{
  page: IndexCollectionItem
}>()
</script>

<template>
  <UPageSection
    v-if="page.logos"
    :title="page.logos.title"
    :ui="{
      container: 'px-0 !pt-0 sm:gap-6 lg:gap-8',
      title: 'text-left text-xl sm:text-xl lg:text-2xl font-medium'
    }"
  >
    <div class="flex flex-wrap gap-8 items-center justify-center text-muted/50">
      <div
        v-for="icon in page.logos.icons"
        :key="icon.name"
        class="flex flex-col items-center gap-2 hover:text-primary transition-colors duration-200"
      >
        <UIcon
          :name="icon.name"
          class="size-8 sm:size-10"
        />
        <span class="text-xs font-medium">{{ icon.text }}</span>
      </div>
    </div>
  </UPageSection>
</template>
