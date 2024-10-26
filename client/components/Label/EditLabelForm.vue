<script setup lang="ts">
import { computed, onBeforeMount, ref } from "vue";
import { fetchy } from "../../utils/fetchy";

const props = defineProps(["post"]);
const emit = defineEmits(["editLabel", "refreshPosts"]);
const labelStringsRef = ref(Array<string>);
const numLabels = computed(() => labelStringsRef.value.length);
const newLabel = ref("");

const getLabel = async () => {
  try {
    labelStringsRef.value = (await fetchy(`/api/label/check/${props.post._id}`, "GET")).label;
  } catch (e) {
    return;
  }
};

const addLabel = async (content: string) => {
  await fetchy(`/api/label/add/${props.post._id}`, "POST", { body: { content: content } });
  await getLabel();
};

const deleteLabelByIdx = async (index: number) => {
  await fetchy(`/api/label/removeIdx/${props.post._id}`, "POST", { body: { labelIdx: index.toString() } });
  await getLabel();
};

const editLabel = async (content: string) => {
  try {
    await fetchy(`/api/label/${props.post._id}`, "POST", { body: { content: content } });
  } catch (e) {
    return;
  }
  emit("editLabel");
  emit("refreshPosts");
};

onBeforeMount(async () => {
  await getLabel();
});
</script>

<template>
  <p class="author">{{ props.post._id }}</p>
  <p><input id="content" v-model="newLabel" placeholder="label here!" required /></p>
  <button class="btn-small pure-button-primary pure-button" @click="addLabel(newLabel)" type="submit">Add Label</button>
  <p v-for="(item, index) in labelStringsRef" :key="index">
    {{ labelStringsRef[index] }}
    <button class="button-error btn-small pure-button" @click="deleteLabelByIdx(Number(index))" type="submit">Delete</button>
  </p>
  <button class="btn-small pure-button" @click="emit('editLabel')">Finish Label</button>
  <!-- <form @submit.prevent="editPost(content)">
    <p class="author">{{ props.post.author }}</p>
    <textarea id="content" v-model="content" placeholder="Create a post!" required> </textarea>
    <div class="base">
      <menu>
        <li><button class="btn-small pure-button-primary pure-button" type="submit">Save</button></li>
        <li><button class="btn-small pure-button" @click="emit('editPost')">Cancel</button></li>
      </menu>
      <p v-if="props.post.dateCreated !== props.post.dateUpdated" class="timestamp">Edited on: {{ formatDate(props.post.dateUpdated) }}</p>
      <p v-else class="timestamp">Created on: {{ formatDate(props.post.dateCreated) }}</p>
    </div>
  </form> -->
</template>

<style scoped>
form {
  background-color: var(--base-bg);
  display: flex;
  flex-direction: column;
  gap: 0.5em;
}

textarea {
  font-family: inherit;
  font-size: inherit;
  height: 2em;
  border-radius: 4px;

  resize: none;
}

button {
  font-family: inherit;
  font-size: inherit;
  height: 2em;
  width: 10em;
}

input {
  font-family: inherit;
  font-size: inherit;
  height: 2em;
  width: 10em;
  border-radius: 4px;
  resize: none;
}

p {
  margin: 0em;
  flex-direction: row;
  align-items: center;
}

.author {
  font-weight: bold;
  font-size: 1.2em;
}

menu {
  list-style-type: none;
  display: flex;
  flex-direction: row;
  gap: 1em;
  padding: 0;
  margin: 0;
}

.base {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.timestamp {
  display: flex;
  justify-content: flex-end;
  font-size: 0.9em;
  font-style: italic;
}
</style>
