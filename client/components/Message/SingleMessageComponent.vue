<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { formatDate } from "@/utils/formatDate";
import { storeToRefs } from "pinia";
import { computed, onBeforeMount, ref } from "vue";
import { fetchy } from "../../utils/fetchy";

const props = defineProps(["message", "friend"]);
const { currentUsername } = storeToRefs(useUserStore());

let messageContent = ref<Array<Record<string, string>>>([]);
let senderUsername = ref("");
let senderMe = computed(() => senderUsername.value === currentUsername.value);
let words = computed(() => `${messageContent.value}`);

const getMessageContent = async () => {
  messageContent.value = await fetchy(`/api/message/getContent/${props.message.message}`, "GET");
  senderUsername.value = await fetchy(`/api/users/getID/${props.message.sender}`, "GET");
};

onBeforeMount(async () => {
  await getMessageContent();
});
</script>

<template>
  <li v-if="senderMe">
    <p class="senderMe">{{ senderUsername }}</p>
    <p class="timestampMe">Sent {{ formatDate(props.message.dateCreated) }}</p>
    <p class="messagePadMe">{{ words }}</p>
  </li>
  <li v-if="!senderMe">
    <p class="senderFriend">{{ senderUsername }}</p>
    <p class="timestampFriend">Sent {{ formatDate(props.message.dateCreated) }}</p>
    <p class="messagePadFriend">{{ words }}</p>
  </li>
</template>

<style scoped>
p {
  margin: 0em;
}

.senderMe {
  font-weight: bold;
  font-size: 1.2em;
  text-align: right;
}

.senderFriend {
  font-weight: bold;
  font-size: 1.2em;
  text-align: left;
}

.messagePadMe {
  padding: 1em;
  width: 10em;
  background-color: greenyellow;
  text-align: right;
  float: right;
}

.messagePadFriend {
  padding: 1em;
  width: 10em;
  background-color: greenyellow;
  text-align: left;
  float: left;
}

menu {
  list-style-type: none;
  display: flex;
  flex-direction: row;
  gap: 1em;
  padding: 1;
  margin: 0;
}

.timestampFriend {
  display: flex;
  justify-content: flex-end;
  font-size: 0.6em;
  font-style: italic;
  float: left;
}

.timestampMe {
  display: flex;
  justify-content: flex-end;
  font-size: 0.6em;
  font-style: italic;
  float: right;
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
