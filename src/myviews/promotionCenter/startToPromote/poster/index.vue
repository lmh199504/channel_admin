<template>
  <div>
    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
        <div>
          <div class="poster_tab_top">预览海报效果</div>
          <div class="poster_hint">提示：请于右侧输入框中填写推广链接后,拖拽二维码到合适位置，点击下载保存二维码。重新拖动二维码将清空已P好的文字</div>
          <div ref="posterImgBox" class="poster_bigImg_box">
            <img ref="posterBgImg" :src="posterBgImg" alt="" class="poster_bigImg">
            <div class="over_text" />
            <!-- 已经保存的文字 -->
            <div v-for="(text, index) in configData" :key="index" class="over_text">
              <span class="diy-text" :style="bgStyle('text', text)">{{ text.text }}</span>
            </div>
            <!-- 正在输入的文字 -->
            <div
              v-show="thisText.text !== ''"
              id="move-text_this"
              ref="moveText"
              class="move-div move-text"
              :style="bgStyle('text', thisText)"
              @mousedown.prevent="textDown($event, 1)"
              @touchstart.prevent="textDown($event, 2)"
            >
              {{ thisText.text }}
            </div>
            <!-- 二维码 -->
            <img
              ref="moveCode"
              class="poster_code"
              :style="bgStyle('qrcode_img', posterCodeImg)"
              :src="posterCodeUrl"
              alt=""
              @mousedown.prevent="codeDown($event, 1)"
              @touchstart.prevent="codeDown($event, 2)"
            >
          </div>
          <div class="all_btn download_btn">
            <el-button type="primary" size="small" class="frist_open_btn" :loading="downLoadImgLoading" @click="todownload">下载图片</el-button>
          </div>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
        <p class="poster_tab_top">需生成二维码的网址</p>
        <div class="extend-title">推广设备类型：</div>
        <div class="extend-radio-container">
          <el-radio-group v-model="formData.facilityType" @change="changeCode">
            <el-radio v-for="item in facilityType" :key="item.name" :label="item.value">{{ item.name }}</el-radio>
          </el-radio-group>
        </div>
        <div class="extend-title">推广模板：</div>
        <div class="extend-radio-container">
          <el-radio-group v-model="formData.templateType" @change="changeCode">
            <el-radio v-for="item in templateType" :key="item.name" :label="item.value">{{ item.name }}</el-radio>
          </el-radio-group>
        </div>
        <div class="margin_bottom_15"><el-button type="primary" size="mini">刷新二维码</el-button></div>
        <div class="poster_select_img">
          <span class="extend-title">自定义海报图片：</span>
          <el-select v-model="selectPosterValue" placeholder="请选择" @change="selectPosterBgImg">
            <el-option v-for="item in posterImgList" :key="item.img_name" :label="item.img_name" :value="item.img_url" />
          </el-select>
          <div class="poster_addImg_box">
            <label class="poster_addImg" for="fileinp">
              <i class="el-icon-plus" />
              <input id="fileinp" ref="InputFile" type="file" name="files" accept="image/jpg,image/jpeg,image/gif,image/png,image/bmp" @change="upData($event)">
            </label>
            <span class="poster_addImg_text">提示：点击可上传本地图片</span>
          </div>
        </div>
        <div>
          <div class="extend-title">图片文字内容：</div>
          <el-input v-model="thisText.text" class="margin_bottom_15" maxlength="200" placeholder="请输入文字内容" />
          <div class="margin_bottom_15"><el-button type="primary" size="small" class="frist_open_btn" @click="saveText">保存文字</el-button></div>
          <el-row class="poster_font_set">
            <el-col :xs="12" :sm="8" :md="8" :lg="8" :xl="8" class="margin_bottom_15">
              <span>字体：</span>
              <el-select v-model="thisText.family" placeholder="请选择" style="width: 52%;">
                <el-option v-for="item in fontFamilyList" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-col>
            <el-col :xs="12" :sm="8" :md="8" :lg="8" :xl="8" class="margin_bottom_15">
              <span>字体大小：</span>
              <el-select v-model="thisText.size" placeholder="请选择" style="width: 52%;">
                <el-option v-for="item in fontSizeList" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-col>
            <el-col :xs="12" :sm="8" :md="8" :lg="8" :xl="8" class="margin_bottom_15">
              <span>是否加粗：</span>
              <el-select v-model="thisText.is_bold" placeholder="请选择" style="width: 52%;">
                <el-option label="否" value="0" />
                <el-option label="是" value="1" />
              </el-select>
            </el-col>
            <el-col :xs="12" :sm="8" :md="8" :lg="8" :xl="8" class="margin_bottom_15">
              <span>字体颜色：</span>
              <el-color-picker v-model="thisText.color" class="colorPicker" />
            </el-col>
          </el-row>
        </div>
        <div>
          <div class="extend-title">二维码位置设置：</div>
          <el-row class="poster_code_set">
            <el-col :span="8">
              <span>二维码X位置：</span>
              <el-input v-model="posterCodeImg.left" style="width: 52%;" class="poster_input_text" placeholder="请输入文字内容" />
            </el-col>
            <el-col :span="8">
              <span>二维码Y位置：</span>
              <el-input v-model="posterCodeImg.top" style="width: 52%;" class="poster_input_text" placeholder="请输入文字内容" />
            </el-col>
            <el-col :span="8">
              <span>二维码的大小：</span>
              <el-input v-model="posterCodeImg.size" style="width: 52%;" class="poster_input_text" placeholder="请输入文字内容" />
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
    <el-dialog title="提示" :visible.sync="showImgDialog" width="90%">
      <span>长按下载图片</span>
      <img :src="testImg" alt="" width="100%">
      <span slot="footer" class="dialog-footer"><el-button @click="showImgDialog = false">取 消</el-button></span>
    </el-dialog>
  </div>
