import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaCheckCircle } from 'react-icons/fa';
import Navbar from '../components/navbar';
import Footer from '../components/Footer';

const AboutUs = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="bg-blue-50 min-h-screen flex flex-col justify-between">
      <div>
        <Navbar />
        {/* Hero Section with Animation */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 50 }}
          transition={{ duration: 0.8 }}
          className="relative h-[70vh] flex items-center justify-center bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')",
          }}
        >
          <div className="absolute inset-0 bg-blue-900 opacity-60"></div>
          <div className="relative z-10 text-center text-white px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">About TheraWell</h1>
            <p className="text-lg md:text-2xl">
              Your Journey to Wellness Starts Here
            </p>
          </div>
        </motion.section>

        {/* Who We Are Section */}
        <section className="py-16 bg-white px-4">
          <div className="container mx-auto">
            <h2 className="text-4xl font-bold text-blue-900 text-center mb-8">
              Who We Are
            </h2>
            <div className="max-w-3xl mx-auto">
              <p className="text-gray-700 mb-4 text-lg leading-relaxed">
                TheraWell is a state-of-the-art physical therapy center dedicated
                to helping individuals regain their strength, mobility, and quality
                of life. Founded in 2010, we have been at the forefront of
                innovative rehabilitation techniques and personalized care for over
                a decade.
              </p>
              <p className="text-gray-700 mb-4 text-lg leading-relaxed">
                Our team of experienced and compassionate physical therapists
                specializes in a wide range of treatments, from sports injuries and
                post-surgical rehabilitation to chronic pain management and
                neurological conditions. We believe in a holistic approach to
                healing, addressing not just the symptoms but the root causes of
                physical discomfort and limitations.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed">
                At TheraWell, we understand that each patient's journey is unique.
                That's why we create customized treatment plans tailored to
                individual needs, goals, and lifestyles. Our mission is to empower
                our patients with the knowledge, tools, and support they need to
                achieve optimal physical health and well-being.
              </p>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-16 bg-blue-100 px-4">
          <div className="container mx-auto">
            <h2 className="text-4xl font-bold text-blue-900 text-center mb-12">
              Why Choose Us
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <FeatureCard
                title="Expert Team"
                description="Our therapists are highly qualified, with years of experience and ongoing training in the latest techniques."
              />
              <FeatureCard
                title="Personalized Care"
                description="We develop tailored treatment plans that address your specific needs and goals."
              />
              <FeatureCard
                title="Cutting-Edge Technology"
                description="We utilize advanced equipment and innovative therapies to enhance your recovery process."
              />
              <FeatureCard
                title="Holistic Approach"
                description="We focus on your overall well-being, not just isolated symptoms or injuries."
              />
              <FeatureCard
                title="Convenient Location"
                description="Our facility is easily accessible, with ample parking and a welcoming environment."
              />
              <FeatureCard
                title="Insurance Friendly"
                description="We work with most major insurance providers to ensure you get the care you need."
              />
            </div>
          </div>
        </section>

        {/* Our Commitment Section */}
        <section className="py-16 bg-white px-4">
          <div className="container mx-auto">
            <h2 className="text-4xl font-bold text-blue-900 text-center mb-8">
              Our Commitment
            </h2>
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                At TheraWell, we are committed to excellence in every aspect of our
                practice. From your first consultation to your last session, we
                strive to provide a supportive, encouraging environment that
                facilitates healing and growth.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed">
                Our promise to you is continuous support, transparent
                communication, and unwavering dedication to your recovery and
                long-term health. We're not just here to treat; we're here to
                transform lives, one patient at a time.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

const FeatureCard = ({ title, description }) => (
  <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
    <div className="flex items-center mb-4">
      <FaCheckCircle className="text-green-500 text-2xl mr-2" />
      <h3 className="text-xl font-semibold text-blue-900">{title}</h3>
    </div>
    <p className="text-gray-600">{description}</p>
  </div>
);

export default AboutUs;
