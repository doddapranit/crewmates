import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { createClient } from '@supabase/supabase-js';
import HomePage from './components/HomePage';
import NewCrewmatePage from './components/NewCrewmatePage';
import CrewmatePage from './components/CrewmatePage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const supabase = createClient('https://odulradenujvtqndhfxp.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9kdWxyYWRlbnVqdnRxbmRoZnhwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODExNDk4MDcsImV4cCI6MTk5NjcyNTgwN30.2NejGmYaQFcYySsBbQCIkmcF9roVnIaCzBvDP04HAR4');

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/new-crewmate" element={<NewCrewmatePage />} />
          <Route path="/crewmate/:id" element={<CrewmatePage />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
