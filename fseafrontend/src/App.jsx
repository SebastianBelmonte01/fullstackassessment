import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import AppRoutes from "./routes/AppRoutes";

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <Header />
            <AppRoutes />
            <Footer />
        </BrowserRouter>
    );
}

export default App;
