const loadChart = async () => {
  const { dom } = await import('./dom.js')
  const { getRoot, renderChart, exportChart } = await import('./exporter.js')
  const root = getRoot(dom)

  renderChart(root)
  await exportChart(root)
}

loadChart()
  .then(() => {
    console.info('Exported chart')
  })
  .catch(err => {
    console.info('Failed to export chart')
    console.error(err)
  })
