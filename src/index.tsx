import React, { useEffect, useRef } from 'react'
import Chart from './components/Chart'
import PropTypes from 'prop-types'

interface TalChartProps {
  labels: Array<string>
  datasets: Array<Array<number>>
  colors: Array<Array<string>>
}

export const TalChart = ({
  labels,
  datasets,
  colors,
  ...props
}: TalChartProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    initialize().then((r) => r)
  }, [datasets, labels])

  const initialize = async () => {
    const canvas: any = canvasRef.current
    const width = 400
    const height = 400

    if (!canvas) {
      return
    }

    canvas.width = width
    canvas.height = height
    const ctx = canvas.getContext('2d')

    if (!ctx) {
      return
    }

    const devicePixelRatio = window.devicePixelRatio || 1
    const backingStoreRatio =
      ctx.webkitBackingStorePixelRatio ||
      ctx.mozBackingStorePixelRatio ||
      ctx.msBackingStorePixelRatio ||
      ctx.oBackingStorePixelRatio ||
      ctx.backingStorePixelRatio ||
      1

    const ratio = devicePixelRatio / backingStoreRatio

    if (devicePixelRatio !== backingStoreRatio) {
      const oldWidth = canvas.width
      const oldHeight = canvas.height

      canvas.width = oldWidth * ratio
      canvas.height = oldHeight * ratio

      canvas.style.width = oldWidth + 'px'
      canvas.style.height = 'inherit'

      // now scale the context to counter
      // the fact that we've manually scaled
      // our canvas element
      ctx.scale(ratio, ratio)
    }

    // Our draw came here
    const chart = new Chart({
      width,
      height,
      labels,
      colors,
      datasets
    })
    // await chart.loadAssets();
    chart.loadComponents()
    chart.draw(ctx)
  }

  return (
    <canvas
      style={{ maxWidth: '100%', maxHeight: '100%' }}
      className='chart-radar-canvas'
      ref={canvasRef}
      {...props}
    />
  )
}

TalChart.propTypes = {
  labels: PropTypes.arrayOf(PropTypes.string).isRequired,
  datasets: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
  colors: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired
}
