// import React, { useState, useEffect } from 'react';
// import { Search, Menu, Bell, Plus, Eye, EyeOff, Filter } from 'lucide-react';
// import API from "../services/api";
// import axios from 'axios';

// const StaffManagementDashboard = () => {
//   const [currentView, setCurrentView] = useState('login');
//   const [showPassword, setShowPassword] = useState(false);
//   const [credentials, setCredentials] = useState({ username: 'Mail', password: '••••••••' });
//   const [activeNav, setActiveNav] = useState('Dashboard');
//   // Sample data
//   const [staffData, setStaffData] = useState([]);
//       useEffect(() => {
//         API.get("staff/") // Django endpoint for staff
//           .then((res) => setStaffData(res.data))
//           .catch((err) => console.error(err));
//       }, []);
//   const [customers, setCustomers] = useState([]);
//       useEffect(() => {
//         API.get("customers/")
//           .then((res) => setCustomers(res.data))
//           .catch((err) => console.error(err));
//       }, []);
//   const managers = [
//     { id: 'JAN 203', name: 'Nestal Cruig', phone: '+91 98765 43210', department: 'Support', team: 'Data Care', joinedOn: '29/11/22', email: 'Milancity.West@gmail.com', status: 'Active' },
//     { id: 'JAN 202', name: 'Nestal Cruig', phone: '+91 98765 43210', department: 'HR', team: 'Data Entry', joinedOn: '29/11/22', email: 'Zena.N.Allgood@gmail.com', status: 'Active' },
//     { id: 'JAN 201', name: 'Nestal Cruig', phone: '+91 98765 43210', department: 'Product Dev', team: 'Dev Team', joinedOn: '29/11/22', email: 'Bridget.Slavin@xyz.com', status: 'Active' },
//   ];
//   const departments = ['Sales', 'Support', 'Innovative Strategies', 'Creative Solutions'];
  
//   // Add Staff Form State
//   const [showAddStaffForm, setShowAddStaffForm] = useState(false);
//   const [newStaff, setNewStaff] = useState({
//     fullName: '',
//     phone: '',
//     mail: '',
//     skills: '',
//     manager: ''
//   });
  
//   // Add Manager Form State
//   const [showAddManagerForm, setShowAddManagerForm] = useState(false);
//   const [newManager, setNewManager] = useState({
//     fullName: '',
//     phone: '',
//     mail: '',
//     department: '',
//     team: ''
//   });
  
//   // Add Customer Form State
//   const [showAddCustomerForm, setShowAddCustomerForm] = useState(false);
//   const [newCustomer, setNewCustomer] = useState({
//     fullName: '',
//     gender: '',
//     phone: '',
//     mail: '',
//     dateOfBirth: '',
//     profilePicture: null
//   });
  
//   // Add Department Form State
//   const [showAddDepartmentForm, setShowAddDepartmentForm] = useState(false);
//   const [newDepartment, setNewDepartment] = useState({
//     departmentName: ''
//   });

//   const renderLogin = () => (
//     <div className="min-h-screen bg-white flex items-center justify-center">
//       <div className="w-full max-w-md p-8">
//         <h2 className="text-2xl font-semibold mb-2">Log In</h2>
//         <p className="text-gray-600 mb-8">Log in using your username and password.</p>
        
//         <div className="space-y-6">
//           <div>
//             <label className="block text-sm font-medium mb-2">Username</label>
//             <input
//               type="text"
//               value={credentials.username}
//               onChange={(e) => setCredentials({...credentials, username: e.target.value})}
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Mail"
//             />
//           </div>
          
//           <div>
//             <label className="block text-sm font-medium mb-2">Password</label>
//             <div className="relative">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 value={credentials.password}
//                 onChange={(e) => setCredentials({...credentials, password: e.target.value})}
//                 className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute right-3 top-1/2 transform -translate-y-1/2"
//               >
//                 {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
//               </button>
//             </div>
//           </div>
          
//           <button
//             onClick={async () => {
//               try {
//                 console.log("Sending credentials:", credentials);
//                 const res = await API.post("token/", {
//                   username: credentials.username,
//                   password: credentials.password,
//                 });
//                 // Save tokens
//                 localStorage.setItem("access", res.data.access);
//                 localStorage.setItem("refresh", res.data.refresh);
//                 setCurrentView("dashboard"); // ✅ Go to dashboard after login
//               } catch (err) {
//                 alert("Invalid username or password ❌");
//               }
//             }}
//             className="w-full bg-blue-900 text-white py-3 rounded-lg hover:bg-blue-800 transition-colors"
//           >
//             Log In
//           </button>
//         </div>
//       </div>
//     </div>
//   );
  
//   const renderSidebar = () => (
//     <div className="w-64 bg-blue-900 text-white min-h-screen p-4">
//       <div className="flex items-center mb-8">
//         <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center mr-3">
//           <div className="w-6 h-6 bg-blue-500 rounded"></div>
//         </div>
//         <span className="text-xl font-semibold">LOGO</span>
//       </div>
      
