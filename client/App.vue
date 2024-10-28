<script setup lang="ts">
import { useToastStore } from "@/stores/toast";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import { computed, onBeforeMount } from "vue";
import { RouterLink, RouterView, useRoute } from "vue-router";

const currentRoute = useRoute();
const currentRouteName = computed(() => currentRoute.name);
const userStore = useUserStore();
const { isLoggedIn, currentUsername, currentInterface } = storeToRefs(userStore);
const { toast } = storeToRefs(useToastStore());

// Make sure to update the session before mounting the app in case the user is already logged in
onBeforeMount(async () => {
  try {
    await userStore.updateSession();
  } catch {
    // User is not logged in
  }
});
</script>

<template>
  <header>
    <nav>
      <div class="title">
        <img src="@/assets/images/logo.svg" />
        <p v-if="currentInterface == 'Focus' && !isLoggedIn">
          <RouterLink :to="{ name: 'Focus' }">
            <h1>Grasp</h1>
          </RouterLink>
        </p>
        <p v-else>
          <RouterLink :to="{ name: 'Home' }">
            <h1>Grasp</h1>
          </RouterLink>
        </p>
      </div>
      <ul>
        <li v-if="currentInterface == 'Focus'">
          <RouterLink :to="{ name: 'Focus' }" :class="{ underline: currentRouteName == 'Focus' }"> Focus </RouterLink>
        </li>
        <li v-else>
          <RouterLink :to="{ name: 'Home' }" :class="{ underline: currentRouteName == 'Home' }"> Home </RouterLink>
        </li>
        <li v-if="isLoggedIn && currentInterface != 'Focus'">
          <RouterLink :to="{ name: `Settings` }" :class="{ underline: currentRouteName == 'Settings' }"> Settings </RouterLink>
          <RouterLink :to="{ name: 'Friends' }" :class="{ underline: currentRouteName == 'Friends' }"> Friends </RouterLink>
          <RouterLink :to="{ name: 'Message' }" :class="{ underline: currentRouteName == 'Message' }"> Message </RouterLink>
        </li>
        <li v-else-if="isLoggedIn">
          <RouterLink :to="{ name: `Settings` }" :class="{ underline: currentRouteName == 'Settings' }"> Settings </RouterLink>
        </li>
        <li v-else>
          <RouterLink :to="{ name: 'Login' }" :class="{ underline: currentRouteName == 'Login' }"> Login </RouterLink>
        </li>
        <li v-if="isLoggedIn">
          <h3>Hello, {{ currentUsername }}</h3>
        </li>
      </ul>
    </nav>
    <article v-if="toast !== null" class="toast" :class="toast.style">
      <p>{{ toast.message }}</p>
    </article>
  </header>
  <RouterView />
</template>

<style scoped>
@import "./assets/toast.css";

nav {
  padding: 1em 2em;
  background-color: lightgray;
  display: flex;
  align-items: center;
}

h1 {
  font-size: 2em;
  margin: 0;
}

h3 {
  font-size: 1em;
  margin: 0;
  text-align: right;
}

.title {
  display: flex;
  align-items: center;
  gap: 0.5em;
}

img {
  height: 2em;
}

a {
  font-size: large;
  color: black;
  text-decoration: none;
}

ul {
  list-style-type: none;
  margin-left: auto;
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 1em;
}

.underline {
  text-decoration: underline;
}
</style>
