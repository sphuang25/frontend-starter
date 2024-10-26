<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { formatDate } from "@/utils/formatDate";
import { storeToRefs } from "pinia";
import { ref } from "vue";

const props = defineProps(["message"]);
const emit = defineEmits(["refreshFriends"]);
const { currentUsername } = storeToRefs(useUserStore());
const messages = ref<Array<Record<string, string>>>([]);

const content = ref("");
</script>

<template>
  <p>{{ props.message.message }}</p>
  <p>Sent {{ formatDate(props.message.dateCreated) }}</p>
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
