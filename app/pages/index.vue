<script setup lang="ts">
const { data: page } = await useAsyncData('index', () => {
  return queryCollection('index').first()
})
if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page not found',
    fatal: true
  })
}

useSeoMeta({
  title: page.value?.seo.title || page.value?.title,
  ogTitle: page.value?.seo.title || page.value?.title,
  description: page.value?.seo.description || page.value?.description,
  ogDescription: page.value?.seo.description || page.value?.description
})
</script>

<template>
  <UPage v-if="page">
    <LandingHero :page />

    <UPageSection
      :ui="{
        container: 'px-0 !pt-2 sm:!pt-4'
      }"
    >
      <UCard
        variant="soft"
        class="stage-shell stage-shell-intro mb-7 sm:mb-9"
        :ui="{
          body: 'p-4 sm:p-6'
        }"
      >
        <div class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div class="space-y-3">
            <UBadge
              label="Navigation editoriale"
              color="primary"
              variant="soft"
            />
            <h2 class="text-xl font-semibold text-highlighted sm:text-2xl">
              Une page qui raconte une progression
            </h2>
            <p class="max-w-2xl text-sm leading-relaxed text-muted">
              J'ai transforme la suite du hero en chapitres clairs: fondations, realisations, preuves puis passage a l'action.
            </p>
          </div>
          <div class="flex flex-wrap gap-2 lg:justify-end">
            <UButton
              to="#craft"
              size="sm"
              color="neutral"
              variant="soft"
              label="Fondations"
              icon="i-lucide-compass"
            />
            <UButton
              to="#build"
              size="sm"
              color="neutral"
              variant="soft"
              label="Realisations"
              icon="i-lucide-sparkles"
            />
            <UButton
              to="#proof"
              size="sm"
              color="neutral"
              variant="soft"
              label="Preuves"
              icon="i-lucide-message-square-quote"
            />
            <UButton
              to="#connect"
              size="sm"
              color="neutral"
              variant="soft"
              label="Contact"
              icon="i-lucide-send"
            />
          </div>
        </div>
      </UCard>

      <div class="space-y-7 sm:space-y-8">
        <UCard
          id="craft"
          variant="subtle"
          class="stage-shell"
          :ui="{
            body: 'p-4 sm:p-6 lg:p-7'
          }"
        >
          <div class="mb-4 flex items-center gap-3">
            <UBadge
              label="01"
              color="primary"
              variant="soft"
            />
            <h3 class="text-sm font-medium uppercase tracking-[0.18em] text-muted">
              Fondations
            </h3>
          </div>
          <div class="grid gap-6 xl:grid-cols-2">
            <LandingAbout :page />
            <LandingWorkExperience :page />
          </div>
        </UCard>

        <UCard
          id="build"
          variant="subtle"
          class="stage-shell stage-shell-build"
          :ui="{
            body: 'p-4 sm:p-6 lg:p-7'
          }"
        >
          <div class="mb-4 flex items-center gap-3">
            <UBadge
              label="02"
              color="primary"
              variant="soft"
            />
            <h3 class="text-sm font-medium uppercase tracking-[0.18em] text-muted">
              Realisations
            </h3>
          </div>
          <LandingStudies :page />
          <USeparator
            class="my-7"
            icon="i-lucide-rocket"
            label="Projets en avant"
          />
          <LandingProjects :page />
        </UCard>

        <UCard
          id="proof"
          variant="subtle"
          class="stage-shell stage-shell-proof"
          :ui="{
            body: 'p-4 sm:p-6 lg:p-7'
          }"
        >
          <div class="mb-4 flex items-center gap-3">
            <UBadge
              label="03"
              color="primary"
              variant="soft"
            />
            <h3 class="text-sm font-medium uppercase tracking-[0.18em] text-muted">
              Preuves
            </h3>
          </div>
          <LandingTestimonials :page />
          <USeparator
            class="my-7"
            icon="i-lucide-newspaper"
            label="En direct du blog"
          />
          <LandingBlog :page />
        </UCard>

        <UCard
          id="connect"
          variant="subtle"
          class="stage-shell stage-shell-connect"
          :ui="{
            body: 'p-4 sm:p-6 lg:p-7'
          }"
        >
          <div class="mb-4 flex items-center gap-3">
            <UBadge
              label="04"
              color="primary"
              variant="soft"
            />
            <h3 class="text-sm font-medium uppercase tracking-[0.18em] text-muted">
              Action
            </h3>
          </div>
          <LandingPricing :page />
          <USeparator
            class="my-7"
            icon="i-lucide-help-circle"
            label="Questions frequentes"
          />
          <LandingFAQ :page />
          <div class="mt-8">
            <LandingCTA :page />
          </div>
        </UCard>
      </div>
    </UPageSection>
  </UPage>
</template>

<style scoped>
.stage-shell {
  position: relative;
  overflow: hidden;
  border: 1px solid color-mix(in oklab, var(--ui-border) 80%, transparent);
  background: color-mix(in oklab, var(--ui-bg) 92%, var(--ui-bg-elevated));
}

.stage-shell::before {
  content: '';
  position: absolute;
  inset: -1px;
  background: radial-gradient(circle at 90% 0%, color-mix(in oklab, var(--ui-primary) 12%, transparent), transparent 52%);
  pointer-events: none;
}

.stage-shell-intro::before {
  background: linear-gradient(100deg, color-mix(in oklab, var(--ui-primary) 7%, transparent), transparent 45%), radial-gradient(circle at 95% 0%, color-mix(in oklab, var(--ui-primary) 12%, transparent), transparent 58%);
}

.stage-shell-build::before {
  background: radial-gradient(circle at 12% 0%, color-mix(in oklab, var(--ui-primary) 10%, transparent), transparent 46%), radial-gradient(circle at 95% 100%, color-mix(in oklab, var(--ui-primary) 8%, transparent), transparent 48%);
}

.stage-shell-proof::before {
  background: radial-gradient(circle at 10% 0%, color-mix(in oklab, var(--ui-primary) 10%, transparent), transparent 48%), radial-gradient(circle at 92% 100%, color-mix(in oklab, var(--ui-primary) 8%, transparent), transparent 52%);
}

.stage-shell-connect::before {
  background: radial-gradient(circle at 15% 0%, color-mix(in oklab, var(--ui-primary) 11%, transparent), transparent 50%), radial-gradient(circle at 90% 100%, color-mix(in oklab, var(--ui-primary) 9%, transparent), transparent 54%);
}
</style>
