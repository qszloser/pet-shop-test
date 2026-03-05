<template>
  <div class="py-12 px-4">
    <div class="max-w-6xl mx-auto">
      <h1 class="text-3xl font-bold mb-2">宠物交易区</h1>
      <p class="text-gray-600 mb-8">浏览和筛选宠物，找到适合您的小伙伴</p>

      <!-- 筛选条件 -->
      <div class="bg-white border rounded-lg p-4 mb-6 shadow">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <select v-model="filters.price" class="border rounded-lg px-3 py-2 w-full">
            <option value="all">全部</option>
            <option value="0-1000">0-1000元</option>
            <option value="1000-2000">1000-2000元</option>
            <option value="2000-5000">2000-5000元</option>
            <option value="5000+">5000元以上</option>
          </select>
          
          <select v-model="filters.region" class="border rounded-lg px-3 py-2 w-full">
            <option value="all">全部</option>
            <option value="local">本地</option>
            <option value="nearby">附近</option>
          </select>
          
          <select v-model="filters.age" class="border rounded-lg px-3 py-2 w-full">
            <option value="all">全部</option>
            <option value="baby">幼崽</option>
            <option value="young">青年</option>
            <option value="adult">成年</option>
          </select>
          
          <div class="flex items-center">
            <input type="checkbox" v-model="filters.freeShipping" id="freeShipping" class="mr-2">
            <label for="freeShipping">包邮</label>
          </div>
          <div class="flex items-center">
            <input type="checkbox" v-model="filters.selfPickup" id="selfPickup" class="mr-2">
            <label for="selfPickup">自提</label>
          </div>
          <select v-model="filters.appearance" class="border rounded-lg px-3 py-2 w-full">
            <option value="all">全部</option>
            <option value="excellent">优秀</option>
            <option value="good">良好</option>
            <option value="normal">普通</option>
          </select>
        </div>
        <div class="mt-4 flex justify-end">
          <button @click="resetFilters" class="bg-blue-600 text-white px-4 py-2 rounded-lg mr-2 hover:bg-blue-700 transition-colors">重置</button>
          <button @click="applyFilters" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">应用筛选</button>
        </div>
      </div>

      <!-- 宠物列表 -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="(pet, index) in filteredPets" :key="index">
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
</template>

<script setup>
import { ref, computed } from 'vue'

const filters = ref({
  price: 'all',
  region: 'all',
  age: 'all',
  freeShipping: false,
  selfPickup: false,
  appearance: 'all'
})

// 生成宠物数据
const pets = ref([
  {
    id: 1,
    name: '金毛幼犬',
    price: 1200,
    shop: '快乐宠物之家',
    distance: '1.2公里',
    age: '3个月',
    transport: '自提/快递',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=golden%20retriever%20puppy%20cute%20fluffy&image_size=landscape_4_3',
    description: '健康活泼的金毛幼犬，已接种疫苗，三个月大，性格温顺，适合家庭饲养。'
  },
  {
    id: 2,
    name: '英短蓝猫',
    price: 2000,
    shop: '猫咪乐园',
    distance: '3.5公里',
    age: '2个月',
    transport: '快递',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=british%20shorthair%20blue%20cat%20cute&image_size=landscape_4_3',
    description: '纯种英短蓝猫，两个月大，毛色漂亮，性格安静，适合室内饲养。'
  },
  {
    id: 3,
    name: '泰迪犬',
    price: 800,
    shop: '宠物天地',
    distance: '2.8公里',
    age: '3个月',
    transport: '自提',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=toy%20poodle%20teddy%20dog%20cute&image_size=landscape_4_3',
    description: '可爱的泰迪犬，三个月大，已驱虫，毛色棕红，聪明活泼。'
  },
  {
    id: 4,
    name: '布偶猫',
    price: 3500,
    shop: '猫舍精品',
    distance: '5.6公里',
    age: '3个月',
    transport: '快递',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=ragdoll%20cat%20blue%20eyes%20cute&image_size=landscape_4_3',
    description: '纯种布偶猫，三个月大，蓝眼睛，性格温顺，粘人。'
  },
  {
    id: 5,
    name: '哈士奇',
    price: 1500,
    shop: '犬类之家',
    distance: '4.2公里',
    age: '3个月',
    transport: '自提/快递',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=siberian%20husky%20puppy%20blue%20eyes&image_size=landscape_4_3',
    description: '活泼的哈士奇幼犬，三个月大，已接种疫苗，毛色漂亮，精力充沛。'
  },
  {
    id: 6,
    name: '龙猫',
    price: 600,
    shop: '小宠乐园',
    distance: '1.8公里',
    age: '2个月',
    transport: '快递',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinchilla%20cute%20fluffy&image_size=landscape_4_3',
    description: '可爱的龙猫，两个月大，毛色灰蓝，性格温顺，适合作为宠物。'
  }
])

const filteredPets = computed(() => {
  return pets.value.filter(pet => {
    // 价格筛选
    if (filters.value.price !== 'all') {
      const [min, max] = filters.value.price.split('-')
      if (max === '+') {
        if (pet.price < parseInt(min)) return false
      } else {
        if (pet.price < parseInt(min) || pet.price > parseInt(max)) return false
      }
    }
    // 其他筛选条件可以根据需要添加
    return true
  })
})

const resetFilters = () => {
  filters.value = {
    price: 'all',
    region: 'all',
    age: 'all',
    freeShipping: false,
    selfPickup: false,
    appearance: 'all'
  }
}

const applyFilters = () => {
  // 模拟应用筛选的逻辑
  console.log('应用筛选:', filters.value)
}

const addToCart = (pet) => {
  // 模拟添加到购物车的逻辑
  alert(`${pet.name} 已添加到购物车`)
}
</script>