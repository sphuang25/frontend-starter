<script setup lang="ts">
import FriendListingComponent from "@/components/Friend/FriendListComponent.vue";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";

const { currentUsername } = storeToRefs(useUserStore());
</script>

<template>
  <main class="column">
    <h1>Your Friends</h1>
    <FriendListingComponent />
  </main>
</template>
