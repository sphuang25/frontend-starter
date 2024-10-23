<script setup lang="ts">
import { ref } from "vue";
import { fetchy } from "../../utils/fetchy";

const friendToAdd = ref("");
const emit = defineEmits(["refreshRequest"]);

const sendFriendRequest = async (friendToAdd: string) => {
  try {
    await fetchy(`/friend/requests/${friendToAdd}`, "POST", {});
  } catch (_) {
    return;
  }
  emit("refreshRequest");
  emptyForm();
};

const emptyForm = () => {
  friendToAdd.value = "";
};
</script>

<template>
  <form @submit.prevent="sendFriendRequest(friendToAdd)">
    <select v-model="friendToAdd">
      <option disabled value="">Please select one</option>
      <!-- <option v-for="option in options" :value="option.value">
      {{ option.text }} -->
      <option></option>
    </select>
    <button type="submit" class="pure-button-primary pure-button">Send Friend Request</button>
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