//       <nav className="space-y-2">
//         {['Dashboard', 'Managers', 'Staff Management', 'Customers', 'Departments'].map((item) => (
//           <button
//             key={item}
//             onClick={() => {
//               setActiveNav(item);
//               if (item === 'Dashboard') setCurrentView('dashboard');
//               else if (item === 'Staff Management') setCurrentView('staff');
//               else if (item === 'Customers') setCurrentView('customers');
//               else if (item === 'Departments') setCurrentView('departments');
//               else if (item === 'Managers') setCurrentView('managers');
//             }}
//             className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
//               activeNav === item ? 'bg-blue-800 text-white' : 'text-blue-100 hover:bg-blue-800'
//             }`}
//           >
//             <div className="flex items-center">
//               <span className="w-2 h-2 bg-current rounded-full mr-3"></span>
//               {item}
//             </div>
//           </button>
//         ))}
//       </nav>
//     </div>
//   );
  
//   const renderHeader = (title, showAddButton = false, addButtonText = "Add Staff", onAddClick = null) => (
//     <div className="bg-white p-4 shadow-sm border-b flex justify-between items-center">
//       <div className="flex items-center">
//         <Menu className="mr-4 text-gray-600" size={20} />
//         <h1 className="text-xl font-semibold">{title}</h1>
//       </div>
//       <div className="flex items-center space-x-4">
//         <Search className="text-gray-400" size={20} />
//         <div className="flex items-center space-x-2">
//           <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
//           <div>
//             <div className="text-sm font-medium">John Mathew</div>
//             <div className="text-xs text-gray-500">Admin</div>
//           </div>
//         </div>
//         {showAddButton && (
//           <button 
//             onClick={onAddClick || (() => {})}
//             className="bg-blue-900 text-white px-4 py-2 rounded-lg flex items-center"
//           >
//             <Plus size={16} className="mr-2" />
//             {addButtonText}
//           </button>
//         )}
//       </div>
//     </div>
//   );
  
//   const renderAddStaffForm = () => (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
//         <h2 className="text-xl font-semibold mb-6">Add Staff</h2>
        
//         <div className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium mb-1">Full Name</label>
//             <input
//               type="text"
//               value={newStaff.fullName}
//               onChange={(e) => setNewStaff({...newStaff, fullName: e.target.value})}
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Enter full name"
//             />
//           </div>
          
//           <div>
//             <label className="block text-sm font-medium mb-1">Phone</label>
//             <div className="flex">
//               <div className="flex items-center px-3 py-2 border border-r-0 border-gray-300 rounded-l-lg bg-gray-50">
//                 <span className="mr-2">🇮🇳</span>
//                 <span>+91</span>
//               </div>
//               <input
//                 type="text"
//                 value={newStaff.phone}
//                 onChange={(e) => setNewStaff({...newStaff, phone: e.target.value})}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="Enter phone number"
//               />
//             </div>
//           </div>
          
//           <div>
//             <label className="block text-sm font-medium mb-1">Mail</label>
//             <input
//               type="email"
//               value={newStaff.mail}
//               onChange={(e) => setNewStaff({...newStaff, mail: e.target.value})}
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Enter email address"
//             />
//           </div>
          
//           <div>
//             <label className="block text-sm font-medium mb-1">Skills</label>
//             <input
//               type="text"
//               value={newStaff.skills}
//               onChange={(e) => setNewStaff({...newStaff, skills: e.target.value})}
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Enter skills"
//             />
//           </div>
          
//           <div>
//             <label className="block text-sm font-medium mb-1">Manager</label>
//             <select
//               value={newStaff.manager}
//               onChange={(e) => setNewStaff({...newStaff, manager: e.target.value})}
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               <option value="">Select a manager</option>
//               {managers.map((manager) => (
//                 <option key={manager.id} value={manager.id}>
//                   {manager.name}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>
        
//         <div className="flex justify-end space-x-3 mt-6">
//           <button
//             onClick={() => setShowAddStaffForm(false)}
//             className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={() => {
//               // Here you would typically submit the form data to your API
//               console.log("New staff data:", newStaff);
//               // Reset form and close modal
//               setNewStaff({
//                 fullName: '',
//                 phone: '',
//                 mail: '',
//                 skills: '',
//                 manager: ''
//               });
//               setShowAddStaffForm(false);
//             }}
//             className="px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800"
//           >
//             Submit
//           </button>
//         </div>
//       </div>
//     </div>
//   );
  
//   const renderAddManagerForm = () => (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
//         <h2 className="text-xl font-semibold mb-6">Add Manager</h2>
        
//         <div className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium mb-1">Full Name</label>
//             <input
//               type="text"
//               value={newManager.fullName}
//               onChange={(e) => setNewManager({...newManager, fullName: e.target.value})}
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Enter full name"
//             />
//           </div>
          
//           <div>
//             <label className="block text-sm font-medium mb-1">Phone</label>
//             <div className="flex">
//               <div className="flex items-center px-3 py-2 border border-r-0 border-gray-300 rounded-l-lg bg-gray-50">
//                 <span className="mr-2">🇮🇳</span>
//                 <span>+91</span>
//               </div>
//               <input
//                 type="text"
//                 value={newManager.phone}
//                 onChange={(e) => setNewManager({...newManager, phone: e.target.value})}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="Enter phone number"
//               />
//             </div>
//           </div>
          
