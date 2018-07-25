import React from 'react'
import ReactDOM from 'react-dom'
import ReactDetachableWindow from '../../src'
import http from 'http-promises/server'
import Highlight from 'react-highlight'
 
class App extends React.Component {
  render() {
    var reattachButton = (<div>Close!</div>)
    var detachButton = (<button type='button'>Detach!</button>)
    return (
      <div style={{ display: 'block' }}>
        <div>This part does NOT detach</div>
        <ReactDetachableWindow windowOptions={{ width: 800, height: 600 }} reattachButton={reattachButton} detachButton={detachButton}>
          <div style={{ backgroundColor:'#f1f1f1' }}>
          This part IS detachable - try it by clicking the button
          <Highlight className='javascript'>
            {this.props.code}
          </Highlight>
          </div>
        </ReactDetachableWindow>
        <div>This part does not detach either</div>
      </div>
    )
  }
}

http.get('index.js.raw').then(function({data}) {
  ReactDOM.render(<App code={data}/>, document.getElementById("root"))
})