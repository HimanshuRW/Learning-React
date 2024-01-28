import './App.css';
import MyPage from "./components/myPage";
import {QueryClientProvider,QueryClient} from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
          <MyPage />
    </QueryClientProvider>
);
}

export default App;