//           <div>
//             <label className="block text-sm font-medium mb-1">Mail</label>
//             <input
//               type="email"
//               value={newManager.mail}
//               onChange={(e) => setNewManager({...newManager, mail: e.target.value})}
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Enter email address"
//             />
//           </div>
          
//           <div>
//             <label className="block text-sm font-medium mb-1">Department</label>
//             <select
//               value={newManager.department}
//               onChange={(e) => setNewManager({...newManager, department: e.target.value})}
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               <option value="">Select a department</option>
//               {departments.map((dept, index) => (
//                 <option key={index} value={dept}>
//                   {dept}
//                 </option>
//               ))}
//             </select>
//           </div>
          
//           <div>
//             <label className="block text-sm font-medium mb-1">Team</label>
//             <input
//               type="text"
//               value={newManager.team}
//               onChange={(e) => setNewManager({...newManager, team: e.target.value})}
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Enter team name"
//             />
//           </div>
//         </div>
        
//         <div className="flex justify-end space-x-3 mt-6">
//           <button
//             onClick={() => setShowAddManagerForm(false)}
//             className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={() => {
//               // Here you would typically submit the form data to your API
//               console.log("New manager data:", newManager);
//               // Reset form and close modal
//               setNewManager({
//                 fullName: '',
//                 phone: '',
//                 mail: '',
//                 department: '',
//                 team: ''
//               });
//               setShowAddManagerForm(false);
//             }}
//             className="px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800"
//           >
//             Submit
//           </button>
//         </div>
//       </div>
//     </div>
//   );
  
//   const renderAddCustomerForm = () => (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
//         <h2 className="text-xl font-semibold mb-6">Add Customer</h2>
        
//         <div className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium mb-1">Full Name</label>
//             <input
//               type="text"
//               value={newCustomer.fullName}
//               onChange={(e) => setNewCustomer({...newCustomer, fullName: e.target.value})}
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Enter full name"
//             />
//           </div>
          
//           <div>
//             <label className="block text-sm font-medium mb-1">Gender</label>
//             <input
//               type="text"
//               value={newCustomer.gender}
//               onChange={(e) => setNewCustomer({...newCustomer, gender: e.target.value})}
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Enter gender"
//             />
//           </div>
          
//           <div>
//             <label className="block text-sm font-medium mb-1">Phone</label>
//             <div className="flex">
//               <div className="flex items-center px-3 py-2 border border-r-0 border-gray-300 rounded-l-lg bg-gray-50">
//                 <span className="mr-2">🇮🇳</span>
//                 <span>+91</span>
//               </div>
//               <input
//                 type="text"
//                 value={newCustomer.phone}
//                 onChange={(e) => setNewCustomer({...newCustomer, phone: e.target.value})}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="Enter phone number"
//               />
//             </div>
//           </div>
          
//           <div>
//             <label className="block text-sm font-medium mb-1">Mail</label>
//             <input
//               type="email"
//               value={newCustomer.mail}
//               onChange={(e) => setNewCustomer({...newCustomer, mail: e.target.value})}
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Enter email address"
//             />
//           </div>
          
//           <div>
//             <label className="block text-sm font-medium mb-1">Date of Birth</label>
//             <input
//               type="date"
//               value={newCustomer.dateOfBirth}
//               onChange={(e) => setNewCustomer({...newCustomer, dateOfBirth: e.target.value})}
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
          
//           <div>
//             <label className="block text-sm font-medium mb-1">Upload Profile Picture</label>
//             <div className="flex items-center">
//               <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">
//                 Choose File
//               </button>
//               <span className="ml-3 text-sm text-gray-500">No file chosen</span>
//             </div>
//           </div>
//         </div>
        
//         <div className="flex justify-end space-x-3 mt-6">
//           <button
//             onClick={() => setShowAddCustomerForm(false)}
//             className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={() => {
//               // Here you would typically submit the form data to your API
//               console.log("New customer data:", newCustomer);
//               // Reset form and close modal
//               setNewCustomer({
//                 fullName: '',
//                 gender: '',
//                 phone: '',
//                 mail: '',
//                 dateOfBirth: '',
//                 profilePicture: null
//               });
//               setShowAddCustomerForm(false);
//             }}
//             className="px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800"
//           >
//             Next
//           </button>
//         </div>
//       </div>
//     </div>
//   );
  
//   const renderAddDepartmentForm = () => (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
//         <h2 className="text-xl font-semibold mb-6">Add Department</h2>
        
//         <div className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium mb-1">Department Name</label>
//             <input
//               type="text"
//               value={newDepartment.departmentName}
//               onChange={(e) => setNewDepartment({...newDepartment, departmentName: e.target.value})}
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Enter department name"
//             />
//           </div>
//         </div>
        
//         <div className="flex justify-end space-x-3 mt-6">
//           <button
//             onClick={() => setShowAddDepartmentForm(false)}
//             className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={() => {
//               // Here you would typically submit the form data to your API
//               console.log("New department data:", newDepartment);
//               // Reset form and close modal
//               setNewDepartment({
//                 departmentName: ''
//               });
//               setShowAddDepartmentForm(false);
//             }}
//             className="px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800"
//           >
//             Submit
//           </button>
//         </div>
//       </div>
//     </div>
//   );
  
