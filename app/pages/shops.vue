<template>
  <div class="py-12 px-4">
    <div class="max-w-6xl mx-auto">
      <h1 class="text-3xl font-bold mb-2">店铺列表</h1>
      <p class="text-gray-600 mb-8">浏览和选择您喜欢的宠物店铺</p>

      <!-- 店铺列表 -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="(shop, index) in shops" :key="index" class="border rounded-lg overflow-hidden shadow">
          <img :src="shop.image" :alt="shop.name" class="w-full h-48 object-cover" />
          <div class="p-4">
            <h3 class="text-lg font-semibold">{{ shop.name }}</h3>
            <p class="text-gray-500">{{ shop.address }}</p>
            <p class="text-sm mt-2">{{ shop.description }}</p>
            <div class="flex justify-between items-center mt-4">
              <span class="text-sm text-gray-500">{{ shop.distance }}</span>
              <NuxtLink :to="`/shops/${shop.id}`" class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">进入店铺</NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const shops = [
  {
    id: 1,
    name: '快乐宠物之家',
    address: '北京市朝阳区建国路88号',
    distance: '1.2公里',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=pet%20shop%20interior%20modern%20clean&image_size=landscape_4_3',
    description: '专业的宠物店铺，提供各类宠物及用品，服务周到，环境整洁。'
  },
  {
    id: 2,
    name: '猫咪乐园',
    address: '上海市浦东新区张江高科技园区',
    distance: '3.5公里',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cat%20cafe%20cozy%20environment&image_size=landscape_4_3',
    description: '专注于猫咪的店铺，提供纯种猫及相关用品，猫咪爱好者的天堂。'
  },
  {
    id: 3,
    name: '宠物天地',
    address: '广州市天河区天河路385号',
    distance: '2.8公里',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=pet%20store%20colorful%20supplies&image_size=landscape_4_3',
    description: '综合性宠物店铺，提供各类宠物及用品，价格实惠，服务优质。'
  },
  {
    id: 4,
    name: '猫舍精品',
    address: '深圳市南山区科技园',
    distance: '5.6公里',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=luxury%20cat%20breeding%20facility&image_size=landscape_4_3',
    description: '高端猫舍，专注于纯种猫的繁育和销售，品质保证。'
  },
  {
    id: 5,
    name: '犬类之家',
    address: '杭州市西湖区西湖大道',
    distance: '4.2公里',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=dog%20breeding%20facility%20spacious&image_size=landscape_4_3',
    description: '专业犬类繁育基地，提供各类名犬，健康有保障。'
  },
  {
    id: 6,
    name: '小宠乐园',
    address: '成都市锦江区春熙路',
    distance: '1.8公里',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=small%20pet%20shop%20hamster%20guinea%20pig&image_size=landscape_4_3',
    description: '专注于小宠物的店铺，提供龙猫、仓鼠等小型宠物及用品。'
  }
]
</script>