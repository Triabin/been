<!-- 文件上传组件 -->
<template>
  <div id="file-upload">
    <!-- 上传区域 -->
    <div class="blk-item accept-box"
         :style="{ height: props.uploadAreaHeight }"
         @dragenter="onDragEnter"
         @dragover="onDragOver"
         @drop="onDrop"
         @click="onClickAccept"
    >
      <div class="tip-box"><i :class="props.uploadIcon"></i>将目录/多个文件拖拽到此，或者点击呼出文件选框</div>
      <div class="tip-box" v-if="props.supports && props.supports.length !== 0">支持的文件类型：{{ props.supports.join('、') }}</div>
      <div class="tip-box" v-if="props.singleFileSizeLimit">每个文件允许的最大尺寸：{{ props.singleFileSizeLimit }}</div>
      <input type="file"
             multiple
             webkitdirectory
             mozdirectory
             odirectory
             hidden
             ref="fileInputRef"
             @change="handleFileChange"
      />
    </div>

    <!-- 文件信息统计区域 -->
    <div class="blk-item info-box">
      <span class="tag-box tag-box-info">文件数量：{{ fileCount }}</span>
      <span class="tag-box tag-box-success">成功上传：{{ successCount }}</span>
      <span class="tag-box tag-box-info">总大小：{{ totalFileSize }}</span>
    </div>

    <!-- 文件列表展示和操作区域 -->
    <div  class="blk-item list-box">
      <table style="width: 100%; display: revert;">
        <thead style="height: 3em;">
        <tr>
          <th>文件名</th>
          <th>类型</th>
          <th>大小</th>
          <th>状态</th>
          <th>操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-if="!fileList || fileList.length === 0">
          <td colspan="5">
            <div class="tip-box" style="width: 100%;">
              <i class="mingcute--empty-box-line"></i>No Data
            </div>
          </td>
        </tr>
        <tr v-else v-for="file in fileList">
          <td>{{ file.name }}</td>
          <td>{{ file.type }}</td>
          <td>{{ file.size }}</td>
          <td>{{ file.state }}</td>
          <td>
            <button>上传</button>
            <button>删除</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>

    <!-- 开始上传按钮 -->
    <div  class="blk-item">
      <button @click="startUp">开始上传</button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

const fileInputRef = ref();
// 文件数量
const fileCount = ref<number>(0);
// 成功上传数量
const successCount = ref<number>(0);
// 文件总大小
const totalFileSize = ref<string>('0 Byte');

const props = defineProps({
  // 文件上传图标class名
  uploadIcon: {
    type: String,
    default: 'uiw--cloud-upload'
  },

  // 支持的文件类型后缀，默认不限制
  supports: {
    type: Array<String>
  },

  // 单个文件大小限制，默认不限制，支持单位：Byte、KB、MB、GB、TB
  singleFileSizeLimit: {
    type: String
  },

  // 上传区域高度，默认200px
  uploadAreaHeight: {
    type: String,
    default: '200px'
  }
});

const fileList = ref<Array<{
  name: string,
  type: string,
  size: string,
  state: string
}>>([]);

// 监听文件拖入事件并阻止默认行为
const onDragEnter = (e: DragEvent) => {
  e.preventDefault();
}
// 监听文件拖入悬停事件并阻止默认行为，因为默认情况下div不允许任何东西拖入
const onDragOver = (e: DragEvent) => {
  e.preventDefault();
}
// 监听文件拖入释放事件并阻止默认行为
const onDrop = async(e: DragEvent) => {
  e.preventDefault();
  const { items } = e.dataTransfer;
  if (!items) {
    console.error('未获取到文件内容');
    return;
  }
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const entry = item.webkitGetAsEntry(); // 获取到文件（夹）句柄
    if (entry.isDirectory) {
      const reader = entry.createReader();
      reader.readEntries((entries) => {
        for (let entryItem of entries) {
          entryItem.file(file => console.log(file));
        }
      })
    } else {
      entry.file(file => console.log(file));
    }
  }
}

// 点击文件上传
const onClickAccept = () => {
  // 呼出文件选框
  fileInputRef.value.click();
}

