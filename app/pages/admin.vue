<template>
  <UPageSection>
    <template #header>
      <h1 class="text-3xl font-bold">管理员后台</h1>
      <p class="text-muted">管理平台所有功能</p>
    </template>

    <!-- 导航选项卡 -->
    <UTabs v-model="activeTab" class="mb-6">
      <UTab value="users">用户管理</UTab>
      <UTab value="orders">订单管理</UTab>
      <UTab value="shops">店铺管理</UTab>
      <UTab value="reviews">评价管理</UTab>
      <UTab value="settings">系统设置</UTab>
    </UTabs>

    <!-- 用户管理 -->
    <div v-if="activeTab === 'users'" class="bg-card p-6 rounded-lg">
      <h2 class="text-xl font-bold mb-4">用户管理</h2>
      <div class="flex flex-wrap gap-4 mb-4">
        <UInput v-model="userSearch" placeholder="搜索用户名或邮箱" class="w-64" />
        <USelect v-model="userRoleFilter" placeholder="筛选角色">
          <option value="all">全部</option>
          <option value="买家">买家</option>
          <option value="卖家">卖家</option>
          <option value="养殖户">养殖户</option>
          <option value="管理员">管理员</option>
        </USelect>
        <USelect v-model="userStatusFilter" placeholder="筛选状态">
          <option value="all">全部</option>
          <option value="正常">正常</option>
          <option value="禁用">禁用</option>
        </USelect>
        <UButton color="primary" @click="searchUsers">搜索</UButton>
      </div>
      <table class="w-full border-collapse">
        <thead>
          <tr class="bg-gray-100">
            <th class="border p-2">用户ID</th>
            <th class="border p-2">用户名</th>
            <th class="border p-2">角色</th>
            <th class="border p-2">邮箱</th>
            <th class="border p-2">电话</th>
            <th class="border p-2">状态</th>
            <th class="border p-2">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in filteredUsers" :key="user.id" class="hover:bg-gray-50">
            <td class="border p-2">{{ user.id }}</td>
            <td class="border p-2">{{ user.name }}</td>
            <td class="border p-2">{{ user.role }}</td>
            <td class="border p-2">{{ user.email }}</td>
            <td class="border p-2">{{ user.phone }}</td>
            <td class="border p-2">{{ user.status }}</td>
            <td class="border p-2">
              <div class="flex gap-2">
                <UButton size="sm" @click="editUser(user)">编辑</UButton>
                <UButton size="sm" variant="destructive" @click="deleteUser(user.id)">删除</UButton>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 订单管理 -->
    <div v-if="activeTab === 'orders'" class="bg-card p-6 rounded-lg">
      <h2 class="text-xl font-bold mb-4">订单管理</h2>
      <div class="flex flex-wrap gap-4 mb-4">
        <UInput v-model="orderSearch" placeholder="搜索订单号或客户" class="w-64" />
        <USelect v-model="orderStatusFilter" placeholder="筛选状态">
          <option value="all">全部</option>
          <option value="待支付">待支付</option>
          <option value="已支付">已支付</option>
          <option value="已发货">已发货</option>
          <option value="已完成">已完成</option>
          <option value="已取消">已取消</option>
        </USelect>
        <UButton color="primary" @click="searchOrders">搜索</UButton>
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
                <UButton size="sm" @click="editOrder(order)">编辑</UButton>
                <UButton size="sm" variant="destructive" @click="deleteOrder(order.id)">删除</UButton>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 店铺管理 -->
    <div v-if="activeTab === 'shops'" class="bg-card p-6 rounded-lg">
      <h2 class="text-xl font-bold mb-4">店铺管理</h2>
      <div class="flex flex-wrap gap-4 mb-4">
        <UInput v-model="shopSearch" placeholder="搜索店铺名称或店主" class="w-64" />
        <USelect v-model="shopStatusFilter" placeholder="筛选状态">
          <option value="all">全部</option>
          <option value="正常">正常</option>
          <option value="审核中">审核中</option>
          <option value="禁用">禁用</option>
        </USelect>
        <UButton color="primary" @click="searchShops">搜索</UButton>
      </div>
      <table class="w-full border-collapse">
        <thead>
          <tr class="bg-gray-100">
            <th class="border p-2">店铺ID</th>
            <th class="border p-2">店铺名称</th>
            <th class="border p-2">店主</th>
            <th class="border p-2">地址</th>
            <th class="border p-2">状态</th>
            <th class="border p-2">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="shop in filteredShops" :key="shop.id" class="hover:bg-gray-50">
            <td class="border p-2">{{ shop.id }}</td>
            <td class="border p-2">{{ shop.name }}</td>
            <td class="border p-2">{{ shop.owner }}</td>
            <td class="border p-2">{{ shop.address }}</td>
            <td class="border p-2">{{ shop.status }}</td>
            <td class="border p-2">
              <div class="flex gap-2">
                <UButton size="sm" @click="editShop(shop)">编辑</UButton>
                <UButton size="sm" variant="destructive" @click="deleteShop(shop.id)">删除</UButton>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 评价管理 -->
    <div v-if="activeTab === 'reviews'" class="bg-card p-6 rounded-lg">
      <h2 class="text-xl font-bold mb-4">评价管理</h2>
      <div class="flex flex-wrap gap-4 mb-4">
        <UInput v-model="reviewSearch" placeholder="搜索用户或店铺" class="w-64" />
        <USelect v-model="reviewRatingFilter" placeholder="筛选评分">
          <option value="all">全部</option>
          <option value="5星">5星</option>
          <option value="4星">4星</option>
          <option value="3星">3星</option>
          <option value="2星">2星</option>
          <option value="1星">1星</option>
        </USelect>
        <UButton color="primary" @click="searchReviews">搜索</UButton>
      </div>
      <table class="w-full border-collapse">
        <thead>
          <tr class="bg-gray-100">
            <th class="border p-2">评价ID</th>
            <th class="border p-2">用户</th>
            <th class="border p-2">店铺</th>
            <th class="border p-2">内容</th>
            <th class="border p-2">评分</th>
            <th class="border p-2">日期</th>
            <th class="border p-2">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="review in filteredReviews" :key="review.id" class="hover:bg-gray-50">
            <td class="border p-2">{{ review.id }}</td>
            <td class="border p-2">{{ review.user }}</td>
            <td class="border p-2">{{ review.shop }}</td>
            <td class="border p-2">{{ review.content }}</td>
            <td class="border p-2">{{ review.rating }}</td>
            <td class="border p-2">{{ review.date }}</td>
            <td class="border p-2">
              <div class="flex gap-2">
                <UButton size="sm" variant="destructive" @click="deleteReview(review.id)">删除</UButton>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 系统设置 -->
    <div v-if="activeTab === 'settings'" class="bg-card p-6 rounded-lg">
      <h2 class="text-xl font-bold mb-4">系统设置</h2>
      <UForm>
        <UFormGroup label="网站名称">
          <UInput v-model="systemForm.siteName" placeholder="请输入网站名称" />
        </UFormGroup>
        <UFormGroup label="网站描述">
          <UTextarea v-model="systemForm.siteDescription" placeholder="请输入网站描述" :rows="4" />
        </UFormGroup>
        <UFormGroup label="网站公告">
          <UTextarea v-model="systemForm.announcement" placeholder="请输入网站公告" :rows="2" />
        </UFormGroup>
        <div class="mt-6">
          <UButton color="primary" @click="saveSystemSettings">保存设置</UButton>
        </div>
      </UForm>
    </div>

    <!-- 编辑用户弹窗功能暂时简化 -->
    <!-- 编辑订单弹窗功能暂时简化 -->
    <!-- 编辑店铺弹窗功能暂时简化 -->
  </UPageSection>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeTab = ref('users')

