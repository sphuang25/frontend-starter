<script setup lang="ts">
import { ref } from "vue";
import { fetchy } from "../../utils/fetchy";

const content = ref("");
const emit = defineEmits(["refreshRequests"]);

const createFriendRequest = async (content: string) => {
  try {
    await fetchy(`/api/friend/requests/${content}`, "POST");
  } catch (_) {
    return;
  }
  emit("refreshRequests");
  emptyForm();
};

const emptyForm = () => {
  content.value = "";
};
</script>

<template>
  <form @submit.prevent="createFriendRequest(content)">
    <label for="content"></label>
    <input id="content" v-model="content" placeholder="type in the username..." />
    <button type="submit" class="pure-button-primary pure-button">Send Request</button>
  </form>
</template>

<style scoped>
form {
  background-color: var(--base-bg);
  border-radius: 1em;
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  padding: 1em;
}

textarea {
  font-family: inherit;
  font-size: inherit;
  height: 6em;
  padding: 0.5em;
  border-radius: 4px;
  resize: none;
}
</style>
