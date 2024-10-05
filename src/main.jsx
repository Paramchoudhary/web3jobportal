import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import store from "./redux/store";
import { Provider } from "react-redux";

import { GoogleOAuthProvider } from "@react-oauth/google";

// wallet connect
import "@rainbow-me/rainbowkit/styles.css";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { config } from "./utils/wagmi.js";

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOGGLE_CLIENT_ID}>
      <Provider store={store}>
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            <RainbowKitProvider>
              <App />
            </RainbowKitProvider>
          </QueryClientProvider>
        </WagmiProvider>
      </Provider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
