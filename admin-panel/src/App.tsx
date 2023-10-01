import { Sidebar } from "components";
import { AuthContextContainer } from "context";
import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";
import { Routes } from "routes";
import "styles/fonts/gotham-book/gotham-book.css";

const App = () => {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Sidebar />
      <AuthContextContainer>
        <Routes />
      </AuthContextContainer>
    </BrowserRouter>
  );
};

export default App;
