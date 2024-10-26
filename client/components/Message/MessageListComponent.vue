<script setup lang="ts">
import MessageBlockComponent from "@/components/Message/MessageBlockComponent.vue";
import { useUserStore } from "@/stores/user";
import { fetchy } from "@/utils/fetchy";
import { storeToRefs } from "pinia";
import { computed, onBeforeMount, ref } from "vue";

const { currentUsername, isLoggedIn } = storeToRefs(useUserStore());

const loaded = ref(false);
let friends = ref<Array<Record<string, string>>>([]);

async function getFriends() {
  let friendResults;
  try {
    friendResults = await fetchy("/api/friends", "GET");
  } catch (_) {
    return;
  }
  friends.value = friendResults;
}

let friendsList = computed(() => friends.value.filter((x) => x.user1 !== "DELETED_USER" && x.user2 !== "DELETED_USER"));

onBeforeMount(async () => {
  await getFriends();
  loaded.value = true;
});
</script>

<template>
  <section class="friends" v-if="loaded && friendsList.length !== 0">
    <article v-for="friend in friendsList" :key="friend._id">
      <MessageBlockComponent :friend="friend" />
    </article>
  </section>
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
