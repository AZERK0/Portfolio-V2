<script setup lang="ts">
const colorMode = useColorMode()

const color = computed(() => colorMode.value === 'dark' ? '#020618' : 'white')

useHead({
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { key: 'theme-color', name: 'theme-color', content: color }
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico' }
  ],
  htmlAttrs: {
    lang: 'en'
  }
})

useSeoMeta({
  titleTemplate: '%s',
  ogImage: 'https://ui.nuxt.com/assets/templates/nuxt/portfolio-light.png',
  twitterImage: 'https://ui.nuxt.com/assets/templates/nuxt/portfolio-light.png',
  twitterCard: 'summary_large_image'
})

const [{ data: navigation }, { data: files }] = await Promise.all([
  useAsyncData('navigation', () => {
    return Promise.all([
      queryCollectionNavigation('blog')
    ])
  }, {
    transform: data => data.flat()
  }),
  useLazyAsyncData('search', () => {
    return Promise.all([
      queryCollectionSearchSections('blog')
    ])
  }, {
    server: false,
    transform: data => data.flat()
  })
])
</script>

<template>
  <UApp>
    <NuxtLayout>
      <UMain class="relative">
        <div class="vintage-lights-bg">
          <div class="light-orb light-orb-1"></div>
          <div class="light-orb light-orb-2"></div>
          <div class="light-orb light-orb-3"></div>
        </div>
        <NuxtPage />
      </UMain>
    </NuxtLayout>

    <ClientOnly>
      <LazyUContentSearch
        :files="files"
        :navigation="navigation"
        shortcut="meta_k"
        :links="navLinks"
        :fuse="{ resultLimit: 42 }"
      />
    </ClientOnly>
  </UApp>
</template>

<style>
.vintage-lights-bg {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
  z-index: 0;
  overflow: hidden;
  pointer-events: none;
}

.vintage-lights-bg::after {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='2.5' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
  opacity: 0.12;
  mix-blend-mode: soft-light;
  pointer-events: none;
}

.light-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(120px) contrast(1.2);
  opacity: 0.55;
  animation: float 8s ease-in-out infinite;
}

.light-orb-1 {
  width: 700px;
  height: 700px;
  background: radial-gradient(circle, rgba(255, 140, 50, 0.9) 0%, rgba(255, 100, 30, 0.6) 30%, rgba(255, 80, 20, 0.3) 60%, transparent 80%);
  top: -15%;
  left: -8%;
  animation-delay: 0s;
}

.light-orb-2 {
  width: 800px;
  height: 800px;
  background: radial-gradient(circle, rgba(240, 120, 40, 0.8) 0%, rgba(220, 90, 30, 0.5) 30%, rgba(200, 70, 20, 0.25) 60%, transparent 80%);
  top: 10%;
  right: -12%;
  animation-delay: 2s;
  animation-duration: 10s;
}

.light-orb-3 {
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(255, 160, 70, 0.7) 0%, rgba(230, 100, 40, 0.45) 30%, rgba(210, 80, 30, 0.2) 60%, transparent 80%);
  bottom: 5%;
  left: 30%;
  animation-delay: 4s;
  animation-duration: 12s;
}

@keyframes float {
  0%, 100% {
    transform: translate(0, 0) scale(1) rotate(0deg);
  }
  33% {
    transform: translate(60px, -50px) scale(1.15) rotate(5deg);
  }
  66% {
    transform: translate(-50px, 40px) scale(0.85) rotate(-5deg);
  }
}

.UMain > *:not(.vintage-lights-bg) {
  position: relative;
  z-index: 1;
}
</style>
