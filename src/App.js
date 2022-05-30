import logo from './logo.svg';
import './App.css';
import { Link, Switch, Route } from "react-router-dom";
import {useState} from "react"
import Welcome from './Welcome';
import Quizz from './Quizz';
function App() {
  const [startGame, setStartGame] = useState(false)
  function gameStart(){
    setStartGame(true)
    
  }
  return (
    <div>
      <Switch>
         <Route exact path="/"><Welcome handleClick={gameStart}/></Route>
         <Route path="/quizz"><Quizz/></Route>
       </Switch>
    </div>
  );
}

export default App;
