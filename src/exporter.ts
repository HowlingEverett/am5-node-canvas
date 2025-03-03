import * as am5 from '@amcharts/amcharts5/index.js'
import { PieChart, PieSeries } from '@amcharts/amcharts5/percent.js'
import { Exporting } from '@amcharts/amcharts5/plugins/exporting.js'
import fs from 'fs/promises'
import { JSDOM } from 'jsdom'
import path from 'path'
import { fileURLToPath } from 'url'

export const getRoot = (dom: JSDOM): am5.Root => {
  const chartDiv = dom.window.document.getElementById('chart_div')!
  return am5.Root.new(chartDiv, {
    // Just hard-coding size for simplicity, for now.
    calculateSize: () => ({
      width: 500,
      height: 500,
    }),
  })
}

export const renderChart = (root: am5.Root): PieChart => {
  const pieChart = root.container.children.push(PieChart.new(root, {}))
  const series = pieChart.series.push(
    PieSeries.new(root, {
      valueField: 'value',
      categoryField: 'category',
    }),
  )
  series.data.setAll([
    {
      category: 'Meat Pies',
      value: 30,
    },
    {
      category: 'Sausage Rolls',
      value: 65,
    },
    {
      category: 'Chiko Rolls',
      value: 15,
    },
  ])
  return pieChart
}

export const exportChart = async (root: am5.Root): Promise<void> => {
  const exporting = Exporting.new(root, {
    pdfOptions: { includeData: false },
  })
  const pdfBase64 = await exporting.getPDF()
  const pdfBuffer = new Buffer.from(pdfBase64, 'base64')
  // const pdfBuffer = new Buffer.from(pdfDataUrl.substring(pdfDataUrl.indexOf('base64') + 7), 'base64')
  const __filename = fileURLToPath(import.meta.url) // get the resolved path to the file
  const __dirname = path.dirname(__filename)
  const exportPath = path.resolve(__dirname, 'test-chart.pdf')
  await fs.writeFile(exportPath, pdfBuffer)
}
