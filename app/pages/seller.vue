<template>
  <div class="py-12 px-4">
    <div class="max-w-6xl mx-auto">
      <h1 class="text-3xl font-bold mb-2">卖家后台</h1>
      <p class="text-gray-600 mb-8">管理您的店铺和商品</p>

      <!-- 导航选项卡 -->
      <div class="border-b mb-6">
        <div class="flex">
          <button 
            v-for="tab in tabs" 
            :key="tab.value"
            @click="activeTab = tab.value"
            class="px-4 py-2 mr-2 border-b-2 transition-colors"
            :class="activeTab === tab.value ? 'border-blue-600 text-blue-600' : 'border-transparent hover:text-blue-600'"
          >
            {{ tab.label }}
          </button>
        </div>
      </div>

      <!-- 发布商品 -->
      <div v-if="activeTab === 'products'" class="bg-white border rounded-lg p-6 shadow">
        <h2 class="text-xl font-bold mb-4">发布宠物商品</h2>
        <form @submit.prevent="submitProduct">
          <div class="mb-4">
            <label class="block mb-2 font-medium">商品名称</label>
            <input v-model="productForm.name" type="text" placeholder="请输入商品名称" class="border rounded-lg px-3 py-2 w-full" />
          </div>
          <div class="mb-4">
            <label class="block mb-2 font-medium">价格</label>
            <input v-model="productForm.price" type="number" placeholder="请输入价格" class="border rounded-lg px-3 py-2 w-full" />
          </div>
          <div class="mb-4">
            <label class="block mb-2 font-medium">数量</label>
            <input v-model="productForm.quantity" type="number" placeholder="请输入数量" class="border rounded-lg px-3 py-2 w-full" />
          </div>
          <div class="mb-4">
            <label class="block mb-2 font-medium">年龄</label>
            <input v-model="productForm.age" type="text" placeholder="请输入年龄，如：3个月" class="border rounded-lg px-3 py-2 w-full" />
          </div>
          <div class="mb-4">
            <label class="block mb-2 font-medium">性别</label>
            <select v-model="productForm.gender" class="border rounded-lg px-3 py-2 w-full">
              <option value="male">公</option>
              <option value="female">母</option>
            </select>
          </div>
          <div class="mb-4">
            <label class="block mb-2 font-medium">疫苗情况</label>
            <input v-model="productForm.vaccine" type="text" placeholder="请输入疫苗情况" class="border rounded-lg px-3 py-2 w-full" />
          </div>
          <div class="mb-4">
            <label class="block mb-2 font-medium">运输方式</label>
            <div class="flex gap-4">
              <div class="flex items-center">
                <input type="checkbox" v-model="productForm.transport.selfPickup" id="selfPickup" class="mr-2">
                <label for="selfPickup">自提</label>
              </div>
              <div class="flex items-center">
                <input type="checkbox" v-model="productForm.transport.express" id="express" class="mr-2">
                <label for="express">快递</label>
              </div>
              <div class="flex items-center">
                <input type="checkbox" v-model="productForm.transport.delivery" id="delivery" class="mr-2">
                <label for="delivery">送货</label>
              </div>
            </div>
          </div>
          <div class="mb-4">
            <label class="block mb-2 font-medium">详细描述</label>
            <textarea v-model="productForm.description" placeholder="请输入详细描述" rows="4" class="border rounded-lg px-3 py-2 w-full"></textarea>
          </div>
          <div class="mb-4">
            <label class="block mb-2 font-medium">注意事项</label>
            <textarea v-model="productForm.notes" placeholder="请输入注意事项" rows="2" class="border rounded-lg px-3 py-2 w-full"></textarea>
          </div>
          <div class="mb-4">
            <label class="block mb-2 font-medium">自提地址</label>
            <input v-model="productForm.pickupAddress" type="text" placeholder="请输入自提地址" class="border rounded-lg px-3 py-2 w-full" />
          </div>
          <div class="mb-4">
            <label class="block mb-2 font-medium">是否开启商品咨询区</label>
            <input type="checkbox" v-model="productForm.enableConsultation" id="enableConsultation" class="mr-2">
            <label for="enableConsultation">开启</label>
          </div>
          <div class="mt-6">
            <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">发布商品</button>
          </div>
        </form>
      </div>

      <!-- 商品管理 -->
      <div v-if="activeTab === 'productList'" class="bg-white border rounded-lg p-6 shadow">
        <h2 class="text-xl font-bold mb-4">商品管理</h2>
        <div class="flex flex-wrap gap-4 mb-4">
          <input v-model="productSearch" type="text" placeholder="搜索商品名称" class="border rounded-lg px-3 py-2 w-64" />
          <select v-model="productStatusFilter" class="border rounded-lg px-3 py-2">
            <option value="all">全部</option>
            <option value="active">在售</option>
            <option value="inactive">下架</option>
          </select>
          <button @click="searchProducts" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">搜索</button>
        </div>
        <table class="w-full border-collapse">
          <thead>
            <tr class="bg-gray-100">
              <th class="border p-2">商品ID</th>
              <th class="border p-2">商品名称</th>
              <th class="border p-2">价格</th>
              <th class="border p-2">数量</th>
              <th class="border p-2">状态</th>
              <th class="border p-2">发布日期</th>
              <th class="border p-2">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in filteredProducts" :key="product.id" class="hover:bg-gray-50">
              <td class="border p-2">{{ product.id }}</td>
              <td class="border p-2">{{ product.name }}</td>
              <td class="border p-2">{{ product.price }}</td>
              <td class="border p-2">{{ product.quantity }}</td>
              <td class="border p-2">{{ product.status }}</td>
              <td class="border p-2">{{ product.date }}</td>
              <td class="border p-2">
                <div class="flex gap-2">
                  <button @click="editProduct(product)" class="bg-blue-600 text-white px-2 py-1 rounded text-sm hover:bg-blue-700 transition-colors">编辑</button>
                  <button @click="deleteProduct(product.id)" class="bg-red-600 text-white px-2 py-1 rounded text-sm hover:bg-red-700 transition-colors">删除</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- 订单管理 -->
      <div v-if="activeTab === 'orders'" class="bg-white border rounded-lg p-6 shadow">
        <h2 class="text-xl font-bold mb-4">订单管理</h2>
        <div class="flex flex-wrap gap-4 mb-4">
          <input v-model="orderSearch" type="text" placeholder="搜索订单号或客户" class="border rounded-lg px-3 py-2 w-64" />
          <select v-model="orderStatusFilter" class="border rounded-lg px-3 py-2">
            <option value="all">全部</option>
            <option value="pending">待支付</option>
            <option value="paid">已支付</option>
            <option value="shipped">已发货</option>
            <option value="completed">已完成</option>
            <option value="cancelled">已取消</option>
          </select>
          <button @click="searchOrders" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">搜索</button>
        </div>
        <table class="w-full border-collapse">
          <thead>
            <tr class="bg-gray-100">
              <th class="border p-2">订单号</th>
              <th class="border p-2">客户</th>
              <th class="border p-2">商品</th>
              <th class="border p-2">价格</th>
              <th class="border p-2">状态</th>
              <th class="border p-2">日期</th>
              <th class="border p-2">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="order in filteredOrders" :key="order.id" class="hover:bg-gray-50">
              <td class="border p-2">{{ order.id }}</td>
              <td class="border p-2">{{ order.customer }}</td>
              <td class="border p-2">{{ order.product }}</td>
              <td class="border p-2">{{ order.price }}</td>
              <td class="border p-2">{{ order.status }}</td>
              <td class="border p-2">{{ order.date }}</td>
              <td class="border p-2">
                <div class="flex gap-2">
                  <button @click="editOrder(order)" class="bg-blue-600 text-white px-2 py-1 rounded text-sm hover:bg-blue-700 transition-colors">编辑</button>
                  <button @click="deleteOrder(order.id)" class="bg-red-600 text-white px-2 py-1 rounded text-sm hover:bg-red-700 transition-colors">删除</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- 店铺设置 -->
      <div v-if="activeTab === 'shop'" class="bg-white border rounded-lg p-6 shadow">
        <h2 class="text-xl font-bold mb-4">店铺设置</h2>
        <form @submit.prevent="saveShopSettings">
          <div class="mb-4">
            <label class="block mb-2 font-medium">店铺名称</label>
            <input v-model="shopForm.name" type="text" placeholder="请输入店铺名称" class="border rounded-lg px-3 py-2 w-full" />
          </div>
          <div class="mb-4">
            <label class="block mb-2 font-medium">店铺介绍</label>
            <textarea v-model="shopForm.description" placeholder="请输入店铺介绍" rows="4" class="border rounded-lg px-3 py-2 w-full"></textarea>
          </div>
          <div class="mb-4">
            <label class="block mb-2 font-medium">联系电话</label>
            <input v-model="shopForm.phone" type="text" placeholder="请输入联系电话" class="border rounded-lg px-3 py-2 w-full" />
          </div>
          <div class="mb-4">
            <label class="block mb-2 font-medium">邮箱</label>
            <input v-model="shopForm.email" type="email" placeholder="请输入邮箱" class="border rounded-lg px-3 py-2 w-full" />
          </div>
          <div class="mb-4">
            <label class="block mb-2 font-medium">自提地址</label>
            <input v-model="shopForm.pickupAddress" type="text" placeholder="请输入自提地址" class="border rounded-lg px-3 py-2 w-full" />
          </div>
          <div class="mb-4">
            <label class="block mb-2 font-medium">配送范围</label>
            <input v-model="shopForm.deliveryRange" type="text" placeholder="请输入配送范围" class="border rounded-lg px-3 py-2 w-full" />
          </div>
          <div class="mb-4">
            <label class="block mb-2 font-medium">店铺公告</label>
            <textarea v-model="shopForm.announcement" placeholder="请输入店铺公告" rows="2" class="border rounded-lg px-3 py-2 w-full"></textarea>
          </div>
          <div class="mt-6">
            <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">保存设置</button>
          </div>
        </form>
      </div>

      <!-- 消息管理 -->
      <div v-if="activeTab === 'messages'" class="bg-white border rounded-lg p-6 shadow">
        <h2 class="text-xl font-bold mb-4">消息管理</h2>
        <div class="flex flex-wrap gap-4 mb-4">
          <input v-model="messageSearch" type="text" placeholder="搜索客户或内容" class="border rounded-lg px-3 py-2 w-64" />
          <button @click="searchMessages" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">搜索</button>
        </div>
        <table class="w-full border-collapse">
          <thead>
            <tr class="bg-gray-100">
              <th class="border p-2">消息ID</th>
              <th class="border p-2">客户</th>
              <th class="border p-2">内容</th>
              <th class="border p-2">日期</th>
              <th class="border p-2">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="message in filteredMessages" :key="message.id" class="hover:bg-gray-50">
              <td class="border p-2">{{ message.id }}</td>
              <td class="border p-2">{{ message.customer }}</td>
              <td class="border p-2">{{ message.content }}</td>
              <td class="border p-2">{{ message.date }}</td>
              <td class="border p-2">
                <div class="flex gap-2">
                  <button @click="replyMessage(message)" class="bg-blue-600 text-white px-2 py-1 rounded text-sm hover:bg-blue-700 transition-colors">回复</button>
                  <button @click="deleteMessage(message.id)" class="bg-red-600 text-white px-2 py-1 rounded text-sm hover:bg-red-700 transition-colors">删除</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeTab = ref('products')

