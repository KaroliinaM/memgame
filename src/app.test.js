import React from 'react'
import {shallow, mount} from 'enzyme'
import Testi from './components/testi'
import App2 from './app2'
import App from './app'
import Game from './components/game'
jest.mock('axios')
import axios from 'axios'

/**
sanakirja: listan näyttäminen, filtteröinti
lomake: lomakekenttien toiminta, napin toiminta, lisäys
**/


describe.only('<App />', ()=> {
  const flushPromises = () => new Promise(resolve => setImmediate(resolve));
  it('renders content', async () => {
    const application=mount(<App />)
    expect(application).not.toBe(undefined)
  })
  it('renders list items', async () => {
    const application=mount(<App />)
    await flushPromises();
    application.update();
    // const nro=application.find('Word#from')
    // console.log(nro.debug())
    expect(application.find('Word#from').length).toEqual(5)
  })
//   it('renders form', async () => {
//     const application=mount(<App2 />)
//     await flushPromises()
//     application.update()
// //    console.log(application.debug())
//   })
})