// 用户管理
const userSearch = ref('')
const userRoleFilter = ref('all')
const userStatusFilter = ref('all')
const userColumns = [
  { id: 'id', label: '用户ID' },
  { id: 'name', label: '用户名' },
  { id: 'role', label: '角色' },
  { id: 'email', label: '邮箱' },
  { id: 'phone', label: '电话' },
  { id: 'status', label: '状态' },
  { id: 'action', label: '操作', sortable: false }
]

// 静态用户数据
const users = ref([
  { id: 'U001', name: '张三', role: '买家', email: 'zhangsan@example.com', phone: '13800138000', status: '正常' },
  { id: 'U002', name: '李四', role: '卖家', email: 'lisi@example.com', phone: '13900139000', status: '正常' },
  { id: 'U003', name: '王五', role: '养殖户', email: 'wangwu@example.com', phone: '13700137000', status: '正常' },
  { id: 'U004', name: '赵六', role: '管理员', email: 'zhaoliu@example.com', phone: '13600136000', status: '正常' },
  { id: 'U005', name: '孙七', role: '买家', email: 'sunqi@example.com', phone: '13500135000', status: '禁用' }
])

const filteredUsers = computed(() => {
  return users.value.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(userSearch.value.toLowerCase()) || 
                         user.email.toLowerCase().includes(userSearch.value.toLowerCase())
    const matchesRole = userRoleFilter.value === 'all' || user.role === userRoleFilter.value
    const matchesStatus = userStatusFilter.value === 'all' || user.status === userStatusFilter.value
    return matchesSearch && matchesRole && matchesStatus
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
  { id: 'ORD20240101001', customer: '张三', product: '金毛幼犬', price: '¥1200', status: '已完成', date: '2024-01-01' },
  { id: 'ORD20240102002', customer: '李四', product: '英短蓝猫', price: '¥2000', status: '已发货', date: '2024-01-02' },
  { id: 'ORD20240103003', customer: '王五', product: '泰迪犬', price: '¥800', status: '已支付', date: '2024-01-03' },
  { id: 'ORD20240104004', customer: '赵六', product: '布偶猫', price: '¥3500', status: '待支付', date: '2024-01-04' },
  { id: 'ORD20240105005', customer: '孙七', product: '哈士奇', price: '¥1500', status: '已取消', date: '2024-01-05' }
])

