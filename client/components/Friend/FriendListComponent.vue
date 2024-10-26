<script setup lang="ts">
import CreateFriendRequestForm from "@/components/Friend/CreateFriendRequestForm.vue";
import FriendComponent from "@/components/Friend/FriendComponent.vue";
import ReceivedRequestComponent from "@/components/Friend/ReceivedRequestComponent.vue";
import SentRequestComponent from "@/components/Friend/SentRequestComponent.vue";

import { useUserStore } from "@/stores/user";
import { fetchy } from "@/utils/fetchy";
import { storeToRefs } from "pinia";
import { computed, onBeforeMount, ref } from "vue";

const { currentUsername, isLoggedIn } = storeToRefs(useUserStore());

const loaded = ref(false);
let friends = ref<Array<Record<string, string>>>([]);
let requests = ref<Array<Record<string, string>>>([]);

async function getFriends() {
  let friendResults;
  try {
    friendResults = await fetchy("/api/friends", "GET");
  } catch (_) {
    return;
  }
  friends.value = friendResults;
}

async function getRequests() {
  let requestResults;
  try {
    requestResults = await fetchy("/api/friend/requests", "GET");
  } catch (_) {
    return;
  }
  requests.value = requestResults;
}

let friendsList = computed(() => friends.value.filter((x) => x.user1 !== "DELETED_USER" && x.user2 !== "DELETED_USER"));
let sentPendingRequests = computed(() => requests.value.filter((x) => x.status === "pending" && x.from === currentUsername.value && x.to !== "DELETED_USER"));
let receivedPendingRequests = computed(() => requests.value.filter((x) => x.status === "pending" && x.to === currentUsername.value && x.from !== "DELETED_USER"));

onBeforeMount(async () => {
  await getFriends();
  await getRequests();
  loaded.value = true;
});
</script>

<template>
  <section v-if="isLoggedIn">
    <h2>Send a friend request:</h2>
    <CreateFriendRequestForm @refreshRequests="getRequests" />
  </section>

  <h2>Friends</h2>
  <section class="friends" v-if="loaded && friendsList.length !== 0">
    <article v-for="friend in friendsList" :key="friend._id">
      <FriendComponent :friend="friend" @refreshFriends="getFriends" />
    </article>
  </section>
  <p v-else>You currently have no friend...</p>
  <h2>Sent Friend Request</h2>
  <section class="requests" v-if="loaded && sentPendingRequests.length !== 0">
    <article v-for="request in sentPendingRequests" :key="request._id">
      <SentRequestComponent :request="request" @refreshRequests="getRequests" />
    </article>
  </section>
  <p v-else>Make some friends!</p>
  <h2>Received Friend Request</h2>
  <section class="requests" v-if="loaded && receivedPendingRequests.length !== 0">
    <article v-for="request in receivedPendingRequests" :key="request._id">
      <ReceivedRequestComponent :request="request" @refreshRequests="getRequests" @refreshFriends="getFriends" />
    </article>
  </section>
  <p v-else>Friend Request inbox is clear!</p>
</template>

<style scoped>
section {
  display: flex;
  flex-direction: column;
  gap: 1em;
}

section,
p,
.row {
  margin: 0 auto;
  max-width: 60em;
}

article {
  background-color: var(--base-bg);
  border-radius: 1em;
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  padding: 1em;
}

.posts {
  padding: 1em;
}

.row {
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  max-width: 60em;
}
</style>
