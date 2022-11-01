// eslint-disable-next-line no-unused-vars
import Chart from './Chart'

export default class Radar {
  chart: Chart
  linesColor: string
  textColor: string
  totalLabels: number
  webColor: string
  webSegments: number
  constructor(chart: Chart) {
    this.chart = chart
    this.totalLabels = chart.labels.length
    this.webSegments = 4
    this.webColor = '#cdcdcd'
    this.linesColor = '#bfbfbf'
    this.textColor = '#000'
  }

  _drawLine(ctx: any, radius: number, theta: number) {
    ctx.strokeStyle = this.linesColor
    ctx.beginPath()
    ctx.moveTo(0, 0)
    ctx.lineTo(radius * Math.cos(theta), radius * Math.sin(theta))
    ctx.closePath()
    ctx.stroke()
  }

  _drawSpiderWeb(ctx: any, radius: number) {
    ctx.strokeStyle = this.webColor
    const radiusSegment = radius / this.webSegments

    for (let i = 0; i < this.webSegments; i++) {
      ctx.beginPath()
      ctx.moveTo(radius * Math.cos(0), radius * Math.sin(0))

      let index = 0
      for (
        let theta = 0;
        theta < Math.PI * 2;
        theta += (Math.PI * 2) / this.totalLabels
      ) {
        if (index >= this.totalLabels) break
        ctx.lineTo(radius * Math.cos(theta), radius * Math.sin(theta))
        index++
      }

      ctx.closePath()
      ctx.stroke()
      radius -= radiusSegment
    }
  }

  _drawData(ctx: any, radius: number, data: Array<number>, key: number = 0) {
    ctx.save()
    const midPoints = []
    ctx.fillStyle = this.chart.colors[key][0]

    let x0 = radius * Math.cos(0)
    let y0 = radius * Math.sin(0)

    for (
      let theta = 0;
      theta <= Math.PI * 2;
      theta += (Math.PI * 2) / this.totalLabels
    ) {
      const x1 = radius * Math.cos(theta)
      const y1 = radius * Math.sin(theta)

      const midX = x0 + (x1 - x0) * 0.5
      const midY = y0 + (y1 - y0) * 0.5

      x0 = x1
      y0 = y1

      if (theta === 0) continue
      midPoints.push({ x: midX, y: midY })
    }

    // draw dataset background
    ctx.beginPath()
    for (let i = 0; i < this.chart.labels.length; i++) {
      const value = data[i]
      const midPoint = midPoints[i]

      // calculate value on the line from center (0,0) to midPoint
      const valueX = midPoint.x * value
      const valueY = midPoint.y * value

      if (i === 0) {
        ctx.moveTo(valueX, valueY)
      }
      ctx.lineTo(valueX, valueY)
    }
    ctx.closePath()
    ctx.fill() // Render the path

    // draw dataset outline
    ctx.strokeStyle = this.chart.colors[key][1]
    ctx.lineWidth = 2
    ctx.beginPath()
    for (let i = 0; i < this.chart.labels.length; i++) {
      const value = data[i]
      const midPoint = midPoints[i]

      // calculate value on the line from center (0,0) to midPoint
      const valueX = midPoint.x * value
      const valueY = midPoint.y * value

      if (i === 0) {
        ctx.moveTo(valueX, valueY)
      }
      ctx.lineTo(valueX, valueY)
    }
    ctx.closePath()
    ctx.stroke() // Render the path

    ctx.restore()
  }

  _drawLabel(ctx: any, radius: number, theta: number, text: string) {
    ctx.save()
    ctx.fillStyle = this.textColor
    radius += 5 // labels padding
    theta += 0.5 * ((Math.PI * 2) / this.totalLabels) // offset angle + half of theta
    ctx.translate(radius * Math.cos(theta), radius * Math.sin(theta))
    ctx.rotate(Math.PI / 2 + theta)

    // 0 to 180 -> flip text on bottom half
    if (theta > 0 && theta <= Math.PI) {
      ctx.scale(-1, -1)
    }

    ctx.font = "12px 'regulator-nova', Nova, Arial"
    ctx.textAlign = 'center'
    ctx.fillText(text, 0, 0)
    ctx.restore()
  }

  draw(ctx: any) {
    ctx.save()
    ctx.translate(this.chart.width / 2, this.chart.height / 2)

    const radius =
      Math.floor(this.chart.width / 2) - (this.chart.width / 2) * 0.2

    let index = 0
    for (
      let theta = 0;
      theta < Math.PI * 2;
      theta += (Math.PI * 2) / this.totalLabels
    ) {
      if (index >= this.totalLabels) break

      this._drawLine(ctx, radius, theta)
      this._drawLabel(ctx, radius, theta, this.chart.labels[index])

      index++
    }

    this._drawSpiderWeb(ctx, radius)

    for (let i = 0; i < this.chart.datasets.length; i++) {
      this._drawData(ctx, radius, this.chart.datasets[i], i)
    }
    ctx.restore()
  }
}
