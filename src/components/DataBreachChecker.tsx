'use client';
import { useState } from 'react';
import { FaShieldAlt, FaExclamationTriangle, FaCheckCircle, FaSearch, FaEye, FaEyeSlash, FaInfoCircle, FaClock, FaUsers, FaDatabase } from 'react-icons/fa';

interface BreachData {
  Name: string;
  Title: string;
  Domain: string;
  BreachDate: string;
  AddedDate: string;
  ModifiedDate: string;
  PwnCount: number;
  Description: string;
  LogoPath: string;
  DataClasses: string[];
  IsVerified: boolean;
  IsFabricated: boolean;
  IsSensitive: boolean;
  IsRetired: boolean;
  IsSpamList: boolean;
  IsMalware: boolean;
  IsSubscriptionFree: boolean;
  IsStealerLog: boolean;
}

interface PasteData {
  Source: string;
  Id: string;
  Title: string;
  Date: string;
  EmailCount: number;
}

const DataBreachChecker = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailBreaches, setEmailBreaches] = useState<BreachData[]>([]);
  const [emailPastes, setEmailPastes] = useState<PasteData[]>([]);
  const [passwordBreaches, setPasswordBreaches] = useState<number | null>(null);
  const [loading, setLoading] = useState({ email: false, password: false });
  const [error, setError] = useState({ email: '', password: '' });
  const [lastChecked, setLastChecked] = useState({ email: '', password: '' });

  // Check email breaches using API route
  const checkEmailBreaches = async () => {
    if (!email || !isValidEmail(email)) {
      setError(prev => ({ ...prev, email: 'Please enter a valid email address' }));
      return;
    }

    setLoading(prev => ({ ...prev, email: true }));
    setError(prev => ({ ...prev, email: '' }));

    try {
      // Check breaches via API route
      const breachResponse = await fetch('/api/breach/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (breachResponse.ok) {
        const breaches = await breachResponse.json();
        setEmailBreaches(breaches);
      } else {
        const errorData = await breachResponse.json();
        if (breachResponse.status === 429) {
          setError(prev => ({ ...prev, email: 'Rate limit exceeded. Please try again later.' }));
        } else if (breachResponse.status === 503) {
          setError(prev => ({ ...prev, email: 'Service temporarily unavailable. Please try again later.' }));
        } else {
          setError(prev => ({ ...prev, email: errorData.message || 'Failed to check email breaches' }));
        }
        setLoading(prev => ({ ...prev, email: false }));
        return;
      }

      // Check pastes via API route
      try {
        const pasteResponse = await fetch('/api/breach/pastes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        });

        if (pasteResponse.ok) {
          const pastes = await pasteResponse.json();
          setEmailPastes(pastes);
        } else {
          // Pastes are less critical, so we don't show error for this
          setEmailPastes([]);
        }
      } catch (pasteError) {
        setEmailPastes([]);
        console.error('Error checking email pastes:', pasteError);
      }

      setLastChecked(prev => ({ ...prev, email: new Date().toLocaleString() }));
    } catch (err) {
      console.error('Email breach check error:', err);
      setError(prev => ({ ...prev, email: 'Failed to check email. Please try again.' }));
    } finally {
      setLoading(prev => ({ ...prev, email: false }));
    }
  };

  // Check password breaches using SHA-1 k-anonymity (Direct API call - no CORS issues)
  const checkPasswordBreaches = async () => {
    if (!password) {
      setError(prev => ({ ...prev, password: 'Please enter a password' }));
      return;
    }

    setLoading(prev => ({ ...prev, password: true }));
    setError(prev => ({ ...prev, password: '' }));

    try {
      // Hash the password using SHA-1
      const encoder = new TextEncoder();
      const data = encoder.encode(password);
      const hashBuffer = await crypto.subtle.digest('SHA-1', data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('').toUpperCase();

      // Use k-anonymity: send only first 5 characters
      const prefix = hashHex.substring(0, 5);
      const suffix = hashHex.substring(5);

      const response = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`, {
        headers: {
          'User-Agent': 'DataBreachChecker'
        }
      });
      
      if (response.ok) {
        const text = await response.text();
        const lines = text.split('\n');
        
        let breachCount = 0;
        for (const line of lines) {
          const [hashSuffix, count] = line.split(':');
          if (hashSuffix.trim() === suffix) {
            breachCount = parseInt(count.trim());
            break;
          }
        }
        
        setPasswordBreaches(breachCount);
        setLastChecked(prev => ({ ...prev, password: new Date().toLocaleString() }));
      } else {
        throw new Error('Failed to check password');
      }
    } catch (err) {
      console.error('Password breach check error:', err);
      setError(prev => ({ ...prev, password: 'Failed to check password. Please try again.' }));
    } finally {
      setLoading(prev => ({ ...prev, password: false }));
    }
  };

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatNumber = (num: number) => {
    return num.toLocaleString();
  };

  return (
    <section id="breach-checker" className="py-20 bg-gradient-to-b from-red-50 to-white relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-red-100 opacity-50 mix-blend-multiply"></div>
      <div className="absolute top-40 right-20 w-80 h-80 rounded-full bg-orange-100 opacity-40 mix-blend-multiply"></div>
      <div className="absolute bottom-10 left-1/4 w-72 h-72 rounded-full bg-red-100 opacity-40 mix-blend-multiply"></div>
      <div className="absolute -bottom-20 right-1/3 w-96 h-96 rounded-full bg-orange-50 opacity-60 mix-blend-multiply"></div>
      
      {/* Irregular Shapes */}
      <div className="absolute top-1/4 right-1/4 w-40 h-40 bg-red-100 opacity-30 rounded-tr-[70%] rounded-bl-[60%] rounded-tl-[40%] rounded-br-[50%] transform rotate-12"></div>
      <div className="absolute bottom-1/3 left-20 w-52 h-52 bg-orange-100 opacity-30 rounded-tr-[40%] rounded-bl-[70%] rounded-tl-[60%] rounded-br-[50%] transform -rotate-12"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-block p-4 bg-red-100 rounded-full mb-6 shadow-lg">
            <FaExclamationTriangle className="text-5xl text-red-600" />
          </div>
          <h2 className="text-4xl font-extrabold mb-4 text-gray-800">
            Data Breach Checker
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Check if your email address or password has been compromised in known data breaches. 
            Stay informed about your digital security exposure.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Email Breach Checker */}
          <div className="rounded-2xl shadow-xl overflow-hidden backdrop-blur-sm bg-white/90">
            <div className="p-8 md:p-10">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <FaShieldAlt className="mr-3 text-red-600" />
                Email Breach Check
              </h3>
              
              <div className="mb-6">
                <label htmlFor="email" className="block text-lg font-semibold text-gray-700 mb-3">
                  Enter your email address
                </label>
                <div className="flex gap-3">
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-5 py-4 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all pr-12"
                    placeholder="email@example.com"
                    onKeyPress={(e) => e.key === 'Enter' && checkEmailBreaches()}
                  />
                  <button
                    onClick={checkEmailBreaches}
                    disabled={loading.email}
                    className="px-6 py-4 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center"
                  >
                    {loading.email ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    ) : (
                      <FaSearch />
                    )}
                  </button>
                </div>
                {error.email && (
                  <p className="text-red-600 mt-2 flex items-center">
                    <FaExclamationTriangle className="mr-2" />
                    {error.email}
                  </p>
                )}
              </div>

              {/* Email Results */}
              {lastChecked.email && (
                <div className="space-y-6">
                  {emailBreaches.length === 0 ? (
                    <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                      <div className="flex items-center text-green-700 font-medium mb-2">
                        <FaCheckCircle className="mr-3 text-xl" />
                        <span className="text-lg">Good news! No breaches found.</span>
                      </div>
                      <p className="text-green-600">
                        Your email address was not found in any known data breaches.
                      </p>
                    </div>
                  ) : (
                    <div className="bg-red-50 p-6 rounded-lg border border-red-200">
                      <div className="flex items-center text-red-700 font-medium mb-4">
                        <FaExclamationTriangle className="mr-3 text-xl" />
                        <span className="text-lg">
                          Found in {emailBreaches.length} data breach{emailBreaches.length > 1 ? 'es' : ''}
                        </span>
                      </div>
                      
                      <div className="space-y-4">
                        {emailBreaches.map((breach, index) => (
                          <div key={index} className="bg-white p-4 rounded-lg border border-red-200">
                            <div className="flex justify-between items-start mb-3">
                              <h4 className="text-lg font-semibold text-gray-800">{breach.Title}</h4>
                              <div className="flex items-center text-sm text-gray-600">
                                <FaClock className="mr-1" />
                                {formatDate(breach.BreachDate)}
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                              <div className="flex items-center text-sm text-gray-600">
                                <FaUsers className="mr-2" />
                                <span>{formatNumber(breach.PwnCount)} accounts affected</span>
                              </div>
                              <div className="flex items-center text-sm text-gray-600">
                                <FaDatabase className="mr-2" />
                                <span>{breach.Domain}</span>
                              </div>
                            </div>
                            
                            <p className="text-sm text-gray-700 mb-3" 
                               dangerouslySetInnerHTML={{ __html: breach.Description }}>
                            </p>
                            
                            <div className="flex flex-wrap gap-2 mb-3">
                              {breach.DataClasses.map((dataClass, idx) => (
                                <span key={idx} className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full">
                                  {dataClass}
                                </span>
                              ))}
                            </div>

                            {/* Breach Status Indicators */}
                            <div className="flex flex-wrap gap-2">
                              {breach.IsVerified && (
                                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                                  ✓ Verified
                                </span>
                              )}
                              {breach.IsFabricated && (
                                <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full">
                                  ⚠ Fabricated
                                </span>
                              )}
                              {breach.IsSensitive && (
                                <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full">
                                  🔒 Sensitive
                                </span>
                              )}
                              {breach.IsSpamList && (
                                <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                                  📧 Spam List
                                </span>
                              )}
                              {breach.IsMalware && (
                                <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">
                                  🦠 Malware
                                </span>
                              )}
                              {breach.IsStealerLog && (
                                <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded-full">
                                  🕵️ Stealer Log
                                </span>
                              )}
                              {breach.IsRetired && (
                                <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                                  📁 Retired
                                </span>
                              )}
                              {breach.IsSubscriptionFree && (
                                <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                                  🆓 Free
                                </span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Pastes Results */}
                  {emailPastes.length > 0 && (
                    <div className="bg-orange-50 p-6 rounded-lg border border-orange-200">
                      <div className="flex items-center text-orange-700 font-medium mb-4">
                        <FaInfoCircle className="mr-3 text-xl" />
                        <span className="text-lg">
                          Found in {emailPastes.length} paste{emailPastes.length > 1 ? 's' : ''}
                        </span>
                      </div>
                      <p className="text-orange-600 text-sm mb-4">
                        Your email was found in publicly posted data dumps or pastes.
                      </p>
                      
                      <div className="space-y-3">
                        {emailPastes.slice(0, 5).map((paste, index) => (
                          <div key={index} className="bg-white p-3 rounded border border-orange-200">
                            <div className="flex justify-between items-center">
                              <span className="font-medium">{paste.Source}</span>
                              <span className="text-sm text-gray-600">
                                {formatDate(paste.Date)}
                              </span>
                            </div>
                            {paste.Title && (
                              <p className="text-sm text-gray-700 mt-1">{paste.Title}</p>
                            )}
                            <p className="text-xs text-gray-600 mt-1">
                              {formatNumber(paste.EmailCount)} emails in this paste
                            </p>
                          </div>
                        ))}
                        {emailPastes.length > 5 && (
                          <p className="text-sm text-orange-600">
                            ...and {emailPastes.length - 5} more paste{emailPastes.length - 5 > 1 ? 's' : ''}
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  <p className="text-xs text-gray-500">
                    Last checked: {lastChecked.email}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Password Breach Checker */}
          <div className="rounded-2xl shadow-xl overflow-hidden backdrop-blur-sm bg-white/90">
            <div className="p-8 md:p-10">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <FaShieldAlt className="mr-3 text-orange-600" />
                Password Breach Check
              </h3>
              
              <div className="mb-6">
                <label htmlFor="password" className="block text-lg font-semibold text-gray-700 mb-3">
                  Enter a password to check
                </label>
                <div className="flex gap-3">
                  <div className="flex-1 relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-5 py-4 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all pr-12"
                      placeholder="Enter password to check..."
                      onKeyPress={(e) => e.key === 'Enter' && checkPasswordBreaches()}
                    />
                    <button 
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  <button
                    onClick={checkPasswordBreaches}
                    disabled={loading.password}
                    className="px-6 py-4 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center"
                  >
                    {loading.password ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    ) : (
                      <FaSearch />
                    )}
                  </button>
                </div>
                {error.password && (
                  <p className="text-red-600 mt-2 flex items-center">
                    <FaExclamationTriangle className="mr-2" />
                    {error.password}
                  </p>
                )}
              </div>

              {/* Password Results */}
              {lastChecked.password && passwordBreaches !== null && (
                <div className="space-y-6">
                  {passwordBreaches === 0 ? (
                    <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                      <div className="flex items-center text-green-700 font-medium mb-2">
                        <FaCheckCircle className="mr-3 text-xl" />
                        <span className="text-lg">Password looks safe!</span>
                      </div>
                      <p className="text-green-600">
                        This password was not found in any known data breaches.
                      </p>
                      <div className="mt-3 p-3 bg-green-100 rounded border border-green-200">
                        <p className="text-sm text-green-700">
                          <strong>Note:</strong> While this password hasn&apos;t been found in breaches, 
                          ensure it&apos;s still strong and unique for each account.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className={`p-6 rounded-lg border ${
                      passwordBreaches > 100000 
                        ? 'bg-red-50 border-red-200' 
                        : passwordBreaches > 10000 
                        ? 'bg-red-50 border-red-200'
                        : passwordBreaches > 1000 
                        ? 'bg-orange-50 border-orange-200'
                        : 'bg-yellow-50 border-yellow-200'
                    }`}>
                      <div className={`flex items-center font-medium mb-4 ${
                        passwordBreaches > 100000 
                          ? 'text-red-700' 
                          : passwordBreaches > 10000
                          ? 'text-red-700'
                          : passwordBreaches > 1000 
                          ? 'text-orange-700'
                          : 'text-yellow-700'
                      }`}>
                        <FaExclamationTriangle className="mr-3 text-xl" />
                        <span className="text-lg">
                          Password found in breaches!
                        </span>
                      </div>
                      
                      <div className={`text-3xl font-bold mb-3 ${
                        passwordBreaches > 100000 
                          ? 'text-red-600' 
                          : passwordBreaches > 10000
                          ? 'text-red-600'
                          : passwordBreaches > 1000 
                          ? 'text-orange-600'
                          : 'text-yellow-600'
                      }`}>
                        {formatNumber(passwordBreaches)} times
                      </div>
                      
                      <p className={`mb-4 ${
                        passwordBreaches > 100000 
                          ? 'text-red-600' 
                          : passwordBreaches > 10000
                          ? 'text-red-600'
                          : passwordBreaches > 1000 
                          ? 'text-orange-600'
                          : 'text-yellow-600'
                      }`}>
                        This password has appeared in {formatNumber(passwordBreaches)} data breaches.
                        {passwordBreaches > 100000 && " This is an extremely common password - avoid at all costs!"}
                        {passwordBreaches > 10000 && passwordBreaches <= 100000 && " This is a very commonly used password."}
                        {passwordBreaches > 1000 && passwordBreaches <= 10000 && " This is a commonly used password."}
                        {passwordBreaches <= 1000 && " Consider using a different password."}
                      </p>
                      
                      {/* Risk Level Indicator */}
                      <div className={`p-4 rounded-lg mb-4 ${
                        passwordBreaches > 100000 
                          ? 'bg-red-100 border border-red-200' 
                          : passwordBreaches > 10000
                          ? 'bg-red-100 border border-red-200'
                          : passwordBreaches > 1000 
                          ? 'bg-orange-100 border border-orange-200'
                          : 'bg-yellow-100 border border-yellow-200'
                      }`}>
                        <div className="flex items-center mb-2">
                          <span className="font-semibold text-gray-800">Risk Level: </span>
                          <span className={`ml-2 px-3 py-1 rounded-full text-sm font-medium ${
                            passwordBreaches > 100000 
                              ? 'bg-red-200 text-red-800' 
                              : passwordBreaches > 10000
                              ? 'bg-red-200 text-red-800'
                              : passwordBreaches > 1000 
                              ? 'bg-orange-200 text-orange-800'
                              : 'bg-yellow-200 text-yellow-800'
                          }`}>
                            {passwordBreaches > 100000 
                              ? 'CRITICAL' 
                              : passwordBreaches > 10000
                              ? 'VERY HIGH'
                              : passwordBreaches > 1000 
                              ? 'HIGH'
                              : 'MODERATE'}
                          </span>
                        </div>
                        <p className="text-sm text-gray-700">
                          {passwordBreaches > 100000 && "This password is in the top tier of compromised passwords. Change immediately!"}
                          {passwordBreaches > 10000 && passwordBreaches <= 100000 && "This password is frequently targeted by attackers."}
                          {passwordBreaches > 1000 && passwordBreaches <= 10000 && "This password has moderate exposure in breaches."}
                          {passwordBreaches <= 1000 && "This password has limited exposure but should still be changed."}
                        </p>
                      </div>
                      
                      <div className="bg-white p-4 rounded-lg border border-gray-200">
                        <h4 className="font-semibold text-gray-800 mb-2">Immediate Actions Required:</h4>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li className="flex items-start">
                            <span className="text-red-500 mr-2 mt-0.5">•</span>
                            <span>Change this password immediately on all accounts</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-red-500 mr-2 mt-0.5">•</span>
                            <span>Use a unique, strong password for each account</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-red-500 mr-2 mt-0.5">•</span>
                            <span>Consider using a password manager</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-red-500 mr-2 mt-0.5">•</span>
                            <span>Enable two-factor authentication where possible</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-red-500 mr-2 mt-0.5">•</span>
                            <span>Monitor accounts for suspicious activity</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  )}

                  <p className="text-xs text-gray-500">
                    Last checked: {lastChecked.password}
                  </p>
                </div>
              )}

              {/* Privacy Notice */}
              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-800 mb-2 flex items-center">
                  <FaInfoCircle className="mr-2" />
                  Privacy & Security
                </h4>
                <p className="text-sm text-blue-700">
                  Your password is checked using k-anonymity. Only the first 5 characters of your password&apos;s 
                  SHA-1 hash are sent to the API, ensuring your actual password never leaves your device.
                </p>
              </div>
            </div>
          </div>

          {/* Information Section */}
          <div className="rounded-2xl shadow-xl overflow-hidden backdrop-blur-sm bg-white/90">
            <div className="p-8 md:p-10">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <FaInfoCircle className="mr-3 text-blue-600" />
                About Data Breach Checking
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-3">What is a Data Breach?</h4>
                  <p className="text-gray-600 mb-4">
                    A data breach occurs when sensitive, protected, or confidential data is accessed, 
                    disclosed, or stolen by unauthorized individuals.
                  </p>
                  
                  <h4 className="text-lg font-semibold text-gray-800 mb-3">Why Check for Breaches?</h4>
                  <ul className="text-gray-600 space-y-2">
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      Know if your data has been compromised
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      Take proactive security measures
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      Change compromised passwords
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      Enable additional security features
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-3">If You&apos;re Compromised</h4>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <div className="bg-red-100 p-1 rounded-full mr-3 mt-1">
                        <span className="text-xs text-red-600 font-bold">1</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">Change Your Password</p>
                        <p className="text-sm text-gray-600">Update passwords on all affected accounts immediately</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-orange-100 p-1 rounded-full mr-3 mt-1">
                        <span className="text-xs text-orange-600 font-bold">2</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">Enable 2FA</p>
                        <p className="text-sm text-gray-600">Add two-factor authentication for extra security</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-yellow-100 p-1 rounded-full mr-3 mt-1">
                        <span className="text-xs text-yellow-600 font-bold">3</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">Monitor Accounts</p>
                        <p className="text-sm text-gray-600">Watch for suspicious activity on your accounts</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-green-100 p-1 rounded-full mr-3 mt-1">
                        <span className="text-xs text-green-600 font-bold">4</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">Use Unique Passwords</p>
                        <p className="text-sm text-gray-600">Never reuse passwords across multiple accounts</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-sm text-gray-600">
                  <strong>Data Source:</strong> This tool uses the HaveIBeenPwned API, which aggregates data from known breaches. 
                  Not finding your email doesn&apos;t guarantee you haven&apos;t been breached - it only means you&apos;re not in their database.
                </p>
              </div>

              {/* Breach Status Legend */}
              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-800 mb-3">Breach Status Indicators</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center">
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full mr-2">
                      ✓ Verified
                    </span>
                    <span className="text-gray-600">Confirmed legitimate breach</span>
                  </div>
                  <div className="flex items-center">
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full mr-2">
                      ⚠ Fabricated
                    </span>
                    <span className="text-gray-600">May contain manufactured data</span>
                  </div>
                  <div className="flex items-center">
                    <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full mr-2">
                      🔒 Sensitive
                    </span>
                    <span className="text-gray-600">Contains sensitive information</span>
                  </div>
                  <div className="flex items-center">
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full mr-2">
                      📧 Spam List
                    </span>
                    <span className="text-gray-600">Email collection, not breach</span>
                  </div>
                  <div className="flex items-center">
                    <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full mr-2">
                      🦠 Malware
                    </span>
                    <span className="text-gray-600">Data from malware campaign</span>
                  </div>
                  <div className="flex items-center">
                    <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded-full mr-2">
                      🕵️ Stealer Log
                    </span>
                    <span className="text-gray-600">From credential stealing malware</span>
                  </div>
                  <div className="flex items-center">
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full mr-2">
                      📁 Retired
                    </span>
                    <span className="text-gray-600">No longer monitored</span>
                  </div>
                  <div className="flex items-center">
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full mr-2">
                      🆓 Free
                    </span>
                    <span className="text-gray-600">Available in free tier</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Security Best Practices */}
          <div className="rounded-2xl shadow-xl overflow-hidden backdrop-blur-sm bg-white/90">
            <div className="p-8 md:p-10">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <FaShieldAlt className="mr-3 text-green-600" />
                Security Best Practices
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <h4 className="font-semibold text-green-800 mb-2">Strong Passwords</h4>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• At least 12 characters long</li>
                    <li>• Mix of letters, numbers, symbols</li>
                    <li>• Avoid dictionary words</li>
                    <li>• Don&apos;t use personal information</li>
                  </ul>
                </div>
                
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-blue-800 mb-2">Password Managers</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Generate unique passwords</li>
                    <li>• Store passwords securely</li>
                    <li>• Auto-fill login forms</li>
                    <li>• Sync across devices</li>
                  </ul>
                </div>
                
                <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <h4 className="font-semibold text-purple-800 mb-2">Two-Factor Auth</h4>
                  <ul className="text-sm text-purple-700 space-y-1">
                    <li>• Enable on all important accounts</li>
                    <li>• Use authenticator apps</li>
                    <li>• Keep backup codes safe</li>
                    <li>• Avoid SMS when possible</li>
                  </ul>
                </div>
                
                <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                  <h4 className="font-semibold text-orange-800 mb-2">Regular Monitoring</h4>
                  <ul className="text-sm text-orange-700 space-y-1">
                    <li>• Check accounts regularly</li>
                    <li>• Monitor credit reports</li>
                    <li>• Set up breach alerts</li>
                    <li>• Review account activity</li>
                  </ul>
                </div>
                
                <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                  <h4 className="font-semibold text-red-800 mb-2">Incident Response</h4>
                  <ul className="text-sm text-red-700 space-y-1">
                    <li>• Change passwords immediately</li>
                    <li>• Contact affected services</li>
                    <li>• Monitor for fraud</li>
                    <li>• Document the incident</li>
                  </ul>
                </div>
                
                <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                  <h4 className="font-semibold text-indigo-800 mb-2">Privacy Protection</h4>
                  <ul className="text-sm text-indigo-700 space-y-1">
                    <li>• Limit personal info sharing</li>
                    <li>• Use privacy-focused browsers</li>
                    <li>• Enable privacy settings</li>
                    <li>• Be cautious with public WiFi</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DataBreachChecker;