// 标签页定义
const tabs = ref([
  { label: '发布商品', value: 'products' },
  { label: '商品管理', value: 'productList' },
  { label: '订单管理', value: 'orders' },
  { label: '店铺设置', value: 'shop' },
  { label: '消息管理', value: 'messages' }
])

// 发布商品表单
const productForm = ref({
  name: '',
  price: '',
  quantity: '',
  age: '',
  gender: 'male',
  vaccine: '',
  transport: {
    selfPickup: false,
    express: false,
    delivery: false
  },
  description: '',
  notes: '',
  pickupAddress: '',
  enableConsultation: false
})

// 商品管理
const productSearch = ref('')
const productStatusFilter = ref('all')
const productListColumns = [
  { id: 'id', label: '商品ID' },
  { id: 'name', label: '商品名称' },
  { id: 'price', label: '价格' },
  { id: 'quantity', label: '数量' },
  { id: 'status', label: '状态' },
  { id: 'date', label: '发布日期' },
  { id: 'action', label: '操作', sortable: false }
]

// 静态商品数据
const products = ref([
  { id: 'P001', name: '金毛幼犬', price: '¥1200', quantity: 10, status: 'active', date: '2024-01-01' },
  { id: 'P002', name: '英短蓝猫', price: '¥2000', quantity: 5, status: 'active', date: '2024-01-02' },
  { id: 'P003', name: '泰迪犬', price: '¥800', quantity: 15, status: 'inactive', date: '2024-01-03' },
  { id: 'P004', name: '布偶猫', price: '¥3500', quantity: 3, status: 'active', date: '2024-01-04' },
  { id: 'P005', name: '哈士奇', price: '¥1500', quantity: 8, status: 'active', date: '2024-01-05' }
])

