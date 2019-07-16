import React from 'react';
import ReactDOM from 'react-dom';
import Word from './components/word'
import Testi from './components/testi'
import Game from './components/game'
import axios from 'axios'


class App2 extends React.Component {
  constructor() {
    super()
    this.state = {
      words: [],
      filter: '',
      translateFrom: 'finnish',
      translateTo: 'russian',
      finnish: '',
      english: '',
      russian: '',
      description: '',
      game: 0
    }
  }
  componentDidMount () {
    axios
      .get('http://localhost:3001/words')
      .then(response => {
        this.setState({words:response.data})
      })
  }
  addWord = (event) => {
    event.preventDefault()
    const wordObject = {
      finnish: this.state.finnish,
      english: this.state.english,
      russian: this.state.russian,
      description: this.state.description,
      id: this.state.words.length +1
    }
    axios
      .post('http://localhost:3001/words', wordObject)
      .then(response => {
        this.setState({
          words:this.state.words.concat(wordObject),
          finnish: '',
          russian: '',
          english: '',
          description: ''
        })
      })
  }
  handleFieldChange = (event) => {
    console.log('hei')
    this.setState({[event.target.name]:event.target.value})
  }



  render() {
    return (
      <div>
      <div>
      <form onSubmit={this.addWord}>
        russian <input value={this.state.russian} onChange={this.handleFieldChange} name="russian" className="russianInput" /><br />
        finnish <input value={this.state.finnish} onChange={this.handleFieldChange} name="finnish" className="finnishInput" /><br />
        english <input value={this.state.english} onChange={this.handleFieldChange} name="english" className="englishInput" /><br />
        description <input value={this.state.description} onChange={this.handleFieldChange} name="description" /><br />
        <button type="submit">insert word</button>
      </form>
      </div>
        <div className="content">
        <table>
          <tbody>
            {this.state.words.map(word => <tr className="element" key={word.id}><td><Word word={word} language={this.state.translateFrom} /></td><td><Word word={word} language={this.state.translateTo} /></td></tr>)}
          </tbody>
        </table>

        </div>
      </div>
    )
  }
}

export default App2
