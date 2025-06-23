import './App.css'
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './theme/ThemeContext';
import { AuthProvider } from './context/AuthContext';
// import AppRoutes from './routes';

import Header from './components/Header/Header';
import Home from './routes/Home';
import PropertyDetails from './routes/PropertyDetails';
import Footer from './components/Footer'
import HouseProvider from './context/HouseContext';
import HouseDetails from './components/PropertyDetails/HouseDetails';
// import Login from './pages/login/Login'
// import Register from './pages/register/Register'
import NewLogin from './pages/login/NewLogin';
import NewRegister from './pages/register/NewRegister';
import Features from './pages/common/Features'
import AboutUs from './pages/common/AboutUs'
import Contact from './pages/common/Contact'
import Dashboard from './pages/common/dashboard/Dashboard';
import UserManagement from './pages/admin/userManagement/UserManagement';
import RoleManagement from './pages/admin/roleManagement/RoleManagement';
import Reports from './pages/admin/Reports';
import LeadManagement from './pages/lead/LeadManagement';
import AddLead from './pages/lead/AddLead';
import ViewLeads from './pages/lead/ViewLeads';
import LeadQualification from './pages/lead/LeadQualification';
import CustomerProfiles from './pages/customers/CustomerProfiles';
import CustomerDocuments from './pages/customers/Documents';
import SiteVisits from './pages/customers/SiteVisits';
import Inventory from './pages/bookings/Inventory';
import BookedUnits from './pages/bookings/BookedUnits';
import PaymentStatus from './pages/bookings/PaymentStatus';
import Installments from './pages/payments/Installments';
import PaymentHistory from './pages/payments/PaymentHistory';
import DuePayments from './pages/payments/DuePayments';
import Referrals from './pages/postSale/Referrals';
import Rewards from './pages/postSale/Rewards';
import Points from './pages/postSale/Points';
import MyBookings from './pages/client/MyBookings';
import ClientDocuments from './pages/client/Documents';
import ClientPayments from './pages/client/Payments';
import ClientReferrals from './pages/client/Referrals';
import PropertyMaster from './pages/property/propertyMaster/PropertyMaster';
import PropertyTypes from './pages/property/propertyTypes/PropertyTypes';
import DashboardLayout from './components/navigation/DashboardLayout';
import Settings from './pages/Settings';

// Sales Management Components
import SalesList from './pages/admin/sales/SalesList';
import AddPayment from './pages/admin/sales/AddPayment';
import PendingPayments from './pages/admin/sales/PendingPayments';
import SalesReports from './pages/admin/sales/SalesReports';
import ThemeDemo from './pages/ThemeDemo';

// Newly Created Pages
import RentRoll from './pages/rent/RentRoll';
import LeaseManagement from './pages/rent/LeaseManagement';
import ExpenseTracking from './pages/admin/accounting/ExpenseTracking';
import IncomeStatement from './pages/admin/accounting/IncomeStatement';
import UserProfile from './pages/profile/UserProfile';

const MainLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

const AuthLayout = ({ children }) => {
  return <div className="min-h-screen">{children}</div>;
};

