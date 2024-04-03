import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App.jsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { store, persistor } from "./store/redux/Persist.jsx";
import { PersistGate } from "redux-persist/integration/react";
import { SocketProvider } from "./store/redux/slices/SocketContext.jsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient} contextSharing={true}>
          <SocketProvider>
            <App />
          </SocketProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
