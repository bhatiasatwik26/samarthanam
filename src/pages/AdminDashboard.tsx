import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Home,
  Users,
  Calendar,
  Settings,
  MessageSquare,
  BarChart3,
  LogOut,
  Search,
  UserPlus,
  FileText,
  Edit,
  Eye,
  Moon,
  Sun,
  X
} from 'lucide-react';
import { events } from '@/data/events'; // Import events from data file

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isAddVolunteerModalOpen, setIsAddVolunteerModalOpen] = useState(false);
  const [isEditEventsModalOpen, setIsEditEventsModalOpen] = useState(false);
  const [currentVolunteer, setCurrentVolunteer] = useState<any>(null);
  const [selectedEvents, setSelectedEvents] = useState<string[]>([]);
  const [newVolunteer, setNewVolunteer] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    interests: '',
    status: 'active'
  });

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // Mock data
  const [volunteers, setVolunteers] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      events: ["Food Drive", "Beach Cleanup"],
      joined: "2023-01-15",
      status: "active"
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      events: ["Education Workshop", "Fundraising Gala"],
      joined: "2023-02-20",
      status: "active"
    }
  ]);

  // Navigation items
  const navItems = [
    { icon: <Home size={20} />, label: "Dashboard", section: "dashboard" },
    { icon: <Users size={20} />, label: "Volunteers", section: "volunteers" },
    { icon: <Calendar size={20} />, label: "Events", section: "events" },
    { icon: <MessageSquare size={20} />, label: "Messages", section: "messages" },
    { icon: <BarChart3 size={20} />, label: "Reports", section: "reports" },
    { icon: <Settings size={20} />, label: "Settings", section: "settings" },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewVolunteer(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddVolunteer = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create new volunteer object
    const volunteer = {
      id: volunteers.length + 1,
      name: newVolunteer.name,
      email: newVolunteer.email,
      events: [],
      joined: new Date().toISOString().split('T')[0],
      status: newVolunteer.status
    };
    
    // Add to volunteers array
    setVolunteers(prev => [...prev, volunteer]);
    
    // Reset form and close modal
    setNewVolunteer({
      name: '',
      email: '',
      phone: '',
      address: '',
      interests: '',
      status: 'active'
    });
    setIsAddVolunteerModalOpen(false);
  };

  // Available events for selection
  const availableEvents = [
    "Food Drive",
    "Beach Cleanup",
    "Education Workshop",
    "Fundraising Gala",
    "Community Health Camp",
    "Tree Planting",
    "Children's Art Program",
    "Senior Citizens Outreach"
  ];

  const openEditEventsModal = (volunteer: any) => {
    setCurrentVolunteer(volunteer);
    setSelectedEvents([...volunteer.events]);
    setIsEditEventsModalOpen(true);
  };

  const handleEventSelectionChange = (event: string) => {
    if (selectedEvents.includes(event)) {
      setSelectedEvents(selectedEvents.filter(e => e !== event));
    } else {
      setSelectedEvents([...selectedEvents, event]);
    }
  };

  const saveVolunteerEvents = () => {
    // Update the volunteer's events
    const updatedVolunteers = volunteers.map(v => 
      v.id === currentVolunteer.id 
        ? { ...v, events: selectedEvents } 
        : v
    );
    
    setVolunteers(updatedVolunteers);
    setIsEditEventsModalOpen(false);
  };

  // Render Dashboard section
  const renderDashboard = () => (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-blue-100 dark:bg-blue-900/20 p-4 rounded-lg">
          <h3 className="font-semibold">Total Volunteers</h3>
          <p className="text-2xl font-bold">120</p>
        </div>
        
        <div className="bg-green-100 dark:bg-green-900/20 p-4 rounded-lg">
          <h3 className="font-semibold">Total Events</h3>
          <p className="text-2xl font-bold">45</p>
        </div>
        
        <div className="bg-purple-100 dark:bg-purple-900/20 p-4 rounded-lg">
          <h3 className="font-semibold">Active Events</h3>
          <p className="text-2xl font-bold">12</p>
        </div>
        
        <div className="bg-yellow-100 dark:bg-yellow-900/20 p-4 rounded-lg">
          <h3 className="font-semibold">Tasks Completed</h3>
          <p className="text-2xl font-bold">89</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        {/* Admin Information Card */}
        <div className="bg-blue-500 dark:bg-blue-600 rounded-lg overflow-hidden">
          <div className="p-6 flex flex-col items-center">
            <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-white mb-4">
              <img 
                src="https://placehold.co/300x300?text=Admin" 
                alt="Admin Profile"
                className="w-full h-full object-cover"
              />
            </div>
            
            <h2 className="text-white text-xl font-bold mb-1">JOHN SMITH</h2>
            <p className="text-white/80 mb-3">Administrator ID: 10023456</p>
            
            <div className="flex flex-col gap-1 text-white w-full">
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                <span className="text-sm">ADMIN@EXAMPLE.COM</span>
              </div>
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                <span className="text-sm">9876543210</span>
              </div>
            </div>
            
            <div className="mt-4 w-full">
              <button className="w-full bg-white text-blue-600 font-medium py-2 rounded-lg">View Full Profile</button>
            </div>
          </div>
        </div>
        
        {/* Recent Activity */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
          <div className="space-y-4">
            <div>
              <p className="font-medium">New volunteer joined</p>
              <p className="text-sm text-gray-500">Sarah Williams registered as a volunteer</p>
              <p className="text-xs text-gray-400 mt-1">2 hours ago</p>
            </div>
            <div>
              <p className="font-medium">Event created</p>
              <p className="text-sm text-gray-500">New event "Community Health Camp" added</p>
              <p className="text-xs text-gray-400 mt-1">Yesterday</p>
            </div>
            <div>
              <p className="font-medium">Task completed</p>
              <p className="text-sm text-gray-500">Volunteer training session completed</p>
              <p className="text-xs text-gray-400 mt-1">2 days ago</p>
            </div>
          </div>
        </div>
        
        {/* Event Progress */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold mb-4">Event Progress</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <p className="font-medium">Food Drive</p>
                <span className="text-sm text-green-600">78%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '78%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <p className="font-medium">Beach Cleanup</p>
                <span className="text-sm text-blue-600">45%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '45%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <p className="font-medium">Education Workshop</p>
                <span className="text-sm text-orange-600">65%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-orange-500 h-2 rounded-full" style={{ width: '65%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Ongoing Events Section */}
      <div className="mt-6">
        <h2 className="text-xl font-bold mb-4">Ongoing Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {events.slice(0, 3).map((event) => (
            <div key={event.id} className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden flex">
              <div className="w-1/3">
                <img 
                  src={event.imageUrl} 
                  alt={event.title} 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "https://placehold.co/300x300?text=Event";
                  }}
                />
              </div>
              <div className="w-2/3 p-3">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-sm line-clamp-1">{event.title}</h3>
                  <span className="px-2 py-0.5 text-xs bg-green-100 text-green-800 rounded-full">Active</span>
                </div>
                <p className="text-xs text-gray-500 mb-2">{event.date}</p>
                <p className="text-xs text-gray-500 mb-3 line-clamp-1">{event.location}</p>
                <div className="flex justify-end">
                  <button className="px-2 py-1 text-xs bg-red-50 hover:bg-red-100 text-red-600 rounded">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Render Volunteers section
  const renderVolunteers = () => (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-2xl font-bold">Volunteer Management</h1>
        <div className="flex mt-2 md:mt-0">
          <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border rounded-lg mr-2">
            <FileText size={16} />
            <span>Export</span>
          </button>
          <button 
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg"
            onClick={() => setIsAddVolunteerModalOpen(true)}
          >
            <UserPlus size={16} />
            <span>Add Volunteer</span>
          </button>
        </div>
      </div>
      
      <div className="flex mb-4">
        <div className="relative flex-grow mr-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search volunteers..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg"
          />
        </div>
        <select className="px-4 py-2 border rounded-lg">
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Events</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {volunteers.map(volunteer => (
                <tr key={volunteer.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{volunteer.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{volunteer.email}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div>
                        {volunteer.events.length > 0 ? (
                          <div className="flex flex-wrap gap-1">
                            {volunteer.events.map((event: string, index: number) => (
                              <span key={index} className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                                {event}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <span className="text-gray-500 text-sm">No events assigned</span>
                        )}
                      </div>
                      <button 
                        className="ml-2 text-blue-600 hover:text-blue-800" 
                        onClick={() => openEditEventsModal(volunteer)}
                        title="Edit events"
                      >
                        <Edit size={14} />
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      volunteer.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {volunteer.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <button className="p-1 text-gray-600 mr-1"><Edit size={16} /></button>
                    <button className="p-1 text-gray-600"><Eye size={16} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Add Volunteer Modal */}
      {isAddVolunteerModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-md">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-lg font-semibold">Add New Volunteer</h3>
              <button 
                onClick={() => setIsAddVolunteerModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleAddVolunteer} className="p-4">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={newVolunteer.name}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-lg"
                    placeholder="Enter full name"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={newVolunteer.email}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-lg"
                    placeholder="Enter email address"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={newVolunteer.phone}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-lg"
                    placeholder="Enter phone number"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Address</label>
                  <input
                    type="text"
                    name="address"
                    value={newVolunteer.address}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-lg"
                    placeholder="Enter address"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Interests/Skills</label>
                  <textarea
                    name="interests"
                    value={newVolunteer.interests}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-lg"
                    placeholder="Enter volunteer's interests or skills"
                    rows={3}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Status</label>
                  <select
                    name="status"
                    value={newVolunteer.status}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-lg"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>
              
              <div className="flex justify-end mt-6 gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddVolunteerModalOpen(false)}
                  className="px-4 py-2 border rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-red-600 text-white rounded-lg"
                >
                  Add Volunteer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Events Modal */}
      {isEditEventsModalOpen && currentVolunteer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-md">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-lg font-semibold">Edit Events for {currentVolunteer.name}</h3>
              <button 
                onClick={() => setIsEditEventsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-4">
              <p className="text-sm text-gray-500 mb-4">Select the events this volunteer is participating in:</p>
              
              <div className="space-y-2 max-h-60 overflow-y-auto mb-4">
                {availableEvents.map((event, index) => (
                  <div key={index} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`event-${index}`}
                      checked={selectedEvents.includes(event)}
                      onChange={() => handleEventSelectionChange(event)}
                      className="mr-2 h-4 w-4"
                    />
                    <label htmlFor={`event-${index}`} className="text-sm">{event}</label>
                  </div>
                ))}
              </div>
              
              <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={() => setIsEditEventsModalOpen(false)}
                  className="px-4 py-2 border rounded-lg text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={saveVolunteerEvents}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm"
                >
                  Save Events
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  // Render Events section
  const renderEvents = () => (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-2xl font-bold">Event Management</h1>
        <div className="flex mt-2 md:mt-0">
          <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border rounded-lg mr-2">
            <FileText size={16} />
            <span>Export</span>
          </button>
          <Link to="/events" className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg mr-2">
            <Eye size={16} />
            <span>Explore Events</span>
          </Link>
          <button className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg">
            <Calendar size={16} />
            <span>Create Event</span>
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div key={event.id} className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="relative">
              <img 
                src={event.imageUrl} 
                alt={event.title} 
                className="w-full h-48 object-cover" 
              />
              <div className="absolute top-2 right-2">
                {/* Set status based on date */}
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  new Date(event.date.split('-')[0]) < new Date() 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {new Date(event.date.split('-')[0]) < new Date() ? 'Active' : 'Upcoming'}
                </span>
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{event.title}</h3>
              <p className="text-sm text-gray-500 mb-4">{event.date} • {event.location}</p>
              
              <div className="flex justify-between mt-4">
                <button className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded">
                  Edit
                </button>
                <button className="px-3 py-1 text-sm bg-red-50 hover:bg-red-100 text-red-600 rounded">
                  View
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Render content based on active section
  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return renderDashboard();
      case "volunteers":
        return renderVolunteers();
      case "events":
        return renderEvents();
      default:
        return renderDashboard();
    }
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <Header isAdmin={true} />
      
      <div className="flex min-h-screen pt-24">
        {/* Sidebar */}
        <div className="w-64 bg-white dark:bg-gray-800 fixed top-24 bottom-0 left-0 shadow-md">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <span className="font-semibold text-lg">Admin Panel</span>
          </div>
          <nav className="p-4">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.section}>
                  <button
                    className={`w-full flex items-center px-4 py-2 rounded-lg ${
                      activeSection === item.section
                        ? 'bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                    onClick={() => setActiveSection(item.section)}
                  >
                    <span className="mr-3">{item.icon}</span>
                    <span>{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 dark:border-gray-700">
            <button 
              className="w-full flex items-center px-4 py-2 text-red-600 hover:bg-red-50 dark:text-red-400 rounded-lg"
              onClick={() => navigate('/')}
            >
              <LogOut size={20} className="mr-3" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Main content */}
        <div className="ml-64 flex-1 p-6">
          {renderContent()}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default AdminDashboard; 