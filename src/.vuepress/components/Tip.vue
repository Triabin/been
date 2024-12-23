<!-- 打赏组件 -->
<template>
  <ImageHover :img-urls="['/assets/image/weChatPayCode.png', '/assets/image/alipayCode.png']"
              :position="'bottom'"
  >
    <img src="/assets/icon/ep--milk-tea.png" alt="打赏" style="cursor: pointer; width: 1em; height: 1em; vertical-align: middle; margin-right: 0.5em;" />
  </ImageHover>
</template>
<script setup>
import ImageHover from "./ImageHover.vue";
</script>
<style lang="scss" scoped>
</style>
