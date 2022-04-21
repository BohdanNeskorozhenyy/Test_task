import './App.css';
import SongsComponent from '../SongsComponents/SongsComponent'
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'



const queryClient = new QueryClient()

function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <SongsComponent />
      </QueryClientProvider>
    </div>
  );
}

export default App;
