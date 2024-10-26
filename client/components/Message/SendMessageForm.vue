<script setup lang="ts">
import { ref } from "vue";
import { fetchy } from "../../utils/fetchy";

const content = ref("");
const props = defineProps(["friend"]);
const emit = defineEmits(["refreshMessages"]);

const sendMessage = async (content: string) => {
  await fetchy(`/api/message/send/${props.friend.friendName}`, "POST", { body: { messageContent: content } });
  emit("refreshMessages");
  emptyForm();
};

const emptyForm = () => {
  content.value = "";
};
</script>

<template>
  <label for="content"></label>
  <input id="content" v-model="content" placeholder="send..." />
  <button class="pure-button-primary pure-button" @click="sendMessage(content)">Send Message!</button>
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
