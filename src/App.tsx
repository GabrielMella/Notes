import './App.css'
import { RouteList } from './routes/routes'
import { ChakraProvider, Container, Card } from '@chakra-ui/react'


function App() {
  return (
    <ChakraProvider>
      
    
          <div className='p-4'>
            <header>
              <h1>Titulo do Site</h1>
            </header>
            
            <hr />

            <div className='py-4'>
              
              <RouteList />
              
            
            </div>

            <hr />

            <footer>
              Todos os direitos reservados.
            </footer>
          </div>
  

    </ChakraProvider>
  )
}

export default App
