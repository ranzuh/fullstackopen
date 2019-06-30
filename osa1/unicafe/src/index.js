import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistics = ({ hyva, neutraali, huono, summa, keskiarvo, positiivisia }) => {
  let yhteensa = hyva + neutraali + huono

  if(yhteensa === 0) {
    return <div>Ei yhtään palautetta annettu</div>
  }

  return (
    <table>
      <tbody>
        <Statistic text="hyva" value={hyva} />
        <Statistic text="neutraali" value={neutraali} />
        <Statistic text="huono" value={huono} />
        <Statistic text="summa" value={summa()} />
        <Statistic text="keskiarvo" value={keskiarvo()} />
        <Statistic text="positiivisia" value={positiivisia()} />
      </tbody>
    </table>

  )
}

const Statistic = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Button = ({ text, handleClick }) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [hyva, setHyva] = useState(0)
  const [neutraali, setNeutraali] = useState(0)
  const [huono, setHuono] = useState(0)

  const hyvaClick = () => setHyva(hyva + 1)
  
  const neutraaliClick = () => setNeutraali(neutraali + 1)
  
  const huonoClick = () => setHuono(huono + 1)
  
  const summa = () => hyva + neutraali + huono
  
  const keskiarvo = () => {
    let summa = hyva + neutraali + huono
    
    if(summa === 0) {
      return 0
    }
    
    return (huono * -1 + hyva) / summa
  }
  
  const positiivisia = () => {
    let summa = hyva + neutraali + huono

    if(summa === 0) {
      return 0 + " %"
    }

    return (hyva / summa) * 100 + " %"
  }
  
  return (
    <div>
      <h1>Anna palautetta</h1>
      <Button text="hyvä" handleClick={hyvaClick} />
      <Button text="neutraali" handleClick={neutraaliClick} />
      <Button text="huono" handleClick={huonoClick} />

      <h1>Statistiikka</h1>
      <Statistics 
        hyva={hyva}
        neutraali={neutraali}
        huono={huono}
        summa={summa}
        keskiarvo={keskiarvo}
        positiivisia={positiivisia}
      />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)