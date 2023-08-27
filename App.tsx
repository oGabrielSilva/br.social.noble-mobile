import { GlobalContextProvider } from './src/contexts/GlobalContext';
import { LoggedOutRouteHandler } from './src/routes/LoggedOutRouteHandler';

export default function App() {
  return (
    <GlobalContextProvider>
      <LoggedOutRouteHandler />
    </GlobalContextProvider>
  );
}
