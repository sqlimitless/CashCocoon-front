<script setup lang="ts">
import {onMounted, ref} from "vue";
import axios from "axios";
import router from "@/router";

const email = ref('')
const password = ref('')


onMounted(() => {
  const member = localStorage.getItem('member');
  if (member != null) {
    const accessToken = JSON.parse(member).accessToken;
    const accessTokenExpireIn = JSON.parse(member).accessTokenExpireIn;
    if (accessToken != undefined) {
      router.push({name: 'DashBoard'})
    }
  }
})

function emailRules(v) {
  const reg = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
  return reg.test(v.trim()) || v.trim() === '' || '이메일 형식을 확인하세요'
}

const passwordRules = (v) => {
  return !!v.trim() || v.trim() === '' || '비밀번호를 확인하세요'
}

const login = () => {
  if (emailRules(email.value) !== true) {
    alert(emailRules(email.value))
    return
  }
  if (passwordRules(password.value) !== true) {
    alert(passwordRules(password.value))
    return
  }

  axios({
    method: 'POST',
    url: '/api/members/login',
    data: {
      "email": email.value,
      "password": password.value
    }
  }).then(res => {
    localStorage.setItem('member', JSON.stringify(res.data));
    router.push({name: 'DashBoard'})
  })
    .catch(reason => {
      const response = reason.response;
      if (response.status === 400) {
        if (response.data === 'email') {
          alert('등록되지 않은 이메일 입니다.')
          return
        } else if (response.data === 'password') {
          alert('비밀번호가 잘못되었습니다.')
          return
        }
      }
    })
}


</script>

<template>
  <v-sheet width="300" class="mx-auto">
    <v-form @submit.prevent>
      <v-text-field
        v-model="email"
        :rules="[emailRules]"
        label="email"
      ></v-text-field>
      <v-text-field
        type="password"
        v-model="password"
        :rules="[passwordRules]"
        label="password"
        @keyup.enter="login"
      ></v-text-field>
      <v-btn block class="mt-2" @click="login">login</v-btn>
    </v-form>
  </v-sheet>
</template>

<style scoped>

</style>
