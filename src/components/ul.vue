<template>
    <ul class="myUl">
        <div 
            v-for="phone in phones"
            :key="phone.id"
        >
        {{phone}}
        </div>
    </ul>
</template>

<script>
export default {
  name: "myUl",
  props: {
    content: String
  },
  data: {
    phones: ['iPhone 7', 'Galaxy S8', 'Nokia N8', 'Xiaomi Mi6']
  }
};
</script>