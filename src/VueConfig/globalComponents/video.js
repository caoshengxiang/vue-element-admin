/*
全局注册m3u8播放器
*/

import Vue from 'vue'
import VideoPlayer from 'vue-video-player'

require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')
const hls = require('videojs-contrib-hls')
Vue.use(VideoPlayer)
Vue.use(hls)
