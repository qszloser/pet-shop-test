<template>
  <div class="py-12 px-4">
    <div class="max-w-6xl mx-auto">
      <!-- 宠物基本信息 -->
      <div class="bg-white border rounded-lg p-6 shadow mb-8">
        <div class="flex flex-col md:flex-row gap-6">
          <!-- 图片和视频展示 -->
          <div class="w-full md:w-1/3">
            <!-- 主图/视频 -->
            <div class="relative mb-4">
              <video v-if="pet.video" :src="pet.video" controls class="w-full h-80 object-cover rounded-lg"></video>
              <img v-else :src="pet.image" :alt="pet.name" class="w-full h-80 object-cover rounded-lg" />
            </div>
            <!-- 图片列表 -->
            <div v-if="pet.images && pet.images.length > 0" class="grid grid-cols-4 gap-2">
              <img v-for="(img, index) in pet.images" :key="index" :src="img" :alt="`${pet.name} 图片${index+1}`" class="w-full h-20 object-cover rounded-md cursor-pointer hover:opacity-80" />
            </div>
          </div>
          <div class="flex-1">
            <h1 class="text-2xl font-bold mb-2">{{ pet.name }}</h1>
            <p class="text-gray-500 mb-4">{{ pet.breed }}</p>
            <p class="text-2xl font-bold text-blue-600 mb-4">{{ pet.price }}</p>
            
            <div class="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p class="text-gray-500 text-sm">年龄</p>
                <p>{{ pet.age }}</p>
              </div>
              <div>
                <p class="text-gray-500 text-sm">性别</p>
                <p>{{ pet.gender === 'male' ? '公' : '母' }}</p>
              </div>
              <div>
                <p class="text-gray-500 text-sm">疫苗情况</p>
                <p>{{ pet.vaccine }}</p>
              </div>
              <div>
                <p class="text-gray-500 text-sm">状态</p>
                <p>{{ pet.status === 'active' ? '在售' : '已售' }}</p>
              </div>
            </div>
            
            <div class="mb-6">
              <p class="text-gray-500 text-sm mb-2">运输方式</p>
              <div class="flex gap-4">
                <span v-if="pet.transport.selfPickup" class="px-2 py-1 bg-gray-100 rounded-full text-sm">自提</span>
                <span v-if="pet.transport.express" class="px-2 py-1 bg-gray-100 rounded-full text-sm">快递</span>
                <span v-if="pet.transport.delivery" class="px-2 py-1 bg-gray-100 rounded-full text-sm">送货</span>
              </div>
            </div>
            
            <div class="mb-6">
              <p class="text-gray-500 text-sm mb-2">店铺信息</p>
              <p class="font-medium">{{ pet.shopName }}</p>
              <p class="text-sm text-gray-500">{{ pet.shopAddress }}</p>
              <NuxtLink :to="`/shops/${pet.shopId}`" class="text-blue-600 hover:underline text-sm">进入店铺</NuxtLink>
            </div>
            
            <div class="flex gap-4">
              <button class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">立即购买</button>
              <button class="px-4 py-2 border rounded-md hover:bg-gray-100 transition-colors">加入收藏</button>
            </div>
          </div>
        </div>
      </div>

      <!-- 详细描述 -->
      <div class="bg-white border rounded-lg p-6 shadow mb-8">
        <h2 class="text-xl font-bold mb-4">详细描述</h2>
        <p class="whitespace-pre-line">{{ pet.description }}</p>
      </div>

      <!-- 注意事项 -->
      <div class="bg-white border rounded-lg p-6 shadow mb-8">
        <h2 class="text-xl font-bold mb-4">注意事项</h2>
        <p class="whitespace-pre-line">{{ pet.notes }}</p>
      </div>

      <!-- 自提地址 -->
      <div class="bg-white border rounded-lg p-6 shadow mb-8">
        <h2 class="text-xl font-bold mb-4">自提地址</h2>
        <p>{{ pet.pickupAddress }}</p>
      </div>

      <!-- 咨询区 -->
      <div class="bg-white border rounded-lg p-6 shadow">
        <h2 class="text-xl font-bold mb-4">商品咨询</h2>
        <div v-if="pet.enableConsultation">
          <div class="mb-4">
            <textarea v-model="consultationContent" placeholder="请输入您的问题" rows="3" class="w-full border rounded-lg px-3 py-2"></textarea>
            <button @click="submitConsultation" class="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">提交咨询</button>
          </div>
          <div class="border-t pt-4">
            <h3 class="font-semibold mb-3">咨询记录</h3>
            <div v-for="(msg, index) in currentConsultationMessages" :key="index" class="mb-4 p-3 bg-gray-50 rounded-lg">
              <p class="font-medium">{{ msg.user }}</p>
              <p class="text-sm text-gray-500 mb-2">{{ msg.date }}</p>
              <p>{{ msg.content }}</p>
              <div v-if="msg.reply" class="mt-2 p-2 bg-white rounded border">
                <p class="font-medium text-sm">商家回复:</p>
                <p class="text-sm">{{ msg.reply }}</p>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="text-gray-500">
          商家暂未开启咨询功能
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const petId = computed(() => route.params.id)

