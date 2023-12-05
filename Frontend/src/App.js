// App.jsx
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import AdminHeaderComponent from './components/AdminComponents/HeaderComponent';
import AdminFooterComponent from './components/AdminComponents/FooterComponent';
import UserHeaderComponent from './components/UserComponents/UserHeaderComponent';
import UserFooterComponent from './components/UserComponents/UserFooterComponent';
import ListPlanComponent from './components/AdminComponents/ListPlanComponent';
import CreatePlanComponent from './components/AdminComponents/CreatePlanComponent';
import ViewUsersComponent from './components/AdminComponents/ViewUsersComponent';
import AllTravelPlanList from './components/UserComponents/AllTravelPlanList';
import RegisteredTravelPlanList from './components/UserComponents/RegisteredTravelPlanList';
import ViewPlanComponent from './components/UserComponents/ViewPlanComponent';
import UserProfileComponent from './components/UserComponents/UserProfileComponent';
import UserLogin from './components/AuthComponents/UserLogin';
import UserRegistrationComponent from './components/AuthComponents/UserRegistrationComponent';
import AboutUsComponent from './components/AboutUs';
import ContactUsComponent from './components/ContactUs';

function App() {
  const { role } = useAuth();

  const Header = role === 'ROLE_ADMIN' ? AdminHeaderComponent : UserHeaderComponent;
  const Footer = role === 'ROLE_ADMIN' ? AdminFooterComponent : UserFooterComponent;

  return (
    <div className="App">
      <Router>
        <Header />
        <div className="container">
          <Routes>
            <Route path="/user-home" element={<AllTravelPlanList />} />

            {role === 'ROLE_ADMIN' && (
              <>
                <Route path="/admin-home" element={<ListPlanComponent />} />
                <Route path="/add-plan/:id" element={<CreatePlanComponent />} />
                <Route path="/view-users/:id" element={<ViewUsersComponent />} />
              </>
            )}

            {role === 'ROLE_USER' && (
              <>
                <Route path="/user-home" element={<AllTravelPlanList />} />
                <Route path="/registered-plans" element={<RegisteredTravelPlanList />} />
                <Route path="/view-plan/:id" element={<ViewPlanComponent />} />
                <Route path="/user-profile" element={<UserProfileComponent />} />
              </>
            )}
            <Route path="/about" element={<AboutUsComponent />} />
            <Route path="/contact" element={<ContactUsComponent />} />
            <Route path="/login" element={<UserLogin />} />
            <Route path="/register" element={<UserRegistrationComponent />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
