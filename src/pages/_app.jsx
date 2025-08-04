import React from "react";
import { AuthProvider } from "../context/AuthContext";
import AuthModal from "../components/ui/AuthModal";

import "../styles/tailwind.css";
import "../styles/index.css";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
      <AuthModal />
    </AuthProvider>
  );
}

export default MyApp;