// 文件列表改变事件
const handleFileChange = () => {
  // 文件列表改变事件
}

// 开始上传
const startUp = () => {
  console.log('开始上传')
}
</script>
<style lang="scss" scoped>

#file-upload {
  --tag-box-bg-color-info: rgb(243.9, 244.2, 244.8);
  --tag-box-border-color-info: rgb(243.9, 244.2, 244.8);

  --tag-box-bg-color-success: rgb(239.8, 248.9, 235.3);
  --tag-box-border-color-success: rgb(224.6, 242.8, 215.6);

  [data-theme="dark"] & {
    --tag-box-bg-color-info: rgb(32.4, 32.7, 33.3);
    --tag-box-border-color-info: rgb(32.4, 32.7, 33.3);

    --tag-box-bg-color-success: rgb(28.3, 37.4, 23.8);
    --tag-box-border-color-success: rgb(36.6, 54.8, 27.6);
  }
}

.blk-item {
  width: 100%;
  margin: 10px 0;
}

.accept-box {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 5px;
  height: 300px;
  cursor: pointer;
}
.tip-box {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  font-size: 14px;
}

.info-box {
  display: flex;
  gap: 10px;
}

.tag-box {
  border-radius: 4px;
  padding: 3px;
  font-size: 12px;
}

.tag-box-info {
  background-color: var(--tag-box-bg-color-info);
  color: #909399;
  border: 1px solid var(--tag-box-border-color-info);
}

.tag-box-success {
  background-color: var(--tag-box-bg-color-success);
  color: #67C23A;
  border: 1px solid var(--tag-box-border-color-success);
}

.list-box {
  max-height: 400px;
}

button {
  background-color: #4585FE;
  color: #FFFFFF;
  border: 1px solid #000000;
  width: auto;
  height: 2em;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  margin-right: 10px;
}

button:hover {
  background-color: #ABCDEF;
}

button:active {
  transform: translateY(1px);
}

.uiw--cloud-upload {
  display: inline-block;
  width: 2em;
  height: 2em;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3E%3Cpath fill='%232f88ff' fill-rule='evenodd' d='M11.5 3a4.5 4.5 0 0 1 4.492 4.77H16l-.001 1.227a4 4 0 0 1 3.996 3.799l.005.2a4 4 0 0 1-3.8 3.992l-.2.005h-.001L16 17h-5.001v-3.923h2.464L10 9.003l-3.454 4.075H9L8.999 17H4a4.01 4.01 0 0 1-4-4.005a4 4 0 0 1 3.198-3.918a3 3 0 0 1 4.313-3.664A4.5 4.5 0 0 1 11.5 3'/%3E%3C/svg%3E");
}

.mingcute--empty-box-line {
  display: inline-block;
  width: 4em;
  height: 4em;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cpath d='m12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036q-.016-.004-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.016-.018m.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01z'/%3E%3Cpath fill='%232f88ff' d='M11.084 3.244a3 3 0 0 1 1.607-.063l.225.063L19.45 5.34c.19.063.361.181.486.346l.07.105l2.75 4.747a1 1 0 0 1-.44 1.407l-.12.047l-2.051.658v4.33a2 2 0 0 1-1.237 1.848l-.152.056l-5.84 1.872a3 3 0 0 1-1.607.063l-.225-.062l-5.84-1.873a2 2 0 0 1-1.382-1.743l-.007-.162V12.65l-2.051-.658a1 1 0 0 1-.617-1.338l.057-.116l2.75-4.747a1 1 0 0 1 .445-.406l.11-.045zM13 12.305v6.324l5.145-1.65v-3.687l-3.09.991a1 1 0 0 1-1.106-.353l-.064-.098zm-2 0l-.885 1.527a1 1 0 0 1-1.17.451l-3.09-.991v3.687L11 18.63zM5.32 7.49l-1.723 2.977l5.191 1.666l1.725-2.977zm13.36 0l-5.193 1.666l1.724 2.977l5.192-1.666zm-6.375-2.342a1 1 0 0 0-.49-.03l-.12.03L8.13 6.292L12 7.533l3.87-1.241z'/%3E%3C/g%3E%3C/svg%3E");
}
</style>
