import { Login } from './components/auth/login/Login'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { createTheme, ThemeProvider } from '@mui/material'
import { CssBaseline } from '@mui/material'
import { Dashboard } from './components/dashboard/Dashboard'
import { Tags } from './components/dashboard/tags/Tags'
import { UserProfile } from './components/profile/UserProfile'
import './styles/app.scss'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import { checkRefreshToken } from './util/checkRefreshToken'

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
      }
    }
  })

  checkRefreshToken()

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/tags/:tag" element={<Tags />} />
            <Route path="/profile/:username" element={<UserProfile />} />
          </Routes>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  )
}

export default App
