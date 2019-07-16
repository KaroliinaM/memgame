import { words as words } from './db.json';




const word_list = 'http://localhost:3001/words';

module.exports = {
  get: jest.fn((url) => {
    switch (url) {
      case word_list:
        return Promise.resolve({
          data: words
        });
    }
  })

};
