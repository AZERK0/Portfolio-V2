<script setup lang="ts">
import type { IndexCollectionItem } from '@nuxt/content'

defineProps<{
  page: IndexCollectionItem
}>()

const { data: projects } = await useAsyncData('landing-projects', () =>
  queryCollection('projects').order('date', 'DESC').limit(4).all()
)
</script>

<template>
  <UPageSection
    v-if="page.projects"
    :title="page.projects.title"
    :description="page.projects.description"
    :ui="{
      container: 'px-0 !pt-0 sm:gap-6 lg:gap-8',
      title: 'text-left text-xl sm:text-xl lg:text-2xl font-medium',
      description: 'text-left mt-2 text-sm sm:text-md lg:text-sm text-muted'
    }"
  >
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-8">
      <UCard
        v-for="(project, index) in projects"
        :key="index"
        :ui="{
          base: 'group overflow-hidden transition-all hover:ring-primary/50',
          body: 'p-0 sm:p-0',
          header: 'hidden',
          footer: 'p-4'
        }"
        class="relative"
      >
        <NuxtLink :to="project.path" class="block aspect-[16/9] overflow-hidden">
          <NuxtImg
            v-if="project.image"
            :src="project.image"
            :alt="project.title"
            class="size-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </NuxtLink>
        <div class="p-4">
          <h3 class="text-lg font-semibold mb-1">
            <NuxtLink :to="project.path" class="focus:outline-none">
              <span class="absolute inset-0" aria-hidden="true" />
              {{ project.title }}
            </NuxtLink>
          </h3>
          <p class="text-sm text-muted line-clamp-2">
            {{ project.description }}
          </p>
        </div>
      </UCard>
    </div>
    <div class="mt-8 flex justify-center">
      <UButton
        to="/projects"
        variant="soft"
        size="lg"
        label="Voir tous les projets"
        trailing-icon="i-heroicons-arrow-right-20-solid"
      />
    </div>
  </UPageSection>
</template>
