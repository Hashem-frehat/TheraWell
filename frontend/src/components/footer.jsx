import {
  FaHeart,
  FaStethoscope,
  FaHandsHelping,
  FaInstagram,
  FaFacebook,
  FaTwitter,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between mb-8">
          {/* Footer Columns */}
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-xl font-semibold mb-4">TheraWell</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-gray-400">
                <FaInstagram size={24} />
              </a>
              <a href="#" className="text-white hover:text-gray-400">
                <FaFacebook size={24} />
              </a>
              <a href="#" className="text-white hover:text-gray-400">
                <FaTwitter size={24} />
              </a>
            </div>
          </div>
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul>
              <li className="mb-2">
                <a href="#" className="hover:underline">
                  Find a Doctor
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:underline">
                  About Us
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:underline">
                  Contact Us
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:underline">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/3">
            <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
            <p>
              <strong>Email:</strong> therawell@gmail.com <br />
              <strong>Phone:</strong> +962786000975 <br />
              <strong>Address:</strong> Amman, Abdali
            </p>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-700 pt-6">
          <p className="text-center text-sm">
            &copy; {new Date().getFullYear()} TheraWell. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
