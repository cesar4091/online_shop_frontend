import { useState } from 'react';
import StandardButton from '../components/StandardButton';
import { useNavigate, Link } from 'react-router-dom';
import HomeButton from '../components/neumaniaticosButton';
import { loginUser } from '../services/authService.js';
import { useAuth } from '../hooks/useAuth.js';

export default function LoginPage() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

        // Limpiamos el error cuando el usuario empieza a escribir de nuevo
        if (error) setError(null);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Logging in with:", { formData });
        setIsLoading(true);
        setError(null);
        try {
            await login(formData); // Llama al Context -> Service -> API
            navigate('/'); // Si no hay error, redirige
        } catch (err) {
            setError(err.message || 'Error en inicio de sesión');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-brand-light p-4">

            {/* Card Container */}
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-slate-100">
                <HomeButton />
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-slate-900">Welcome Back</h1>
                    <p className="text-slate-500 mt-2">Please enter your details to sign in</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            required
                            className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-militar focus:border-transparent transition-all"
                            placeholder="name@company.com"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="relative">
                        <div className="flex justify-between items-center mb-1">
                            <label className="text-sm font-semibold text-slate-700">Password</label>
                            <a href="#" className="text-xs font-medium text-blue-600 hover:underline">Forgot?</a>
                        </div>
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            required
                            className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-militar transition-all"
                            placeholder="•••"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        {/* Toggle Visibility Icon/Button */}
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-9.5 text-slate-400 hover:text-slate-600"
                        >
                            {showPassword ? "Hide" : "Show"}
                        </button>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg text-center font-medium border border-red-100">
                            {error}
                        </div>
                    )}

                    <StandardButton type="submit" className='w-full' disabled={isLoading}>
                        {isLoading ? 'Ingresando...' : 'Iniciar Sesión'}
                    </StandardButton>
                </form>

                {/* Divider */}
                <div className="relative my-8 text-center text-sm after:content-[''] after:absolute after:top-1/2 after:left-0 after:w-full after:h-px after:bg-slate-100 after:-z-10">
                    <span className="bg-white px-4 text-slate-400">or continue with</span>
                </div>

                {/* Social Buttons */}
                <div className="w-2/3 flex flex-col gap-4 mx-auto">
                    <button className="flex items-center justify-center gap-2 p-2 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors text-sm font-medium">
                        <img src="src/assets/logos/google-icon.png" className="w-4 h-4" alt="Google" />Sign In with Google
                    </button>

                </div>

                <p className="text-center text-slate-500 text-sm mt-8">
                    <Link className="text-blue-600 font-semibold hover:underline" to="/register" >Don't have an account? Click here to register</Link>
                </p>
            </div>
        </div>
    );
}