import { useState } from 'react'
import {Route, Link, Switch} from 'react-router-dom'

import Quizz from './Quizz'
function Welcome(props){
  return(
      <div className='welcome--page_container'>
          <div className='lemon-circle'></div>
          <h1>Quizzical</h1>
          <p>Test your knowledge</p>
          <Link to="/quizz" className='primary--button' onClick={props.setStartGame}>Start Quizz</Link>
          <div className='blue-circle'></div>
              
      </div>
    
  )
}
export default Welcome