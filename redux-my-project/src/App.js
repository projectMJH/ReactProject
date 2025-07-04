import Footer from './components/main/Footer';
import Header from './components/main/Header';
import Home from './components/main/Home';
import {Fragment} from "react";
import {BrowserRouter as Router,Routes,Route} from "react-router";
import store from './store/store';
import {Provider} from 'react-redux';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <Routes >
          <Route path="/" element={<Home />} />

        </Routes>
        <Footer />
      </Router>
    </Provider>
  );
}

export default App;
