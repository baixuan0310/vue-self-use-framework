// 加载echarts，注意引入文件的路径
import * as echarts from 'echarts/lib/echarts.js';
import { LineChart } from 'echarts/charts';
echarts.use([LineChart]);

import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/pie'

import 'echarts/lib/component/legend'
import 'echarts/lib/component/title'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/grid'
import 'echarts/lib/component/toolbox'
// import 'echarts/lib/component/line'

export default echarts