const filteredOrders = computed(() => {
  return orders.value.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(orderSearch.value.toLowerCase()) || 
                         order.customer.toLowerCase().includes(orderSearch.value.toLowerCase())
    const matchesStatus = orderStatusFilter.value === 'all' || order.status === orderStatusFilter.value
    return matchesSearch && matchesStatus
  })
})

// 店铺管理
const shopSearch = ref('')
const shopStatusFilter = ref('all')
const shopColumns = [
  { id: 'id', label: '店铺ID' },
  { id: 'name', label: '店铺名称' },
  { id: 'owner', label: '店主' },
  { id: 'address', label: '地址' },
  { id: 'status', label: '状态' },
  { id: 'action', label: '操作', sortable: false }
]

// 静态店铺数据
const shops = ref([
  { id: 'S001', name: '快乐宠物之家', owner: '张三', address: '北京市朝阳区建国路88号', status: '正常' },
  { id: 'S002', name: '猫咪乐园', owner: '李四', address: '上海市浦东新区张江高科技园区', status: '正常' },
  { id: 'S003', name: '宠物天地', owner: '王五', address: '广州市天河区天河路', status: '审核中' },
  { id: 'S004', name: '猫舍精品', owner: '赵六', address: '深圳市南山区科技园', status: '禁用' },
  { id: 'S005', name: '犬类之家', owner: '孙七', address: '杭州市西湖区西湖大道', status: '正常' }
])

const filteredShops = computed(() => {
  return shops.value.filter(shop => {
    const matchesSearch = shop.name.toLowerCase().includes(shopSearch.value.toLowerCase()) || 
                         shop.owner.toLowerCase().includes(shopSearch.value.toLowerCase())
    const matchesStatus = shopStatusFilter.value === 'all' || shop.status === shopStatusFilter.value
    return matchesSearch && matchesStatus
  })
})

// 评价管理
const reviewSearch = ref('')
const reviewRatingFilter = ref('all')
const reviewColumns = [
  { id: 'id', label: '评价ID' },
  { id: 'user', label: '用户' },
  { id: 'shop', label: '店铺' },
  { id: 'content', label: '内容' },
  { id: 'rating', label: '评分' },
  { id: 'date', label: '日期' },
  { id: 'action', label: '操作', sortable: false }
]

