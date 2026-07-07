<script setup>
import { ref, computed, onMounted } from 'vue'
import ControlsPage from './ControlsPage.vue'
import ListPage from '@tpl/ListPage.vue'
import FormPage from '@tpl/FormPage.vue'
import DetailPage from '@tpl/DetailPage.vue'
import DashboardPage from '@tpl/DashboardPage.vue'

// Điều hướng bằng hash để share link trực tiếp từng trang mẫu
const views = [
  { key: 'controls', label: 'Bộ control', component: ControlsPage },
  { key: 'list', label: 'Mẫu: Danh sách', component: ListPage },
  { key: 'form', label: 'Mẫu: Thêm/Sửa', component: FormPage },
  { key: 'detail', label: 'Mẫu: Chi tiết', component: DetailPage },
  { key: 'dashboard', label: 'Mẫu: Tổng quan', component: DashboardPage },
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
      <component :is="activeView.component" />
    </div>
  </div>
</template>