//   const renderDashboard = () => (
//     <div className="flex-1 bg-gray-50">
//       {renderHeader('Dashboard')}
//       <div className="p-6">
//         <h2 className="text-2xl font-semibold mb-6">Welcome, John Mathew!</h2>
        
//         <div className="grid grid-cols-4 gap-4 mb-8">
//           {[
//             { label: 'Total Managers', value: '262', subtext: 'Total Managers' },
//             { label: 'Staffs', value: '262', subtext: 'Total Staffs' },
//             { label: 'Total Customers', value: '262', subtext: 'Total Customers' },
//             { label: 'Total Departments', value: '262', subtext: 'Total Departments' }
//           ].map((stat, index) => (
//             <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
//               <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
//               <div className="text-sm text-gray-600">{stat.subtext}</div>
//             </div>
//           ))}
//         </div>
        
//         <div className="bg-white rounded-lg shadow-sm">
//           <div className="p-4 border-b">
//             <h3 className="font-semibold">Customers</h3>
//           </div>
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead>
//                 <tr className="border-b bg-gray-50">
//                   <th className="text-left p-3 text-sm font-medium">Customer ID</th>
//                   <th className="text-left p-3 text-sm font-medium">Name</th>
//                   <th className="text-left p-3 text-sm font-medium">Phone</th>
//                   <th className="text-left p-3 text-sm font-medium">Gender</th>
//                   <th className="text-left p-3 text-sm font-medium">Added On</th>
//                   <th className="text-left p-3 text-sm font-medium">Mail</th>
//                   <th className="text-left p-3 text-sm font-medium">Status</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {customers.slice(0, 4).map((customer, index) => (
//                   <tr key={index} className="border-b">
//                     <td className="p-3 text-sm">{customer.id}</td>
//                     <td className="p-3 text-sm">{customer.name}</td>
//                     <td className="p-3 text-sm">{customer.phone}</td>
//                     <td className="p-3 text-sm">{customer.gender}</td>
//                     <td className="p-3 text-sm">{customer.addedOn}</td>
//                     <td className="p-3 text-sm">{customer.email}</td>
//                     <td className="p-3">
//                       <span className={`px-2 py-1 text-xs rounded-full ${
//                         customer.status === 'New' ? 'bg-green-100 text-green-800' :
//                         customer.status === 'Complete' ? 'bg-blue-100 text-blue-800' :
//                         'bg-yellow-100 text-yellow-800'
//                       }`}>
//                         {customer.status}
//                       </span>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
  
//   const renderStaffManagement = () => (
//     <div className="flex-1 bg-gray-50">
//       {renderHeader('Staff Management', true, 'Add Staff', () => setShowAddStaffForm(true))}
//       <div className="p-6">
//         <div className="bg-white rounded-lg shadow-sm">
//           <div className="p-4 border-b flex justify-between items-center">
//             <div className="flex justify-end items-center space-x-4 w-full">
//               <span>From</span>
//               <input type="date" defaultValue="16/11/2022" className="px-3 py-1 border rounded" />
//               <span>To</span>
//               <input type="date" defaultValue="25/11/2022" className="px-3 py-1 border rounded" />
//               <button className="bg-blue-900 text-white px-4 py-2 rounded">Apply</button>
//             </div>
//           </div>
          
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead>
//                 <tr className="border-b bg-gray-50">
//                   <th className="text-left p-3 text-sm font-medium">Username</th>
//                   <th className="text-left p-3 text-sm font-medium">Name</th>
//                   <th className="text-left p-3 text-sm font-medium">Manager</th>
//                   <th className="text-left p-3 text-sm font-medium">Skill</th>
//                   <th className="text-left p-3 text-sm font-medium">Phone</th>
//                   <th className="text-left p-3 text-sm font-medium">Joined On</th>
//                   <th className="text-left p-3 text-sm font-medium">Mail</th>
//                   <th className="text-left p-3 text-sm font-medium">Status</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {staffData.map((staff, index) => (
//                   <tr key={index} className="border-b">
//                     <td className="p-3 text-sm">{staff.id}</td>
//                     <td className="p-3 text-sm">{staff.name}</td>
//                     <td className="p-3 text-sm">{staff.manager}</td>
//                     <td className="p-3 text-sm">{staff.skill}</td>
//                     <td className="p-3 text-sm">{staff.phone}</td>
//                     <td className="p-3 text-sm">{staff.joinedOn}</td>
//                     <td className="p-3 text-sm">{staff.email}</td>
//                     <td className="p-3">
//                       <div className="flex items-center">
//                         <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
//                         <span className="text-sm">{staff.status}</span>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
  
//   const renderDepartments = () => (
//     <div className="flex-1 bg-gray-50">
//       {renderHeader('Departments', true, 'Add Department', () => setShowAddDepartmentForm(true))}
//       <div className="p-6">
//         <div className="bg-white rounded-lg shadow-sm">
//           <div className="p-4 border-b flex justify-between items-center">
//             <div className="relative">
//               <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
//               <input
//                 type="text"
//                 placeholder="Search..."
//                 className="pl-4 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
//           </div>
          
