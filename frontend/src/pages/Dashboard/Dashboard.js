import { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';

// Importing Others
import Sidebar from '../../components/Sidebar/Sidebar';
import Overview from './Overview';

// Importing Module 2
import StockManagement from './M2_StockManagement/StockManagement';
import AddStock from './M2_StockManagement/AddStock';
import UpdateStock from './M2_StockManagement/UpdateStock';
import StockReplenishment from './M2_StockManagement/StockReplenishment';

// Impoting Module 3
import Products from "./M3_OrderManagement/Products";
import OrderPreview from "./M3_OrderManagement/OrderPreview";
import ConfirmOrder from "./M3_OrderManagement/ConfirmOrder";

// Importing Module 4
import Notifications from './M4_CourierService/Notifications/Notifications';
import CourierService from './M4_CourierService/CourierService';

// Importing Module 5
import SupplyProducts from './M5_Supplier/SupplyProducts';
import SupplierManagement from './M5_Supplier/SupplierManagement';
import SupplyOrders from './M5_Supplier/SupplyOrders';

// Importing Module 6
import Analytics from './M6_Analytics/Analytics';


const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch(`${BACKEND_URL}/auth/profile`, {
        credentials: 'include',
      });
      if (res.ok) {
        const user = await res.json();
        setUser(user);
        localStorage.setItem("user", JSON.stringify(user));
      } else {
        localStorage.removeItem("user");
        navigate("/");
      }
    };

    fetchUser();
  }, [BACKEND_URL, navigate]);

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar */}
        <div className="col-12 col-md-3 col-lg-2 p-0">
          <Sidebar userRole={user?.role} />
        </div>

        {/* Main Content */}
        <div className="col-12 col-md-9 col-lg-10 p-4">
          <Routes>
            {/* Default Route Redirects to Overview */}
            <Route path="/" element={<Navigate to="overview" />} />
            {/* Overview Route */}
            <Route
              path="overview"
              element={
                user?.role === "Inventory Manager" ? (
                  <Analytics />
                ) : (
                  <Overview />
                )
              }
            />

            {/* Couriers Route */}
            {user?.role === "Courier Service" && (
              <Route path="couriers" element={<CourierService user={user} />} />
            )}

            {/* Suppliers Route */}
            {user?.role === "Inventory Manager" && (
              <>
                <Route path="suppliers" element={<SupplierManagement />} />
                <Route path="stock-management" element={<StockManagement user={user} setUser={setUser} />} />
                <Route path="stock-management/addStock" element={<AddStock user={user} setUser={setUser} />} />
                <Route path="stock-management/updateStock/:id" element={<UpdateStock />} />
                <Route path="stock-replenishment" element={<StockReplenishment user={user} />} />
                <Route path="my-orders" element={<SupplyOrders user={user} />} />
              </>
            )}

            {/* Supply Orders Route */}
            {user?.role === "Supplier" && <>
              <Route path="supply-orders" element={<SupplyOrders user={user} />} />
              <Route path="supply-products" element={<SupplyProducts user={user} />} />
            </>}

            {/* Products Route */}
            {user?.role === "Customer" && (
              <>
                <Route path="products" element={<Products user={user} />} />
                <Route path="products/order-preview" element={<OrderPreview />} />
                <Route path="products/confirm-order" element={<ConfirmOrder />} />
                <Route path="notifications" element={<Notifications notifications={user.notifications} />} />
              </>
            )}
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;