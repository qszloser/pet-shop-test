<script setup>
useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico' }
  ],
  htmlAttrs: {
    lang: 'zh-CN'
  }
})

const title = '宠牧圈 - 宠商直接交易平台'
const description = '面向养殖户与宠物买家的交易+互动综合平台'

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cute%20pet%20shop%20logo%20with%20dogs%20and%20cats&image_size=square',
  twitterImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cute%20pet%20shop%20logo%20with%20dogs%20and%20cats&image_size=square',
  twitterCard: 'summary_large_image'
})
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <header class="bg-white border-b">
      <div class="container mx-auto px-4 py-4 flex justify-between items-center">
        <div class="flex items-center gap-2">
          <NuxtLink to="/" class="flex items-center gap-2">
            <img src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cute%20pet%20shop%20logo%20with%20dogs%20and%20cats&image_size=square" alt="宠牧圈" class="w-8 h-8 rounded-full" />
            <span class="text-xl font-bold">宠牧圈</span>
          </NuxtLink>

          <nav class="ml-8">
            <ul class="flex gap-6">
              <li><NuxtLink to="/" class="hover:text-blue-600 transition-colors">首页</NuxtLink></li>
              <li><NuxtLink to="/pets" class="hover:text-blue-600 transition-colors">宠物交易</NuxtLink></li>
              <li><NuxtLink to="/shops" class="hover:text-blue-600 transition-colors">店铺</NuxtLink></li>
              <li><NuxtLink to="/seller" class="hover:text-blue-600 transition-colors">卖家后台</NuxtLink></li>
              <li><NuxtLink to="/admin" class="hover:text-blue-600 transition-colors">管理员后台</NuxtLink></li>
            </ul>
          </nav>
        </div>

        <div>
          <NuxtLink to="/login" class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">登录/注册</NuxtLink>
        </div>
      </div>
    </header>

    <main class="flex-1">
      <NuxtPage />
    </main>

    <div class="border-t my-4"></div>

    <footer class="bg-white py-4">
      <div class="container mx-auto px-4 flex justify-between items-center">
        <div>
          <p class="text-sm text-gray-500">
            宠牧圈 • © {{ new Date().getFullYear() }}
          </p>
        </div>

        <div>
          <p class="text-sm text-gray-500">
            客服热线: 400-123-4567
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>
