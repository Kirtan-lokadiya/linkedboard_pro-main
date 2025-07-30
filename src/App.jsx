import React from "react";
import Routes from "./Routes";
import { AuthProvider } from "./context/AuthContext";
import AuthModal from "./components/ui/AuthModal";

function App() {
  return (
    <AuthProvider>
      <Routes />
      <AuthModal />
    </AuthProvider>
  );
}

export default App;
