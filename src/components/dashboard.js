import React, { useState, useEffect } from 'react';
import { Search, Menu, Bell, Plus, Eye, EyeOff, Filter } from 'lucide-react';
import API from "../services/api";
import axios from 'axios';


const StaffManagementDashboard = () => {
  const [currentView, setCurrentView] = useState('login');
  const [showPassword, setShowPassword] = useState(false);
  const [credentials, setCredentials] = useState({ username: 'Mail', password: '••••••••' });
  const [activeNav, setActiveNav] = useState('Dashboard');

  // Sample data
  const [staffData, setStaffData] = useState([]);

      useEffect(() => {
        API.get("staff/") // Django endpoint for staff
          .then((res) => setStaffData(res.data))
          .catch((err) => console.error(err));
      }, []);

  const [customers, setCustomers] = useState([]);

      useEffect(() => {
        API.get("customers/")
          .then((res) => setCustomers(res.data))
          .catch((err) => console.error(err));
      }, []);

  const managers = [
    { id: 'JAN 203', name: 'Nestal Cruig', phone: '+91 98765 43210', department: 'Support', team: 'Data Care', joinedOn: '29/11/22', email: 'Milancity.West@gmail.com', status: 'Active' },
    { id: 'JAN 202', name: 'Nestal Cruig', phone: '+91 98765 43210', department: 'HR', team: 'Data Entry', joinedOn: '29/11/22', email: 'Zena.N.Allgood@gmail.com', status: 'Active' },
    { id: 'JAN 201', name: 'Nestal Cruig', phone: '+91 98765 43210', department: 'Product Dev', team: 'Dev Team', joinedOn: '29/11/22', email: 'Bridget.Slavin@xyz.com', status: 'Active' },
  ];

  const departments = ['Sales', 'Support', 'Innovative Strategies', 'Creative Solutions'];

  const renderLogin = () => (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="w-full max-w-md p-8">
        <h2 className="text-2xl font-semibold mb-2">Log In</h2>
        <p className="text-gray-600 mb-8">Log in using your username and password.</p>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Username</label>
            <input
              type="text"
              value={credentials.username}
              onChange={(e) => setCredentials({...credentials, username: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Mail"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={credentials.password}
                onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>
          
          {/* <button
            onClick={() => setCurrentView('dashboard')}
            className="w-full bg-blue-900 text-white py-3 rounded-lg hover:bg-blue-800 transition-colors"
          >
            Log In
          </button> */}

          <button
            onClick={async () => {
              try {
                console.log("Sending credentials:", credentials);
                const res = await API.post("token/", {
                  username: credentials.username,
                  password: credentials.password,
                });

                // Save tokens
                localStorage.setItem("access", res.data.access);
                localStorage.setItem("refresh", res.data.refresh);

                setCurrentView("dashboard"); // ✅ Go to dashboard after login
              } catch (err) {
                alert("Invalid username or password ❌");
              }
            }}
            className="w-full bg-blue-900 text-white py-3 rounded-lg hover:bg-blue-800 transition-colors"
          >
            Log In
          </button>




        </div>
      </div>
    </div>
  );

  const renderSidebar = () => (
    <div className="w-64 bg-blue-900 text-white min-h-screen p-4">
      <div className="flex items-center mb-8">
        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center mr-3">
          <div className="w-6 h-6 bg-blue-500 rounded"></div>
        </div>
        <span className="text-xl font-semibold">LOGO</span>
      </div>
      
      <nav className="space-y-2">
        {['Dashboard', 'Managers', 'Staff Management', 'Customers', 'Departments'].map((item) => (
          <button
            key={item}
            onClick={() => {
              setActiveNav(item);
              if (item === 'Dashboard') setCurrentView('dashboard');
              else if (item === 'Staff Management') setCurrentView('staff');
              else if (item === 'Customers') setCurrentView('customers');
              else if (item === 'Departments') setCurrentView('departments');
              else if (item === 'Managers') setCurrentView('managers');
            }}
            className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
              activeNav === item ? 'bg-blue-800 text-white' : 'text-blue-100 hover:bg-blue-800'
            }`}
          >
            <div className="flex items-center">
              <span className="w-2 h-2 bg-current rounded-full mr-3"></span>
              {item}
            </div>
          </button>
        ))}
      </nav>
    </div>
  );

  const renderHeader = (title, showAddButton = false, addButtonText = "Add Staff") => (
    <div className="bg-white p-4 shadow-sm border-b flex justify-between items-center">
      <div className="flex items-center">
        <Menu className="mr-4 text-gray-600" size={20} />
        <h1 className="text-xl font-semibold">{title}</h1>
      </div>
      <div className="flex items-center space-x-4">
        <Search className="text-gray-400" size={20} />
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
          <div>
            <div className="text-sm font-medium">John Mathew</div>
            <div className="text-xs text-gray-500">Admin</div>
          </div>
        </div>
        {showAddButton && (
          <button className="bg-blue-900 text-white px-4 py-2 rounded-lg flex items-center">
            <Plus size={16} className="mr-2" />
            {addButtonText}
          </button>
        )}
      </div>
    </div>
  );

  const renderDashboard = () => (
    <div className="flex-1 bg-gray-50">
      {renderHeader('Dashboard')}
      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-6">Welcome, John Mathew!</h2>
        
        <div className="grid grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Managers', value: '262', subtext: 'Total Managers' },
            { label: 'Staffs', value: '262', subtext: 'Total Staffs' },
            { label: 'Total Customers', value: '262', subtext: 'Total Customers' },
            { label: 'Total Departments', value: '262', subtext: 'Total Departments' }
          ].map((stat, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
              <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.subtext}</div>
            </div>
          ))}
        </div>
        
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-4 border-b">
            <h3 className="font-semibold">Customers</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="text-left p-3 text-sm font-medium">Customer ID</th>
                  <th className="text-left p-3 text-sm font-medium">Name</th>
                  <th className="text-left p-3 text-sm font-medium">Phone</th>
                  <th className="text-left p-3 text-sm font-medium">Gender</th>
                  <th className="text-left p-3 text-sm font-medium">Added On</th>
                  <th className="text-left p-3 text-sm font-medium">Mail</th>
                  <th className="text-left p-3 text-sm font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {customers.slice(0, 4).map((customer, index) => (
                  <tr key={index} className="border-b">
                    <td className="p-3 text-sm">{customer.id}</td>
                    <td className="p-3 text-sm">{customer.name}</td>
                    <td className="p-3 text-sm">{customer.phone}</td>
                    <td className="p-3 text-sm">{customer.gender}</td>
                    <td className="p-3 text-sm">{customer.addedOn}</td>
                    <td className="p-3 text-sm">{customer.email}</td>
                    <td className="p-3">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        customer.status === 'New' ? 'bg-green-100 text-green-800' :
                        customer.status === 'Complete' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {customer.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStaffManagement = () => (
    <div className="flex-1 bg-gray-50">
      {renderHeader('Staff Management', true, 'Add Staff')}
      <div className="p-6">
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-4 border-b flex justify-between items-center">
            <div className="flex justify-end items-center space-x-4 w-full">
              <span>From</span>
              <input type="date" defaultValue="16/11/2022" className="px-3 py-1 border rounded" />
              <span>To</span>
              <input type="date" defaultValue="25/11/2022" className="px-3 py-1 border rounded" />
              <button className="bg-blue-900 text-white px-4 py-2 rounded">Apply</button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="text-left p-3 text-sm font-medium">Username</th>
                  <th className="text-left p-3 text-sm font-medium">Name</th>
                  <th className="text-left p-3 text-sm font-medium">Manager</th>
                  <th className="text-left p-3 text-sm font-medium">Skill</th>
                  <th className="text-left p-3 text-sm font-medium">Phone</th>
                  <th className="text-left p-3 text-sm font-medium">Joined On</th>
                  <th className="text-left p-3 text-sm font-medium">Mail</th>
                  <th className="text-left p-3 text-sm font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {staffData.map((staff, index) => (
                  <tr key={index} className="border-b">
                    <td className="p-3 text-sm">{staff.id}</td>
                    <td className="p-3 text-sm">{staff.name}</td>
                    <td className="p-3 text-sm">{staff.manager}</td>
                    <td className="p-3 text-sm">{staff.skill}</td>
                    <td className="p-3 text-sm">{staff.phone}</td>
                    <td className="p-3 text-sm">{staff.joinedOn}</td>
                    <td className="p-3 text-sm">{staff.email}</td>
                    <td className="p-3">
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                        <span className="text-sm">{staff.status}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDepartments = () => (
    <div className="flex-1 bg-gray-50">
      {renderHeader('Departments', true, 'Add Department')}
      <div className="p-6">
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-4 border-b flex justify-between items-center">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Search..."
                className="pl-4 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          
          <div className="p-6">
            <div className="space-y-4">
              <h3 className="font-medium text-gray-600">Name</h3>
              {departments.map((dept, index) => (
                <div key={index} className="py-2 text-gray-800">{dept}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCustomers = () => (
    <div className="flex-1 bg-gray-50">
      {renderHeader('Customers', true, 'Add Customer')}
      <div className="p-6">
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-4 border-b flex justify-between items-center">
            <div className="flex justify-end items-center space-x-4 w-full">
              <span>From</span>
              <input type="date" defaultValue="16/11/2022" className="px-3 py-1 border rounded" />
              <span>To</span>
              <input type="date" defaultValue="25/11/2022" className="px-3 py-1 border rounded" />
              <button className="bg-blue-900 text-white px-4 py-2 rounded">Apply</button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="text-left p-3 text-sm font-medium">ID</th>
                  <th className="text-left p-3 text-sm font-medium">Name</th>
                  <th className="text-left p-3 text-sm font-medium">Phone</th>
                  <th className="text-left p-3 text-sm font-medium">Gender</th>
                  <th className="text-left p-3 text-sm font-medium">Added On</th>
                  <th className="text-left p-3 text-sm font-medium">Mail</th>
                  <th className="text-left p-3 text-sm font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer, index) => (
                  <tr key={index} className="border-b">
                    <td className="p-3 text-sm">{customer.id}</td>
                    <td className="p-3 text-sm flex items-center">
                      <div className="w-8 h-8 bg-gray-300 rounded-full mr-3"></div>
                      {customer.name}
                    </td>
                    <td className="p-3 text-sm">{customer.phone}</td>
                    <td className="p-3 text-sm flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                      {customer.gender}
                    </td>
                    <td className="p-3 text-sm">{customer.addedOn}</td>
                    <td className="p-3 text-sm">{customer.email}</td>
                    <td className="p-3">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        customer.status === 'New' ? 'bg-green-100 text-green-800' :
                        customer.status === 'Complete' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {customer.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );

  const renderManagers = () => (
    <div className="flex-1 bg-gray-50">
      {renderHeader('Manager', true, 'Add Manager')}
      <div className="p-6">
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-4 border-b flex justify-between items-center">
            <div className="flex justify-end items-center space-x-4 w-full">
              <span>From</span>
              <input type="date" defaultValue="16/11/2022" className="px-3 py-1 border rounded" />
              <span>To</span>
              <input type="date" defaultValue="17/11/2022" className="px-3 py-1 border rounded" />
              <button className="bg-blue-900 text-white px-4 py-2 rounded">Apply</button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="text-left p-3 text-sm font-medium">Username</th>
                  <th className="text-left p-3 text-sm font-medium">Name</th>
                  <th className="text-left p-3 text-sm font-medium">Phone</th>
                  <th className="text-left p-3 text-sm font-medium">Department</th>
                  <th className="text-left p-3 text-sm font-medium">Team</th>
                  <th className="text-left p-3 text-sm font-medium">Joined On</th>
                  <th className="text-left p-3 text-sm font-medium">Mail</th>
                  <th className="text-left p-3 text-sm font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {managers.map((manager, index) => (
                  <tr key={index} className="border-b">
                    <td className="p-3 text-sm">{manager.id}</td>
                    <td className="p-3 text-sm">{manager.name}</td>
                    <td className="p-3 text-sm">{manager.phone}</td>
                    <td className="p-3 text-sm">{manager.department}</td>
                    <td className="p-3 text-sm">{manager.team}</td>
                    <td className="p-3 text-sm">{manager.joinedOn}</td>
                    <td className="p-3 text-sm">{manager.email}</td>
                    <td className="p-3">
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                        <span className="text-sm">{manager.status}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );

  if (currentView === 'login') {
    return renderLogin();
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {renderSidebar()}
      {currentView === 'dashboard' && renderDashboard()}
      {currentView === 'staff' && renderStaffManagement()}
      {currentView === 'departments' && renderDepartments()}
      {currentView === 'customers' && renderCustomers()}
      {currentView === 'managers' && renderManagers()}
    </div>
  );
};

export default StaffManagementDashboard;