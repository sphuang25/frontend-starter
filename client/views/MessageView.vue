<script setup lang="ts">
import MessageListComponent from "@/components/Message/MessageListComponent.vue";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";

const { currentUsername } = storeToRefs(useUserStore());
</script>

<template>
  <main class="column">
    <h1>Messages</h1>
    <MessageListComponent />
  </main>
</template>
