<template>
    <li class="list-group-item">
      {{ title }}
      <button 
        v-on:click="$emit('remove')"
        type="button"
        class="btn btn-outline-danger"
      >
      Удалить
      </button>
    </li>
</template>

<script>
export default {
  name: "taskItem",
  props: {
    title: String
  }
};
</script>