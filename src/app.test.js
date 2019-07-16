import React from 'react'
import {shallow, mount} from 'enzyme'
import Testi from './components/testi'
import App2 from './app2'
jest.mock('axios')
import axios from 'axios'

/**
sanakirja: listan näyttäminen, filtteröinti
lomake: lomakekenttien toiminta, napin toiminta, lisäys
**/


describe.only('<App />', ()=> {
  const flushPromises = () => new Promise(resolve => setImmediate(resolve));
  it('renders content', async () => {


    const application=mount(<App2 />)
    await flushPromises();
    application.update();
    const nro=application.find('.element')
    //console.log(application.find('Word').debug())
    console.log(nro.at(1).text())
    expect(application.find('.element').length).toEqual(2)

  })
})
