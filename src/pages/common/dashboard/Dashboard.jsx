import React, { useState, useEffect } from 'react';
import { FaUsers, FaBuilding, FaMoneyBillWave, FaChartLine, FaCalendarAlt, FaHandshake } from 'react-icons/fa';
import { BiUserPlus } from 'react-icons/bi';
import { MdInventory } from 'react-icons/md';
import Loader from '../../../components/common/Loader';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalProperties: 0,
    totalLeads: 0,
    totalCustomers: 0,
    totalBookings: 0,
    totalRevenue: 0,
    pendingPayments: 0
  });
  const [recentActivities, setRecentActivities] = useState([]);

  useEffect(() => {
    // Simulate API call
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Mock data
        setStats({
          totalProperties: 156,
          totalLeads: 89,
          totalCustomers: 234,
          totalBookings: 67,
          totalRevenue: 2845000,
          pendingPayments: 12
        });

        setRecentActivities([
          {
            id: 1,
            type: 'booking',
            message: 'New booking received for Property #123',
            time: '2 minutes ago',
            icon: <MdInventory className="text-blue-500" />
          },
          {
            id: 2,
            type: 'lead',
            message: 'Lead qualified: John Doe',
            time: '15 minutes ago',
            icon: <BiUserPlus className="text-green-500" />
          },
          {
            id: 3,
            type: 'payment',
            message: 'Payment received: $25,000',
            time: '1 hour ago',
            icon: <FaMoneyBillWave className="text-green-500" />
          },
          {
            id: 4,
            type: 'customer',
            message: 'New customer registered: Sarah Wilson',
            time: '2 hours ago',
            icon: <FaUsers className="text-purple-500" />
          },
          {
            id: 5,
            type: 'property',
            message: 'Property #456 listed for sale',
            time: '3 hours ago',
            icon: <FaBuilding className="text-orange-500" />
          }
        ]);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const StatCard = ({ title, value, icon, color, change }) => (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {change && (
            <p className={`text-sm mt-1 ${change > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {change > 0 ? '+' : ''}{change}% from last month
            </p>
          )}
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          {icon}
        </div>
      </div>
    </div>
  );

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  if (loading) {
    return <Loader fullScreen text="Loading dashboard..." />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with your real estate business.</p>
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          title="Total Properties"
          value={stats.totalProperties}
          icon={<FaBuilding className="text-white text-xl" />}
          color="bg-blue-500"
          change={12}
        />
        <StatCard
          title="Total Leads"
          value={stats.totalLeads}
          icon={<BiUserPlus className="text-white text-xl" />}
          color="bg-green-500"
          change={8}
        />
        <StatCard
          title="Total Customers"
          value={stats.totalCustomers}
          icon={<FaUsers className="text-white text-xl" />}
          color="bg-purple-500"
          change={15}
        />
        <StatCard
          title="Total Bookings"
          value={stats.totalBookings}
          icon={<MdInventory className="text-white text-xl" />}
          color="bg-orange-500"
          change={-3}
        />
        <StatCard
          title="Total Revenue"
          value={formatCurrency(stats.totalRevenue)}
          icon={<FaMoneyBillWave className="text-white text-xl" />}
          color="bg-green-600"
          change={22}
        />
        <StatCard
          title="Pending Payments"
          value={stats.pendingPayments}
          icon={<FaCalendarAlt className="text-white text-xl" />}
          color="bg-red-500"
          change={-5}
        />
      </div>

      {/* Recent Activities and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activities</h2>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-1">
                  {activity.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900">{activity.message}</p>
                  <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <BiUserPlus className="text-2xl text-blue-500 mb-2" />
              <span className="text-sm font-medium text-gray-900">Add Lead</span>
            </button>
            <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <FaBuilding className="text-2xl text-green-500 mb-2" />
              <span className="text-sm font-medium text-gray-900">Add Property</span>
            </button>
            <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <FaMoneyBillWave className="text-2xl text-purple-500 mb-2" />
              <span className="text-sm font-medium text-gray-900">Record Payment</span>
            </button>
            <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <FaChartLine className="text-2xl text-orange-500 mb-2" />
              <span className="text-sm font-medium text-gray-900">View Reports</span>
            </button>
          </div>
        </div>
      </div>

      {/* Performance Overview */}
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Performance Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">89%</div>
            <div className="text-sm text-gray-600 mt-1">Lead Conversion Rate</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">156</div>
            <div className="text-sm text-gray-600 mt-1">Active Properties</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600">$2.8M</div>
            <div className="text-sm text-gray-600 mt-1">Monthly Revenue</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;