<!-- 字符集转换组件 -->
<template>
  <div>
    <h1 v-show="props.title">{{ props.title }}</h1>
    <div>
      <div class="blk-item">
        原文使用<input type="radio" v-model="srcCharset" value="UTF-8"/>UTF-8
        <input type="radio" v-model="srcCharset" value="GBK"/>GBK
        <input type="radio" v-model="srcCharset" value="ISO8859-1"/>ISO8859-1 编码
        <input type="radio" v-model="srcCharset" value="other"/>其他iconv-lite组件支持的字符集<input
          v-show="srcCharset === 'other'" type="text" v-model="otherSrcCharset"
          style="height: 1.5em; width: 5em; margin-left: 10px;"/>
        <under-line-msg ref="onSrcCharsetMsgRef"></under-line-msg>
      </div>
      <div class="blk-item">
        <textarea v-model="srcContent"
                  rows="10"
                  cols="120"
                  style="padding: 10px; width: 100%; height: 100px;; resize: none;"
                  placeholder="请输入需要转换的字符集编码内容"
        ></textarea>
        <under-line-msg ref="onSrcContentMsgRef"></under-line-msg>
      </div>
      <div class="blk-item">
        然后使用<input type="radio" v-model="charset" value="UTF-8"/>UTF-8
        <input type="radio" v-model="charset" value="GBK"/>GBK
        <input type="radio" v-model="charset" value="ISO8859-1"/>ISO8859-1
        <input type="radio" v-model="charset" value="other"/>其他iconv-lite组件支持的字符集<input
          v-show="charset === 'other'" type="text" v-model="otherCharset"
          style="height: 1.5em; width: 5em; margin-left: 10px;"/>
        进行解码
        <under-line-msg ref="onCharsetMsgRef"></under-line-msg>
      </div>
      <div class="blk-item">
        <button @click="convert">执行</button>
        <button @click="() => srcContent = resContent" title="结果转原文">︽</button>
      </div>
      <div class="blk-item" title="点击复制" @click="() => copy(resContent)">
        <textarea v-model="resContent"
                  rows="10"
                  cols="120"
                  style="padding: 10px; width: 100%; height: 100px; resize: none; cursor: pointer"
                  placeholder="转换后的内容"
                  readonly
        ></textarea>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {ref, watch} from 'vue';
import * as iconv from 'iconv-lite';
import UnderLineMsg from "../UnderLineMsg.vue";
import useClipboard from 'vue-clipboard3';

const props = defineProps({
  title: {
    type: String
  }
});
const { toClipboard } = useClipboard();
const onSrcCharsetMsgRef = ref<any>();
const onSrcContentMsgRef = ref<any>();
const onCharsetMsgRef = ref<any>();
const srcContent = ref('');
const srcCharset = ref('UTF-8');
const charset = ref('UTF-8');
const resContent = ref('');
const otherSrcCharset = ref('');
const otherCharset = ref('');

const convert = () => {
  if (!srcContent.value) {
    onSrcContentMsgRef.value.showMsg('内容为空', 'fail');
    return;
  }
  let wCharset = srcCharset.value === 'other' ? otherSrcCharset.value : srcCharset.value;
  if (!iconv.encodingExists(wCharset)) {
    onSrcCharsetMsgRef.value.showMsg(wCharset === '' ? '请输入标准字符集名称' : `不支持的字符集：${wCharset}`, 'fail');
    return;
  }
  let rCharset = charset.value === 'other' ? otherCharset.value : charset.value;
  if (!iconv.encodingExists(rCharset)) {
    onCharsetMsgRef.value.showMsg(rCharset === '' ? '请输入标准字符集名称' : `不支持的字符集：${rCharset}`, 'fail');
    return;
  }
  let encodeBuffer = iconv.encode(srcContent.value, wCharset);
  resContent.value = iconv.decode(encodeBuffer, rCharset);
}

watch(() => [srcContent.value, srcCharset.value, otherSrcCharset.value, charset.value, otherCharset.value], (value, oldValue) => {
  onSrcContentMsgRef.value.showMsg();
  onSrcCharsetMsgRef.value.showMsg();
  onCharsetMsgRef.value.showMsg();
  resContent.value = '';
});

const copy = async (text: string) => {
  if (!text) return;
  try {
    await toClipboard(text);
  } catch (e) {
    console.error(e)
  }
}
</script>

<style scoped>
.blk-item {
  margin: 10px 0;
}

input:focus, textarea:focus {
  outline: none;
}

/* 按钮样式 */
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
</style>
