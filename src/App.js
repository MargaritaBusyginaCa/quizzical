import logo from './logo.svg';
import './App.css';
import { Link, Switch, Route } from "react-router-dom";
import {useState, useEffect} from "react"
import {nanoid} from 'nanoid';
import Welcome from './Welcome';
import Quizz from './Quizz';

function App() {
  const [startGame, setStartGame] = useState(false)
  const [questions, setQuestions] = useState([])
  const [finalScore, setFinalScore] = useState(0)
  // const [reload, setReload] = useState(false)

  function gameStart(){setStartGame(true)}
  
  useEffect(() => {
    let questionsArray = []
    fetch("https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple")
    .then(res => res.json())
    .then(data => questionsArray = data.results)
    .then(() => {
      questionsArray = questionsArray.map(q => {
        let answersArray = q.incorrect_answers.map(wrongAnswer =>{
          return{id:nanoid(), value:wrongAnswer, isCorrect:false, isSelected:false}
        })
        answersArray.push({value:q.correct_answer, isCorrect:true, isSelected:false})
        return{category:q.category, question:q.question, answers: answersArray}
      })
      
    })
    .then(() => {setQuestions(questionsArray)})
  }, [])
  console.log(questions)
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
