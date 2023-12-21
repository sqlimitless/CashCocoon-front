<template>
  DashBoard~!!
</template>

<script lang="ts" setup>

import {onMounted} from "vue";
import axios from "axios";

onMounted(() => {
  axios({
    method: 'GET',
    url: '/api/transactions'
  }).then(res => {
    console.log(res.data)
  })
})
</script>
