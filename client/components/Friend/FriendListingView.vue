<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import { fetchy } from "../../utils/fetchy";
import SendFriendRequestForm from "./SendFriendRequestForm.vue";

let username = ref("");

const loaded = ref(false);

let friendRequests = ref<Array<Record<string, string>>>([]);
let notFriendList = ref<Array<Record<string, string>>>([]);

async function getFriendRequests() {
  let friendRequestsResults;
  try {
    friendRequestsResults = await fetchy("/api/friend/requests", "GET", {});
  } catch (_) {
    return;
  }
  friendRequests.value = friendRequestsResults;
}

onBeforeMount(async () => {
  await getFriendRequests();
  loaded.value = true;
});
</script>

<template>
  <h2>Friends</h2>

  <h2>Requests</h2>
  <SendFriendRequestForm @refreshFriends="getFriendRequests" />
  <section class="friendRequests" v-if="loaded && friendRequests.length !== 0">
    <article v-for="friendRequest in friendRequests" :key="friendRequest._id">
      <!-- <FriendRequest v-if="friendRequest.status === 'pending'" :friendRequest="friendRequest" @refreshRequest="getFriendRequests" /> -->
    </article>
  </section>
</template>
