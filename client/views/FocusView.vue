<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { fetchy } from "@/utils/fetchy";
import { storeToRefs } from "pinia";
import { computed, onBeforeMount, ref } from "vue";

const { currentUsername, isLoggedIn } = storeToRefs(useUserStore());

const emptyForm = () => {
  options.value = "";
  FriendToAdd.value = "";
  FriendToRemove.value = "";
  postContent.value = "";
  FriendToRemove.value = "";
  postContent.value = "";
  friendToMessage.value = "";
  messageContent.value = "";
  successMessage.value = "";
};

async function wait() {
  // Wait 1 second
  await new Promise((resolve) => setTimeout(resolve, 700));
}

async function getFriends() {
  let friendResults;
  try {
    friendResults = await fetchy("/api/friends", "GET");
  } catch (_) {
    return;
  }
  friends.value = friendResults;
}

async function submitFriendRequest() {
  try {
    await fetchy(`/api/friend/requests/${FriendToAdd.value}`, "POST");
  } catch (_) {
    return;
  }
  successMessage.value = "Successfully send friend request!";
  await wait();
  emptyForm();
}

async function deleteFriend() {
  try {
    await fetchy(`/api/friends/${FriendToRemove.value}`, "DELETE");
  } catch (_) {
    return;
  }
  successMessage.value = "Successfully remove the friend!";
  await wait();
  emptyForm();
}

async function post() {
  try {
    await fetchy("/api/posts", "POST", { body: { content: postContent.value } });
  } catch (_) {
    return;
  }
  successMessage.value = "Posted!";
  await wait();
  emptyForm();
}

async function sendMessage() {
  try {
    await fetchy(`/api/message/send/${friendToMessage.value}`, "POST", { body: { messageContent: messageContent.value } });
  } catch (_) {
    return;
  }
  successMessage.value = "Message Sent!";
  await wait();
  emptyForm();
}

const loaded = ref(false);
let friends = ref<Array<Record<string, string>>>([]);
let options = ref("");
let FriendToAdd = ref("");
let FriendToRemove = ref("");
let postContent = ref("");
let friendToMessage = ref("");
let messageContent = ref("");
let successMessage = ref("");
let friendsList = computed(() => friends.value.filter((x) => x.user1 !== "DELETED_USER" && x.user2 !== "DELETED_USER"));

onBeforeMount(async () => {
  await getFriends();
  loaded.value = true;
});
</script>

<template>
  <div class="custom-select" style="width: 200px">
    <select v-model="options">
      <option value="" disabled selected>Select your option</option>
      <option value="0">Add Friend</option>
      <option value="1">Remove Friend</option>
      <option value="2">Post</option>
      <option value="3">Message</option>
    </select>
  </div>
  <div v-if="options === '0'">
    <input class="inputCenter" v-model="FriendToAdd" placeholder="type in the username..." />
    <button type="submit" v-on:click="submitFriendRequest" class="pure-button-primary pure-button">Send!</button>
  </div>
  <div v-if="options === '1'" style="text-align: center">
    Choose Friend:<select class="dropdown" v-model="FriendToRemove">
      <option v-for="friend in friendsList" :key="friend._id" :value="friend.friendName" ref="items">
        {{ friend.friendName }}
      </option>
    </select>
    <button type="submit" v-on:click="deleteFriend" class="button-error pure-button-primary pure-button">Delete Friend!</button>
  </div>
  <div v-if="options === '2'">
    <textarea class="inputCenter" v-model="postContent" placeholder="type in what to post..."></textarea>
    <button type="submit" v-on:click="post" class="pure-button-primary pure-button">Post!</button>
  </div>
  <div v-if="options === '3'" style="text-align: center">
    Choose Friend:<select class="dropdown" v-model="friendToMessage">
      <option v-for="friend in friendsList" :key="friend._id" :value="friend.friendName" ref="items">
        {{ friend.friendName }}
      </option>
    </select>
    <div v-if="friendToMessage !== ''">
      <textarea class="inputCenter" v-model="messageContent" placeholder="what to send to your friends..."></textarea>
      <button type="submit" v-on:click="sendMessage" class="pure-button-primary pure-button">Send!</button>
    </div>
  </div>
  <p style="text-align: center">{{ successMessage }}</p>
</template>

<style scoped>
textarea {
  height: 10em;
}
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

div {
  float: center;
  margin: auto;
}

input {
  display: block;
  margin: 0 auto;
}

.inputCenter {
  display: block;
  margin: 0 auto;
}

button {
  display: block;
  margin: 0 auto;
}

article {
  background-color: var(--base-bg);
  border-radius: 1em;
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  padding: 1em;
  width: 60em;
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
