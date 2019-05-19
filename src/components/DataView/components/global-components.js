import ECharts from 'vue-echarts/components/ECharts'

import chinaMap from '../map/china'

ECharts.registerMap('china', chinaMap)

const GlobalComponents = {}

GlobalComponents.install = (Vue) => {
  Vue.prototype.theme = 'darkTheme'
  Vue.component('echarts', ECharts)
}

export default GlobalComponents
