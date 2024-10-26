<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { formatDate } from "@/utils/formatDate";
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";
import { fetchy } from "../../utils/fetchy";
const props = defineProps(["friend"]);
const emit = defineEmits(["refreshFriends"]);
const { currentUsername } = storeToRefs(useUserStore());

const friendInterface = ref("");

const removeFriend = async () => {
  try {
    await fetchy(`/api/friends/${props.friend.friendName}`, "DELETE");
  } catch {
    return;
  }
  emit("refreshFriends");
};

const getFriendInterface = async (friendName: string) => {
  friendInterface.value = await fetchy(`/api/interface/check/${friendName}`, "GET");
};

onMounted(async () => {
  await getFriendInterface(props.friend.friendName);
});
</script>

<template>
  <p class="sender">{{ props.friend.friendName }}</p>
  <p>Interface: {{ friendInterface }}</p>
  <div class="base">
    <article class="timestamp">
      <p>Friends since: {{ formatDate(props.friend.dateCreated) }}</p>
    </article>
    <menu>
      <p><button class="btn-small pure-button" @click="removeFriend">Remove</button></p>
    </menu>
  </div>
</template>

<style scoped>
p {
  margin: 0em;
}

.sender {
  font-weight: bold;
  font-size: 1.2em;
}

menu {
  list-style-type: none;
  display: flex;
  flex-direction: row;
  gap: 1em;
  padding: 1;
  margin: 0;
}

.timestamp {
  display: flex;
  justify-content: flex-end;
  font-size: 0.9em;
  font-style: italic;
}

.base {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.base article:only-child {
  margin-left: auto;
}
</style>
