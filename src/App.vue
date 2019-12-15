<template>
  <div>
    <app-navbar />
    <router-view />
    <app-footer />
  </div>
</template>

<script>
import Navbar from './components/Navigation/Navbar.vue';
import Footer from './components/Navigation/Footer.vue';
export default {
  components: {
    appNavbar: Navbar,
    appFooter: Footer,
  },
  created() {
    this.$store.dispatch('tryAutoLogin');
  },
};
</script>

<style></style>
