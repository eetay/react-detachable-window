import React from 'react'
import ReactDOM from 'react-dom'

export default class ReactDetachableWindow extends React.PureComponent {
  constructor(props) {
    super(props)
    this.containerEl = document.createElement('div')
    this.externalWindow = null
    this.state = { portal: false }
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
    const windowOptions = Object.keys(this.props.windowOptions).reduce(this.windowOptionsReducer, '')
    this.externalWindow = window.open('', '', windowOptions)
    const self = this
    this.externalWindow.onbeforeunload = function() {
      self.setState({ portal: false })
      self.externalWindow = null
    }
    this.externalWindow.document.body.appendChild(this.containerEl)
    this.setState({ portal: true })
  }

  render() {
    // console.log('RENDER', this.portal, this.state.showWindowPortal)
    return this.state.portal ? ReactDOM.createPortal(
      <div>
        {this.props.children}
        <button type='button' onClick={this.closeWindow}>
          Close me!
        </button>
      </div>,
      this.containerEl
    ) : (
      <div>
        {this.props.children}
        <button type='button' onClick={this.openWindow}>
          Open in popup!
        </button>
      </div>
    )
  }

  componentDidMount() {
    // console.log('componentDidMount')
    this.closeWindow() // initial state of window when widget is launched
  }

  componentWillUnmount() {
    // console.log('componentWillUnmount')
    this.closeWindow() // close window when unmounting
  }
}