const filteredProducts = computed(() => {
  return products.value.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(productSearch.value.toLowerCase())
    const matchesStatus = productStatusFilter.value === 'all' || product.status === productStatusFilter.value
    return matchesSearch && matchesStatus
  })
})

// 订单管理
const orderSearch = ref('')
const orderStatusFilter = ref('all')
const orderColumns = [
  { id: 'id', label: '订单号' },
  { id: 'customer', label: '客户' },
  { id: 'product', label: '商品' },
  { id: 'price', label: '价格' },
  { id: 'status', label: '状态' },
  { id: 'date', label: '日期' },
  { id: 'action', label: '操作', sortable: false }
]

// 静态订单数据
const orders = ref([
  { id: 'ORD20240101001', customer: '张三', product: '金毛幼犬', price: '¥1200', status: 'completed', date: '2024-01-01' },
  { id: 'ORD20240102002', customer: '李四', product: '英短蓝猫', price: '¥2000', status: 'shipped', date: '2024-01-02' },
  { id: 'ORD20240103003', customer: '王五', product: '泰迪犬', price: '¥800', status: 'paid', date: '2024-01-03' },
  { id: 'ORD20240104004', customer: '赵六', product: '布偶猫', price: '¥3500', status: 'pending', date: '2024-01-04' },
  { id: 'ORD20240105005', customer: '孙七', product: '哈士奇', price: '¥1500', status: 'cancelled', date: '2024-01-05' }
])

