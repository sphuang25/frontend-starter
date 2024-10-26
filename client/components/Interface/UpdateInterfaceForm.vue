<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import { computed, onBeforeMount } from "vue";
const { getInterface, setInterface } = useUserStore();
const { currentInterface } = storeToRefs(useUserStore());

const isFocused = computed(() => currentInterface.value === "Focus");

const switchInterface = async () => {
  if (currentInterface.value === "Leisure") {
    await setInterface("Focus");
  } else {
    await setInterface("Leisure");
  }
};

onBeforeMount(async () => {
  await getInterface();
});
</script>

<template>
  <h2>Set Interface</h2>
  <div class="form-check form-switch">
    <input v-on:click="switchInterface" class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" v-model="isFocused" />
    <label class="form-check-label" for="flexSwitchCheckDefault">{{ currentInterface }} Mode</label>
  </div>
</template>
