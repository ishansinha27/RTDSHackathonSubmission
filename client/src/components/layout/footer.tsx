import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-gray-800">
      <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
              GpuFinder
            </h3>
            <p className="mt-4 text-base text-gray-300">
              Connecting users with the GPU resources they need for their projects.
            </p>
            <div className="mt-6 flex space-x-6">
              <Link href="#" className="text-gray-400 hover:text-gray-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z" />
                </svg>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-gray-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-gray-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
              </Link>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
              Resources
            </h3>
            <ul role="list" className="mt-4 space-y-4">
              <li><Link href="#" className="text-base text-gray-300 hover:text-white">Pricing</Link></li>
              <li><Link href="#" className="text-base text-gray-300 hover:text-white">Documentation</Link></li>
              <li><Link href="#" className="text-base text-gray-300 hover:text-white">Guides</Link></li>
              <li><Link href="#" className="text-base text-gray-300 hover:text-white">API Status</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
              Company
            </h3>
            <ul role="list" className="mt-4 space-y-4">
              <li><Link href="#" className="text-base text-gray-300 hover:text-white">About</Link></li>
              <li><Link href="#" className="text-base text-gray-300 hover:text-white">Blog</Link></li>
              <li><Link href="#" className="text-base text-gray-300 hover:text-white">Jobs</Link></li>
              <li><Link href="#" className="text-base text-gray-300 hover:text-white">Press</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
              Legal
            </h3>
            <ul role="list" className="mt-4 space-y-4">
              <li><Link href="#" className="text-base text-gray-300 hover:text-white">Privacy</Link></li>
              <li><Link href="#" className="text-base text-gray-300 hover:text-white">Terms</Link></li>
              <li><Link href="#" className="text-base text-gray-300 hover:text-white">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 border-t border-gray-700 pt-8">
          <p className="text-base text-gray-400 text-center">
            &copy; {new Date().getFullYear()} GpuFinder. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
