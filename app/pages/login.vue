<template>
  <div class="flex items-center justify-center min-h-[80vh] p-4">
    <div class="w-full max-w-md">
      <div class="p-6 border rounded-lg shadow-md">
        <div class="mb-4">
          <h1 class="text-2xl font-bold text-center">登录/注册</h1>
          <p class="text-gray-500 text-center">欢迎使用宠牧圈平台</p>
        </div>
        <div>
          <form>
            <div class="mb-4">
              <label class="block mb-2 text-sm font-medium">用户名/邮箱</label>
              <input v-model="loginForm.username" type="text" placeholder="请输入用户名或邮箱" class="w-full px-4 py-2 border rounded-md" />
            </div>
            <div class="mb-4">
              <label class="block mb-2 text-sm font-medium">密码</label>
              <input v-model="loginForm.password" type="password" placeholder="请输入密码" class="w-full px-4 py-2 border rounded-md" />
            </div>
            <div class="flex items-center justify-between mt-4">
              <div class="flex items-center">
                <input v-model="loginForm.remember" type="checkbox" class="mr-2" />
                <label class="text-sm">记住我</label>
              </div>
              <NuxtLink to="#" class="text-sm text-blue-600">忘记密码？</NuxtLink>
            </div>
            <button type="button" class="w-full mt-6 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors" @click="login">登录</button>
            <div class="text-center mt-4">
              <p class="text-sm">还没有账号？ <NuxtLink to="#" class="text-blue-600">立即注册</NuxtLink></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const loginForm = ref({
  username: '',
  password: '',
  remember: false
})

const login = () => {
  // 模拟登录逻辑
  alert('登录成功！')
  // 跳转到首页
  window.location.href = '/'
}
</script>