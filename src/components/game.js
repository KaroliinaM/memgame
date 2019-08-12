import React from 'react'
import axios from 'axios'

class Game extends React.Component {
  constructor(props) {
    super(props)
      this.state = {
        original: '',
        thisWord: null,
        translation: '',
        description: '',
        points: 0,
        total: 0,
        wordList:[],
        newWords:[],
        listOrder:[],
        next: 0,
        check:'',
        savedGuesses:[{id: 1, guess: 2}, {id: 2, guess: 1}],
        scrambled: 1
      }
  }
  componentDidMount() {
    axios
    .get('http://localhost:3001/memorygame')
    .then(response=>{

      console.log(response.data[0].mwords)
      this.setState({savedGuesses: response.data[0].mwords})
    })
    .catch(error => {
      console.log('fail')
    })
  }
  startTranslation=()=> {
      const wlist=this.props.words
      let orderer=[]
      wlist.map(w =>{
        const wo=this.state.savedGuesses.find(g => g.id===w.id)
        if(wo) {
          w.guess= wo.guess
          w.miss = wo.miss
        } else {
          w.guess=0
          w.miss = 0
        }
          orderer.push({order: w.id-1, id: w.id})

      })

      console.log(wlist)

      this.setState({wordList: wlist, listOrder: orderer, original: wlist[0].finnish, thisWord: wlist[0]})
  }
  sortOrder=()=> {
    const wlist=this.state.wordList
    wlist.sort(function (a, b) {
      return a.guess - b.guess;
    })
    let order=0
    let orderer=[]
    wlist.map(word => {
      orderer.push({order: order, id: word.id})
      order=order+1
    })
    console.log('lista')
    console.log(orderer)
    this.setState({listOrder: orderer})
  }
  findWord=(i)=> {
    const index=this.state.listOrder.find(o=>o.order===i)
    const word=this.state.wordList.find(w => w.id===index.id)
    return word
  }
  checkTranslation=(event)=>{
    event.preventDefault()
    const word=this.state.thisWord
    if(word.russian===this.state.translation) {
      console.log('success')
      let guessed={...word}
      guessed.guess=guessed.guess+1
      this.setState({
        wordList: this.state.wordList.map(w => w.id!== word.id? w : guessed ),
        points: this.state.points +1 ,
        check: ''
      })
      console.log(guessed)
    } else {
      console.log('fail')
      this.setState({check: word.finnish + " " + word.russian})
    }
    let newWord
    let n=0
    if(this.state.next<this.state.wordList.length/2 && this.state.scrambled===0) {
      n=this.state.next+1
    } else {
        this.sortOrder()
        this.setState({scrambled: 0})
    }
    newWord=this.findWord(n)

    this.setState({
      original: newWord.finnish,
      thisWord: newWord,
      description: newWord.description,
      translation: "",
      next: n,
      total: this.state.total+1
    })
  }
  changeField=(event)=>{
    this.setState({translation: event.target.value})
  }
  saveProgress=(event)=>{
    if(this.state.wordList.length>0) {
    event.preventDefault()
    const p=[]
    this.state.wordList.map(w=>p.push({id: w.id, guess: w.guess}))
    console.log(p)
    const saving={
      id : 1,
      mwords: p
    }
    axios
    .put('http://localhost:3001/memorygame/1', saving)
    .then(response => {
      console.log('tallennettu')
    })
    }

  }


  render() {
    //console.log(this.state.wordList)




    return (

      <div>
      {console.log(this.state.wordList)}
      <button onClick={this.startTranslation}> aloita</button>
      <button onClick={this.saveProgress}>tallenna</button>

        <form onSubmit={this.checkTranslation}>
        <input readOnly value={this.state.original} />
        <input value={this.state.translation} onChange={this.changeField} />
        <button type='submit'>translate</button>
        </form>
        <p>{this.state.description}</p>
        <p>{this.state.points/this.state.total}  |  {this.state.total} | {this.state.check} </p>

      </div>
    )
  }

}
export default Game