</template>

<script>
import codeImg from './code.png'
import bgImg from './bgImg.jpg'
import html2canvas from 'html2canvas'
import { base64ToBlob } from '@/utils/download.js'
export default {
  props: {
    facilityType: {
      type: Array,
      default: function() {
        return []
      }
    },
    templateType: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  data() {
    return {
      posterBgImg: bgImg,
      posterCodeImg: {
        // 海报二维码尺寸和位置
        size: '100',
        left: 0,
        top: 0
      },
      configData: [
        // 已保存文字的数据
        {
          text: '', // 文字内容
          size: '30', // 文字大小，font-size
          is_bold: '0', // 文字是否加粗
          color: '#000000', // 文字颜色
          family: '黑体', // 字体
          left: 0,
          top: 0
        }
      ],
      fontFamilyList: [
        // 字体
        { value: '黑体' },
        { value: '宋体' },
        { value: '微软雅黑' },
        { value: '楷体' },
        { value: '新宋体' },
        { value: '仿宋' },
        { value: 'Arial, Helvetica, sans-serif' },
        { value: 'Tahoma, Geneva, sans-serif' }
      ],
      fontSizeList: [
        // 字体大小
        { value: '20' },
        { value: '25' },
        { value: '30' },
        { value: '35' },
        { value: '40' },
        { value: '45' },
        { value: '50' },
        { value: '55' },
        { value: '60' }
      ],
      thisText: {
        // 当前输入的文字数据
        text: '',
        family: '黑体',
        size: '30',
        is_bold: '0',
        color: '#000',
        left: 0,
        top: 0
      },
      downLoadImgLoading: false,
      posterCodeUrl: codeImg,
      formData: {
        facilityType: '',
        templateType: ''
      },
      selectPosterValue: '',
      posterImgList: [],
      showImgDialog: false,
      testImg: ''
    }
  },
  computed: {
    // 监听海报输入文字和二维码的位置和尺寸
    bgStyle: function() {
      return function(type, item) {
        var style
        switch (type) {
          case 'text':
            style = {
              fontSize: item.size + 'px',
              fontWeight: +item.is_bold === 1 ? 'bold' : 'normal',
              color: item.color,
              fontFamily: item.family,
              left: item.left + 'px',
              top: item.top + 'px'
            }
            break
          case 'qrcode_img':
            style = {
              width: item.size + 'px',
              height: item.size + 'px',
              left: item.left + 'px',
              top: item.top + 'px'
            }
            break
          default:
            break
        }
        return style
      }
    }
  },
  watch: {
    'posterCodeImg.left': function(val) {
      // 键路径必须加上引号
      // 获取目标元素宽
      const codeWidth = this.$refs.moveCode.offsetWidth
      // 获取父级的宽高和目标元素的宽高
      const boxWidth = this.$refs.posterImgBox.offsetWidth
      // 父级的宽高减去目标元素的宽高==目标元素不能超出父级
      var textX = boxWidth - codeWidth
      // 移动不能超过父级

      if (val <= 0) {
        // this.posterCodeImg.left = 0
      } else if (val > textX) {
        this.posterCodeImg.left = textX
      }
    },
    'posterCodeImg.top': function(val) {
      // 键路径必须加上引号
      // 获取目标元素高
      const codeHeight = this.$refs.moveCode.offsetHeight
      // 获取父级的宽高和目标元素的宽高
      const boxHeight = this.$refs.posterImgBox.offsetHeight
      // 父级的宽高减去目标元素的宽高==目标元素不能超出父级
      var textY = boxHeight - codeHeight
      // 移动不能超过父级
      if (val <= 0) {
        // this.posterCodeImg.top = 0
      } else if (val > textY) {
        this.posterCodeImg.top = textY
      }
    },
    'posterCodeImg.size': function(val) {
      // 键路径必须加上引号
      // 获取父级的宽高和目标元素的宽
      const boxWidth = this.$refs.posterImgBox.offsetWidth
      // 移动不能超过父级
      if (val <= 0) {
        // this.posterCodeImg.size = 0
      } else if (val > boxWidth) {
        this.posterCodeImg.size = boxWidth
      }
    },
    facilityType: {
      handler: function(newVal) {
        if (newVal.length > 0) {
          this.formData.facilityType = newVal[0].value
        }
      },
      immediate: true
    },
    templateType: {
      handler: function(newVal) {
        if (newVal.length > 0) {
          console.log(this.formData)
          this.formData.templateType = newVal[0].value
        }
      },
      immediate: true
    }
  },
  methods: {
    todownload() {
      this.productionImage()
    },
    // 生成海报
    productionImage() {
      window.scrollTop = 0
      this.downLoadImgLoading = true
      document.documentElement.scrollTop = 0
      scrollTo(0, 0)
      const canvasBox = this.$refs.posterImgBox

      setTimeout(() => {
        html2canvas(canvasBox, {
          windowWidth: document.body.scrollWidth,
          windowHeight: document.body.scrollHeight,
          width: canvasBox.offsetWidth,
          height: canvasBox.offsetHeight,
          scrollY: 0,
          scrollX: 0,
          allowTaint: true, // 允许跨域图片
          taintTest: false, // 是否在渲染前测试图片
          useCORS: true, // 如果截图的内容里有图片,解决文件跨域问题
          dpi: window.devicePixelRatio * 2, // 解决图片不清晰问题
          scale: 2
        }).then(res => {
          this.downLoadImgLoading = false
          // toDataURL 图片格式转成 base64
          const dataURL = res.toDataURL('image/png')
          this.testImg = dataURL
          // 下载海报
          if (this.IsPC()) {
            this.downloadFile('share.png', dataURL)
          } else {
            this.showImgDialog = true
          }

          this.dialog_edit_post = false
        }, 500)
      })
    },
    downloadFile(fileName, content) {
      const aLink = document.createElement('a')
      // base64转换图片
      const blob = base64ToBlob(content) // new Blob([content]);
      const evt = document.createEvent('HTMLEvents')
      evt.initEvent('click', true, true) // initEvent 不加后两个参数在FF下会报错  事件类型，是否冒泡，是否阻止浏览器的默认行为
      aLink.download = fileName
      aLink.href = URL.createObjectURL(blob)
      // aLink.dispatchEvent(evt);
      // aLink.click()
      aLink.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window })) // 兼容火狐
    },
    // 输入文字移动
    textDown(e, i) {
      // 获取目标元素宽高
      const textHeight = this.$refs.moveText.offsetHeight
      const textWidth = this.$refs.moveText.offsetWidth
      this.down(e, textHeight, textWidth, this.thisText)
      if (i === 1) {
        this.down(e, textHeight, textWidth, this.thisText, 1)
      } else {
        this.down(e, textHeight, textWidth, this.thisText, 2)
      }
    },
    // 二维码移动
    codeDown(e, i) {
      // 获取目标元素宽高
      const codeHeight = this.$refs.moveCode.offsetHeight
      const codeWidth = this.$refs.moveCode.offsetWidth
      // var elementMove = ''
      if (i === 1) {
        this.down(e, codeHeight, codeWidth, this.posterCodeImg, 1)
      } else {
        this.down(e, codeHeight, codeWidth, this.posterCodeImg, 2)
      }
    },
    // 判断是移动端 还是PC端
    IsPC() {
      var userAgentInfo = navigator.userAgent.toLocaleLowerCase()
      var Agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod']
      var flag = true
      for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v].toLocaleLowerCase()) > 0) {
          flag = false
          break
        }
      }
      return flag
    },
    // 事件：移动-拖拽
    down(e, height, width, position, eventType) {
      // 获取目标元素
      const sondiv = e.target
      // 获取父级的宽高和目标元素的宽高
      const boxHeight = this.$refs.posterImgBox.offsetHeight
      const boxWidth = this.$refs.posterImgBox.offsetWidth
      // 父级的宽高减去目标元素的宽高==目标元素不能超出父级
      var textX = boxWidth - width
      var textY = boxHeight - height
      // 算出鼠标相对元素的位置
      let disX = e.clientX - sondiv.offsetLeft
      let disY = e.clientY - sondiv.offsetTop
      // 判断是移动端还是PC端 使用的滑动事件不一样
      if (eventType === 2) {
        disX = e.changedTouches[0].clientX - sondiv.offsetLeft
        disY = e.changedTouches[0].clientY - sondiv.offsetTop
      }
      // 如果是移动端
      if (this.IsPC()) {
        document.onmousemove = e => {
          // 鼠标按下并移动的事件
          // 用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
          let left = e.clientX - disX
          let top = e.clientY - disY
          // 移动不能超过父级
          if (left <= 0) {
            left = 0
          } else if (left > textX) {
            left = textX
          }
          if (top <= 0) {
            top = 0
          } else if (top > textY) {
            top = textY
          }
          // 移动当前元素
          position.left = left
          position.top = top
        }
        document.onmouseup = () => {
          document.onmousemove = null
          document.onmouseup = null
        }
      } else {
        // 移动端按下滑动的事件
        document.ontouchmove = e => {
          // 用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
          let left = e.changedTouches[0].clientX - disX
          let top = e.changedTouches[0].clientY - disY
          // 移动不能超过父级
          if (left <= 0) {
            left = 0
          } else if (left > textX) {
            left = textX
          }
          if (top <= 0) {
            top = 0
          } else if (top > textY) {
            top = textY
          }
          // 移动当前元素
          position.left = left
          position.top = top
        }
        document.ontouchend = () => {
          document.ontouchmove = null
          document.ontouchend = null
        }
      }
    },
    changeCode() {},
    // 海报选择
    selectPosterBgImg(val) {
      this.posterBgImg = val
      // this.getImage(val);
    },
    // 本地上传图片-更换图片
    upData() {
      var reader = new FileReader()
      const fileData = this.$refs.InputFile.files[0]
      reader.readAsDataURL(fileData)
      const _this = this
      reader.onload = function(e) {
        // 这里的数据可以使本地图片显示到页面
        _this.posterBgImg = e.srcElement.result
        console.log(_this.posterBgImg)
      }
    },
    // 保存文字
    saveText: function() {
      var _this = this
      var arr = JSON.stringify(_this.thisText)
      if (_this.configData.length <= 0) {
        _this.$set(_this.configData, 0, arr)
      } else {
        _this.configData.push(JSON.parse(arr))
      }
      _this.thisText = {
        text: '',
        family: '黑体',
        size: '30',
        is_bold: '0',
        color: '#000',
        left: 0,
        top: 0
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.poster_hint {
  color: red;
  font-size: 12px;
  margin: 10px 0;
}
.poster_bigImg_box {
  overflow: hidden;
  margin: 10px auto;
  width: 100%;
  max-width: 400px;
  position: relative;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: 0 0;
}
.poster_bigImg {
  display: block;
  width: 100%;
}
.over_text {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 2;
  border: none;
  display: inline-block;
  cursor: move;
  user-select: none;
  width: 100%;
}
.poster_code {
  position: absolute;
  width: 100px;
  height: 100px;
  left: 0;
  top: 0;
  z-index: 2;
  cursor: move;
  user-select: none;
}
.poster_tab_top {
  font-weight: bold;
}
.poster_addImg_box {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: end;
  -ms-flex-align: end;
  align-items: flex-end;
  margin: 20px 0;
}
.poster_addImg {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  width: 120px;
  height: 120px;
  background: #e5e5e5;
  border-radius: 10px;
  text-align: center;
  .el-icon-plus {
    font-size: 40px;
    color: #ffffff;
  }
}
.poster_addImg_text {
  margin-left: 15px;
  color: red;
  font-size: 12px;
}
#fileinp {
  display: none;
}
.move-div {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 3;
  border: none;
  display: inline-block;
  cursor: move;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.diy-text {
  position: absolute;
  display: block;
  width: auto;
  width: 100%;
}
.poster_font_set,
.poster_code_set {
  span {
    font-size: 12px;
  }
}
.colorPicker {
  vertical-align: middle;
}
</style>