// 静态评价数据
const reviews = ref([
  { id: 'R001', user: '张三', shop: '快乐宠物之家', content: '服务很好，宠物很健康', rating: '5星', date: '2024-01-01' },
  { id: 'R002', user: '李四', shop: '猫咪乐园', content: '宠物很可爱，店主很热情', rating: '4星', date: '2024-01-02' },
  { id: 'R003', user: '王五', shop: '宠物天地', content: '价格实惠，品种齐全', rating: '5星', date: '2024-01-03' },
  { id: 'R004', user: '赵六', shop: '猫舍精品', content: '宠物品相很好，很健康', rating: '4星', date: '2024-01-04' },
  { id: 'R005', user: '孙七', shop: '犬类之家', content: '宠物很活泼，疫苗齐全', rating: '5星', date: '2024-01-05' }
])

const filteredReviews = computed(() => {
  return reviews.value.filter(review => {
    const matchesSearch = review.user.toLowerCase().includes(reviewSearch.value.toLowerCase()) || 
                         review.shop.toLowerCase().includes(reviewSearch.value.toLowerCase())
    const matchesRating = reviewRatingFilter.value === 'all' || review.rating === reviewRatingFilter.value
    return matchesSearch && matchesRating
  })
})

// 系统设置表单
const systemForm = ref({
  siteName: '宠牧圈',
  siteDescription: '面向养殖户与宠物买家的交易+互动综合平台',
  announcement: '欢迎使用宠牧圈平台，我们将为您提供优质的服务！'
})

// 编辑功能相关变量
const editUserForm = ref({})
const editOrderForm = ref({})
const editShopForm = ref({})

// 方法
const saveSystemSettings = () => {
  // 模拟保存系统设置的逻辑
  alert('系统设置保存成功！')
}

const searchUsers = () => {
  // 搜索用户
  console.log('搜索用户:', userSearch.value, userRoleFilter.value, userStatusFilter.value)
}

const searchOrders = () => {
  // 搜索订单
  console.log('搜索订单:', orderSearch.value, orderStatusFilter.value)
}

const searchShops = () => {
  // 搜索店铺
  console.log('搜索店铺:', shopSearch.value, shopStatusFilter.value)
}

const searchReviews = () => {
  // 搜索评价
  console.log('搜索评价:', reviewSearch.value, reviewRatingFilter.value)
}

const editUser = (user) => {
  // 编辑用户（简化版）
  const newName = prompt('请输入新的用户名:', user.name)
  const newEmail = prompt('请输入新的邮箱:', user.email)
  const newPhone = prompt('请输入新的电话:', user.phone)
  const newRole = prompt('请输入新的角色:', user.role)
  const newStatus = prompt('请输入新的状态:', user.status)
  
  if (newName && newEmail && newPhone && newRole && newStatus) {
    const index = users.value.findIndex(u => u.id === user.id)
    if (index !== -1) {
      users.value[index] = {
        ...user,
        name: newName,
        email: newEmail,
        phone: newPhone,
        role: newRole,
        status: newStatus
      }
      alert('用户编辑成功！')
    }
  }
}

const deleteUser = (id) => {
  // 删除用户
  if (confirm('确定要删除这个用户吗？')) {
    users.value = users.value.filter(u => u.id !== id)
    alert('用户删除成功！')
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

const editShop = (shop) => {
  // 编辑店铺（简化版）
  const newName = prompt('请输入新的店铺名称:', shop.name)
  const newOwner = prompt('请输入新的店主:', shop.owner)
  const newAddress = prompt('请输入新的地址:', shop.address)
  const newStatus = prompt('请输入新的状态:', shop.status)
  
  if (newName && newOwner && newAddress && newStatus) {
    const index = shops.value.findIndex(s => s.id === shop.id)
    if (index !== -1) {
      shops.value[index] = {
        ...shop,
        name: newName,
        owner: newOwner,
        address: newAddress,
        status: newStatus
      }
      alert('店铺编辑成功！')
    }
  }
}

const deleteShop = (id) => {
  // 删除店铺
  if (confirm('确定要删除这个店铺吗？')) {
    shops.value = shops.value.filter(s => s.id !== id)
    alert('店铺删除成功！')
  }
}

const deleteReview = (id) => {
  // 删除评价
  if (confirm('确定要删除这个评价吗？')) {
    reviews.value = reviews.value.filter(r => r.id !== id)
    alert('评价删除成功！')
  }
}
</script>