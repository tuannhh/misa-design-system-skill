<script setup>
/**
 * MHeaderIconChat — icon AMIS Chat, asset màu CỐ ĐỊNH (badge tròn xanh nhận diện
 * #1570EF + bong bóng chat trắng), giống cách AVA giữ nguyên màu ở mọi chế độ
 * header (không tint theo buttonClass trắng/neutral như icon thường).
 * Đối chiếu ảnh chụp sản phẩm thật (app MISA khác) do giám đốc thiết kế gửi:
 * icon Chat luôn hiển thị dạng badge tròn màu xanh, không đổi thành icon viền
 * trắng trên header brand như bản cũ. TODO: thay bằng SVG chính thức từ Figma
 * (component IconAmisChat) khi có — bản này là xấp xỉ hợp lý theo ảnh tham chiếu.
 */
defineProps({ size: { type: [Number, String], default: 24 } })
</script>

<template>
  <svg :width="size" :height="size" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
    <circle cx="12" cy="12" r="12" fill="#1570EF" />
    <path
      d="M6.5 6C5.67157 6 5 6.67157 5 7.5V13.5C5 14.3284 5.67157 15 6.5 15H7.5V17.5C7.5 17.702 7.62127 17.8845 7.80777 17.9619C7.99428 18.0393 8.20915 17.9965 8.35355 17.8536L11.2071 15H17.5C18.3284 15 19 14.3284 19 13.5V7.5C19 6.67157 18.3284 6 17.5 6H6.5Z"
      fill="white"
    />
  </svg>
</template>
