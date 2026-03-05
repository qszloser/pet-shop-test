<template>
  <div class="py-12 px-4">
    <div class="max-w-6xl mx-auto">
      <!-- 店铺信息 -->
      <div class="bg-white border rounded-lg p-6 shadow mb-8">
        <div class="flex flex-col md:flex-row gap-6">
          <img :src="shop.image" :alt="shop.name" class="w-full md:w-1/3 h-64 object-cover rounded-lg" />
          <div class="flex-1">
            <h1 class="text-2xl font-bold mb-2">{{ shop.name }}</h1>
            <p class="text-gray-500 mb-4">{{ shop.address }}</p>
            <p class="text-gray-500 mb-4">{{ shop.distance }}</p>
            <p class="mb-4">{{ shop.description }}</p>
            <div class="flex flex-wrap gap-4 mb-4">
              <button @click="showContactSeller" class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">联系卖家</button>
              <button class="px-4 py-2 border rounded-md hover:bg-gray-100 transition-colors">收藏店铺</button>
              <button class="px-4 py-2 border rounded-md hover:bg-gray-100 transition-colors">社交主页</button>
            </div>
            <div class="flex gap-4">
              <NuxtLink to="/cart" class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">购物车 ({{ cartItems.length }})</NuxtLink>
            </div>
          </div>
        </div>
      </div>

      <!-- 店铺商品 -->
      <div class="bg-white border rounded-lg p-6 shadow">
        <h2 class="text-xl font-bold mb-6">店铺商品</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="(pet, index) in shopPets" :key="index" class="border rounded-lg overflow-hidden shadow hover:shadow-md transition-shadow">
            <img :src="pet.image" :alt="pet.name" class="w-full h-48 object-cover" />
            <div class="p-4">
              <h3 class="text-lg font-semibold mb-2">{{ pet.name }}</h3>
              <p class="text-gray-500 mb-2">{{ pet.breed }}</p>
              <p class="text-lg font-bold text-blue-600 mb-2">{{ pet.price }}</p>
              <div class="flex justify-between items-center">
                <span class="text-sm text-gray-500">{{ pet.age }}</span>
                <div class="flex gap-2">
                  <NuxtLink :to="`/pets/${pet.id}`" class="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm">查看详情</NuxtLink>
                  <button @click="addToCart(pet)" class="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm">加入购物车</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 联系卖家弹窗 -->
    <div v-if="showContactModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 max-w-md w-full">
        <h2 class="text-xl font-bold mb-4">联系卖家</h2>
        <div class="mb-4">
          <p class="font-medium">卖家信息</p>
          <p class="text-gray-500">{{ shop.name }}</p>
        </div>
        <div class="mb-4">
          <p class="font-medium">联系方式</p>
          <p class="text-gray-500">电话: 13800138000</p>
          <p class="text-gray-500">邮箱: info@petshop.com</p>
        </div>
        <div class="flex gap-4">
          <a href="tel:13800138000" class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">拨打电话</a>
          <a href="sms:13800138000" class="px-4 py-2 border rounded-md hover:bg-gray-100 transition-colors">发送短信</a>
          <button @click="showContactModal = false" class="px-4 py-2 border rounded-md hover:bg-gray-100 transition-colors">关闭</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const shopId = computed(() => route.params.id)

// 联系卖家弹窗
const showContactModal = ref(false)

// 购物车数据
const cartItems = ref([])

// 店铺数据
const shops = ref([
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
])

