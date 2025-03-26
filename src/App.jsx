import React from 'react'
import './app.css'
import NestedComments from './components/NestedComments.jsx'

const App = () => {
  return (
    <div className='main' >
      <h1>Nested Comments System</h1>
      <NestedComments></NestedComments>
    </div>
  )
}

export default App