/**
 * 函数功能：指定字符串点击下载成为指定文件
 * @param content {string} 要生成文件内容
 * @param mimeType {string} 文件mime类型，详情查询：https://www.runoob.com/http/mime-types.html
 * @param nameGetter {() => string} 获取文件名称的函数，默认返回“文件名”
 * @param charset {string} 字符集
 */
export const clickDownload = (
  content: string,
  mimeType: string,
  nameGetter: () => string = () => '文件名',
  charset: string = 'utf-8'
) => {
  const blob = new Blob([content], {type: `${mimeType};${charset}`});
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a');
  link.href = url;
  link.download = nameGetter();
  link.click();
  URL.revokeObjectURL(url);
}

/**
 * @type { Object } 数学工具对象
 */
export const MathUtils = {
  /**
   * 函数描述：获取指定区间的随机整数
   * @param min {number} 最小值
   * @param max {number} 最大值
   * @return { number } 符合条件的随机整数
   */
  randomInt: (min: number, max: number): number => Math.floor(Math.random() * (max - min + 1)) + min,

  /**
   * 函数描述：在坐标系上计算从距离指定位置指定距离且指定角度点的坐标
   * @param distance {number} 指定距离
   * @param rad {number} 指定角度的弧度值
   * @param from { {x: number, y: number} } 起始坐标数组，from.x：横坐标、from.y：纵坐标
   * @return { {x: number, y: number} } 目标地点坐标，dest.x：横坐标、dest.y：纵坐标
   */
  computeCoordinates: (distance: number, rad: number, from: {x: number, y: number}): {x: number, y: number} => {
    from = from || { x: 0, y: 0 };
    return {
      x: from.x + distance * Math.cos(rad),
      y: from.y + distance * Math.sin(rad)
    };
  }
}