// 店铺宠物数据
const shopPetsData = {
  1: [
    {
      id: 1,
      name: '金毛幼犬',
      breed: '金毛巡回犬',
      price: '¥1200',
      age: '3个月',
      image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=golden%20retriever%20puppy%20cute&image_size=landscape_4_3'
    },
    {
      id: 2,
      name: '英短蓝猫',
      breed: '英国短毛猫',
      price: '¥2000',
      age: '2个月',
      image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=british%20shorthair%20blue%20cat%20cute&image_size=landscape_4_3'
    },
    {
      id: 3,
      name: '泰迪犬',
      breed: '贵宾犬',
      price: '¥800',
      age: '4个月',
      image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=toy%20poodle%20puppy%20cute&image_size=landscape_4_3'
    }
  ],
  2: [
    {
      id: 4,
      name: '布偶猫',
      breed: '布偶猫',
      price: '¥3500',
      age: '3个月',
      image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=ragdoll%20cat%20cute&image_size=landscape_4_3'
    },
    {
      id: 5,
      name: '缅因猫',
      breed: '缅因猫',
      price: '¥4000',
      age: '2个月',
      image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=maine%20coon%20kitten%20cute&image_size=landscape_4_3'
    }
  ],
  3: [
    {
      id: 6,
      name: '哈士奇',
      breed: '西伯利亚雪橇犬',
      price: '¥1500',
      age: '3个月',
      image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=husky%20puppy%20cute&image_size=landscape_4_3'
    },
    {
      id: 7,
      name: '萨摩耶',
      breed: '萨摩耶犬',
      price: '¥1800',
      age: '4个月',
      image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=samoyed%20puppy%20cute&image_size=landscape_4_3'
    },
    {
      id: 8,
      name: '加菲猫',
      breed: '异国短毛猫',
      price: '¥2500',
      age: '2个月',
      image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=exotic%20shorthair%20cat%20cute&image_size=landscape_4_3'
    }
  ],
  4: [
    {
      id: 9,
      name: '斯芬克斯猫',
      breed: '斯芬克斯猫',
      price: '¥5000',
      age: '3个月',
      image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=sphynx%20cat%20cute&image_size=landscape_4_3'
    },
    {
      id: 10,
      name: '孟加拉猫',
      breed: '孟加拉猫',
      price: '¥4500',
      age: '2个月',
      image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=bengal%20cat%20cute&image_size=landscape_4_3'
    }
  ],
  5: [
    {
      id: 11,
      name: '德国牧羊犬',
      breed: '德国牧羊犬',
      price: '¥2000',
      age: '3个月',
      image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=german%20shepherd%20puppy%20cute&image_size=landscape_4_3'
    },
    {
      id: 12,
      name: '拉布拉多',
      breed: '拉布拉多犬',
      price: '¥1500',
      age: '4个月',
      image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=labrador%20retriever%20puppy%20cute&image_size=landscape_4_3'
    },
    {
      id: 13,
      name: '柯基犬',
      breed: '威尔士柯基犬',
      price: '¥2500',
      age: '3个月',
      image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=corgi%20puppy%20cute&image_size=landscape_4_3'
    }
  ],
  6: [
    {
      id: 14,
      name: '龙猫',
      breed: '龙猫',
      price: '¥300',
      age: '2个月',
      image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinchilla%20cute&image_size=landscape_4_3'
    },
    {
      id: 15,
      name: '仓鼠',
      breed: '金丝熊',
      price: '¥50',
      age: '1个月',
      image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=hamster%20cute&image_size=landscape_4_3'
    },
    {
      id: 16,
      name: '荷兰猪',
      breed: '豚鼠',
      price: '¥100',
      age: '2个月',
      image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=guinea%20pig%20cute&image_size=landscape_4_3'
    }
  ]
}

// 当前店铺数据
const shop = computed(() => {
  return shops.value.find(s => s.id === parseInt(shopId.value)) || shops.value[0]
})

// 当前店铺的宠物数据
const shopPets = computed(() => {
  return shopPetsData[shopId.value] || shopPetsData[1]
})

// 显示联系卖家弹窗
const showContactSeller = () => {
  showContactModal.value = true
}

// 添加到购物车
const addToCart = (pet) => {
  // 检查购物车中是否已存在该商品
  const existingItem = cartItems.value.find(item => item.id === pet.id)
  if (existingItem) {
    existingItem.quantity += 1
  } else {
    cartItems.value.push({
      ...pet,
      quantity: 1
    })
  }
  alert(`${pet.name} 已添加到购物车`)
}
</script>