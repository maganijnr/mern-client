import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import { ChakraBaseProvider, extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  colors: {
    default: {
      100: '#dfe8dc',
      200: '#bfd1b8',
      300: '#9fbb95',
      400: '#7fa471',
      500: '#5f8d4e',
      600: '#4c713e',
      700: '#39552f',
      800: '#26381f',
      900: '#131c10',
    },
  },
})

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <ChakraBaseProvider theme={theme}>
      <Provider store={store}>
        <App />
      </Provider>
    </ChakraBaseProvider>
  </React.StrictMode>,
)
