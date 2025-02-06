import {BrowserRouter as Router} from 'react-router-dom';
import Routes from "./routes/index.jsx";
import "./styles/globals.module.scss";

const App = () => {

    return (
        <Router>
            <div className="app">
                <Routes/>
            </div>
        </Router>
    )
}

export default App;