'use client';
import { useState, useEffect } from 'react';
import { FaLock, FaCheck, FaTimes, FaShieldAlt, FaInfoCircle, FaClock, FaExclamationTriangle } from 'react-icons/fa';

const PasswordStrengthChecker = () => {
  const [password, setPassword] = useState('');
  const [strength, setStrength] = useState(0);
  const [feedback, setFeedback] = useState<string[]>([]);
  const [showPassword, setShowPassword] = useState(false);
  const [crackTime, setCrackTime] = useState<{
    time: string;
    color: string;
    severity: 'instant' | 'very-weak' | 'weak' | 'moderate' | 'strong' | 'very-strong';
    description: string;
  } | null>(null);

  // Check password strength and calculate crack time
  useEffect(() => {
    // Format crack time function
    const formatCrackTime = (seconds: number) => {
      const minute = 60;
      const hour = minute * 60;
      const day = hour * 24;
      const month = day * 30;
      const year = day * 365;
      const century = year * 100;
      const millennium = year * 1000;

      let time: string;
      let severity: 'instant' | 'very-weak' | 'weak' | 'moderate' | 'strong' | 'very-strong';
      let color: string;
      let description: string;

      if (seconds < 1) {
        time = "Instantly";
        severity = "instant";
        color = "text-red-600";
        description = "This password can be cracked immediately";
      } else if (seconds < minute) {
        time = `${Math.ceil(seconds)} seconds`;
        severity = "very-weak";
        color = "text-red-600";
        description = "Extremely vulnerable to attacks";
      } else if (seconds < hour) {
        time = `${Math.ceil(seconds / minute)} minutes`;
        severity = "very-weak";
        color = "text-red-500";
        description = "Very weak protection";
      } else if (seconds < day) {
        time = `${Math.ceil(seconds / hour)} hours`;
        severity = "weak";
        color = "text-orange-500";
        description = "Weak protection against attacks";
      } else if (seconds < month) {
        time = `${Math.ceil(seconds / day)} days`;
        severity = "weak";
        color = "text-yellow-600";
        description = "Limited protection";
      } else if (seconds < year) {
        time = `${Math.ceil(seconds / month)} months`;
        severity = "moderate";
        color = "text-yellow-500";
        description = "Moderate protection";
      } else if (seconds < century) {
        const years = Math.ceil(seconds / year);
        time = years === 1 ? "1 year" : `${years} years`;
        severity = "strong";
        color = "text-green-500";
        description = "Good protection against most attacks";
      } else if (seconds < millennium) {
        time = `${Math.ceil(seconds / century)} centuries`;
        severity = "very-strong";
        color = "text-green-600";
        description = "Excellent protection";
      } else {
        time = "Millions of years";
        severity = "very-strong";
        color = "text-green-700";
        description = "Outstanding protection";
      }

      return { time, color, severity, description };
    };

    // Calculate password cracking time
    const calculateCrackTime = (password: string) => {
      if (!password) return null;

      // Character set sizes
      const charSets = {
        lowercase: 26,
        uppercase: 26,
        numbers: 10,
        symbols: 32, // Common symbols
        extendedSymbols: 95 // All printable ASCII
      };

      // Determine character set size
      let charSetSize = 0;
      if (/[a-z]/.test(password)) charSetSize += charSets.lowercase;
      if (/[A-Z]/.test(password)) charSetSize += charSets.uppercase;
      if (/\d/.test(password)) charSetSize += charSets.numbers;
      if (/[^A-Za-z0-9]/.test(password)) charSetSize += charSets.symbols;

      // Calculate total possible combinations
      const totalCombinations = Math.pow(charSetSize, password.length);
      
      // Average attempts needed (half of total combinations)
      const averageAttempts = totalCombinations / 2;

      // Estimated attempts per second for different attack scenarios
      const attackSpeeds = {
        online: 1000, // 1,000 attempts per second (online attack with rate limiting)
        offline: 1000000000, // 1 billion attempts per second (offline attack with modern hardware)
        distributed: 100000000000 // 100 billion attempts per second (distributed/GPU attack)
      };

      // Use offline attack speed as baseline (more realistic for stolen hash scenarios)
      const secondsToCrack = averageAttempts / attackSpeeds.offline;

      return formatCrackTime(secondsToCrack);
    };

    if (!password) {
      setStrength(0);
      setFeedback([]);
      setCrackTime(null);
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
    setCrackTime(calculateCrackTime(password));
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
            Test your passwords against industry standards and see how long it would take hackers to crack them.
          </p>
        </div>

        <div className="max-w-xl mx-auto rounded-2xl shadow-xl overflow-hidden backdrop-blur-sm bg-white/90">
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

                {/* Crack Time Display */}
                {crackTime && (
                  <div className={`p-5 rounded-lg border ${
                    crackTime.severity === 'instant' || crackTime.severity === 'very-weak' 
                      ? 'bg-red-50 border-red-200' 
                      : crackTime.severity === 'weak' 
                      ? 'bg-orange-50 border-orange-200'
                      : crackTime.severity === 'moderate'
                      ? 'bg-yellow-50 border-yellow-200'
                      : 'bg-green-50 border-green-200'
                  }`}>
                    <h3 className="text-lg font-semibold mb-3 flex items-center">
                      <FaClock className="mr-2" />
                      <span className={crackTime.color}>Time to Crack</span>
                      {(crackTime.severity === 'instant' || crackTime.severity === 'very-weak') && (
                        <FaExclamationTriangle className="ml-2 text-red-500" />
                      )}
                    </h3>
                    <div className="space-y-2">
                      <p className={`text-2xl font-bold ${crackTime.color}`}>
                        {crackTime.time}
                      </p>
                      <p className="text-sm text-gray-600">
                        {crackTime.description}
                      </p>
                      <p className="text-xs text-gray-500">
                        *Estimated time for offline brute-force attack using modern hardware
                      </p>
                    </div>
                  </div>
                )}

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

            {/* Additional Security Information */}
            <div className="mt-6 p-6 bg-gray-50 rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                <FaInfoCircle className="mr-2" /> How Crack Time is Calculated
              </h3>
              <div className="text-sm text-gray-600 space-y-2">
                <p>
                  <strong>Attack Method:</strong> Offline brute-force attack using modern hardware
                </p>
                <p>
                  <strong>Attack Speed:</strong> ~1 billion attempts per second
                </p>
                <p>
                  <strong>Calculation:</strong> Based on character set size and password length
                </p>
                <p className="text-xs text-gray-500 mt-3">
                  Note: Real-world attacks may use dictionary attacks, rainbow tables, or social engineering, 
                  which could significantly reduce crack time for weak passwords.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PasswordStrengthChecker;
