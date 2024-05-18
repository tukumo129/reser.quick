import { QueryClient, QueryClientProvider } from "react-query";
import "./output.css";
import { Route, Routes } from "react-router-dom";
import { routePath } from "./enums/routePath";
import { LoginView } from "./pages/LoginView";
import { TopView } from "./pages/TopView";

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path={routePath.Login} element={<LoginView />} />
          <Route path={routePath.Top} element={<TopView />} />
        </Routes>
      </QueryClientProvider>
    </div>
  );
};

export default App;
