<script setup>
/**
 * MMobileBottomNav — bottom navigation cho compact (< 5 điểm đến cấp một).
 * Mỗi mục có icon MDS + nhãn; item active dùng màu Brand.
 */
import MIcon from '../../components/MIcon.vue'

defineProps({
  items: { type: Array, required: true }, // [{ key, label, icon }]
  active: { type: String, required: true },
})
const emit = defineEmits(['select'])
</script>

<template>
  <nav
    class="grid shrink-0 border-t border-[var(--mds-border)] bg-[var(--mds-bg)]"
    :style="{ gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))`, paddingBottom: 'max(4px, env(safe-area-inset-bottom))' }"
  >
    <button
      v-for="item in items"
      :key="item.key"
      type="button"
      class="flex min-h-12 flex-col items-center justify-center gap-0.5 py-1.5"
      :class="active === item.key ? 'text-[var(--mds-brand-600)]' : 'text-[var(--mds-text-muted)]'"
      @click="emit('select', item.key)"
    >
      <MIcon :name="item.icon" :size="20" />
      <span class="text-[11px] leading-[14px]" :class="active === item.key ? 'font-medium' : ''">{{ item.label }}</span>
    </button>
  </nav>
</template>
