import React from 'react'
import ReactDOM from 'react-dom'

export default class ReactDetachableWindow extends React.PureComponent {
  constructor(props) {
    super(props)
    this.containerEl = document.createElement('div')
    this.externalWindow = null
    this.state = { portal: false }
  }

  addCss(win, url) {
    var head = win.document.head
    var link = win.document.createElement('link')
    link.type = 'text/css'
    link.rel = 'stylesheet'
    link.href = url
    head.appendChild(link)
  }

  windowOptionsReducer = (accumulatedOptions, option) => {
    const prefixOptions = (accumulatedOptions === '') ? '' : `${accumulatedOptions},`
    return `${prefixOptions}${option}=${this.props.windowOptions[option]}`
  }

  closeWindow = () => {
    this.setState({ portal: false })
    if (this.externalWindow) this.externalWindow.close()
    this.externalWindow = null
  }

  openWindow = () => {
    const windowOptions = Object.keys(this.props.windowOptions || {}).reduce(this.windowOptionsReducer, '')
    this.externalWindow = window.open('', '', windowOptions)
    this.externalWindow.document.title = this.windowProps.title
    this.addCss(this.externalWindow, this.windowProps.stylesheets[0].href)
    const self = this
    this.externalWindow.onbeforeunload = function() {
      self.setState({ portal: false })
      self.externalWindow = null
    }
    this.externalWindow.document.body.appendChild(this.containerEl)
    this.setState({ portal: true })
  }

  getStylesheets(document) {
    const sheets = document.styleSheets
    if (!sheets) return []
    const len = sheets.length
    var ret=[]
    for (var i=0; i<len; i+=1) {
      const sheet = sheets[i]
      ret.push({
        type: sheet.type,
        href: sheet.href
      })
    }
    return ret
  }

  componentDidMount(_props) {
    this.windowProps = {
      title: this.props.title || document.title,
      stylesheets: this.props.stylesheets || this.getStylesheets(document)
    }
    this.closeWindow() // initial state of window when widget is launched
  }

  componentWillUnmount() {
    this.closeWindow()
  }

  render() {
    const reattachButton = this.props.reattachButton ? {
      ...this.props.reattachButton,
      props: {
        ...this.props.reattachButton.props,
        onClick: ()=>this.closeWindow()
      }
    } : (
      <button type='button' onClick={()=>this.closeWindow()}>
        Close me!
      </button>
    )
    const detachButton = this.props.detachButton ? {
      ...this.props.detachButton,
      props: {
        ...this.props.detachButton.props,
        onClick: ()=>this.openWindow()
      }
    } : (
      <button type='button' onClick={()=>this.openWindow()}>
        Open me in new window!
      </button>
    )
    return this.state.portal ? ReactDOM.createPortal(
      <div>
        {this.props.children}
        {reattachButton}
      </div>,
      this.containerEl
    ) : (
      <div>
        {this.props.children}
        {detachButton}
      </div>
    )
  }
}
