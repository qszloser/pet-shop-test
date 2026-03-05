<template>
  <div>
    <!-- 页面英雄区 -->
    <div class="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-16 px-4">
      <div class="max-w-6xl mx-auto">
        <h1 class="text-4xl font-bold mb-4">宠牧圈</h1>
        <p class="text-xl mb-8">面向养殖户与宠物买家的交易+互动综合平台</p>
        <div class="flex flex-wrap gap-4">
          <a href="/pets" class="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold flex items-center gap-2 hover:bg-blue-50 transition-colors">
            浏览宠物
            <span>→</span>
          </a>
          <a href="/shops" class="bg-transparent border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
            查看店铺
          </a>
        </div>
      </div>
    </div>

    <!-- 精选商品 -->
    <div class="py-12 px-4">
      <div class="max-w-6xl mx-auto">
        <h2 class="text-2xl font-bold mb-2">精选商品</h2>
        <p class="text-gray-600 mb-8">为您推荐优质的宠物商品</p>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="(pet, index) in featuredPets" :key="index">
            <NuxtLink :to="`/pets/${pet.id}`" class="block overflow-hidden border rounded-lg shadow hover:shadow-lg transition-shadow">
              <img :src="pet.image" :alt="pet.name" class="w-full h-48 object-cover" />
              <div class="p-4">
                <h3 class="text-lg font-semibold">{{ pet.name }}</h3>
                <p class="text-blue-600 font-bold">¥{{ pet.price }}</p>
                <div class="flex justify-between items-center mt-2">
                  <span class="text-sm text-gray-500">{{ pet.shop }}</span>
                  <span class="text-sm text-gray-500">{{ pet.distance }}</span>
                </div>
              </div>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const featuredPets = [
  {
    id: 1,
    name: '金毛幼犬',
    price: 1200,
    shop: '快乐宠物之家',
    distance: '1.2公里',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=golden%20retriever%20puppy%20cute%20fluffy&image_size=landscape_4_3',
    description: '健康活泼的金毛幼犬，已接种疫苗，三个月大，性格温顺，适合家庭饲养。'
  },
  {
    id: 2,
    name: '英短蓝猫',
    price: 2000,
    shop: '猫咪乐园',
    distance: '3.5公里',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=british%20shorthair%20blue%20cat%20cute&image_size=landscape_4_3',
    description: '纯种英短蓝猫，两个月大，毛色漂亮，性格安静，适合室内饲养。'
  },
  {
    id: 3,
    name: '泰迪犬',
    price: 800,
    shop: '宠物天地',
    distance: '2.8公里',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=toy%20poodle%20teddy%20dog%20cute&image_size=landscape_4_3',
    description: '可爱的泰迪犬，三个月大，已驱虫，毛色棕红，聪明活泼。'
  },
  {
    id: 4,
    name: '布偶猫',
    price: 3500,
    shop: '猫舍精品',
    distance: '5.6公里',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=ragdoll%20cat%20blue%20eyes%20cute&image_size=landscape_4_3',
    description: '纯种布偶猫，三个月大，蓝眼睛，性格温顺，粘人。'
  },
  {
    id: 5,
    name: '哈士奇',
    price: 1500,
    shop: '犬类之家',
    distance: '4.2公里',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=siberian%20husky%20puppy%20blue%20eyes&image_size=landscape_4_3',
    description: '活泼的哈士奇幼犬，三个月大，已接种疫苗，毛色漂亮，精力充沛。'
  },
  {
    id: 6,
    name: '龙猫',
    price: 600,
    shop: '小宠乐园',
    distance: '1.8公里',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinchilla%20cute%20fluffy&image_size=landscape_4_3',
    description: '可爱的龙猫，两个月大，毛色灰蓝，性格温顺，适合作为宠物。'
  }
]

const addToCart = (pet) => {
  // 模拟添加到购物车的逻辑
  alert(`${pet.name} 已添加到购物车`)
}
</script>