//           <div className="p-6">
//             <div className="space-y-4">
//               <h3 className="font-medium text-gray-600">Name</h3>
//               {departments.map((dept, index) => (
//                 <div key={index} className="py-2 text-gray-800">{dept}</div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
  
//   const renderCustomers = () => (
//     <div className="flex-1 bg-gray-50">
//       {renderHeader('Customers', true, 'Add Customer', () => setShowAddCustomerForm(true))}
//       <div className="p-6">
//         <div className="bg-white rounded-lg shadow-sm">
//           <div className="p-4 border-b flex justify-between items-center">
//             <div className="flex justify-end items-center space-x-4 w-full">
//               <span>From</span>
//               <input type="date" defaultValue="16/11/2022" className="px-3 py-1 border rounded" />
//               <span>To</span>
//               <input type="date" defaultValue="25/11/2022" className="px-3 py-1 border rounded" />
//               <button className="bg-blue-900 text-white px-4 py-2 rounded">Apply</button>
//             </div>
//           </div>
          
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead>
//                 <tr className="border-b bg-gray-50">
//                   <th className="text-left p-3 text-sm font-medium">ID</th>
//                   <th className="text-left p-3 text-sm font-medium">Name</th>
//                   <th className="text-left p-3 text-sm font-medium">Phone</th>
//                   <th className="text-left p-3 text-sm font-medium">Gender</th>
//                   <th className="text-left p-3 text-sm font-medium">Added On</th>
//                   <th className="text-left p-3 text-sm font-medium">Mail</th>
//                   <th className="text-left p-3 text-sm font-medium">Status</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {customers.map((customer, index) => (
//                   <tr key={index} className="border-b">
//                     <td className="p-3 text-sm">{customer.id}</td>
//                     <td className="p-3 text-sm flex items-center">
//                       <div className="w-8 h-8 bg-gray-300 rounded-full mr-3"></div>
//                       {customer.name}
//                     </td>
//                     <td className="p-3 text-sm">{customer.phone}</td>
//                     <td className="p-3 text-sm flex items-center">
//                       <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
//                       {customer.gender}
//                     </td>
//                     <td className="p-3 text-sm">{customer.addedOn}</td>
//                     <td className="p-3 text-sm">{customer.email}</td>
//                     <td className="p-3">
//                       <span className={`px-2 py-1 text-xs rounded-full ${
//                         customer.status === 'New' ? 'bg-green-100 text-green-800' :
//                         customer.status === 'Complete' ? 'bg-red-100 text-red-800' :
//                         'bg-yellow-100 text-yellow-800'
//                       }`}>
//                         {customer.status}
//                       </span>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
  
//   const renderManagers = () => (
//     <div className="flex-1 bg-gray-50">
//       {renderHeader('Manager', true, 'Add Manager', () => setShowAddManagerForm(true))}
//       <div className="p-6">
//         <div className="bg-white rounded-lg shadow-sm">
//           <div className="p-4 border-b flex justify-between items-center">
//             <div className="flex justify-end items-center space-x-4 w-full">
//               <span>From</span>
//               <input type="date" defaultValue="16/11/2022" className="px-3 py-1 border rounded" />
//               <span>To</span>
//               <input type="date" defaultValue="17/11/2022" className="px-3 py-1 border rounded" />
//               <button className="bg-blue-900 text-white px-4 py-2 rounded">Apply</button>
//             </div>
//           </div>
          
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead>
//                 <tr className="border-b bg-gray-50">
//                   <th className="text-left p-3 text-sm font-medium">Username</th>
//                   <th className="text-left p-3 text-sm font-medium">Name</th>
//                   <th className="text-left p-3 text-sm font-medium">Phone</th>
//                   <th className="text-left p-3 text-sm font-medium">Department</th>
//                   <th className="text-left p-3 text-sm font-medium">Team</th>
//                   <th className="text-left p-3 text-sm font-medium">Joined On</th>
//                   <th className="text-left p-3 text-sm font-medium">Mail</th>
//                   <th className="text-left p-3 text-sm font-medium">Status</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {managers.map((manager, index) => (
//                   <tr key={index} className="border-b">
//                     <td className="p-3 text-sm">{manager.id}</td>
//                     <td className="p-3 text-sm">{manager.name}</td>
//                     <td className="p-3 text-sm">{manager.phone}</td>
//                     <td className="p-3 text-sm">{manager.department}</td>
//                     <td className="p-3 text-sm">{manager.team}</td>
//                     <td className="p-3 text-sm">{manager.joinedOn}</td>
//                     <td className="p-3 text-sm">{manager.email}</td>
//                     <td className="p-3">
//                       <div className="flex items-center">
//                         <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
//                         <span className="text-sm">{manager.status}</span>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
  
//   if (currentView === 'login') {
//     return renderLogin();
//   }
  
//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       {renderSidebar()}
//       {currentView === 'dashboard' && renderDashboard()}
//       {currentView === 'staff' && renderStaffManagement()}
//       {currentView === 'departments' && renderDepartments()}
//       {currentView === 'customers' && renderCustomers()}
//       {currentView === 'managers' && renderManagers()}
//       {showAddStaffForm && renderAddStaffForm()}
//       {showAddManagerForm && renderAddManagerForm()}
//       {showAddCustomerForm && renderAddCustomerForm()}
//       {showAddDepartmentForm && renderAddDepartmentForm()}
//     </div>
//   );
// };

