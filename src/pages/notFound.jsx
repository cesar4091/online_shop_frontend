import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-5 text-center">
      <h1 className="text-9xl font-black text-gray-200">404</h1>
      
      <div className="absolute">
        <h2 className="text-2xl md:text-4xl font-bold text-slate-900 mt-4">
          Oops! Page not found.
        </h2>
        <p className="text-slate-500 mt-2 mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        
        <Link 
          to="/" 
          className="px-6 py-3 bg-black text-white rounded-full font-semibold hover:bg-brand-dark transition-all shadow-lg shadow-gray-700"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}