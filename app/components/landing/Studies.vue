<script setup lang="ts">
import type { IndexCollectionItem } from '@nuxt/content'

defineProps<{
  page: IndexCollectionItem
}>()
</script>

<template>
  <UPageSection
    v-if="page.studies"
    :title="page.studies.title"
    :description="page.studies.description"
    :ui="{
      container: 'px-0 !pt-0 sm:gap-6 lg:gap-8',
      title: 'text-left text-xl sm:text-xl lg:text-2xl font-medium',
      description: 'text-left mt-2 text-sm sm:text-md lg:text-sm text-muted'
    }"
  >
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <UCard
        v-for="(study, index) in page.studies.items"
        :key="index"
        :ui="{
          body: 'p-0 sm:p-0',
          header: 'p-0 sm:p-0',
          footer: 'p-0 sm:p-0'
        }"
        class="group relative overflow-hidden ring-1 ring-[var(--ui-border)] bg-[var(--ui-bg-elevated)]/50"
      >
        <div class="relative aspect-[16/9] overflow-hidden rounded-t-[calc(var(--ui-radius)-1px)]">
          <NuxtImg
            :src="study.image"
            :alt="study.title"
            class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-60" />
          <div class="absolute bottom-4 left-4 right-4 flex items-center gap-3">
            <UIcon
              v-if="study.icon"
              :name="study.icon"
              class="size-8 text-white"
            />
            <h3 class="text-white font-semibold text-lg line-clamp-1">
              {{ study.title }}
            </h3>
          </div>
        </div>
        <div class="p-4">
          <div
            class="text-sm text-muted prose prose-primary dark:prose-invert max-w-none"
            v-html="study.description"
          />
        </div>
      </UCard>
    </div>
  </UPageSection>
</template>
