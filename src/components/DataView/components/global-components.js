import ECharts from 'vue-echarts/components/ECharts'
// custom theme
import ThemeConfigMap from '../config/theme-config-map'

import chinaMap from '../map/china'

// registering custom theme
ECharts.registerTheme('chalkTheme', ThemeConfigMap['chalk'])
ECharts.registerTheme('darkTheme', ThemeConfigMap['dark'])
ECharts.registerTheme('essosTheme', ThemeConfigMap['essos'])
ECharts.registerTheme('halloweenTheme', ThemeConfigMap['halloween'])
ECharts.registerTheme('infographicTheme', ThemeConfigMap['infographic'])
ECharts.registerTheme('macaronsTheme', ThemeConfigMap['macarons'])
ECharts.registerTheme('purplePassionTheme', ThemeConfigMap['purplePassion'])
ECharts.registerTheme('romaTheme', ThemeConfigMap['roma'])
ECharts.registerTheme('shineTheme', ThemeConfigMap['shine'])
ECharts.registerTheme('vintageTheme', ThemeConfigMap['vintage'])
ECharts.registerTheme('waldenTheme', ThemeConfigMap['walden'])
ECharts.registerTheme('westerosTheme', ThemeConfigMap['westeros'])
ECharts.registerTheme('wonderlandTheme', ThemeConfigMap['wonderland'])

ECharts.registerMap('china', chinaMap)

const GlobalComponents = {}

GlobalComponents.install = (Vue) => {
  Vue.prototype.theme = 'darkTheme'
  Vue.component('echarts', ECharts)
}

export default GlobalComponents
