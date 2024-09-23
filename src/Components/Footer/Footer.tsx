import { FaFacebook, FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { useAuth } from "../Context/AuthContext";
import { BsQrCode } from "react-icons/bs";
import { Link } from "react-router-dom";

export default function Footer() {
  const { userToken } = useAuth();
  return (
    <>
      <footer className="bg-[#111827] text-white py-6">
        <div className="container mx-auto px-4">
          {!userToken && (
            <div className="text-center mb-4 md:mb-0">
              <Link to={'/login'}>
                <button className="bg-[#6028ff] text-white py-2 px-4 rounded-md hover:bg-[#6028ff]/70">
                  Sign in for more access
                </button>
              </Link>
            </div>
          )}
          <div className="w-full mt-10 flex flex-col items-center gap-y-4">
            {/* Social Media Section */}
            <div className="flex-grow text-center w-full md:w-1/2 mb-4 md:mb-0 py-5 border rounded-md border-gray-600 min-h-[50px]">
              <h2 className="mb-3 text-2xl">Follow FilmVoyage on social</h2>
              <div className="flex items-center gap-x-3 justify-center">
                <FaTiktok className="text-2xl" />
                <FaInstagram className="text-2xl" />
                <FaXTwitter className="text-2xl" />
                <FaYoutube className="text-2xl" />
                <FaFacebook className="text-2xl" />
              </div>
            </div>

            {/* App Download Section */}
            <div className="flex-grow text-center w-full md:w-1/2 mb-4 md:mb-0 py-5 border rounded-md border-gray-600 flex items-center justify-center px-2 gap-x-4 min-h-[50px]">
              <div className="flex flex-col justify-center">
                <p className="text-sm text-start">Get the FilmVoyag app</p>
                <p className="text-sm text-start">For Android and iOS</p>
              </div>
              <div className="mt-2">
                <BsQrCode className="text-4xl md:text-[4rem] ms-5 md:ms-[7rem]" />
              </div>
            </div>
          </div>

          {/* <!-- Legal Links --> */}
          <div className="flex flex-col md:flex-row justify-center md:justify-between items-center mt-6 text-gray-400 text-xs">
            <a href="#" className="hover:underline">
              Help
            </a>
            <a href="#" className="hover:underline">
              Site Index
            </a>
            <a href="#" className="hover:underline">
              FilmVoyagPro
            </a>
            <a href="#" className="hover:underline">
              Box Office Mojo
            </a>
            <a href="#" className="hover:underline">
              License FilmVoyag Data
            </a>
            <a href="#" className="hover:underline">
              Conditions of Use
            </a>
            <a href="#" className="hover:underline">
              Privacy Policy
            </a>
            <a href="#" className="hover:underline">
              Your Ads Privacy Choices
            </a>
          </div>

          {/* <!-- Company Info --> */}
          <div className="text-center mt-6">
            <p className="text-xs text-gray-500">
              © 1990-2024 by Film Voyage.com, Inc.
            </p>
            <p className="text-xs text-gray-500">An Amazon Company</p>
          </div>
        </div>
      </footer>
    </>
  );
}
