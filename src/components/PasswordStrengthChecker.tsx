'use client';
import { useState, useEffect } from 'react';
import { FaLock, FaCheck, FaTimes, FaShieldAlt, FaInfoCircle } from 'react-icons/fa';

const PasswordStrengthChecker = () => {
  const [password, setPassword] = useState('');
  const [strength, setStrength] = useState(0);
  const [feedback, setFeedback] = useState<string[]>([]);
  const [showPassword, setShowPassword] = useState(false);

  // Check password strength
  useEffect(() => {
    if (!password) {
      setStrength(0);
      setFeedback([]);
      return;
    }

    let currentStrength = 0;
    const newFeedback: string[] = [];

    // Length check
    if (password.length >= 8) {
      currentStrength += 20;
    } else {
      newFeedback.push('Use at least 8 characters');
    }

    // Uppercase check
    if (/[A-Z]/.test(password)) {
      currentStrength += 20;
    } else {
      newFeedback.push('Include uppercase letters');
    }

    // Lowercase check
    if (/[a-z]/.test(password)) {
      currentStrength += 20;
    } else {
      newFeedback.push('Include lowercase letters');
    }

    // Number check
    if (/\d/.test(password)) {
      currentStrength += 20;
    } else {
      newFeedback.push('Include numbers');
    }

    // Special character check
    if (/[^A-Za-z0-9]/.test(password)) {
      currentStrength += 20;
    } else {
      newFeedback.push('Include special characters');
    }

    setStrength(currentStrength);
    setFeedback(newFeedback);
  }, [password]);

  // Get strength label and color
  const getStrengthLabel = () => {
    if (strength === 0) return { label: 'None', color: 'bg-gray-300', textColor: 'text-gray-500' };
    if (strength < 40) return { label: 'Weak', color: 'bg-red-500', textColor: 'text-red-500' };
    if (strength < 80) return { label: 'Medium', color: 'bg-yellow-500', textColor: 'text-yellow-600' };
    return { label: 'Strong', color: 'bg-green-500', textColor: 'text-green-600' };
  };

  const strengthInfo = getStrengthLabel();

  return (
    <section id="password-checker" className="py-20 bg-gradient-to-b from-blue-50 to-white relative overflow-hidden">
      {/* Decorative Background Bubbles */}
      <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-blue-100 opacity-50 mix-blend-multiply"></div>
      <div className="absolute top-40 right-20 w-80 h-80 rounded-full bg-blue-100 opacity-40 mix-blend-multiply"></div>
      <div className="absolute bottom-10 left-1/4 w-72 h-72 rounded-full bg-indigo-100 opacity-40 mix-blend-multiply"></div>
      <div className="absolute -bottom-20 right-1/3 w-96 h-96 rounded-full bg-blue-50 opacity-60 mix-blend-multiply"></div>
      
      {/* Irregular Shapes */}
      <div className="absolute top-1/4 right-1/4 w-40 h-40 bg-blue-100 opacity-30 rounded-tr-[70%] rounded-bl-[60%] rounded-tl-[40%] rounded-br-[50%] transform rotate-12"></div>
      <div className="absolute bottom-1/3 left-20 w-52 h-52 bg-indigo-100 opacity-30 rounded-tr-[40%] rounded-bl-[70%] rounded-tl-[60%] rounded-br-[50%] transform -rotate-12"></div>
      <div className="absolute top-10 right-10 w-32 h-32 bg-blue-200 opacity-20 rounded-tr-[60%] rounded-bl-[50%] rounded-tl-[70%] rounded-br-[40%] transform rotate-45"></div>
      <div className="absolute bottom-20 right-20 w-48 h-48 bg-indigo-200 opacity-20 rounded-tr-[50%] rounded-bl-[40%] rounded-tl-[60%] rounded-br-[70%] transform -rotate-15"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-block p-4 bg-blue-100 rounded-full mb-6 shadow-lg">
            <FaShieldAlt className="text-5xl text-blue-600" />
          </div>
          <h2 className="text-4xl font-extrabold mb-4 text-gray-800">
            Password Strength Checker
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Ensure your digital security with our password strength analyzer. 
            Test your passwords against industry standards.
          </p>
        </div>

        <div className="max-w-xl mx-auto  rounded-2xl shadow-xl overflow-hidden backdrop-blur-sm bg-white/90">
          <div className="p-8 md:p-10">
            <div className="mb-6">
              <label htmlFor="password" className="block text-lg font-semibold text-gray-700 mb-3">
                Enter a password to check
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-5 py-4 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  placeholder="Type your password here..."
                />
                <button 
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {password && (
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className={`text-lg font-bold ${strengthInfo.textColor}`}>
                      {strengthInfo.label}
                    </span>
                    <span className="text-lg font-medium text-gray-700">{strength}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div 
                      className={`h-3 rounded-full transition-all duration-500 ${strengthInfo.color}`} 
                      style={{ width: `${strength}%` }}
                    ></div>
                  </div>
                </div>

                {feedback.length > 0 && (
                  <div className="bg-red-50 p-5 rounded-lg border border-red-100">
                    <h3 className="text-lg font-semibold text-red-700 mb-3 flex items-center">
                      <FaInfoCircle className="mr-2" /> Improve your password:
                    </h3>
                    <ul className="space-y-2">
                      {feedback.map((item, index) => (
                        <li key={index} className="flex items-center text-red-600">
                          <FaTimes className="mr-2 flex-shrink-0" /> 
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {feedback.length === 0 && (
                  <div className="bg-green-50 p-5 rounded-lg border border-green-100">
                    <div className="flex items-center text-green-700 font-medium">
                      <FaCheck className="mr-2 text-lg" /> 
                      <span>Excellent! Your password meets all security requirements.</span>
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-100">
              <h3 className="text-lg font-semibold text-blue-800 mb-3 flex items-center">
                <FaLock className="mr-2" /> Password Security Tips
              </h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <li className="flex items-start">
                  <div className="bg-blue-200 p-1 rounded-full mr-2 mt-0.5">
                    <FaCheck className="text-xs text-blue-700" />
                  </div>
                  <span className="text-gray-700">At least 8 characters</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-blue-200 p-1 rounded-full mr-2 mt-0.5">
                    <FaCheck className="text-xs text-blue-700" />
                  </div>
                  <span className="text-gray-700">Uppercase letters (A-Z)</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-blue-200 p-1 rounded-full mr-2 mt-0.5">
                    <FaCheck className="text-xs text-blue-700" />
                  </div>
                  <span className="text-gray-700">Lowercase letters (a-z)</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-blue-200 p-1 rounded-full mr-2 mt-0.5">
                    <FaCheck className="text-xs text-blue-700" />
                  </div>
                  <span className="text-gray-700">Numbers (0-9)</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-blue-200 p-1 rounded-full mr-2 mt-0.5">
                    <FaCheck className="text-xs text-blue-700" />
                  </div>
                  <span className="text-gray-700">Special characters (!@#$)</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-blue-200 p-1 rounded-full mr-2 mt-0.5">
                    <FaCheck className="text-xs text-blue-700" />
                  </div>
                  <span className="text-gray-700">Avoid common patterns</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PasswordStrengthChecker;
