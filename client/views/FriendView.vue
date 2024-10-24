<script setup lang="ts">
import FriendListingComponent from "@/components/Friend/FriendListComponent.vue";
import router from "@/router";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";

const { currentUsername } = storeToRefs(useUserStore());
const { logoutUser, deleteUser } = useUserStore();

async function logout() {
  await logoutUser();
  void router.push({ name: "Home" });
}

async function delete_() {
  await deleteUser();
  void router.push({ name: "Home" });
}
</script>

<template>
  <main class="column">
    <h1>Your Friends</h1>
    <FriendListingComponent />
  </main>
</template>
