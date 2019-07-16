import React from 'react';
import ReactDOM from 'react-dom';
import Word from './components/word'
import Testi from './components/testi'
import Game from './components/game'
import { Table, Form, Button } from 'react-bootstrap'
import axios from 'axios'


class App extends React.Component {
  constructor() {
    super()
    this.state = {
      words: [],
      filter: '',
      translateFrom: 'finnish',
      translateTo: 'russian',
      finnish: '',
      russian: '',
      description: '',
      game: 0,
      modifyId: null,
      notification: ''
    }
  }
  componentDidMount () {
    axios
      .get('http://localhost:3001/words')
      .then(response => {
        this.setState({words:response.data})
      })
  }
  handleChange = (event) => {
    console.log(event.target.value)
    this.setState({filter:event.target.value})
  }
  filterWords =()=> {
    switch(this.state.translateFrom) {
      case 'finnish' :
        return this.state.words.filter(word=>word.finnish.includes(this.state.filter)===true)
      case 'russian' :
        return this.state.words.filter(word=>word.russian.includes(this.state.filter)===true)
      default :
        return this.state.words
    }
  }
  switchLanguage = () => {
    console.log('switch')
    const tmp1=this.state.translateTo
    const tmp2=this.state.translateFrom
    this.setState({translateTo: tmp2})
    this.setState({translateFrom: tmp1})
  }
  addWord = (event) => {
    event.preventDefault()
    const id=this.state.modifyId===null ? this.state.words.length +1 : this.state.modifyId
    const wordObject = {
      finnish: this.state.finnish,
      russian: this.state.russian,
      description: this.state.description,
      id: id
    }
    if(!this.state.modifyId) {
      if(this.state.words.filter(word => word.finnish ===this.state.finnish || word.russian ===this.state.russian)) {
        this.setState({notification: 'word exists'})
        setTimeout(() => this.setState({notification: ''}), 5000)
      }
      axios
        .post('http://localhost:3001/words', wordObject)
        .then(response => {
          this.setState({
            words:this.state.words.concat(wordObject),
            finnish: '',
            russian: '',
            description: ''
          })
        })
    } else {
      axios
        .put(`http://localhost:3001/words/${id}`, wordObject)
        .then(response => {
          this.setState({
            words:this.state.words.map(word => word.id !== id ? word : wordObject),
            finnish: '',
            russian: '',
            description: '',
            modifyId: null
          })
        })
    }
  }

  handleFieldChange = (event) => {
    console.log('hei')
    this.setState({[event.target.name]:event.target.value})
  }
  gameSwitch=(event)=> {
    event.preventDefault()
    console.log('switched')
    const val=this.state.game===0 ? 1 : 0
    this.setState({game: val})
  }
  modifyWord = (word) => {
    return () => {
      this.setState({
        finnish: word.finnish,
        russian: word.russian,
        description: word.description,
        modifyId: word.id
      })
    }
  }



  render() {
    const shownWords= this.filterWords()
    const buttonText = this.state.game===0 ? 'show game' : 'show dictionary'
    const testiSana={finnish: 'testi', english:'test'}
    return (
      <div className="container">
        <div>
        <Testi word={testiSana} />
        <p><button onClick={this.gameSwitch}>{buttonText}</button></p>
        </div>
          <div>
          <p>{this.state.notification}</p>
          <Form onSubmit={this.addWord}>
          <Form.Group>
            <Form.Label>russian</Form.Label>
            <Form.Control value={this.state.russian} onChange={this.handleFieldChange} name="russian" />
            <Form.Label>finnish</Form.Label>
            <Form.Control value={this.state.finnish} onChange={this.handleFieldChange} name="finnish" />
            <Form.Label>description</Form.Label>
            <Form.Control value={this.state.description} onChange={this.handleFieldChange} name="description" />
            <Button type="submit">insert word</Button>
          </Form.Group>
          </Form>
          <p>finnish
          <button onClick={this.switchLanguage}> language change </button>
           russian</p>
        <input value={this.state.filter} onChange={this.handleChange} />
        <Table striped>
          <tbody>
            {shownWords.map(word => <tr key={word.id}><td><Word word={word} language={this.state.translateFrom} /></td><td><Word word={word} language={this.state.translateTo} /></td><td>{word.description}</td><td><button onClick={this.modifyWord(word)}>modify</button></td></tr>)}
          </tbody>
        </Table>
        <br />
        </div>


        <div>
        <Game words={shownWords} />
        </div>
      </div>
    )
  }
}

export default App
