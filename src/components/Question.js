import { useState, useEffect } from 'react'
import App from '../App'

function Question({myData, restart}){

  const he = require('he');
  const [score, setScore] = useState(0);
  const [data, setData] = useState([]);
  const [isChecked, setIsChecked] = useState(false)
  const [playAgain, setPlayAgain] = useState(false);

  /* Get the data only once, so when the user select a choice doesn't re-render
  and evetually getting the data again*/  
  useEffect(()=>{
    const proccesedData = myData.results.map(el =>{
      let shuffledAnswers = [...new Set(el.incorrect_answers)];
      const randomIndex = Math.floor(Math.random() * shuffledAnswers.length + 1);
      shuffledAnswers.splice(randomIndex, 0, el.correct_answer);
  
      return {
        ...el, 
        answers: shuffledAnswers, 
        selected: '',
        className: '',
      }
    })
    setData(proccesedData)
  }, [myData])

  function addingSelection(elementIndex, selectedAns){

    setData((prev) =>
      prev.map((item, index) =>
        index === elementIndex ? {...item, selected: selectedAns, className: 'btn-active'} : item
      )
    )
  }

  function checkAnswers(){
    setData(prev =>{
      let myScore = 0;
      const update = prev.map(item =>{
        let updatedItem = {...item}
        if(item.selected === item.correct_answer){
          updatedItem.className = 'correct';
          myScore +=1;
        }else if(item.selected !== item.correct_answer){
          updatedItem.className = 'wrong'
        }
        return updatedItem
      })
      setScore(myScore);
      return update
    }
    )
    setIsChecked(true)
  }

  const elements = data.map((myEl, ind) =>{
    const allAnswers = myEl.answers.map((ans, i) =>{
      let isChecked = myEl.className === 'correct'|| myEl.className === 'wrong' 
      let myClassName = `${myEl.selected !== '' && (myEl.selected === ans && myEl.className) || ((
          isChecked && myEl.correct_answer === ans) && 'correct')}`;
      return (<button
        disabled = {isChecked.toSring}
        key={ans}
        className ={myClassName}
        onClick={() => addingSelection(ind, ans)}>{he.decode(ans)}</button>)
    })

    return <div className='question' key={myEl.answers[0]}>
      <h4>{he.decode(myEl.question)}</h4>
      <div className='question-answers'>
        {allAnswers}
      </div>
    </div>
  })
  
  return  <div className='question-container'>
      { elements}
      { isChecked ?<div className='score'><p>You scored {score}/5 correct answers</p><button className='restart' onClick={restart}>Play Again</button>
      </div> : <button className='check' onClick={checkAnswers}>Check Answers</button>
      } 
  </div> 

}

export default Question
