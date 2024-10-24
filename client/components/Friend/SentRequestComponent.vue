<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { formatDate } from "@/utils/formatDate";
import { storeToRefs } from "pinia";
import { fetchy } from "../../utils/fetchy";

const props = defineProps(["request"]);
const emit = defineEmits(["refreshRequests"]);
const { currentUsername } = storeToRefs(useUserStore());

const removeFriendRequest = async () => {
  try {
    await fetchy(`/api/friend/requests/${props.request.to}`, "DELETE");
  } catch {
    return;
  }
  emit("refreshRequests");
};
</script>

<template>
  <p class="sender">{{ props.request.to }}</p>
  <div class="base">
    <article class="timestamp">
      <p>Request sent: {{ formatDate(props.request.dateCreated) }}</p>
    </article>
    <menu v-if="props.request.from == currentUsername">
      <p><button class="button-error btn-small pure-button" @click="removeFriendRequest">Delete</button></p>
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
