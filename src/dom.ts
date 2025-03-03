import { JSDOM } from 'jsdom'

export const dom = new JSDOM(
  `
<!DOCTYPE html>
<html lang="en">
  <head><title>Chart Renderer</title></head>
  <body>
    <div id="chart_div"></div>
  </body>
</html>
`,
  { pretendToBeVisual: true },
)
global.requestAnimationFrame = dom.window.requestAnimationFrame
global.document = dom.window.document
global.window = dom.window
global.HTMLElement = dom.window.HTMLElement
global.getComputedStyle = () => ({ getPropertyValue: () => 'white' })
