import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import TopStories from "./components/TopStories"

const queryClient = new QueryClient;

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <TopStories/>
    </QueryClientProvider>
  )
}

export default App