// 宠物数据
const pets = ref([
  {
    id: 1,
    name: '金毛幼犬',
    breed: '金毛巡回犬',
    price: '¥1200',
    age: '3个月',
    gender: 'male',
    vaccine: '已接种两针',
    status: 'active',
    transport: {
      selfPickup: true,
      express: true,
      delivery: false
    },
    description: '活泼可爱的金毛幼犬，性格温顺，聪明易训，适合家庭饲养。\n\n特征：\n- 毛色金黄，毛发浓密\n- 体型健壮，骨骼发育良好\n- 性格开朗，喜欢与人互动\n\n饲养建议：\n- 定期梳理毛发\n- 适量运动\n- 均衡饮食',
    notes: '1. 购买前请确认您有足够的时间和精力照顾宠物\n2. 本店铺提供30天健康保障\n3. 可预约上门看狗',
    pickupAddress: '北京市朝阳区建国路88号',
    enableConsultation: true,
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=golden%20retriever%20puppy%20cute&image_size=landscape_4_3',
    video: 'https://www.w3schools.com/html/mov_bbb.mp4',
    images: [
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=golden%20retriever%20puppy%20playing&image_size=landscape_4_3',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=golden%20retriever%20puppy%20sleeping&image_size=landscape_4_3',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=golden%20retriever%20puppy%20with%20owner&image_size=landscape_4_3'
    ],
    shopName: '快乐宠物之家',
    shopAddress: '北京市朝阳区建国路88号',
    shopId: 1
  },
  {
    id: 2,
    name: '英短蓝猫',
    breed: '英国短毛猫',
    price: '¥2000',
    age: '2个月',
    gender: 'female',
    vaccine: '已接种一针',
    status: 'active',
    transport: {
      selfPickup: true,
      express: true,
      delivery: true
    },
    description: '可爱的英短蓝猫，性格温顺，适应能力强，适合家庭饲养。\n\n特征：\n- 毛色蓝灰，短毛浓密\n- 体型圆润，头部浑圆\n- 性格安静，喜欢独处\n\n饲养建议：\n- 定期梳理毛发\n- 提供干净的饮水\n- 定期体检',
    notes: '1. 购买前请确认您有足够的时间和精力照顾宠物\n2. 本店铺提供30天健康保障\n3. 可预约上门看猫',
    pickupAddress: '北京市朝阳区建国路88号',
    enableConsultation: true,
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=british%20shorthair%20blue%20cat%20cute&image_size=landscape_4_3',
    video: 'https://www.w3schools.com/html/mov_bbb.mp4',
    images: [
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=british%20shorthair%20blue%20cat%20playing&image_size=landscape_4_3',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=british%20shorthair%20blue%20cat%20sleeping&image_size=landscape_4_3'
    ],
    shopName: '快乐宠物之家',
    shopAddress: '北京市朝阳区建国路88号',
    shopId: 1
  },
  {
    id: 3,
    name: '泰迪犬',
    breed: '贵宾犬',
    price: '¥800',
    age: '4个月',
    gender: 'male',
    vaccine: '已接种三针',
    status: 'inactive',
    transport: {
      selfPickup: true,
      express: false,
      delivery: false
    },
    description: '聪明可爱的泰迪犬，体型小巧，适合公寓饲养。\n\n特征：\n- 毛色棕色，卷毛浓密\n- 体型小巧，适合公寓\n- 聪明活泼，易于训练\n\n饲养建议：\n- 定期美容修剪\n- 适量运动\n- 均衡饮食',
    notes: '1. 购买前请确认您有足够的时间和精力照顾宠物\n2. 本店铺提供30天健康保障\n3. 可预约上门看狗',
    pickupAddress: '北京市朝阳区建国路88号',
    enableConsultation: true,
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=toy%20poodle%20puppy%20cute&image_size=landscape_4_3',
    images: [
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=toy%20poodle%20puppy%20groomed&image_size=landscape_4_3',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=toy%20poodle%20puppy%20playing&image_size=landscape_4_3'
    ],
    shopName: '快乐宠物之家',
    shopAddress: '北京市朝阳区建国路88号',
    shopId: 1
  },
  {
    id: 4,
    name: '布偶猫',
    breed: '布偶猫',
    price: '¥3500',
    age: '3个月',
    gender: 'female',
    vaccine: '已接种两针',
    status: 'active',
    transport: {
      selfPickup: true,
      express: true,
      delivery: true
    },
    description: '优雅美丽的布偶猫，性格温顺，被誉为"猫中公主"。\n\n特征：\n- 毛色雪白，带有褐色斑点\n- 体型较大，毛发浓密\n- 性格温顺，喜欢与人互动\n\n饲养建议：\n- 定期梳理毛发\n- 提供干净的饮水\n- 定期体检',
    notes: '1. 购买前请确认您有足够的时间和精力照顾宠物\n2. 本店铺提供30天健康保障\n3. 可预约上门看猫',
    pickupAddress: '上海市浦东新区张江高科技园区',
    enableConsultation: true,
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=ragdoll%20cat%20cute&image_size=landscape_4_3',
    video: 'https://www.w3schools.com/html/mov_bbb.mp4',
    images: [
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=ragdoll%20cat%20playing&image_size=landscape_4_3',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=ragdoll%20cat%20relaxing&image_size=landscape_4_3'
    ],
    shopName: '猫咪乐园',
    shopAddress: '上海市浦东新区张江高科技园区',
    shopId: 2
  },
  {
    id: 5,
    name: '缅因猫',
    breed: '缅因猫',
    price: '¥4000',
    age: '2个月',
    gender: 'male',
    vaccine: '已接种一针',
    status: 'active',
    transport: {
      selfPickup: true,
      express: true,
      delivery: false
    },
    description: '威风凛凛的缅因猫，体型巨大，性格温顺。\n\n特征：\n- 毛色棕虎斑，毛发浓密\n- 体型巨大，被誉为"猫中巨人"\n- 性格温顺，喜欢与人互动\n\n饲养建议：\n- 定期梳理毛发\n- 提供足够的活动空间\n- 均衡饮食',
    notes: '1. 购买前请确认您有足够的时间和精力照顾宠物\n2. 本店铺提供30天健康保障\n3. 可预约上门看猫',
    pickupAddress: '上海市浦东新区张江高科技园区',
    enableConsultation: true,
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=maine%20coon%20kitten%20cute&image_size=landscape_4_3',
    images: [
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=maine%20coon%20cat%20adult&image_size=landscape_4_3',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=maine%20coon%20kitten%20playing&image_size=landscape_4_3'
    ],
    shopName: '猫咪乐园',
    shopAddress: '上海市浦东新区张江高科技园区',
    shopId: 2
  },
  {
    id: 6,
    name: '哈士奇',
    breed: '西伯利亚雪橇犬',
    price: '¥1500',
    age: '3个月',
    gender: 'male',
    vaccine: '已接种两针',
    status: 'active',
    transport: {
      selfPickup: true,
      express: false,
      delivery: false
    },
    description: '活泼好动的哈士奇，性格开朗，喜欢运动。\n\n特征：\n- 毛色黑白，毛发浓密\n- 体型健壮，适合运动\n- 性格开朗，喜欢与人互动\n\n饲养建议：\n- 定期梳理毛发\n- 适量运动\n- 均衡饮食',
    notes: '1. 购买前请确认您有足够的时间和精力照顾宠物\n2. 本店铺提供30天健康保障\n3. 可预约上门看狗',
    pickupAddress: '广州市天河区天河路385号',
    enableConsultation: true,
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=husky%20puppy%20cute&image_size=landscape_4_3',
    video: 'https://www.w3schools.com/html/mov_bbb.mp4',
    images: [
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=husky%20puppy%20playing%20in%20snow&image_size=landscape_4_3',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=husky%20puppy%20with%20blue%20eyes&image_size=landscape_4_3'
    ],
    shopName: '宠物天地',
    shopAddress: '广州市天河区天河路385号',
    shopId: 3
  },
  {
    id: 7,
    name: '萨摩耶',
    breed: '萨摩耶犬',
    price: '¥1800',
    age: '4个月',
    gender: 'female',
    vaccine: '已接种三针',
    status: 'active',
    transport: {
      selfPickup: true,
      express: true,
      delivery: false
    },
    description: '可爱的萨摩耶，毛色雪白，性格温顺。\n\n特征：\n- 毛色雪白，毛发浓密\n- 体型中等，适合家庭饲养\n- 性格温顺，喜欢与人互动\n\n饲养建议：\n- 定期梳理毛发\n- 适量运动\n- 均衡饮食',
    notes: '1. 购买前请确认您有足够的时间和精力照顾宠物\n2. 本店铺提供30天健康保障\n3. 可预约上门看狗',
    pickupAddress: '广州市天河区天河路385号',
    enableConsultation: true,
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=samoyed%20puppy%20cute&image_size=landscape_4_3',
    images: [
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=samoyed%20puppy%20playing&image_size=landscape_4_3',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=samoyed%20puppy%20groomed&image_size=landscape_4_3'
    ],
    shopName: '宠物天地',
    shopAddress: '广州市天河区天河路385号',
    shopId: 3
  },
  {
    id: 8,
    name: '加菲猫',
    breed: '异国短毛猫',
    price: '¥2500',
    age: '2个月',
    gender: 'male',
    vaccine: '已接种一针',
    status: 'active',
    transport: {
      selfPickup: true,
      express: true,
      delivery: true
    },
    description: '可爱的加菲猫，性格温顺，适应能力强。\n\n特征：\n- 毛色橘白，短毛浓密\n- 体型圆润，头部浑圆\n- 性格安静，喜欢独处\n\n饲养建议：\n- 定期梳理毛发\n- 提供干净的饮水\n- 定期体检',
    notes: '1. 购买前请确认您有足够的时间和精力照顾宠物\n2. 本店铺提供30天健康保障\n3. 可预约上门看猫',
    pickupAddress: '广州市天河区天河路385号',
    enableConsultation: true,
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=exotic%20shorthair%20cat%20cute&image_size=landscape_4_3',
    video: 'https://www.w3schools.com/html/mov_bbb.mp4',
    images: [
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=exotic%20shorthair%20cat%20sleeping&image_size=landscape_4_3',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=exotic%20shorthair%20cat%20playing&image_size=landscape_4_3'
    ],
    shopName: '宠物天地',
    shopAddress: '广州市天河区天河路385号',
    shopId: 3
  },
  {
    id: 9,
    name: '斯芬克斯猫',
    breed: '斯芬克斯猫',
    price: '¥5000',
    age: '3个月',
    gender: 'female',
    vaccine: '已接种两针',
    status: 'active',
    transport: {
      selfPickup: true,
      express: true,
      delivery: true
    },
    description: '独特的斯芬克斯猫，无毛，性格温顺。\n\n特征：\n- 无毛，皮肤光滑\n- 体型中等，适合家庭饲养\n- 性格温顺，喜欢与人互动\n\n饲养建议：\n- 定期清洁皮肤\n- 注意保暖\n- 均衡饮食',
    notes: '1. 购买前请确认您有足够的时间和精力照顾宠物\n2. 本店铺提供30天健康保障\n3. 可预约上门看猫',
    pickupAddress: '深圳市南山区科技园',
    enableConsultation: true,
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=sphynx%20cat%20cute&image_size=landscape_4_3',
    images: [
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=sphynx%20cat%20relaxing&image_size=landscape_4_3',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=sphynx%20cat%20with%20owner&image_size=landscape_4_3'
    ],
    shopName: '猫舍精品',
    shopAddress: '深圳市南山区科技园',
    shopId: 4
  },
  {
    id: 10,
    name: '孟加拉猫',
    breed: '孟加拉猫',
    price: '¥4500',
    age: '2个月',
    gender: 'male',
    vaccine: '已接种一针',
    status: 'active',
    transport: {
      selfPickup: true,
      express: true,
      delivery: false
    },
    description: '美丽的孟加拉猫，毛色独特，性格活泼。\n\n特征：\n- 毛色豹纹，短毛浓密\n- 体型中等，适合家庭饲养\n- 性格活泼，喜欢运动\n\n饲养建议：\n- 定期梳理毛发\n- 提供足够的活动空间\n- 均衡饮食',
    notes: '1. 购买前请确认您有足够的时间和精力照顾宠物\n2. 本店铺提供30天健康保障\n3. 可预约上门看猫',
    pickupAddress: '深圳市南山区科技园',
    enableConsultation: true,
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=bengal%20cat%20cute&image_size=landscape_4_3',
    video: 'https://www.w3schools.com/html/mov_bbb.mp4',
    images: [
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=bengal%20cat%20playing&image_size=landscape_4_3',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=bengal%20cat%20hunting&image_size=landscape_4_3'
    ],
    shopName: '猫舍精品',
    shopAddress: '深圳市南山区科技园',
    shopId: 4
  },
  {
    id: 11,
    name: '德国牧羊犬',
    breed: '德国牧羊犬',
    price: '¥2000',
    age: '3个月',
    gender: 'male',
    vaccine: '已接种两针',
    status: 'active',
    transport: {
      selfPickup: true,
      express: false,
      delivery: false
    },
    description: '聪明勇敢的德国牧羊犬，适合训练，可作为工作犬。\n\n特征：\n- 毛色黑棕，短毛浓密\n- 体型健壮，适合运动\n- 聪明勇敢，易于训练\n\n饲养建议：\n- 定期梳理毛发\n- 适量运动\n- 专业训练',
    notes: '1. 购买前请确认您有足够的时间和精力照顾宠物\n2. 本店铺提供30天健康保障\n3. 可预约上门看狗',
    pickupAddress: '杭州市西湖区西湖大道',
    enableConsultation: true,
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=german%20shepherd%20puppy%20cute&image_size=landscape_4_3',
    images: [
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=german%20shepherd%20puppy%20training&image_size=landscape_4_3',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=german%20shepherd%20adult&image_size=landscape_4_3'
    ],
    shopName: '犬类之家',
    shopAddress: '杭州市西湖区西湖大道',
    shopId: 5
  },
  {
    id: 12,
    name: '拉布拉多',
    breed: '拉布拉多犬',
    price: '¥1500',
    age: '4个月',
    gender: 'female',
    vaccine: '已接种三针',
    status: 'active',
    transport: {
      selfPickup: true,
      express: true,
      delivery: false
    },
    description: '温顺聪明的拉布拉多，适合家庭饲养，可作为导盲犬。\n\n特征：\n- 毛色黄色，短毛浓密\n- 体型健壮，适合运动\n- 温顺聪明，易于训练\n\n饲养建议：\n- 定期梳理毛发\n- 适量运动\n- 均衡饮食',
    notes: '1. 购买前请确认您有足够的时间和精力照顾宠物\n2. 本店铺提供30天健康保障\n3. 可预约上门看狗',
    pickupAddress: '杭州市西湖区西湖大道',
    enableConsultation: true,
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=labrador%20retriever%20puppy%20cute&image_size=landscape_4_3',
    video: 'https://www.w3schools.com/html/mov_bbb.mp4',
    images: [
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=labrador%20retriever%20puppy%20swimming&image_size=landscape_4_3',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=labrador%20retriever%20puppy%20with%20owner&image_size=landscape_4_3'
    ],
    shopName: '犬类之家',
    shopAddress: '杭州市西湖区西湖大道',
    shopId: 5
  },
  {
    id: 13,
    name: '柯基犬',
    breed: '威尔士柯基犬',
    price: '¥2500',
    age: '3个月',
    gender: 'male',
    vaccine: '已接种两针',
    status: 'active',
    transport: {
      selfPickup: true,
      express: true,
      delivery: true
    },
    description: '可爱的柯基犬，短腿大屁股，性格活泼。\n\n特征：\n- 毛色黄白，短毛浓密\n- 体型小巧，短腿大屁股\n- 性格活泼，喜欢与人互动\n\n饲养建议：\n- 定期梳理毛发\n- 适量运动\n- 均衡饮食',
    notes: '1. 购买前请确认您有足够的时间和精力照顾宠物\n2. 本店铺提供30天健康保障\n3. 可预约上门看狗',
    pickupAddress: '杭州市西湖区西湖大道',
    enableConsultation: true,
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=corgi%20puppy%20cute&image_size=landscape_4_3',
    images: [
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=corgi%20puppy%20playing&image_size=landscape_4_3',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=corgi%20puppy%20with%20big%20butt&image_size=landscape_4_3'
    ],
    shopName: '犬类之家',
    shopAddress: '杭州市西湖区西湖大道',
    shopId: 5
  },
  {
    id: 14,
    name: '龙猫',
    breed: '龙猫',
    price: '¥300',
    age: '2个月',
    gender: 'male',
    vaccine: '无需接种',
    status: 'active',
    transport: {
      selfPickup: true,
      express: true,
      delivery: false
    },
    description: '可爱的龙猫，性格温顺，适合作为宠物。\n\n特征：\n- 毛色灰黑，毛发浓密\n- 体型小巧，适合笼养\n- 性格温顺，喜欢安静\n\n饲养建议：\n- 提供足够的活动空间\n- 定期清洁笼子\n- 均衡饮食',
    notes: '1. 购买前请确认您有足够的时间和精力照顾宠物\n2. 本店铺提供30天健康保障\n3. 可预约上门看宠物',
    pickupAddress: '成都市锦江区春熙路',
    enableConsultation: true,
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinchilla%20cute&image_size=landscape_4_3',
    video: 'https://www.w3schools.com/html/mov_bbb.mp4',
    images: [
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinchilla%20in%20cage&image_size=landscape_4_3',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinchilla%20eating&image_size=landscape_4_3'
    ],
    shopName: '小宠乐园',
    shopAddress: '成都市锦江区春熙路',
    shopId: 6
  },
  {
    id: 15,
    name: '仓鼠',
    breed: '金丝熊',
    price: '¥50',
    age: '1个月',
    gender: 'female',
    vaccine: '无需接种',
    status: 'active',
    transport: {
      selfPickup: true,
      express: true,
      delivery: true
    },
    description: '可爱的仓鼠，体型小巧，适合作为宠物。\n\n特征：\n- 毛色金黄，毛发浓密\n- 体型小巧，适合笼养\n- 性格活泼，喜欢运动\n\n饲养建议：\n- 提供足够的活动空间\n- 定期清洁笼子\n- 均衡饮食',
    notes: '1. 购买前请确认您有足够的时间和精力照顾宠物\n2. 本店铺提供30天健康保障\n3. 可预约上门看宠物',
    pickupAddress: '成都市锦江区春熙路',
    enableConsultation: true,
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=hamster%20cute&image_size=landscape_4_3',
    images: [
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=hamster%20in%20wheel&image_size=landscape_4_3',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=hamster%20eating&image_size=landscape_4_3'
    ],
    shopName: '小宠乐园',
    shopAddress: '成都市锦江区春熙路',
    shopId: 6
  },
  {
    id: 16,
    name: '荷兰猪',
    breed: '豚鼠',
    price: '¥100',
    age: '2个月',
    gender: 'male',
    vaccine: '无需接种',
    status: 'active',
    transport: {
      selfPickup: true,
      express: true,
      delivery: false
    },
    description: '可爱的荷兰猪，性格温顺，适合作为宠物。\n\n特征：\n- 毛色黑白，毛发浓密\n- 体型小巧，适合笼养\n- 性格温顺，喜欢与人互动\n\n饲养建议：\n- 提供足够的活动空间\n- 定期清洁笼子\n- 均衡饮食',
    notes: '1. 购买前请确认您有足够的时间和精力照顾宠物\n2. 本店铺提供30天健康保障\n3. 可预约上门看宠物',
    pickupAddress: '成都市锦江区春熙路',
    enableConsultation: true,
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=guinea%20pig%20cute&image_size=landscape_4_3',
    video: 'https://www.w3schools.com/html/mov_bbb.mp4',
    images: [
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=guinea%20pig%20eating%20vegetables&image_size=landscape_4_3',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=guinea%20pig%20in%20cage&image_size=landscape_4_3'
    ],
    shopName: '小宠乐园',
    shopAddress: '成都市锦江区春熙路',
    shopId: 6
  }
])

