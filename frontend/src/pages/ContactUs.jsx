import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';
import axios from 'axios';
import { motion } from 'framer-motion';
import map from '../assets/map.png';
import Navbar from '../components/navbar';
import Footer from '../components/footer';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [responseMessage, setResponseMessage] = useState('');
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => setImageLoaded(true);
    img.src = "/api/placeholder/1200/600";
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:5000/api/contacts', formData);
      setResponseMessage(response.data.message);
    } catch (error) {
      setResponseMessage('There was an error submitting the form.');
      console.error(error);
    }
  };

  return (
    <div className="w-full">
        <Navbar/>
      {/* Updated Hero Section */}
      <div className="relative h-[70vh] w-full mb-12 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://drsanchezcare.com/wp-content/uploads/2021/08/nonhome-478777906.jpg"
            alt="Hero Image"
            className="w-full h-full object-cover object-top"
            style={{ transform: 'scale(1.1) translateY(12%)' }}
            onLoad={() => setImageLoaded(true)}
          />
          <div className="absolute inset-0 bg-blue-900 bg-opacity-60"></div>
        </div>
        <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
          <motion.h1 
            className="text-5xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: imageLoaded ? 1 : 0, y: imageLoaded ? 0 : 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Contact Us
          </motion.h1>
          <motion.p
            className="text-2xl text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: imageLoaded ? 1 : 0, y: imageLoaded ? 0 : 20 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            We're 24/7 Available For You
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        {/* Updated Contact Form */}
        <div className="bg-white shadow-lg rounded-lg p-8 mb-16">
          <h2 className="text-3xl font-semibold mb-6 text-blue-900">Get in Touch</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="block w-full px-4 py-3 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-all duration-300"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="block w-full px-4 py-3 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-all duration-300"
                  placeholder="example@gmail.com"
                />
              </div>
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="block w-full px-4 py-3 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-all duration-300"
                placeholder="Your subject"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea
                id="message"
                name="message"
                rows="6"
                value={formData.message}
                onChange={handleChange}
                required
                className="block w-full px-4 py-3 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-all duration-300"
                placeholder="Write something..."
              ></textarea>
            </div>
            <div>
              <button
                type="submit"
                className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 text-base font-medium"
              >
                Submit →
              </button>
            </div>
          </form>
          {responseMessage && (
            <p className="mt-4 text-green-600">{responseMessage}</p>
          )}
        </div>

        {/* Contact Information and Map */}
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-semibold mb-6 text-blue-900">Contact Information</h2>
            <div className="space-y-4 mb-8">
              <div className="flex items-center">
                <MapPin className="text-blue-600 mr-3 h-6 w-6" />
                <span className="text-lg">Amman, Abdali</span>
              </div>
              <div className="flex items-center">
                <Phone className="text-blue-600 mr-3 h-6 w-6" />
                <span className="text-lg">(+962) 786000975</span>
              </div>
              <div className="flex items-center">
                <Mail className="text-blue-600 mr-3 h-6 w-6" />
                <span className="text-lg">therawell@gmail.com</span>
              </div>
            </div>
          </div>

          <div className="relative h-80 rounded-lg overflow-hidden shadow-lg">
            <img
              src={map}
              alt="Map"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
              <a
                href="https://www.google.com/maps"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-blue-600 py-3 px-6 rounded-md hover:bg-blue-50 transition duration-300 font-semibold"
              >
                Open in Google Maps
              </a>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default ContactUs;