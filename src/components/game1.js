import React from 'react'
import axios from 'axios'

class Game extends React.Component {
  constructor(props) {
    super(props)
      this.state = {
        user: '',
        mwords: [],
        words: [],
        original: '',
        translation: '',
        done: 0,
        next: '',
        points: 0,
        wordList:[]

      }
  }
  componentDidMount () {
    axios
      .get('http://localhost:3001/memorygame')
      .then(response => {

        const tdata=response.data
        console.log(tdata)

        this.setState({
          user: tdata[0].user,
          mwords:tdata[0].mwords
        })
      })
  }
  newWord=()=> {
    if(this.state.done===0){
      if(this.state.next<this.props.words.length-1) {
        this.setState({next: this.state.next+1})
      } else {
        this.setState({next: 0, done:0})
      }
      if(this.state.next===this.props.words.length-1){
        this.setState({original: this.props.words[0].finnish})
      } else {
        this.setState({original: this.props.words[this.state.next+1].finnish})
      }
    }

  }

  startTranslation=(event)=>{
    event.preventDefault()
    let set=[]
    if(this.props.words!=null){
      let sett=0
      if(this.props.words.length>this.state.mwords.length){
        this.setState({next: this.state.mwords.length})
        sett=this.state.mwords.length
        console.log('h')

        for(let i=sett+1; i<=this.props.words.length; i++) {
          console.log(i)
          const noob={id: i, guess: 0}
          set.push(noob)
          console.log(set)
        }
        this.setState({mwords: this.state.mwords.concat(set)})
      }
      else {
        this.setState({next: 0, done: 0})

      }

      this.setState({original: this.props.words[sett].finnish})
      this.setWordList()

    }
  }
  checkTranslation=(event)=>{
    event.preventDefault()
    console.log('hei')
    if(this.state.translation===this.props.words[this.state.next].russian) {
      console.log('success')
      const p=this.state.mwords.filter(w => w.id===this.props.words[this.state.next].id)
      const r={id:p[0].id, guess: p[0].guess+1}

      console.log(p)
      console.log(r)

      this.setState({
        points: this.state.points+1,
        mwords: this.state.mwords.map(word => word.id!==p[0].id ? word : r)
      })
    } else {
      console.log(this.props.words[this.state.next].russian)
    }
    this.setState({translation: ''})
    this.newWord()

  }
  changeField=(event)=> {
    this.setState({translation: event.target.value})
  }
  setWordList=()=> {
    let wlist=[]
    const mw=this.state.mwords
    mw.sort(function (a, b) {
      return a.guess - b.guess;
    })
    let ind=1;
    mw.map(m=> {
      wlist.push({id: ind, word: m.id})
      ind=ind+1
      console.log('ind')
    })
    console.log('sanalista')
    console.log(wlist)
    this.setState({wordList: wlist})

  }


  render() {
    console.log(this.state.mwords.length)
    console.log(this.props.words.length)
    console.log(this.state.original)




    return (

      <div>
      <button onClick={this.startTranslation}> aloita</button>

        <form onSubmit={this.checkTranslation}>
        <input value={this.state.original} />
        <input value={this.state.translation} onChange={this.changeField} />
        <button type='submit'>translate</button>
        </form>
        <p>{this.state.points}</p>
        {console.log(this.state.mwords)}

      </div>
    )
  }

}
export default Game
