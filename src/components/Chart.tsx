import Radar from './Radar'

export default class Chart {
  colors: Array<Array<string>>
  components: Array<any>
  datasets: Array<Array<number>>
  height: number
  imageList: Array<any>
  labels: Array<string>
  width: number
  constructor(props: {
    width: number
    height: number
    labels: Array<string>
    colors: Array<Array<string>>
    datasets: Array<Array<number>>
  }) {
    this.width = props.width
    this.height = props.height
    this.labels = props.labels
    this.datasets = props.datasets
    this.colors = props.colors
    this.imageList = []
    this.components = []
  }

  async loadAssets() {
    // load fonts
    // const fontFSAlbertProLight = new FontFace('FSAlbertProLight', `url(${FS})`);
    // await fontFSAlbertProLight.load().then(function (font) {
    //     document.fonts.add(font);
    // });

    // load images
    const preloadImages = async (images: any) => {
      const promises = Object.keys(images).map((src) => {
        return new Promise((resolve, reject) => {
          const img = new Image()
          img.src = src
          img.crossOrigin = 'Anonymous'
          // @ts-ignore
          img.onload = resolve()
          // @ts-ignore
          // eslint-disable-next-line prefer-promise-reject-errors
          img.onerror = reject()
          this.imageList[src] = img
        })
      })
      await Promise.all(promises);
    }
    this.imageList.length > 0 && (await preloadImages(this.imageList))
  }

  loadComponents() {
    this.components.push(new Radar(this))
  }

  draw(ctx: any) {
    // clear screen
    ctx.clearRect(0, 0, this.width, this.height)

    // draw TalChart
    for (const component of this.components) {
      component.draw(ctx)
    }
  }
}
