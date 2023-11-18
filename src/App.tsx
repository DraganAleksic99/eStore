import './App.css'
import { store } from './store'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { AppRoutes } from './shop/routes'

function App() {
  return (
    <div className="app">
      <Provider store={store}>
        <Router>
          <AppRoutes />
        </Router>
      </Provider>
    </div>
  )
}

export default App
