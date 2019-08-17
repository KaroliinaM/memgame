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


describe.only('<App /> is rendered', ()=> {
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
  it('renders form', async () => {
    const application=mount(<App />)
    await flushPromises()
    application.update()
   const controls = application.find('FormControl#field_fi')
   expect(application.exists('FormControl#field_fi')).toEqual(true)
   expect(application.exists('FormControl#field_ru')).toEqual(true)
   expect(application.exists('FormControl#field_description')).toEqual(true)
  })
  it('renders filter field', async () => {
    const application=mount(<App />)
    console.log(application.debug())
    expect(application.exists('input#field_filter'))
  })
})
