import { useState } from 'react'
import styled from 'styled-components'
import './App.css'
import { Header } from './components/Header'
import { PeopleList } from './components/People'

export const API_URL = "https://localhost:44301/React";

const AppBody = styled.div`
  background: #fff;
  width: 720px;
  border: 3px solid #b48ead;
  box-shadow: #000 0px 0px 40px;
`

function App() {
  return (
    <AppBody>
      <Header/>
      <PeopleList/>
    </AppBody>
  )
}

export default App
