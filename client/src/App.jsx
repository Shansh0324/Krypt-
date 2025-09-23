import { Navbar, Welcome, Footer, Services, Transactions } from "./components";
import Notification from "./components/Notification";
import { useContext } from "react";
import { TransactionContext } from "./context/TransactionContext";

const App = () => {
  const { notification } = useContext(TransactionContext);

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