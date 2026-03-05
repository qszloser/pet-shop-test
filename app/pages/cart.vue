<template>
  <div class="py-12 px-4">
    <div class="max-w-6xl mx-auto">
      <h1 class="text-3xl font-bold mb-8">购物车</h1>

      <!-- 购物车商品列表 -->
      <div v-if="cartItems.length > 0" class="bg-white border rounded-lg p-6 shadow mb-8">
        <table class="w-full border-collapse">
          <thead>
            <tr class="bg-gray-100">
              <th class="border p-2">商品</th>
              <th class="border p-2">价格</th>
              <th class="border p-2">数量</th>
              <th class="border p-2">小计</th>
              <th class="border p-2">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in cartItems" :key="index" class="hover:bg-gray-50">
              <td class="border p-2">
                <div class="flex items-center">
                  <img :src="item.image" :alt="item.name" class="w-16 h-16 object-cover rounded" />
                  <div class="ml-4">
                    <h3 class="font-semibold">{{ item.name }}</h3>
                    <p class="text-gray-500 text-sm">{{ item.breed }}</p>
                  </div>
                </div>
              </td>
              <td class="border p-2">{{ item.price }}</td>
              <td class="border p-2">
                <div class="flex items-center">
                  <button @click="decreaseQuantity(item)" class="px-2 py-1 border rounded-l">-</button>
                  <span class="px-4 py-1 border-t border-b">{{ item.quantity }}</span>
                  <button @click="increaseQuantity(item)" class="px-2 py-1 border rounded-r">+</button>
                </div>
              </td>
              <td class="border p-2">{{ calculateSubtotal(item) }}</td>
              <td class="border p-2">
                <button @click="removeFromCart(item)" class="text-red-600 hover:text-red-800">删除</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- 空购物车提示 -->
      <div v-else class="bg-white border rounded-lg p-6 shadow text-center">
        <p class="text-gray-500">购物车为空</p>
        <NuxtLink to="/pets" class="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">去购物</NuxtLink>
      </div>

      <!-- 结算信息 -->
      <div v-if="cartItems.length > 0" class="bg-white border rounded-lg p-6 shadow">
        <h2 class="text-xl font-bold mb-4">结算信息</h2>
        <div class="flex justify-between mb-2">
          <span>商品总价</span>
          <span>{{ totalPrice }}</span>
        </div>
        <div class="flex justify-between mb-2">
          <span>运费</span>
          <span>{{ shippingFee }}</span>
        </div>
        <div class="flex justify-between font-bold text-lg mb-6">
          <span>总计</span>
          <span>{{ totalWithShipping }}</span>
        </div>
        <div class="flex justify-end">
          <button @click="checkout" class="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">结算</button>
        </div>
      </div>
    </div>

    <!-- 支付弹窗 -->
    <div v-if="showCheckoutModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 max-w-md w-full">
        <h2 class="text-xl font-bold mb-4">支付</h2>
        <div class="mb-4">
          <p class="font-medium">订单信息</p>
          <p class="text-gray-500">商品总价: {{ totalPrice }}</p>
          <p class="text-gray-500">运费: {{ shippingFee }}</p>
          <p class="font-bold">总计: {{ totalWithShipping }}</p>
        </div>
        <div class="mb-4">
          <p class="font-medium">支付方式</p>
          <div class="flex gap-4">
            <label class="flex items-center">
              <input type="radio" v-model="paymentMethod" value="alipay" class="mr-2" />
              支付宝
            </label>
            <label class="flex items-center">
              <input type="radio" v-model="paymentMethod" value="wechat" class="mr-2" />
              微信支付
            </label>
          </div>
        </div>
        <div class="flex gap-4">
          <button @click="pay" class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">支付</button>
          <button @click="showCheckoutModal = false" class="px-4 py-2 border rounded-md hover:bg-gray-100 transition-colors">取消</button>
        </div>
      </div>
    </div>

    <!-- 支付成功弹窗 -->
    <div v-if="showSuccessModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 max-w-md w-full">
        <h2 class="text-xl font-bold mb-4">支付成功</h2>
        <div class="mb-4">
          <p class="text-gray-500">订单号: {{ orderId }}</p>
          <p class="text-gray-500">支付时间: {{ paymentTime }}</p>
          <p class="text-gray-500">支付金额: {{ totalWithShipping }}</p>
          <p class="text-gray-500">支付方式: {{ paymentMethod === 'alipay' ? '支付宝' : '微信支付' }}</p>
        </div>
        <div class="flex gap-4">
          <button @click="viewOrder" class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">查看订单</button>
          <button @click="showSuccessModal = false; cartItems = []" class="px-4 py-2 border rounded-md hover:bg-gray-100 transition-colors">关闭</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 购物车数据
const cartItems = ref([
  {
    id: 1,
    name: '金毛幼犬',
    breed: '金毛巡回犬',
    price: '¥1200',
    quantity: 1,
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=golden%20retriever%20puppy%20cute&image_size=landscape_4_3'
  },
  {
    id: 2,
    name: '英短蓝猫',
    breed: '英国短毛猫',
    price: '¥2000',
    quantity: 1,
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=british%20shorthair%20blue%20cat%20cute&image_size=landscape_4_3'
  }
])

// 支付相关
const showCheckoutModal = ref(false)
const showSuccessModal = ref(false)
const paymentMethod = ref('alipay')
const orderId = ref('ORD' + Date.now())
const paymentTime = ref(new Date().toLocaleString())

// 运费
const shippingFee = ref('¥100')

// 计算商品小计
const calculateSubtotal = (item) => {
  const price = parseInt(item.price.replace('¥', ''))
  return '¥' + (price * item.quantity)
}

// 计算商品总价
const totalPrice = computed(() => {
  let total = 0
  cartItems.value.forEach(item => {
    const price = parseInt(item.price.replace('¥', ''))
    total += price * item.quantity
  })
  return '¥' + total
})

// 计算总金额（含运费）
const totalWithShipping = computed(() => {
  const total = parseInt(totalPrice.value.replace('¥', ''))
  const shipping = parseInt(shippingFee.value.replace('¥', ''))
  return '¥' + (total + shipping)
})

// 增加商品数量
const increaseQuantity = (item) => {
  item.quantity += 1
}

// 减少商品数量
const decreaseQuantity = (item) => {
  if (item.quantity > 1) {
    item.quantity -= 1
  }
}

// 从购物车中删除商品
const removeFromCart = (item) => {
  cartItems.value = cartItems.value.filter(i => i.id !== item.id)
}

// 结算
const checkout = () => {
  showCheckoutModal.value = true
}

// 支付
const pay = () => {
  showCheckoutModal.value = false
  showSuccessModal.value = true
}

// 查看订单
const viewOrder = () => {
  showSuccessModal.value = false
  // 跳转到订单详情页面
  router.push(`/orders/${orderId.value}`)
}
</script>