import { useState, useEffect } from "react";
import {
  FaPlay,
  FaUserMd,
  FaHospital,
  FaAmbulance,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import HeroImage from "../assets/HeroImage.png";
import about from "../assets/about.png";
import cta from "../assets/cta.png";
import { useSelector } from "react-redux";

const Home = () => {
  const auth = useSelector((state) => state.auth);
  const [scrolled, setScrolled] = useState(false);
  const [currentReview, setCurrentReview] = useState(0);
  const [openFAQ, setOpenFAQ] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const reviews = [
    {
      name: "PAULO HUBERT",
      location: "New York, USA",
      text: "The pediatrician was great with him and made him feel at ease, and the entire staff was kind and attentive. I recently had to bring my child to ProHealth for a minor injury, and I was so impressed with the care he received.",
      rating: 4.5,
    },
    {
      name: "LAURENCE VENDETTA",
      location: "California, USA",
      text: "Excellent service and care. The doctors are knowledgeable and take time to listen to patients' concerns.",
      rating: 5,
    },
    {
      name: "CASSANDRA RAUL",
      location: "Florida",
      text: "I've been a patient at ProHealth for years, and I'm always satisfied with the quality of care I receive.",
      rating: 4,
    },
  ];

  const nextReview = () => {
    setCurrentReview((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrentReview((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const faqData = [
    {
      question: "What is physical therapy?",
      answer:
        "Physical therapy is a healthcare specialty that helps individuals improve movement, reduce pain, restore function, and prevent disability. Physical therapists work with patients to develop personalized treatment plans to address various musculoskeletal issues and injuries.",
    },
    {
      question: "What conditions can physical therapy treat?",
      answer:
        "Physical therapy can treat a variety of conditions, including sports injuries, post-surgical rehabilitation, arthritis, chronic pain, and neurological conditions like stroke or spinal cord injuries. It also helps in managing orthopedic conditions and improving balance and mobility in older adults.",
    },
    {
      question: "How often should I go to physical therapy?",
      answer:
        "The frequency of physical therapy visits depends on the severity of your condition and your treatment goals. Typically, patients attend sessions 1-3 times a week for several weeks or months. Your physical therapist will create a personalized schedule to optimize your recovery.",
    },
    {
      question: "What can I expect during a physical therapy session?",
      answer:
        "During a session, your physical therapist will guide you through exercises and stretches designed to improve strength, flexibility, and mobility. They may also use techniques like massage, heat or cold therapy, and electrical stimulation to relieve pain and enhance recovery.",
    },
    {
      question: "Do I need a doctor's referral for physical therapy?",
      answer:
        "In most cases, you do not need a doctor's referral to start physical therapy, although some insurance providers may require one. It's always best to check with your insurance company or healthcare provider to ensure coverage.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const [isOpen, setIsOpen] = useState(false);
  const [youtubeID, setYoutubeID] = useState(null);

  const getYouTubeID = (url) => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length >= 11 ? match[2] : null;
  };

  const handleButtonClick = () => {
    const videoUrl = "https://www.youtube.com/watch?v=To9VzfdWYlc&t=10s";
    setYoutubeID(getYouTubeID(videoUrl)); // Extract and set the YouTube video ID
    setIsOpen(true); // Open the modal
  };

  const handleCloseModal = () => {
    setIsOpen(false); // Close the modal
  };

  return (
    <div className="bg-blue-50 min-h-screen">
      {/* Sticky Navbar */}
      <nav
        className={`fixed top-0 left-0 w-full z-10 py-6 transition-all duration-300 ${
          scrolled ? "bg-white shadow-lg" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center">
            <img
              src="https://www.zilliondesigns.com/images/portfolio/healthcare-hospital/iStock-471629610-Converted.png"
              alt="ProHealth Logo"
              className="h-12 mr-4"
            />
            <span className="font-bold text-2xl text-blue-900">TheraWell</span>
          </div>
          {/* Hamburger Menu Icon */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-blue-900 focus:outline-none"
            >
              {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
          {/* Navigation Links */}
          <ul className="hidden md:flex space-x-12">
            <li>
              <a
                href="/"
                className="text-blue-900 hover:text-blue-600 text-lg font-medium relative after:absolute after:bg-blue-600 after:h-0.5 after:w-0 after:left-0 after:bottom-0 after:transition-all after:duration-300 hover:after:w-full"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/aboutus"
                className="text-blue-900 hover:text-blue-600 text-lg font-medium relative after:absolute after:bg-blue-600 after:h-0.5 after:w-0 after:left-0 after:bottom-0 after:transition-all after:duration-300 hover:after:w-full"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="/catalog"
                className="text-blue-900 hover:text-blue-600 text-lg font-medium relative after:absolute after:bg-blue-600 after:h-0.5 after:w-0 after:left-0 after:bottom-0 after:transition-all after:duration-300 hover:after:w-full"
              >
                Find Doctor
              </a>
            </li>
            <li>
              <a
                href="/contact"
                className="text-blue-900 hover:text-blue-600 text-lg font-medium relative after:absolute after:bg-blue-600 after:h-0.5 after:w-0 after:left-0 after:bottom-0 after:transition-all after:duration-300 hover:after:w-full"
              >
                Contact
              </a>
            </li>
            {!auth.isAuthenticated ? (
              <li>
                <a
                  href="/loginComponent"
                  className="text-blue-900 hover:text-blue-600 text-lg font-medium relative after:absolute after:bg-blue-600 after:h-0.5 after:w-0 after:left-0 after:bottom-0 after:transition-all after:duration-300 hover:after:w-full"
                >
                  SignIn
                </a>
              </li>
            ) : (
              <li>
                <a
                  href="/logout"
                  className="text-blue-900 hover:text-blue-600 text-lg font-medium relative after:absolute after:bg-blue-600 after:h-0.5 after:w-0 after:left-0 after:bottom-0 after:transition-all after:duration-300 hover:after:w-full"
                >
                  Logout
                </a>
              </li>
            )}
          </ul>
        </div>
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white shadow-lg">
            <ul className="flex flex-col items-center space-y-4 py-4">
              <li>
                <a
                  href="/"
                  className="text-blue-900 hover:text-blue-600 text-lg font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/aboutus"
                  className="text-blue-900 hover:text-blue-600 text-lg font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="/catalog"
                  className="text-blue-900 hover:text-blue-600 text-lg font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Find Doctor
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="text-blue-900 hover:text-blue-600 text-lg font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </a>
              </li>
              {!auth.isAuthenticated ? (
                <li>
                  <a
                    href="/loginComponent"
                    className="text-blue-900 hover:text-blue-600 text-lg font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    SignIn
                  </a>
                </li>
              ) : (
                <li>
                  <a
                    href="/logout"
                    className="text-blue-900 hover:text-blue-600 text-lg font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Logout
                  </a>
                </li>
              )}
            </ul>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section
        className="pt-48 pb-32 px-4 bg-cover bg-no-repeat"
        style={{
          backgroundImage: `url('https://prohealth-react.vercel.app/images/home_1/hero_bg.jpeg')`,
        }}
      >
        <div className="container mx-auto flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-6xl md:text-7xl font-bold text-blue-900 mb-6">
              Your Partner in Health and Wellness
            </h1>
            <p className="text-xl text-gray-700 mb-8">
              We are committed to providing you with the best medical and
              healthcare services to help you live healthier and happier.
            </p>
            <div className="container mx-auto">
              {/* Button */}
              <button
                className="bg-blue-600 text-white px-8 py-4 text-lg rounded-full flex items-center hover:bg-blue-700 transition duration-300"
                onClick={handleButtonClick}
              >
                <FaPlay className="mr-2" /> See how we work
              </button>

              {/* Modal for YouTube Video */}
              {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
                  <div className="relative w-full max-w-3xl p-4">
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                      <button
                        className="absolute top-2 right-2 text-black bg-gray-200 hover:bg-gray-300 rounded-full p-2"
                        onClick={handleCloseModal}
                      >
                        ✕
                      </button>
                      {youtubeID ? (
                        <iframe
                          className="w-full h-96"
                          src={`https://www.youtube.com/embed/${youtubeID}`}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      ) : (
                        <div className="bg-[#86EFAC] rounded-xl p-8 text-center">
                          <p className="text-2xl text-[#16A34A]">
                            No video available.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="md:w-1/2 relative">
            <img
              src={HeroImage}
              alt="Doctors"
              className="w-full max-w-3xl mx-auto"
            />
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-16 bg-gradient-to-r from-white via-blue-50 to-blue-100">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0 relative">
            <img
              src={about}
              alt="Medical professionals"
              className="rounded-lg"
            />
          </div>
          <div className="md:w-1/2 md:pl-12">
            <h2 className="text-4xl font-bold text-blue-900 mb-2">About Us</h2>
            <h3 className="text-2xl font-semibold text-blue-700 mb-4">
              PRO HEALTH
            </h3>
            <div className="flex items-start mb-4">
              <svg
                className="w-6 h-6 mr-2 text-blue-500 flex-shrink-0 mt-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="text-lg text-gray-700">
                ProHealth is a team of experienced medical professionals
              </p>
            </div>
            <p className="text-gray-600 mb-6">
              Dedicated to providing top-quality healthcare services. We believe
              in a holistic approach to healthcare that focuses on treating the
              whole person, not just the illness or symptoms.
            </p>
          </div>
        </div>
      </section>


{/* Reviews Section */}
<div>
<section className="py-16 bg-white">
  <div className="container mx-auto px-4">
    <h2 className="text-4xl font-bold text-blue-900 text-center mb-4">
      Some Reviews
    </h2>
    <h3 className="text-2xl font-semibold text-blue-700 text-center mb-12">
      OF OUR CLIENTS
    </h3>
    <div className="max-w-4xl mx-auto">
      {/* For small screens, show one review at a time */}
      <div className="block md:hidden">
        <div className="relative">
          <div className="bg-white rounded-lg p-6 shadow-lg h-full flex flex-col">
            <div className="flex items-center mb-4">
              <div>
                <h4 className="text-lg font-semibold">
                  {reviews[currentReview].name}
                </h4>
                <p className="text-gray-600 text-sm">
                  {reviews[currentReview].location}
                </p>
              </div>
            </div>
            <p className="text-gray-700 mb-4 flex-grow">
              {reviews[currentReview].text}
            </p>
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.floor(reviews[currentReview].rating)
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
          </div>
          <div className="flex justify-center mt-8">
            <button
              onClick={prevReview}
              className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition duration-300 mx-2"
            >
              Previous
            </button>
            <button
              onClick={nextReview}
              className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition duration-300 mx-2"
            >
              Next
            </button>
          </div>
        </div>
      </div>
      {/* For medium and larger screens, show reviews in a grid */}
      <div className="hidden md:flex items-stretch">
        {reviews.map((review, index) => (
          <div
            key={index}
            className="w-full md:w-1/3 px-4 mb-8 md:mb-0"
          >
            <div className="bg-white rounded-lg p-6 shadow-lg h-full flex flex-col">
              <div className="flex items-center mb-4">
                <div>
                  <h4 className="text-lg font-semibold">{review.name}</h4>
                  <p className="text-gray-600 text-sm">
                    {review.location}
                  </p>
                </div>
              </div>
              <p className="text-gray-700 mb-4 flex-grow">
                {review.text}
              </p>
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(review.rating)
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
</section>
</div>
      {/* Values Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-blue-900 text-center mb-12">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ValueCard
              icon={<HeartIcon />}
              title="Compassion"
              description="We understand that seeking medical care can be a stressful and emotional experience, and we strive to create a welcoming and supportive environment that puts our patients at ease and every one."
            />
            <ValueCard
              icon={<LightbulbIcon />}
              title="Excellence"
              description="We are committed to providing excellent medical care and services to our patients. We believe in continuously improving our skills, knowledge, and resources to ensure that we deliver the highest quality care possible."
            />
            <ValueCard
              icon={<HandshakeIcon />}
              title="Integrity"
              description="We believe in practicing medicine with integrity and honesty. We are transparent in our communication and decision-making processes, and we always put our patient's interests first & provide best solution."
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 md:w-2/3 mx-auto">
            <ValueCard
              icon={<RespectIcon />}
              title="Respect"
              description="We treat all individuals with respect and dignity, regardless of their background, beliefs, or circumstances. We believe that every person deserves to be treated with compassion and kindness."
            />
            <ValueCard
              icon={<TeamworkIcon />}
              title="Teamwork"
              description="We believe in working collaboratively with our team members and other healthcare professionals to provide comprehensive and effective care to our patients."
            />
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-white relative overflow-hidden">
        <div className="container mx-auto flex flex-col md:flex-row items-center">
          <div className="md:w-1/2">
            <div className="p-10 rounded-xl bg-gradient-to-r from-blue-100 to-blue-200 shadow-lg ">
              <h2 className="text-4xl font-bold text-blue-900 mb-4">
                Don't Let Your Health Take a Backseat!
              </h2>
              <p className="text-lg text-gray-700">
                Schedule an appointment with one of our experienced medical
                professionals today!
              </p>
            </div>
          </div>
          <div className="md:w-1/2 relative flex justify-center mt-8 md:mt-0">
            <div className="relative">
              <img
                src={cta}
                alt="Doctor"
                className="w-[500px] h-[500px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-blue-900 text-center mb-8">
            Frequently Asked Questions
          </h2>
          <h3 className="text-2xl font-semibold text-blue-700 text-center mb-12">
            All About Physical Therapy
          </h3>

          <div className="max-w-4xl mx-auto">
            {faqData.map((faq, index) => (
              <div key={index} className="mb-4">
                <button
                  className="flex justify-between items-center w-full text-left text-xl font-semibold text-blue-900 bg-blue-50 p-4 rounded-lg focus:outline-none"
                  onClick={() => toggleFAQ(index)}
                >
                  {faq.question}
                  <span
                    className={`transform transition-transform duration-300 ${
                      openFAQ === index ? "rotate-180" : ""
                    }`}
                  >
                    ▼
                  </span>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openFAQ === index
                      ? "max-h-96 opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="text-gray-700 p-4 bg-blue-50 rounded-b-lg">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#307BC4] text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-center text-center">
            <h3 className="text-lg font-semibold">TheraWell</h3>
            <p>© 2024 All rights reserved.</p>
            <div className="flex space-x-6 mt-4">
              <a href="#" className="hover:text-gray-300 transition">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-gray-300 transition">
                Terms of Service
              </a>
              <a href="#" className="hover:text-gray-300 transition">
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

const StatCard = ({ icon, number, text }) => (
  <div className="flex items-center mb-8 md:mb-0">
    <div className="bg-blue-100 p-6 rounded-full mr-4">{icon}</div>
    <div>
      <h3 className="text-3xl font-bold text-blue-900">{number}</h3>
      <p className="text-gray-600">{text}</p>
    </div>
  </div>
);

const ValueCard = ({ icon, title, description }) => (
  <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center">
    <div className="text-4xl mb-6 text-blue-600">{icon}</div>
    <h3 className="text-2xl font-semibold text-blue-900 mb-4">{title}</h3>
    <p className="text-gray-500 leading-relaxed">{description}</p>
  </div>
);

// Icon components
const HeartIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-12 w-12"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

const LightbulbIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-12 w-12"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7zm2.85 11.1l-.85.6V16h-4v-2.3l-.85-.6C7.8 12.16 7 10.63 7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.8 3.16-2.15 4.1z" />
  </svg>
);

const HandshakeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-12 w-12"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M6.2 9.4C6.7 8.9 7.3 8.7 8 8.7s1.3 0.2 1.8 0.7l1.7 1.7 5.8-5.8c0.5-0.5 1.1-0.7 1.8-0.7s1.3 0.2 1.8 0.7 0.7 1.1 0.7 1.8 -0.2 1.3-0.7 1.8L14.6 15c-0.5 0.5-1.1 0.7-1.8 0.7s-1.3-0.2-1.8-0.7l-1.7-1.7 -3.9 3.9c-0.5 0.5-1.1 0.7-1.8 0.7s-1.3-0.2-1.8-0.7 -0.7-1.1-0.7-1.8 0.2-1.3 0.7-1.8L6.2 9.4z" />
  </svg>
);

const RespectIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-12 w-12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"></path>
    <path d="M12 5.5v13"></path>
    <path d="M5 12h14"></path>
  </svg>
);

const TeamworkIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-12 w-12"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
  </svg>
);

export default Home;
