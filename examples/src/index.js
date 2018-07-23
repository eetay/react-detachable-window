import React from 'react'
import ReactDOM from 'react-dom'
import ReactDetachableWindow from '../../src'
const App = () => (
  <div>
    This part is fixed
    <ReactDetachableWindow windowOptions={{ width: 800, height: 600 }}>
      <div>
        This part is detachable
      </div>
    </ReactDetachableWindow>
    This part is fixed
  </div>
)
ReactDOM.render(<App />, document.getElementById("root"))