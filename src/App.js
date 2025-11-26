import { useState } from "react";
import Intro from "./components/Intro";
import Question from "./components/Question";

function App() {
  // states
  const [data, setData] = useState(null);
  const [isClicked, setIsClicked] = useState(false); 

  async function handleClick() {
    try{
      const url = 'https://opentdb.com/api.php?amount=5&category=9&difficulty=medium&type=multiple'
      const req = await fetch(url);
      const data = await req.json();
      setData(data)
      setIsClicked(!isClicked)
    }catch(err){
      console.error(err)
    }
  }


  return (
    <main className="main-page">
      {isClicked ?  <Question myData={data} restart ={() => setIsClicked(false)} /> : <Intro handleClick={handleClick}/>}
    </main>
  )
}

export default App;