// export default StaffManagementDashboard;







import React, { useState, useEffect } from 'react';
import { Search, Menu, Plus, Eye, EyeOff } from 'lucide-react';

// API service
const API = {
  get: (endpoint) => {
    const baseURL = 'http://localhost:8000/api/';
    const token = localStorage.getItem('access');
    
    return fetch(baseURL + endpoint, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }).then(res => {
      if (!res.ok) throw new Error('Network response was not ok');
      return res.json();
    });
  },
  
  post: (endpoint, data) => {
    const baseURL = 'http://localhost:8000/api/';
    const token = localStorage.getItem('access');
    
    return fetch(baseURL + endpoint, {
      method: 'POST',
      headers: {
        'Authorization': token ? `Bearer ${token}` : '',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then(res => {
      if (!res.ok) throw new Error('Network response was not ok');
      return res.json();
    });
  }
};

const StaffManagementDashboard = () => {
  const [currentView, setCurrentView] = useState('login');
  const [showPassword, setShowPassword] = useState(false);
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [activeNav, setActiveNav] = useState('Dashboard');
  const [staffData, setStaffData] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Form states
  const [showAddStaffForm, setShowAddStaffForm] = useState(false);
  const [showAddManagerForm, setShowAddManagerForm] = useState(false);
  const [showAddCustomerForm, setShowAddCustomerForm] = useState(false);
  const [showAddDepartmentForm, setShowAddDepartmentForm] = useState(false);
  
  const [newStaff, setNewStaff] = useState({
    fullName: '',
    phone: '',
    mail: '',
    skills: '',
    manager: ''
  });
  
  const [newManager, setNewManager] = useState({
    fullName: '',
    phone: '',
    mail: '',
    department: '',
    team: ''
  });
  
  const [newCustomer, setNewCustomer] = useState({
    fullName: '',
    gender: '',
    phone: '',
    mail: '',
    dateOfBirth: '',
    profilePicture: null
  });
  
  const [newDepartment, setNewDepartment] = useState({
    departmentName: ''
  });

  // Sample data
  const managers = [
    { id: 1, name: 'Nestal Cruig', phone: '+91 98765 43210', department: 'Support', team: 'Data Care', joinedOn: '29/11/22', email: 'Milancity.West@gmail.com', status: 'Active' },
    { id: 2, name: 'Jane Smith', phone: '+91 98765 43211', department: 'HR', team: 'Data Entry', joinedOn: '29/11/22', email: 'jane@company.com', status: 'Active' },
    { id: 3, name: 'Mike Johnson', phone: '+91 98765 43212', department: 'Product Dev', team: 'Dev Team', joinedOn: '29/11/22', email: 'mike@company.com', status: 'Active' },
  ];
  
  const departments = ['Sales', 'Support', 'Innovative Strategies', 'Creative Solutions'];

  useEffect(() => {
    if (currentView !== 'login') {
      loadData();
    }
  }, [currentView]);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      if (currentView === 'staff' || currentView === 'dashboard') {
        const staffResponse = await API.get('staff/');
        setStaffData(staffResponse || []);
      }
      
      if (currentView === 'customers' || currentView === 'dashboard') {
        const customerResponse = await API.get('customers/');
        setCustomers(customerResponse || []);
      }
    } catch (err) {
      setError('Failed to load data. Using demo data.');
      // Fallback to demo data
      setStaffData([
        { id: 'STF001', name: 'John Doe', manager: 'Nestal Cruig', skill: 'JavaScript', phone: '+91 99999 11111', joinedOn: '2023-01-15', email: 'john@company.com', status: 'Active' },
        { id: 'STF002', name: 'Jane Smith', manager: 'Mike Johnson', skill: 'Python', phone: '+91 99999 22222', joinedOn: '2023-02-10', email: 'jane.smith@company.com', status: 'Active' }
      ]);
      setCustomers([
        { id: 'CUST001', name: 'Alice Johnson', phone: '+91 88888 11111', gender: 'Female', addedOn: '2023-03-01', email: 'alice@email.com', status: 'New' },
        { id: 'CUST002', name: 'Bob Wilson', phone: '+91 88888 22222', gender: 'Male', addedOn: '2023-03-02', email: 'bob@email.com', status: 'Complete' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    if (!credentials.username || !credentials.password) {
      alert('Please enter both username and password');
      return;
    }

    try {
      setLoading(true);
      const res = await API.post("token/", {
        username: credentials.username,
        password: credentials.password,
      });
      
      localStorage.setItem("access", res.access);
      localStorage.setItem("refresh", res.refresh);
      
      setCurrentView("dashboard");
      setError(null);
    } catch (err) {
      setError("Invalid username or password");
    } finally {
      setLoading(false);
    }
  };

  const renderLogin = () => (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="w-full max-w-md p-8">
        <h2 className="text-2xl font-semibold mb-2">Log In</h2>
        <p className="text-gray-600 mb-8">Log in using your username and password.</p>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Username</label>
            <input
              type="text"
              value={credentials.username}
              onChange={(e) => setCredentials({...credentials, username: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter username"
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
                placeholder="Enter password"
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
          
          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-blue-900 text-white py-3 rounded-lg hover:bg-blue-800 transition-colors disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Log In'}
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
        
        <button
          onClick={() => {
            localStorage.removeItem('access');
            localStorage.removeItem('refresh');
            setCurrentView('login');
            setCredentials({ username: '', password: '' });
            setActiveNav('Dashboard');
          }}
          className="w-full text-left px-4 py-3 rounded-lg transition-colors text-blue-100 hover:bg-red-600 mt-8"
        >
          <div className="flex items-center">
            <span className="w-2 h-2 bg-current rounded-full mr-3"></span>
            Logout
          </div>
        </button>
      </nav>
    </div>
  );
  
  const renderHeader = (title, showAddButton = false, addButtonText = "Add", onAddClick = null) => (
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
          <button 
            onClick={onAddClick || (() => {})}
            className="bg-blue-900 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-800"
          >
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
        <h2 className="text-2xl font-semibold mb-6">Welcome, Admin!</h2>
        
        {error && (
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        <div className="grid grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Managers', value: managers.length.toString(), subtext: 'Total Managers' },
            { label: 'Staffs', value: staffData.length.toString(), subtext: 'Total Staffs' },
            { label: 'Total Customers', value: customers.length.toString(), subtext: 'Total Customers' },
            { label: 'Total Departments', value: departments.length.toString(), subtext: 'Total Departments' }
          ].map((stat, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
              <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.subtext}</div>
            </div>
          ))}
        </div>
        
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-4 border-b">
            <h3 className="font-semibold">Recent Customers</h3>
          </div>
          {loading ? (
            <div className="p-4 text-center">Loading...</div>
          ) : (
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
                  {customers.slice(0, 5).map((customer, index) => (
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
          )}
        </div>
      </div>
    </div>
  );
  
  const renderStaffManagement = () => (
    <div className="flex-1 bg-gray-50">
      {renderHeader('Staff Management', true, 'Add Staff', () => setShowAddStaffForm(true))}
      <div className="p-6">
        {error && (
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-4 border-b flex justify-between items-center">
            <div className="flex justify-end items-center space-x-4 w-full">
              <span>From</span>
              <input type="date" className="px-3 py-1 border rounded" />
              <span>To</span>
              <input type="date" className="px-3 py-1 border rounded" />
              <button className="bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-800">Apply</button>
              <button 
                onClick={loadData}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                disabled={loading}
              >
                {loading ? 'Loading...' : 'Refresh'}
              </button>
            </div>
          </div>
          
          {loading ? (
            <div className="p-4 text-center">Loading staff data...</div>
          ) : (
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
          )}
        </div>
      </div>
    </div>
  );
  
  const renderCustomers = () => (
    <div className="flex-1 bg-gray-50">
      {renderHeader('Customers', true, 'Add Customer', () => setShowAddCustomerForm(true))}
      <div className="p-6">
        {error && (
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-4 border-b flex justify-between items-center">
            <div className="flex justify-end items-center space-x-4 w-full">
              <span>From</span>
              <input type="date" className="px-3 py-1 border rounded" />
              <span>To</span>
              <input type="date" className="px-3 py-1 border rounded" />
              <button className="bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-800">Apply</button>
              <button 
                onClick={loadData}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                disabled={loading}
              >
                {loading ? 'Loading...' : 'Refresh'}
              </button>
            </div>
          </div>
          
          {loading ? (
            <div className="p-4 text-center">Loading customers data...</div>
          ) : (
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
          )}
        </div>
      </div>
    </div>
  );

  const renderManagers = () => (
    <div className="flex-1 bg-gray-50">
      {renderHeader('Managers', true, 'Add Manager', () => setShowAddManagerForm(true))}
      <div className="p-6">
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-4 border-b flex justify-between items-center">
            <div className="flex justify-end items-center space-x-4 w-full">
              <span>From</span>
              <input type="date" className="px-3 py-1 border rounded" />
              <span>To</span>
              <input type="date" className="px-3 py-1 border rounded" />
              <button className="bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-800">Apply</button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="text-left p-3 text-sm font-medium">ID</th>
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

  const renderDepartments = () => (
    <div className="flex-1 bg-gray-50">
      {renderHeader('Departments', true, 'Add Department', () => setShowAddDepartmentForm(true))}
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

  // Form components
  const renderAddStaffForm = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <h2 className="text-xl font-semibold mb-6">Add Staff</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input
              type="text"
              value={newStaff.fullName}
              onChange={(e) => setNewStaff({...newStaff, fullName: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter full name"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Phone</label>
            <div className="flex">
              <div className="flex items-center px-3 py-2 border border-r-0 border-gray-300 rounded-l-lg bg-gray-50">
                <span className="mr-2">🇮🇳</span>
                <span>+91</span>
              </div>
              <input
                type="text"
                value={newStaff.phone}
                onChange={(e) => setNewStaff({...newStaff, phone: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter phone number"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Mail</label>
            <input
              type="email"
              value={newStaff.mail}
              onChange={(e) => setNewStaff({...newStaff, mail: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter email address"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Skills</label>
            <input
              type="text"
              value={newStaff.skills}
              onChange={(e) => setNewStaff({...newStaff, skills: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter skills"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Manager</label>
            <select
              value={newStaff.manager}
              onChange={(e) => setNewStaff({...newStaff, manager: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a manager</option>
              {managers.map((manager) => (
                <option key={manager.id} value={manager.id}>
                  {manager.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="flex justify-end space-x-3 mt-6">
          <button
            onClick={() => setShowAddStaffForm(false)}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={async() => {
              console.log("New staff data:", newStaff);
              try {
                  await API.post('staff/', newStaff);
                  alert('Staff added successfully!');
                  loadData(); // Refresh the data
                } catch (err) {
                  alert('Error adding staff: ' + err.message);
            }
              setNewStaff({
                fullName: '',
                phone: '',
                mail: '',
                skills: '',
                manager: ''
              });
              setShowAddStaffForm(false);
              alert('Staff added successfully!');
            }}
            className="px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
  
  const renderAddManagerForm = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <h2 className="text-xl font-semibold mb-6">Add Manager</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input
              type="text"
              value={newManager.fullName}
              onChange={(e) => setNewManager({...newManager, fullName: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter full name"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Phone</label>
            <div className="flex">
              <div className="flex items-center px-3 py-2 border border-r-0 border-gray-300 rounded-l-lg bg-gray-50">
                <span className="mr-2">🇮🇳</span>
                <span>+91</span>
              </div>
              <input
                type="text"
                value={newManager.phone}
                onChange={(e) => setNewManager({...newManager, phone: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter phone number"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Mail</label>
            <input
              type="email"
              value={newManager.mail}
              onChange={(e) => setNewManager({...newManager, mail: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter email address"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Department</label>
            <select
              value={newManager.department}
              onChange={(e) => setNewManager({...newManager, department: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a department</option>
              {departments.map((dept, index) => (
                <option key={index} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Team</label>
            <input
              type="text"
              value={newManager.team}
              onChange={(e) => setNewManager({...newManager, team: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter team name"
            />
          </div>
        </div>
        
        <div className="flex justify-end space-x-3 mt-6">
          <button
            onClick={() => setShowAddManagerForm(false)}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              console.log("New manager data:", newManager);
              setNewManager({
                fullName: '',
                phone: '',
                mail: '',
                department: '',
                team: ''
              });
              setShowAddManagerForm(false);
              alert('Manager added successfully!');
            }}
            className="px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
  
  const renderAddCustomerForm = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <h2 className="text-xl font-semibold mb-6">Add Customer</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input
              type="text"
              value={newCustomer.fullName}
              onChange={(e) => setNewCustomer({...newCustomer, fullName: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter full name"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Gender</label>
            <select
              value={newCustomer.gender}
              onChange={(e) => setNewCustomer({...newCustomer, gender: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Phone</label>
            <div className="flex">
              <div className="flex items-center px-3 py-2 border border-r-0 border-gray-300 rounded-l-lg bg-gray-50">
                <span className="mr-2">🇮🇳</span>
                <span>+91</span>
              </div>
              <input
                type="text"
                value={newCustomer.phone}
                onChange={(e) => setNewCustomer({...newCustomer, phone: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter phone number"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Mail</label>
            <input
              type="email"
              value={newCustomer.mail}
              onChange={(e) => setNewCustomer({...newCustomer, mail: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter email address"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Date of Birth</label>
            <input
              type="date"
              value={newCustomer.dateOfBirth}
              onChange={(e) => setNewCustomer({...newCustomer, dateOfBirth: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Upload Profile Picture</label>
            <div className="flex items-center">
              <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">
                Choose File
              </button>
              <span className="ml-3 text-sm text-gray-500">No file chosen</span>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end space-x-3 mt-6">
          <button
            onClick={() => setShowAddCustomerForm(false)}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              console.log("New customer data:", newCustomer);
              setNewCustomer({
                fullName: '',
                gender: '',
                phone: '',
                mail: '',
                dateOfBirth: '',
                profilePicture: null
              });
              setShowAddCustomerForm(false);
              alert('Customer added successfully!');
            }}
            className="px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
  
  const renderAddDepartmentForm = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <h2 className="text-xl font-semibold mb-6">Add Department</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Department Name</label>
            <input
              type="text"
              value={newDepartment.departmentName}
              onChange={(e) => setNewDepartment({...newDepartment, departmentName: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter department name"
            />
          </div>
        </div>
        
        <div className="flex justify-end space-x-3 mt-6">
          <button
            onClick={() => setShowAddDepartmentForm(false)}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              console.log("New department data:", newDepartment);
              setNewDepartment({
                departmentName: ''
              });
              setShowAddDepartmentForm(false);
              alert('Department added successfully!');
            }}
            className="px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800"
          >
            Submit
          </button>
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
      {showAddStaffForm && renderAddStaffForm()}
      {showAddManagerForm && renderAddManagerForm()}
      {showAddCustomerForm && renderAddCustomerForm()}
      {showAddDepartmentForm && renderAddDepartmentForm()}
    </div>
  );
};

export default StaffManagementDashboard;