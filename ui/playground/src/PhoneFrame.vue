<script setup>
/**
 * PhoneFrame — khung mô phỏng iPhone (chỉ dùng trong playground để duyệt UI mobile,
 * KHÔNG phải component MDS). Có Dynamic Island, status bar (giờ/sóng/wifi/pin) và
 * home indicator để giám đốc thiết kế xem giống ảnh chụp máy thật.
 */
defineProps({
  time: { type: String, default: '9:41' },
})
</script>

<template>
  <div class="relative h-[844px] w-[390px] shrink-0 rounded-[55px] bg-[#10141B] p-[14px] shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
    <!-- Nút cạnh viền (trang trí, giống thật) -->
    <span class="absolute -left-[2px] top-[130px] h-[32px] w-[3px] rounded-l bg-[#10141B]" />
    <span class="absolute -left-[2px] top-[180px] h-[60px] w-[3px] rounded-l bg-[#10141B]" />
    <span class="absolute -left-[2px] top-[250px] h-[60px] w-[3px] rounded-l bg-[#10141B]" />
    <span class="absolute -right-[2px] top-[200px] h-[90px] w-[3px] rounded-r bg-[#10141B]" />

    <div class="relative h-full w-full overflow-hidden rounded-[42px] bg-[var(--mds-bg)]">
      <!-- Status bar iOS: giờ trái, cụm sóng/wifi/pin phải -->
      <div class="absolute inset-x-0 top-0 z-20 flex h-11 items-end justify-between px-7 pb-1.5 text-[15px] font-semibold text-[var(--mds-text)]">
        <span class="tabular-nums">{{ time }}</span>
        <div class="flex items-center gap-1.5">
          <!-- Sóng -->
          <svg width="18" height="12" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="0" y="7" width="3" height="5" rx="0.5" fill="currentColor" />
            <rect x="4.5" y="5" width="3" height="7" rx="0.5" fill="currentColor" />
            <rect x="9" y="3" width="3" height="9" rx="0.5" fill="currentColor" />
            <rect x="13.5" y="0" width="3" height="12" rx="0.5" fill="currentColor" />
          </svg>
          <!-- Wifi -->
          <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 10.2C8.66 10.2 9.2 10.74 9.2 11.4C9.2 12.06 8.66 12.6 8 12.6C7.34 12.6 6.8 12.06 6.8 11.4C6.8 10.74 7.34 10.2 8 10.2Z" fill="currentColor" />
            <path d="M8 6.6C9.66 6.6 11.18 7.2 12.36 8.2L11 9.8C10.16 9.08 9.13 8.6 8 8.6C6.87 8.6 5.84 9.08 5 9.8L3.64 8.2C4.82 7.2 6.34 6.6 8 6.6Z" fill="currentColor" />
            <path d="M8 3C10.9 3 13.55 4.06 15.6 5.8L14.24 7.4C12.5 5.94 10.34 5 8 5C5.66 5 3.5 5.94 1.76 7.4L0.4 5.8C2.45 4.06 5.1 3 8 3Z" fill="currentColor" />
          </svg>
          <!-- Pin -->
          <svg width="25" height="12" viewBox="0 0 25 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="0.5" y="0.5" width="21" height="11" rx="2.5" stroke="currentColor" opacity="0.4" />
            <rect x="2" y="2" width="18" height="8" rx="1.5" fill="currentColor" />
            <path d="M23 4V8C23.83 7.66 24.4 6.86 24.4 6C24.4 5.14 23.83 4.34 23 4Z" fill="currentColor" opacity="0.4" />
          </svg>
        </div>
      </div>

      <!-- Dynamic Island -->
      <div class="absolute left-1/2 top-2.5 z-30 h-[34px] w-[120px] -translate-x-1/2 rounded-full bg-[#10141B]" />

      <!-- Nội dung app: chừa đúng chiều cao status bar (44px) -->
      <div class="absolute inset-0 top-11 overflow-hidden">
        <slot />
      </div>

      <!-- Home indicator -->
      <div class="absolute bottom-1.5 left-1/2 z-20 h-[5px] w-[134px] -translate-x-1/2 rounded-full bg-[var(--mds-text)] opacity-80" />
    </div>
  </div>
</template>
