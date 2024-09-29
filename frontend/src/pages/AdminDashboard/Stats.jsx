import React, { useState, useEffect } from "react";
import axios from "axios";
import { Users, ShoppingCart, DollarSign, TrendingUp, Calendar, Mail } from "lucide-react";
import { Bar } from 'react-chartjs-2'; // Example with Chart.js
import 'chart.js/auto';

const StatCard = ({ title, value, icon: Icon }) => (
  <div className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
    <div className="flex items-center">
      <div className="p-3 rounded-full bg-indigo-600 bg-opacity-75">
        <Icon className="h-8 w-8 text-white" />
      </div>
      <div className="ml-4">
        <h2 className="text-sm font-medium text-gray-600">{title}</h2>
        <p className="text-2xl font-semibold text-gray-800">{value}</p>
      </div>
    </div>
  </div>
);

const Stats = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalDoctors: 0,
  });
  const [doctors, setDoctors] = useState([]);
  const [appointment, setAppointment] = useState([]);
  const [messages, setMessages] = useState([]);

  // Fetch stats from the backend
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/users/admin");
        setStats(response.data.filter((e) => e.isactive === true));
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
  }, []);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/doctor/admin');
        setDoctors(response.data.filter((e) => e.isactive === true));
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };

    fetchDoctors();
  }, []);

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/appointment/admin');
        setAppointment(response.data);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointment();
  }, []);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/messages/admin");
        setMessages(response.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, []);

  // Sample data for the graph
  const data = {
    labels: ['Users', 'Doctors', 'Appointments', 'Messages'],
    datasets: [
      {
        label: 'Statistics',
        data: [stats.length, doctors.length, appointment.length, messages.length],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Active Users" value={stats.length} icon={Users} />
        <StatCard title="Total Active Doctors" value={doctors.length} icon={Users} />
        <StatCard title="Total Appointments" value={appointment.length} icon={Calendar} />
        <StatCard title="Total Messages" value={messages.length} icon={Mail} />
      </div>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Statistics Overview</h3>
        <Bar data={data} options={{
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Overview of Active Statistics',
            },
          },
        }} />
      </div>
    </div>
  );
};

export default Stats;
