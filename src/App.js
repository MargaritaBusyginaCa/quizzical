import logo from './logo.svg';
import './App.css';
import { Link, Switch, Route } from "react-router-dom";
import Welcome from './Welcome';
import Quizz from './Quizz';
function App() {
  return (
    <div>
      <Switch>
         <Route exact path="/"><Welcome/></Route>
         <Route path="/quizz"><Quizz/></Route>
       </Switch>
    </div>
  );
}

export default App;
