import './App.scss'
import { Login } from './components/auth/Login'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { createTheme, ThemeProvider } from '@mui/material'
import { CssBaseline } from '@mui/material'
import { Dashboard } from './components/dashboard/Dashboard'

import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

function App() {
  const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#311b92'
    },
    secondary: {
      main: '#f77008'
    },
    background: {
      default: '#0b0811'
    },
    error: {
      main: '#ff0049'
    },
    warning: {
      main: '#ffa305'
    },
  }
  })

  return (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
        </Routes>
      </BrowserRouter>
    </div>
  </ThemeProvider>
  )
}

export default App
