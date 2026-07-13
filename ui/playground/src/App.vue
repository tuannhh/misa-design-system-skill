<script setup>
import { ref, computed, onMounted } from 'vue'
import ControlsPage from './ControlsPage.vue'
import ListPage from '@tpl/ListPage.vue'
import FormPage from '@tpl/FormPage.vue'
import DetailPage from '@tpl/DetailPage.vue'
import DashboardPage from '@tpl/DashboardPage.vue'
import ListPageMobile from '@tpl/mobile/ListPageMobile.vue'
import FormPageMobile from '@tpl/mobile/FormPageMobile.vue'
import DetailPageMobile from '@tpl/mobile/DetailPageMobile.vue'
import DashboardPageMobile from '@tpl/mobile/DashboardPageMobile.vue'
import PhoneFrame from './PhoneFrame.vue'

// Điều hướng bằng hash để share link trực tiếp từng trang mẫu
// Mobile (frame: 'phone') hiển thị trong khung điện thoại 390x844 để duyệt trên màn desktop
const views = [
  { key: 'controls', label: 'Bộ control', component: ControlsPage },
  { key: 'list', label: 'Mẫu: Danh sách', component: ListPage },
  { key: 'form', label: 'Mẫu: Thêm/Sửa', component: FormPage },
  { key: 'detail', label: 'Mẫu: Chi tiết', component: DetailPage },
  { key: 'dashboard', label: 'Mẫu: Tổng quan', component: DashboardPage },
  { key: 'm-dashboard', label: 'Mobile: Tổng quan', component: DashboardPageMobile, frame: 'phone' },
  { key: 'm-list', label: 'Mobile: Danh sách', component: ListPageMobile, frame: 'phone' },
  { key: 'm-form', label: 'Mobile: Thêm/Sửa', component: FormPageMobile, frame: 'phone' },
  { key: 'm-detail', label: 'Mobile: Chi tiết', component: DetailPageMobile, frame: 'phone' },
]
const active = ref('controls')
const activeView = computed(() => views.find(v => v.key === active.value) ?? views[0])

function go(key) {
  active.value = key
  location.hash = key
}
onMounted(() => {
  const h = location.hash.replace('#', '')
  if (views.some(v => v.key === h)) active.value = h
  window.addEventListener('hashchange', () => {
    const k = location.hash.replace('#', '')
    if (views.some(v => v.key === k)) active.value = k
  })
})
</script>

<template>
  <div class="flex h-screen flex-col">
    <!-- Thanh chọn trang của playground (không thuộc MDS — chỉ để duyệt) -->
    <nav class="sticky top-0 z-50 flex items-center gap-1 border-b border-[var(--mds-border)] bg-white px-4 py-2 shadow-sm">
      <span class="mr-3 text-[13px] font-semibold">MDS UI</span>
      <button v-for="v in views" :key="v.key" @click="go(v.key)"
        class="cursor-pointer rounded-lg px-3 py-1.5 text-[13px] leading-[18px] transition-colors"
        :class="active === v.key
          ? 'bg-[var(--mds-brand-600)] font-medium text-white'
          : 'text-[var(--mds-text)] hover:bg-[var(--mds-bg-disabled)]'">
        {{ v.label }}
      </button>
      <span class="ml-auto text-[12px] text-[var(--mds-text-placeholder)]">24 control + 4 màn hình mẫu · chuẩn MDS 2.0</span>
    </nav>
    <div class="min-h-0 flex-1" :class="active === 'controls' ? 'overflow-auto' : 'overflow-hidden'">
      <div v-if="activeView.frame === 'phone'" class="flex h-full items-center justify-center overflow-auto bg-[var(--mds-bg-disabled)] py-6">
        <PhoneFrame>
          <component :is="activeView.component" />
        </PhoneFrame>
      </div>
      <component :is="activeView.component" v-else />
    </div>
  </div>
</template>
