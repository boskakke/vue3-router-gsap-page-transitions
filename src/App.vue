<script setup>
import { useRoute } from 'vue-router'
import { ref } from 'vue'

const route = useRoute()
import gsap from 'gsap'
const duration = 1.5
const main = ref(null)
const handleLeave = (el, done) => {
  const tl = gsap.timeline()
  tl.set(el, { zIndex: 1 })
    .addLabel('<start')
    .to(
      el.querySelector('div .max-w-xl'),
      { opacity: 0, duration: duration, ease: 'expo.inOut' },
      '<start'
    )
    .to(
      el,
      {
        duration: duration,
        x: -100,
        ease: 'expo.inOut',
        onComplete() {
          done()
        }
      },
      '<start'
    )
}

const handleEnter = (el, done) => {
  const tl = gsap.timeline()
  tl.set(el, { zIndex: 2 })

    .fromTo(
      el,
      { xPercent: 20, clipPath: 'inset(0 0 0 100%)' },
      {
        clipPath: 'inset(0 0 0 0%)',
        xPercent: 0,
        duration: duration,
        ease: 'expo.inOut',
        onStart: () => {
          el.classList.add('page-enter')
        },
        onComplete() {
          el.classList.remove('page-enter')
          gsap.set(el, { clearProps: 'all' })
          done()
        }
      }
    )
    .set(el, { zIndex: 1, position: 'initial' })
}
</script>

<template>
  <div class="fixed top-0 w-full bg-teal-400 p-4 flex justify-center gap-4 text-sm z-10">
    <RouterLink :to="{ name: 'home' }">Home</RouterLink>
    <RouterLink :to="{ name: 'page' }">Page</RouterLink>
  </div>
  <div class="min-h-dvh absolute top-0" ref="main">
    <RouterView v-slot="{ Component }">
      <transition @leave="handleLeave" @enter="handleEnter" :css="false">
        <component :is="Component" :key="route.path" />
      </transition>
    </RouterView>
  </div>
</template>

<style lang="css">
.page-enter {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  min-height: 100dvh;
  overflow: hidden;
  will-change: transform;
  z-index: 2;
}
</style>
