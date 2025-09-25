import { Navbar, Welcome, Footer, Services, Transactions } from "./components";
import Notification from "./components/Notification";
import { useContext } from "react";
import { TransactionContext } from "./context/TransactionContext";
import { useMobileZoomFix, useViewportReset } from "./hooks/useMobileZoomFix";

const App = () => {
  const { notification } = useContext(TransactionContext);
  
  // Apply mobile zoom fixes
  useMobileZoomFix();
  useViewportReset();

  return (
    <div className="min-h-screen">
      <Notification notification={notification} />
      <div className="gradient-bg-welcome">
        <Navbar />
        <Welcome />
      </div>
      <Services />
      <Transactions />
      <Footer />
    </div>
  );
};

export default App;