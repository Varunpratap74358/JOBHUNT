import React from 'react';

const JobPortalFooter = () => {
  return (
    <footer className="bg-gray-100 text-gray-800 py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-semibold mb-4 text-blue-700">JobPortal</h3>
            <p className="text-gray-600 mb-4">
              Your trusted platform to find jobs that suit your passion. We connect talent with the right opportunities.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-blue-600 transition duration-300">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="hover:text-blue-600 transition duration-300">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="hover:text-blue-600 transition duration-300">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="#" className="hover:text-blue-600 transition duration-300">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>

          {/* Job Seekers Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-blue-700">For Job Seekers</h3>
            <ul className="space-y-2">
              <li className="hover:text-blue-600 transition duration-300">
                <a href="#">Browse Jobs</a>
              </li>
              <li className="hover:text-blue-600 transition duration-300">
                <a href="#">Create Resume</a>
              </li>
              <li className="hover:text-blue-600 transition duration-300">
                <a href="#">Job Alerts</a>
              </li>
              <li className="hover:text-blue-600 transition duration-300">
                <a href="#">Career Advice</a>
              </li>
            </ul>
          </div>

          {/* Employers Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-blue-700">For Employers</h3>
            <ul className="space-y-2">
              <li className="hover:text-blue-600 transition duration-300">
                <a href="#">Post a Job</a>
              </li>
              <li className="hover:text-blue-600 transition duration-300">
                <a href="#">Search Resumes</a>
              </li>
              <li className="hover:text-blue-600 transition duration-300">
                <a href="#">Employer Dashboard</a>
              </li>
              <li className="hover:text-blue-600 transition duration-300">
                <a href="#">Pricing</a>
              </li>
            </ul>
          </div>

          {/* Newsletter Subscription */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-blue-700">Stay Updated</h3>
            <p className="text-gray-600 mb-4">Subscribe to get the latest job postings and updates directly to your inbox.</p>
            <form className="flex flex-col space-y-3">
              <input
                type="email"
                className="px-4 py-2 bg-gray-200 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                placeholder="Enter your email"
              />
              <button className="px-4 py-2 bg-blue-700 hover:bg-blue-600 transition duration-300 rounded text-white font-semibold">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-300 mt-8 pt-4 text-center lg:text-left">
          <p className="text-gray-500">&copy; {new Date().getFullYear()} JobPortal. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default JobPortalFooter;
