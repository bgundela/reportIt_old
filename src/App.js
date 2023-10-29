import { Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import ReportingPage from './pages/ReportingPage';
import Layout from './pages/Layout';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ViewPostsPage from './pages/ViewPostsPage';
import { UserContextProvider } from './context/UserContext';
import { CityContextProvider } from './context/CityContext';

function App() {
  return (
    <CityContextProvider>
      <UserContextProvider>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<ReportingPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/viewPosts' element={<ViewPostsPage />} />
          </Route>
        </Routes>
      </UserContextProvider>
    </CityContextProvider>
  );
}

export default App;
