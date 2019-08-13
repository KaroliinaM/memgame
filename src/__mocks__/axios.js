import { words as words } from './db.json';
import {memorygame} from './game.json'




const word_list = 'http://localhost:3001/words';
const game_stats = 'http://localhost:3001/memorygame';

module.exports = {
  get: jest.fn((url) => {
    switch (url) {
      case word_list:
        return Promise.resolve({
          data: words
        });
      case game_stats:
        console.log('peli')
        return Promise.resolve({
          data: memorygame
        });
    }
  })

};
