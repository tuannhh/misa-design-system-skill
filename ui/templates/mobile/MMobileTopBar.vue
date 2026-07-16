<script setup>
/**
 * MMobileTopBar — top bar dùng chung cho các màn hình mobile (compact < 600px).
 * Biến thể "home": nút 9 chấm + tên app rút gọn + tối đa 2 tiện ích (thông báo, avatar).
 * Biến thể "page": nút Back + tiêu đề trang (rút gọn) + More, dùng cho danh sách/chi tiết/form con.
 */
import MIcon from '../../components/MIcon.vue'

const props = defineProps({
  mode: { type: String, default: 'home' }, // 'home' | 'page'
  title: { type: String, default: '' },
  notificationCount: { type: Number, default: 0 },
  userInitials: { type: String, default: 'NV' },
})
const emit = defineEmits(['back', 'app-switcher', 'notifications', 'user-click', 'more'])
</script>

<template>
  <header
    class="flex h-12 shrink-0 items-center gap-2 border-b border-[var(--mds-border)] bg-[var(--mds-bg)] px-2"
    style="padding-top: env(safe-area-inset-top)"
  >
    <button
      v-if="mode === 'home'"
      type="button"
      class="grid h-10 w-10 shrink-0 place-items-center rounded-lg text-[var(--mds-icon-neutral)] hover:bg-[var(--mds-bg-hover-soft)]"
      aria-label="Chuyển ứng dụng"
      @click="emit('app-switcher')"
    >
      <MIcon name="layout-grid" :size="20" />
    </button>
    <button
      v-else
      type="button"
      class="grid h-10 w-10 shrink-0 place-items-center rounded-lg text-[var(--mds-icon-neutral)] hover:bg-[var(--mds-bg-hover-soft)]"
      aria-label="Quay lại"
      @click="emit('back')"
    >
      <MIcon name="chevron-left" :size="24" />
    </button>

    <h1 class="min-w-0 flex-1 truncate text-[16px] font-semibold leading-[22px] text-[var(--mds-text)]">
      {{ title }}
    </h1>

    <template v-if="mode === 'home'">
      <button
        type="button"
        class="relative grid h-10 w-10 shrink-0 place-items-center rounded-lg text-[var(--mds-icon-neutral)] hover:bg-[var(--mds-bg-hover-soft)]"
        aria-label="Thông báo"
        @click="emit('notifications')"
      >
        <MIcon name="bell" :size="20" />
        <span
          v-if="notificationCount > 0"
          class="absolute right-1.5 top-1.5 grid h-4 min-w-4 place-items-center rounded-full bg-[var(--mds-danger)] px-1 text-[10px] font-medium leading-none text-white"
        >
          {{ notificationCount > 99 ? '99+' : notificationCount }}
        </span>
      </button>
      <button
        type="button"
        class="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[var(--mds-brand-100)] text-[12px] font-medium text-[var(--mds-brand-700)]"
        aria-label="Tài khoản"
        @click="emit('user-click')"
      >
        {{ userInitials }}
      </button>
    </template>
    <button
      v-else
      type="button"
      class="grid h-10 w-10 shrink-0 place-items-center rounded-lg text-[var(--mds-icon-neutral)] hover:bg-[var(--mds-bg-hover-soft)]"
      aria-label="Thêm thao tác"
      @click="emit('more')"
    >
      <MIcon name="dots-vertical" :size="20" />
    </button>
  </header>
</template>
