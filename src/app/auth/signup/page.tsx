'use client';

import { useState, FormEvent, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { signIn } from 'next-auth/react';
import { Shield, Lock, Mail, Eye, EyeOff, AlertCircle, ArrowRight, User } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';
import Image from 'next/image';
import logoImage from '@/images/Logoimage.png'

export default function SignupPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
  });
  
  // Password strength states
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [passwordFeedback, setPasswordFeedback] = useState<string[]>([]);

  // Check password strength
  useEffect(() => {
    if (!formData.password) {
      setPasswordStrength(0);
      setPasswordFeedback([]);
      return;
    }

    let currentStrength = 0;
    const newFeedback: string[] = [];

    // Length check
    if (formData.password.length >= 8) {
      currentStrength += 20;
    } else {
      newFeedback.push('Use at least 8 characters');
    }

    // Uppercase check
    if (/[A-Z]/.test(formData.password)) {
      currentStrength += 20;
    } else {
      newFeedback.push('Include uppercase letters');
    }

    // Lowercase check
    if (/[a-z]/.test(formData.password)) {
      currentStrength += 20;
    } else {
      newFeedback.push('Include lowercase letters');
    }

    // Number check
    if (/\d/.test(formData.password)) {
      currentStrength += 20;
    } else {
      newFeedback.push('Include numbers');
    }

    // Special character check
    if (/[^A-Za-z0-9]/.test(formData.password)) {
      currentStrength += 20;
    } else {
      newFeedback.push('Include special characters');
    }

    setPasswordStrength(currentStrength);
    setPasswordFeedback(newFeedback);
  }, [formData.password]);

  // Get strength label and color
  const getStrengthLabel = () => {
    if (passwordStrength === 0) return { label: 'None', color: 'bg-gray-300', textColor: 'text-gray-500' };
    if (passwordStrength < 40) return { label: 'Weak', color: 'bg-red-500', textColor: 'text-red-500' };
    if (passwordStrength < 80) return { label: 'Medium', color: 'bg-yellow-500', textColor: 'text-yellow-600' };
    return { label: 'Strong', color: 'bg-green-500', textColor: 'text-green-600' };
  };

  const strengthInfo = getStrengthLabel();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { name: '', email: '', password: '' };
    
    if (!formData.name) {
      newErrors.name = 'Name is required';
      valid = false;
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
      valid = false;
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
      valid = false;
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
      valid = false;
    } else if (passwordStrength < 60) {
      // Require at least a medium-strength password
      newErrors.password = 'Password is too weak';
      valid = false;
    }
    
    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      setLoading(true);
      
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }
      
      toast.success('Account created successfully!');
      
      // Sign in the user automatically after signup
      const signInResult = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });
      
      if (signInResult?.error) {
        throw new Error(signInResult.error);
      }
      
      // Redirect to payment page instead of login
      router.push('/payment');
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message || 'Failed to create account');
      } else {
        toast.error('Failed to create account');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      setLoading(true);
      // The redirect to payment will be handled by NextAuth callback
      await signIn('google', { callbackUrl: '/payment' });
    } catch (error: unknown) {
      console.error('Google sign-up error:', error);
      toast.error('Google sign-in failed');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="flex-1 flex items-center justify-center p-6 md:p-10 bg-gray-50">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <Link href="/" className="flex items-center justify-center mb-8">
              <Image 
                src={logoImage} 
                alt="PCD System Logo" 
                height={32} 
                width={32} 
                className="mr-2" 
              />
            <span className="text-xl font-bold text-blue-600">PCD System</span>
          </Link>
          
          <div className="bg-white rounded-xl shadow-xl p-8 border border-gray-100">
            <h2 className="text-2xl text-center font-serif font-bold text-gray-900 mb-2">Create Account</h2>
            <p className="text-blue-600 text-center mb-6">Join our secure platform today</p>
            
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    className={`block w-full pl-10 pr-3 py-2.5 border ${
                      errors.name ? 'border-red-500' : 'border-gray-300'
                    } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900`}
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.name}
                  </p>
                )}
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className={`block w-full pl-10 pr-3 py-2.5 border ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900`}
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.email}
                  </p>
                )}
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    className={`block w-full pl-10 pr-10 py-2.5 border ${
                      errors.password ? 'border-red-500' : 'border-gray-300'
                    } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900`}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.password}
                  </p>
                )}
                
                {/* Password Strength Indicator */}
                {formData.password && (
                  <div className="mt-3 space-y-2">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className={`text-sm font-medium ${strengthInfo.textColor}`}>
                          {strengthInfo.label}
                        </span>
                        <span className="text-sm font-medium text-gray-700">{passwordStrength}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                        <div 
                          className={`h-2 rounded-full transition-all duration-500 ${strengthInfo.color}`} 
                          style={{ width: `${passwordStrength}%` }}
                        ></div>
                      </div>
                    </div>

                    {passwordFeedback.length > 0 && (
                      <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                        <p className="text-xs font-medium text-gray-700 mb-1">Improve your password:</p>
                        <ul className="space-y-1">
                          {passwordFeedback.map((item, index) => (
                            <li key={index} className="flex items-center text-xs text-gray-600">
                              <AlertCircle className="h-3 w-3 mr-1 text-amber-500" /> 
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {passwordFeedback.length === 0 && (
                      <div className="bg-green-50 p-3 rounded-lg border border-green-100">
                        <div className="flex items-center text-xs text-green-700">
                          <Shield className="h-3 w-3 mr-1" /> 
                          <span>Strong password! All security requirements met.</span>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              <div className="flex items-center">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  required
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                  I agree to the{' '}
                  <Link href="/legal?tab=terms-of-service" className="text-blue-600 hover:text-blue-500">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link href="/legal?tab=privacy-policy" className="text-blue-600 hover:text-blue-500">
                    Privacy Policy
                  </Link>
                </label>
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
              >
                {loading ? (
                  <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating account...
                  </div>
                ) : (
                  <div className="flex items-center">
                    Create Account
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                )}
              </button>
            </form>
            
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>
              
              <div className="mt-6">
                <button
                  type="button"
                  onClick={handleGoogleSignup}
                  disabled={loading}
                  className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <FcGoogle className="h-5 w-5 mr-2" />
                  Sign up with Google
                </button>
              </div>
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link href="/auth/login" className="font-medium text-blue-600 hover:text-blue-500">
                Sign in instead
              </Link>
            </p>
          </div>
          
          {/* Password Security Tips */}
          <div className="mt-8 bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
              <Shield className="h-4 w-4 mr-1 text-blue-600" /> Password Security Tips
            </h3>
            <ul className="grid grid-cols-2 gap-2">
              <li className="flex items-start text-xs text-gray-600">
                <div className="bg-blue-100 p-0.5 rounded-full mr-1 mt-0.5">
                  <ArrowRight className="h-2 w-2 text-blue-600" />
                </div>
                <span>At least 8 characters</span>
              </li>
              <li className="flex items-start text-xs text-gray-600">
                <div className="bg-blue-100 p-0.5 rounded-full mr-1 mt-0.5">
                  <ArrowRight className="h-2 w-2 text-blue-600" />
                </div>
                <span>Uppercase letters (A-Z)</span>
              </li>
              <li className="flex items-start text-xs text-gray-600">
                <div className="bg-blue-100 p-0.5 rounded-full mr-1 mt-0.5">
                  <ArrowRight className="h-2 w-2 text-blue-600" />
                </div>
                <span>Lowercase letters (a-z)</span>
              </li>
              <li className="flex items-start text-xs text-gray-600">
                <div className="bg-blue-100 p-0.5 rounded-full mr-1 mt-0.5">
                  <ArrowRight className="h-2 w-2 text-blue-600" />
                </div>
                <span>Numbers (0-9)</span>
              </li>
              <li className="flex items-start text-xs text-gray-600">
                <div className="bg-blue-100 p-0.5 rounded-full mr-1 mt-0.5">
                  <ArrowRight className="h-2 w-2 text-blue-600" />
                </div>
                <span>Special characters (!@#$)</span>
              </li>
              <li className="flex items-start text-xs text-gray-600">
                <div className="bg-blue-100 p-0.5 rounded-full mr-1 mt-0.5">
                  <ArrowRight className="h-2 w-2 text-blue-600" />
                </div>
                <span>Avoid common patterns</span>
              </li>
            </ul>
          </div>
          
          {/* Security badges */}
          <div className="mt-6">
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center bg-white px-3 py-2 rounded-lg shadow-sm border border-gray-100">
                <div className="bg-green-100 p-1.5 rounded-full mr-2">
                  <Lock className="h-4 w-4 text-green-600" />
                </div>
                <span className="text-xs text-gray-600">256-bit Encryption</span>
              </div>
              
              <div className="flex items-center bg-white px-3 py-2 rounded-lg shadow-sm border border-gray-100">
                <div className="bg-blue-100 p-1.5 rounded-full mr-2">
                  <Shield className="h-4 w-4 text-blue-600" />
                </div>
                <span className="text-xs text-gray-600">Secure Login</span>
              </div>
              
              <div className="flex items-center bg-white px-3 py-2 rounded-lg shadow-sm border border-gray-100">
                <div className="bg-purple-100 p-1.5 rounded-full mr-2">
                  <svg className="h-4 w-4 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <span className="text-xs text-gray-600">GDPR Compliant</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

