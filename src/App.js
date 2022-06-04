import logo from './logo.svg';
import './App.css';
import { Link, Switch, Route } from "react-router-dom";
import {useState, useEffect} from "react"
import {nanoid} from 'nanoid';
import he from "he"
import Welcome from './Welcome';
import Quizz from './Quizz';

function App() {
  const [startGame, setStartGame] = useState(false)
  const [questions, setQuestions] = useState([])
  const [reload, setReload] = useState(false)
  const [count, setCount] = useState(0)
 
 
  function gameStart(){setStartGame(true) }
  
  useEffect(() => {
    setCount(0)
    console.log(count)
    /*Temporary array for storing data within the API call*/
    let questionsArray = []
    fetch("https://opentdb.com/api.php?amount=6&difficulty=easy&type=multiple")
     .then(res => res.json())
     .then(data => questionsArray = data.results)
     .then(()=>{
       /*Rewriting questionsArray so it has a newly returned set of objects with the attributes that we need*/
       questionsArray = questionsArray.map(q => {
        /*Because we have a nested array (question -> correct_answer -> incorrect_answers (3 elements) we need to map through the
        array of incorrenct_answers as well and return it with the attributes that we need*/
        
        let answersArray = q.incorrect_answers.map( wrongAnswer => {
          return{id:nanoid(), value:he.decode(wrongAnswer), isCorrect:false, isSelected:false}
        })
        /*As the answersArray already contains incorrect answers after mapping, we also need to push a correct answer to it*/
        answersArray.push({id:nanoid(), value:he.decode(q.correct_answer), isCorrect:true, isSelected:false})
        shuffleAnswers(answersArray)
       /*End questionsArray mapping with returning the object with all the attributes we need*/
       return {id:nanoid(),category:q.category, question: he.decode(q.question), answers: answersArray}
       })
     })
     /*End an API call with setting questions state with the new array of objects*/
     .then(() => setQuestions(questionsArray))
  }, [reload])

 function shuffleAnswers(array){
  let currentIndex = array.length
  while (currentIndex != 0){
    let randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex --

    [array[currentIndex], array [randomIndex]] = [array[randomIndex], array[currentIndex]]
 }
  return array
}



  return (
    <div>
      <Switch>
         <Route exact path="/">
           <Welcome handleClick={gameStart}/>
         </Route>
         <Route path="/quizz">
           <Quizz questions={questions} setQuestions={setQuestions} startGame={startGame} setStartGame={setStartGame} setReload={setReload}
                  count={count} setCount={setCount}
                 />
          </Route>
       </Switch>
    </div>
  );
}

export default App;