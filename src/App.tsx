import './App.css'
import { store } from './store'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from "react-router-dom"
import { AppRoutes } from './shop/routes'

function App() {
  return (
    <Provider store={store}>
      <Router>
        <AppRoutes /> 
      </Router>
    </Provider>
  );
}

export default App
