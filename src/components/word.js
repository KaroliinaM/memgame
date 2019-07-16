import React from 'react';

const Word = ({word, language}) => {
  switch(language) {
    case 'finnish' :
      return word.finnish
    case 'russian' :
      return word.russian
    case 'english' :
      return word.english
  }

}

export default Word
