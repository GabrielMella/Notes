import { RouteList } from './routes/routes';
import Navbar from './components/NavBar';
import Footer from './components/Footer';
import PageContainer from './components/Layout';

function App() {
  return (
      <PageContainer>       
        <RouteList />
      </PageContainer>
  );
}

export default App;
