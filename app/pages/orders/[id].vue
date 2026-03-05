<template>
  <div>
    <h1>订单详情</h1>
    <p>订单号: {{ orderId }}</p>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const orderId = computed(() => route.params.id)
</script>