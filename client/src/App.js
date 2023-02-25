//dépendances
import {BrowserRouter, Routes, Route } from 'react-router-dom';
//layouts
import Header from './layouts/HeaderLayout.js';
import Footer from './layouts/FooterLayout.js';
//pages
import Home from './pages/Home.js';
import Dashboard from './pages/Dashboard.js';
import Login from './pages/Login.js';
import Register from './pages/Register.js';
//assets
import "./assets/styles/App.scss"



function App() {
	return (
		<div className="App">
    		
      		<BrowserRouter >
				<Header />
				<Routes>
					<Route index path="/" element={<Home />} />
					<Route path="/dashboard" element={<Dashboard />} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
				</Routes>
				<Footer />
      		</BrowserRouter>
      		
    	</div>
  	);
}

export default App;
