<script setup>
import { useRoute } from 'vue-router'
import { ref } from 'vue'

const route = useRoute()
import gsap from 'gsap'
const duration = 2
const main = ref(null)
const handleLeave = (el, done) => {
  const tl = gsap.timeline()
  tl.set(el, { zIndex: 1 }).to(el, {
    duration: duration,
    x: -100,
    ease: 'expo.inOut',
    onComplete() {
      done()
    }
  })
}

const handleEnter = (el, done) => {
  console.log(el)

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
        onComplete() {
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