const filteredOrders = computed(() => {
  return orders.value.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(orderSearch.value.toLowerCase()) || 
                         order.customer.toLowerCase().includes(orderSearch.value.toLowerCase())
    const matchesStatus = orderStatusFilter.value === 'all' || order.status === orderStatusFilter.value
    return matchesSearch && matchesStatus
  })
})

// 店铺设置表单
const shopForm = ref({
  name: '快乐宠物之家',
  description: '专业的宠物店铺，提供各类宠物及用品，服务周到，环境整洁。',
  phone: '13800138000',
  email: 'info@petshop.com',
  pickupAddress: '北京市朝阳区建国路88号',
  deliveryRange: '北京市内',
  announcement: '欢迎光临快乐宠物之家，我们将为您提供优质的服务！'
})

// 消息管理
const messageSearch = ref('')
const messageColumns = [
  { id: 'id', label: '消息ID' },
  { id: 'customer', label: '客户' },
  { id: 'content', label: '内容' },
  { id: 'date', label: '日期' },
  { id: 'action', label: '操作', sortable: false }
]

// 静态消息数据
const messages = ref([
  { id: 'MSG001', customer: '张三', content: '请问金毛幼犬还有吗？', date: '2024-01-01' },
  { id: 'MSG002', customer: '李四', content: '英短蓝猫可以自提吗？', date: '2024-01-02' },
  { id: 'MSG003', customer: '王五', content: '泰迪犬多大了？', date: '2024-01-03' },
  { id: 'MSG004', customer: '赵六', content: '布偶猫有疫苗本吗？', date: '2024-01-04' },
  { id: 'MSG005', customer: '孙七', content: '哈士奇性格怎么样？', date: '2024-01-05' }
])

