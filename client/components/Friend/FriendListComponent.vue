<script setup lang="ts">
import CreateFriendRequestForm from "@/components/Friend/CreateFriendRequestForm.vue";
import ReceivedRequestComponent from "@/components/Friend/ReceivedRequestComponent.vue";
import SentRequestComponent from "@/components/Friend/SentRequestComponent.vue";
// import EditPostForm from "@/components/Post/EditPostForm.vue";
// import PostComponent from "@/components/Post/PostComponent.vue";
import { useUserStore } from "@/stores/user";
import { fetchy } from "@/utils/fetchy";
import { storeToRefs } from "pinia";
import { computed, onBeforeMount, ref } from "vue";

const { currentUsername, isLoggedIn } = storeToRefs(useUserStore());

const loaded = ref(false);
let requests = ref<Array<Record<string, string>>>([]);
let editing = ref("");

async function getRequests() {
  let requestResults;
  try {
    requestResults = await fetchy("/api/friend/requests", "GET");
  } catch (_) {
    return;
  }
  requests.value = requestResults;
}

let sentPendingRequests = computed(() => requests.value.filter((x) => x.status == "pending" && x.from == currentUsername.value));
let receivedPendingRequests = computed(() => requests.value.filter((x) => x.status == "pending" && x.to == currentUsername.value));

onBeforeMount(async () => {
  await getRequests();
  loaded.value = true;
});
</script>

<template>
  <section v-if="isLoggedIn">
    <h2>Send a friend request:</h2>
    <CreateFriendRequestForm @refreshRequests="getRequests" />
  </section>
  <!-- <div class="row">
    <h2 v-if="!searchAuthor">Posts:</h2>
    <h2 v-else>Posts by {{ searchAuthor }}:</h2>
    <SearchPostForm @getPostsByAuthor="getPosts" />
  </div> -->
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
      <ReceivedRequestComponent :request="request" @refreshRequests="getRequests" />
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
