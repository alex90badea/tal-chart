# tal-chart

> A canvas spider / radar chart Component for React

[![NPM](https://img.shields.io/npm/v/tal-chart.svg)](https://www.npmjs.com/package/tal-chart) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save tal-chart
```

## Usage

```tsx
import React from 'react'

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
```

## Snapshot

![img](https://raw.githubusercontent.com/alex90badea/tal-chart/master/example/img.png)

## Props


| Prop        | Type           | Description  |
| ------------- |-------------| -----|
| **labels** | `Array<string>`  | Array of all the labels |
| **datasets** | `Array<Array<number>>` | Array of arrays, each sub array contains the values for each dataset in range from 0 to 1 |
| **colors** | `Array<Array<string>>`  | Array of arrays, each sub array matching the dataset index. Each sub array needs to have 2 elements, first element for background color and second for border color |


## License

MIT © [alex90badea](https://github.com/alex90badea)
