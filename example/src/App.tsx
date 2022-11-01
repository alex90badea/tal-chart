import React from 'react'
// @ts-ignore
import {TalChart} from 'tal-chart'

const App = () => {
  return <TalChart labels={["Social", "Purpose", "Learning", "Objective", "Pleasure", "Authority", "Security"]}
                   colors={[
                     ['rgba(152, 107, 166, .4)', 'rgba(152, 107, 166, 1)'],
                     ['rgba(137,172,101, .4)', 'rgba(137,172,101, 1)'],
                   ]}
                   datasets={[
                     [0.2, 0.3, 0.5, 0.7, 0.5, 0.2, 0.9, 0.7],
                     [0.6, 0.8, 0.9, 0.3, 0.2, 0.5, 0.6, 0.2],
                   ]}/>
}

export default App
