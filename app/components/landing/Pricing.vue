<script setup lang="ts">
import type { IndexCollectionItem } from '@nuxt/content'

defineProps<{
  page: IndexCollectionItem
}>()
</script>

<template>
  <UPageSection
    v-if="page.pricing"
    :title="page.pricing.title"
    :description="page.pricing.description"
    :ui="{
      container: 'px-0 !pt-0 sm:gap-6 lg:gap-8',
      title: 'text-left text-xl sm:text-xl lg:text-2xl font-medium',
      description: 'text-left mt-2 text-sm sm:text-md lg:text-sm text-muted'
    }"
  >
    <div class="relative">
      <UPricingCard
        :title="page.pricing.plan.title"
        :description="page.pricing.plan.description"
        :price="page.pricing.plan.price"
        :cycle="page.pricing.plan.cycle"
        :highlight="page.pricing.plan.highlight"
        :button="page.pricing.plan.button"
        :features="page.pricing.plan.features"
        align="top"
        class="relative z-10 bg-[var(--ui-bg)] ring-1 ring-[var(--ui-border)]"
      />
      <!-- Decorative gradient -->
      <div class="absolute -inset-0.5 bg-gradient-to-r from-primary-500 to-[var(--ui-primary-500)] rounded-[calc(var(--ui-radius)+2px)] opacity-20 blur-lg" />
    </div>
  </UPageSection>
</template>