// 咨询消息数据 - 按宠物ID分类
const consultationMessages = ref({
  1: [
    {
      user: '张三',
      date: '2024-01-01 10:00',
      content: '请问这只金毛幼犬是纯种的吗？',
      reply: '是的，我们的金毛幼犬都是纯种的，有血统证明。'
    },
    {
      user: '李四',
      date: '2024-01-02 15:30',
      content: '可以上门看狗吗？',
      reply: '可以的，我们每天上午9点到下午6点都可以预约上门看狗。'
    }
  ],
  2: [
    {
      user: '王五',
      date: '2024-01-03 09:00',
      content: '这只英短蓝猫性格怎么样？',
      reply: '性格非常温顺，适合家庭饲养。'
    }
  ],
  3: [
    {
      user: '赵六',
      date: '2024-01-04 14:00',
      content: '泰迪犬好养吗？',
      reply: '非常好养，聪明活泼，适合公寓饲养。'
    }
  ]
})

// 当前宠物数据
const pet = computed(() => {
  return pets.value.find(p => p.id === parseInt(petId.value)) || pets.value[0]
})

// 当前宠物的咨询消息
const currentConsultationMessages = computed(() => {
  return consultationMessages.value[parseInt(petId.value)] || []
})

// 咨询内容
const consultationContent = ref('')

// 提交咨询
const submitConsultation = () => {
  if (consultationContent.value) {
    const petIdNum = parseInt(petId.value)
    if (!consultationMessages.value[petIdNum]) {
      consultationMessages.value[petIdNum] = []
    }
    consultationMessages.value[petIdNum].push({
      user: '我',
      date: new Date().toLocaleString(),
      content: consultationContent.value
    })
    consultationContent.value = ''
    alert('咨询提交成功！')
  }
}
</script>