const filteredMessages = computed(() => {
  return messages.value.filter(message => {
    return message.customer.toLowerCase().includes(messageSearch.value.toLowerCase()) || 
           message.content.toLowerCase().includes(messageSearch.value.toLowerCase())
  })
})

// 编辑功能相关变量
const editProductForm = ref({})
const editOrderForm = ref({})
const replyContent = ref('')
const currentMessage = ref({})

// 方法
const submitProduct = () => {
  // 模拟发布商品的逻辑
  alert('商品发布成功！')
  productForm.value = {
    name: '',
    price: '',
    quantity: '',
    age: '',
    gender: 'male',
    vaccine: '',
    transport: {
      selfPickup: false,
      express: false,
      delivery: false
    },
    description: '',
    notes: '',
    pickupAddress: '',
    enableConsultation: false
  }
}

const saveShopSettings = () => {
  // 模拟保存店铺设置的逻辑
  alert('店铺设置保存成功！')
}

const searchProducts = () => {
  // 搜索商品
  console.log('搜索商品:', productSearch.value, productStatusFilter.value)
}

const searchOrders = () => {
  // 搜索订单
  console.log('搜索订单:', orderSearch.value, orderStatusFilter.value)
}

const searchMessages = () => {
  // 搜索消息
  console.log('搜索消息:', messageSearch.value)
}

const editProduct = (product) => {
  // 编辑商品（简化版）
  const newName = prompt('请输入新的商品名称:', product.name)
  const newPrice = prompt('请输入新的价格:', product.price)
  const newQuantity = prompt('请输入新的数量:', product.quantity)
  const newStatus = prompt('请输入新的状态 (active/inactive):', product.status)
  
  if (newName && newPrice && newQuantity && newStatus) {
    const index = products.value.findIndex(p => p.id === product.id)
    if (index !== -1) {
      products.value[index] = {
        ...product,
        name: newName,
        price: newPrice,
        quantity: newQuantity,
        status: newStatus
      }
      alert('商品编辑成功！')
    }
  }
}

const deleteProduct = (id) => {
  // 删除商品
  if (confirm('确定要删除这个商品吗？')) {
    products.value = products.value.filter(p => p.id !== id)
    alert('商品删除成功！')
  }
}

const editOrder = (order) => {
  // 编辑订单（简化版）
  const newStatus = prompt('请输入新的订单状态:', order.status)
  if (newStatus) {
    const index = orders.value.findIndex(o => o.id === order.id)
    if (index !== -1) {
      orders.value[index] = {
        ...order,
        status: newStatus
      }
      alert('订单编辑成功！')
    }
  }
}

const deleteOrder = (id) => {
  // 删除订单
  if (confirm('确定要删除这个订单吗？')) {
    orders.value = orders.value.filter(o => o.id !== id)
    alert('订单删除成功！')
  }
}

const replyMessage = (message) => {
  // 回复消息（简化版）
  const reply = prompt('请输入回复内容:', '')
  if (reply) {
    alert(`回复已发送给 ${message.customer}！\n回复内容: ${reply}`)
  }
}

const deleteMessage = (id) => {
  // 删除消息
  if (confirm('确定要删除这个消息吗？')) {
    messages.value = messages.value.filter(m => m.id !== id)
    alert('消息删除成功！')
  }
}
</script>