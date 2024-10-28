<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";
import { fetchy } from "../../utils/fetchy";
import SendMessageForm from "./SendMessageForm.vue";
import SingleMessageComponent from "./SingleMessageComponent.vue";

const props = defineProps(["friend"]);
const { currentUsername } = storeToRefs(useUserStore());
const messages = ref<Array<Record<string, string>>>([]);

const getMessage = async () => {
  messages.value = await fetchy(`/api/message/get/${props.friend.friendName}`, "GET");
};

onMounted(async () => {
  await getMessage();
});
</script>

<template>
  <p class="sender">Chat with {{ props.friend.friendName }}</p>
  <menuBlock>
    <article v-for="message in messages" :key="message._id">
      <SingleMessageComponent :message="message" />
    </article>
    <SendMessageForm :friend="props.friend" @refreshMessages="getMessage" />
  </menuBlock>
</template>

<style scoped>
p {
  margin: 0em;
}

.sender {
  font-weight: bold;
  font-size: 1.2em;
}

menuBlock {
  list-style-type: none;
  display: flex;
  flex-direction: column;
  gap: 1em;
  padding: 1;
  margin: 0;
  max-height: 20em;
  overflow: scroll;
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