const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <HouseProvider>
          <Routes>
            {/* Auth Routes */}
            <Route
              path="/login"
              element={
                <AuthLayout>
                  <NewLogin />
                </AuthLayout>
              }
            />
            <Route
              path="/register"
              element={
                <AuthLayout>
                  <NewRegister />
                </AuthLayout>
              }
            />

            {/* Main Routes */}
            <Route path="/" element={<MainLayout><Home /></MainLayout>} />
            <Route path="/features" element={<MainLayout><Features /></MainLayout>} />
            <Route path="/about" element={<MainLayout><AboutUs /></MainLayout>} />
            <Route path="/contact" element={<MainLayout><Contact /></MainLayout>} />
            <Route path="/property-details" element={<MainLayout><PropertyDetails /></MainLayout>} />
            
            {/* Dashboard Route */}
            <Route path="/dashboard" element={<DashboardLayout><Dashboard /></DashboardLayout>} />
              
            {/* Admin Routes */}
            <Route path='/admin/user-management' element={<DashboardLayout><UserManagement /></DashboardLayout>} />
            <Route path='/admin/role-management' element={<DashboardLayout><RoleManagement /></DashboardLayout>} />
            <Route path='/admin/reports' element={<DashboardLayout><Reports /></DashboardLayout>} />
            
            {/* Property Routes */}
            <Route path='/property/property-master' element={<DashboardLayout><PropertyMaster /></DashboardLayout>} />
            <Route path='/property/property-types' element={<DashboardLayout><PropertyTypes /></DashboardLayout>} />
            
            {/* Lead Management Routes */}
            <Route path='/lead/add' element={<DashboardLayout><AddLead /></DashboardLayout>} />
            <Route path='/lead/view' element={<DashboardLayout><ViewLeads /></DashboardLayout>} />
            <Route path='/lead/qualification' element={<DashboardLayout><LeadQualification /></DashboardLayout>} />
            
            {/* Customer Management Routes */}
            <Route path='/customers/profiles' element={<DashboardLayout><CustomerProfiles /></DashboardLayout>} />
            <Route path='/customers/documents' element={<DashboardLayout><CustomerDocuments /></DashboardLayout>} />
            <Route path='/customers/site-visits' element={<DashboardLayout><SiteVisits /></DashboardLayout>} />
            
            {/* Sales Management Routes */}
            <Route path='/sales/sales-list' element={<DashboardLayout><SalesList /></DashboardLayout>} />
            <Route path='/sales/add-payment' element={<DashboardLayout><AddPayment /></DashboardLayout>} />
            <Route path='/sales/pending-payments' element={<DashboardLayout><PendingPayments /></DashboardLayout>} />
            <Route path='/sales/sales-reports' element={<DashboardLayout><SalesReports /></DashboardLayout>} />
            
            {/* Bookings Routes */}
            <Route path='/bookings/inventory' element={<DashboardLayout><Inventory /></DashboardLayout>} />
            <Route path='/bookings/booked-units' element={<DashboardLayout><BookedUnits /></DashboardLayout>} />
            <Route path='/bookings/payment-status' element={<DashboardLayout><PaymentStatus /></DashboardLayout>} />
            
            {/* Payments Routes */}
            <Route path='/payments/installments' element={<DashboardLayout><Installments /></DashboardLayout>} />
            <Route path='/payments/payment-history' element={<DashboardLayout><PaymentHistory /></DashboardLayout>} />
            <Route path='/payments/due-payments' element={<DashboardLayout><DuePayments /></DashboardLayout>} />
            
            {/* Rent Management Routes */}
            <Route path='/rent/rent-roll' element={<DashboardLayout><RentRoll /></DashboardLayout>} />
            <Route path='/rent/lease-management' element={<DashboardLayout><LeaseManagement /></DashboardLayout>} />

            {/* Accounting Routes */}
            <Route path='/accounting/expense-tracking' element={<DashboardLayout><ExpenseTracking /></DashboardLayout>} />
            <Route path='/accounting/income-statement' element={<DashboardLayout><IncomeStatement /></DashboardLayout>} />
            
            {/* Post-Sale Routes */}
            <Route path='/post-sale/referrals' element={<DashboardLayout><Referrals /></DashboardLayout>} />
            <Route path='/post-sale/rewards' element={<DashboardLayout><Rewards /></DashboardLayout>} />
            <Route path='/post-sale/points' element={<DashboardLayout><Points /></DashboardLayout>} />
            
            {/* Client Portal Routes */}
            <Route path='/client/my-bookings' element={<DashboardLayout><MyBookings /></DashboardLayout>} />
            <Route path='/client/documents' element={<DashboardLayout><ClientDocuments /></DashboardLayout>} />
            <Route path='/client/payments' element={<DashboardLayout><ClientPayments /></DashboardLayout>} />
            <Route path='/client/referrals' element={<DashboardLayout><ClientReferrals /></DashboardLayout>} />
            
            {/* Settings Route */}
            <Route path='/settings' element={<DashboardLayout><Settings /></DashboardLayout>} />
            
            {/* Profile Route */}
            <Route path='/profile' element={<DashboardLayout><UserProfile /></DashboardLayout>} />

            {/* Theme Demo Route */}
            <Route path='/theme-demo' element={<DashboardLayout><ThemeDemo /></DashboardLayout>} />
            
            <Route path="*" element={<DashboardLayout><main style={{ padding: "1rem" }}><p>There's nothing here!</p></main></DashboardLayout>} />
          </Routes>
        </HouseProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;