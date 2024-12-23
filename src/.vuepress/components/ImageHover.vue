<template>
  <!-- 外层容器，绑定鼠标进入和离开事件 -->
  <div class="hover-container" @mouseenter="showPopup" @mouseleave="hidePopup">
    <!-- 插槽，用于放置触发悬浮展示图片的元素，比如按钮等 -->
    <slot></slot>
    <!-- 图片弹窗容器，根据条件显示，绑定对应的类名用于定位 -->
    <div v-if="show" :class="['popup', positionClass]" ref="popupRef">
      <!-- 循环渲染传入的图片地址数组，展示图片 -->
      <img v-for="(imgUrl, index) in imgUrls" :key="index" :src="imgUrl" alt="" class="popup-image">
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick, computed, onBeforeUnmount } from 'vue';
import { getCurrentInstance } from "../.cache/deps/vue.js";

// 定义组件接收的属性
const props = defineProps({
  imgUrls: {
    type: Array,
    required: true
  },
  position: {
    type: String,
    default: 'bottom',
    validator(val) {
      return ['top', 'bottom', 'left', 'right'].includes(val);
    }
  }
});

// 控制图片弹窗显示隐藏的响应式数据
const show = ref(false);
// 用于获取图片弹窗DOM元素的引用
const popupRef = ref(null);
// 用于获取触发元素（插槽内容）的DOM引用
const triggerElementRef = ref(null);

// 根据传入的位置属性，计算出对应的类名
const positionClass = computed(() => {
  return `popup-${props.position}`;
});

// 鼠标进入时显示图片弹窗，并在下一帧调整其位置
const showPopup = () => {
  show.value = true;
  nextTick(() => {
    adjustPopupPosition();
  });
};

// 鼠标离开时隐藏图片弹窗
const hidePopup = () => {
  show.value = false;
};

// 调整图片弹窗位置的方法，确保触发元素在弹窗中间
const adjustPopupPosition = () => {
  if (!triggerElementRef.value ||!popupRef.value) return;
  const triggerRect = triggerElementRef.value.getBoundingClientRect();
  const popupRect = popupRef.value.getBoundingClientRect();
  const containerRect = document.body.getBoundingClientRect();
  let top, left;
  if (props.position === 'top') {
    top = triggerRect.top - popupRect.height - 10;
    left = triggerRect.left + (triggerRect.width / 2) - (popupRect.width / 2);
  } else if (props.position === 'bottom') {
    top = triggerRect.bottom + 10;
    left = triggerRect.left + (triggerRect.width / 2) - (popupRect.width / 2);
  } else if (props.position === 'left') {
    top = triggerRect.top + (triggerRect.height / 2) - (popupRect.height / 2);
    left = triggerRect.left - popupRect.width - 10;
  } else if (props.position === 'right') {
    top = triggerRect.top + (triggerRect.height / 2) - (popupRect.height / 2);
    left = triggerRect.right + 10;
  }
  // 处理边界情况，防止弹出框超出页面可视范围
  if (top < 0) {
    top = 0;
  }
  if (left < 0) {
    left = 0;
  }
  if (top + popupRect.height > containerRect.height) {
    top = containerRect.height - popupRect.height;
  }
  if (left + popupRect.width > containerRect.width) {
    left = containerRect.width - popupRect.width;
  }
  // 使用transform来改变位置，避免重排重绘
  popupRef.value.style.transform = `translate(${left}px, ${top}px)`;
};

onMounted(() => {
  // 获取触发元素（插槽内容）的DOM引用
  const slotElements = getCurrentInstance()?.proxy?.$slots.default?.();
  if (slotElements && slotElements.length > 0) {
    triggerElementRef.value = slotElements[0].elm;
  }
  setupMutationObserver();
  window.addEventListener('resize', handleResize);
});

const setupMutationObserver = () => {
  if (!triggerElementRef.value) return;
  const observer = new MutationObserver(() => {
    if (show.value) {
      adjustPopupPosition();
    }
  });
  observer.observe(triggerElementRef.value, {
    attributes: true,
    attributeFilter: ['style', 'width', 'height']
  });
};

const handleResize = () => {
  if (show.value) {
    adjustPopupPosition();
  }
};

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize);
  if (triggerElementRef.value) {
    const observer = new MutationObserver(() => {});
    observer.disconnect();
  }
});
</script>

<style scoped>
.hover-container {
  position: relative;
  display: inline-block; /* 让容器宽度自适应内部元素宽度，便于排版 */
}

.popup {
  position: absolute;
  display: flex;
  background-color: white;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  padding: 10px;
  border-radius: 5px;
  z-index: 999;
  transition: all 0.3s ease; /* 添加过渡效果，让位置变化更平滑 */
}

.popup-top {
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%); /* 水平居中对齐 */
}

.popup-top::before {
  bottom: -5px;
  left: 50%;
  transform: translateX(-50%) rotate(45deg);
}

.popup-bottom {
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
}

.popup-bottom::before {
  top: -5px;
  left: 50%;
  transform: translateX(-50%) rotate(45deg);
}

.popup-left {
  right: 100%;
  top: 50%;
  transform: translateY(-50%);
}

.popup-left::before {
  right: -5px;
  top: 50%;
  transform: translateY(-50%) rotate(45deg);
}

.popup-right {
  left: 100%;
  top: 50%;
  transform: translateY(-50%);
}

.popup-right::before {
  left: -5px;
  top: 50%;
  transform: translateY(-50%) rotate(45deg);
}

.popup-image {
  width: 100px; /* 可根据实际需求调整图片宽度 */
  height: auto;
  margin-right: 10px; /* 图片之间的间距 */
}
</style>
