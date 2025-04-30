// Mobile Device Security Data Structure
import freepik from '../images/freebik.jpg';
import pattern from '../images/pattern.jpg';
import pin from '../images/pincode.jpg'
import hero from '../images/lockscreen.jpg';
import hero1 from '../images/settins.jpg';
import hero2 from '../images/screenlocktypes.jpg';
import hero3 from '../images/screentimeout.jpg';
import hero4 from '../images/screentimeout1.jpg';
import hero5 from '../images/smartlock.jpg';
import hero6 from '../images/smartlock1.jpg';
import hero7 from '../images/smartlock2.jpg';
import hero8 from '../images/smartlock3.jpg';
import hero9 from '../images/biometrics.jpg';
import hero10 from '../images/biometrics1.jpg';
import hero11 from '../images/biometrics2.jpg';
import hero12 from '../images/biometrics3.jpg';
import hero13 from '../images/faceid.jpg';
import hero14 from '../images/faceid1.jpg';
import hero15 from '../images/google.jpg';
import hero16 from '../images/google1.jpg';
import hero17 from '../images/google2.jpg';
import hero18 from '../images/google3.jpg';
import hero19 from '../images/google4.jpg';
import hero20 from '../images/google5.jpg';
import hero21 from '../images/google6.jpg';
import hero22 from '../images/google7.jpg';
import hero23 from '../images/google8.jpg';
import hero24 from '../images/google9.jpg';
import hero25 from '../images/google10.jpg';


export interface SecurityItem {
    id: string;
    title: string;
    description: string;
    steps?: string[];
    images?: string[]; // Array of image paths
  }
  
  export interface SecuritySection {
    id: string;
    title: string;
    items: SecurityItem[];
  }
  
  export interface SecurityCategory {
    id: string;
    title: string;
    sections: SecuritySection[];
  }
  
  export interface DeviceSecurityData {
    id: string;
    title: string;
    categories: SecurityCategory[];
  }
  
  // Android Security Data
  export const androidSecurityData: DeviceSecurityData = {
    id: 'android',
    title: 'Android Security',
    categories: [
      {
        id: 'basic-security',
        title: 'Basic Security Settings',
        sections: [
          {
            id: 'screen-lock',
            title: 'Screen Lock Configuration',
            items: [
              {
                id: 'screen-lock-settings',
                title: 'Navigate to Settings > Security > Screen lock',
                description: 'Configure a secure screen lock method to protect your device',
                images: [
                  hero1.src,
                  hero.src,
                ],
              },
              {
                id: 'auth-method',
                title: 'Choose a strong authentication method',
                description: 'Select a secure option to unlock your device',
                steps: [
                  'PIN (minimum 6 digits, avoid simple patterns like 123456)',
                  'Pattern (use complex patterns with at least 6 points)',
                  'Password (mix of uppercase, lowercase, numbers, and symbols)'
                ],
                images: [
                  hero2.src,
                  pin.src,
                  pattern.src,
                ],
              },
              {
                id: 'screen-timeout',
                title: 'Set screen timeout to 30 seconds or less',
                description: 'Navigate to Settings > Display > Screen timeout',
                images: [
                  hero1.src,
                  hero3.src,
                  hero4.src,
                ],
              },

              {
                id: 'smart-lock',
                title: 'Enable Smart Lock only for trusted locations',
                description: 'Only use Smart Lock features in secure environments like home',
                images: [
                  hero1.src,
                  hero.src,
                  hero5.src,
                  hero6.src,
                  hero7.src,
                  hero8.src,
                ],
              }
            ]
          },
          {
            id: 'biometric-security',
            title: 'Biometric Security',

            items: [
              {
                id: 'fingerprint',
                title: 'Configure fingerprint authentication',
                description: 'Set up fingerprint recognition for convenient secure access',
                steps: [
                  'Settings > Security > Fingerprint',
                  'Register multiple fingers for convenience',
                  'Use fingerprint + PIN/password for critical apps'
                ],
                images: [
                  hero1.src,
                  hero9.src,
                  hero10.src,
                  hero11.src,
                  hero12.src,
                ],
              },
              {
                id: 'face-unlock',
                title: 'Setup face unlock (if available)',
                description: 'Configure facial recognition with security in mind',
                steps: [
                  'Ensure it requires eyes to be open',
                  'Disable "Faster Recognition" which reduces security'
                ],
                images: [
                  hero1.src,
                  hero9.src,
                  hero13.src,
                  hero14.src,
                ],
              }
            ]
          },
          {
            id: 'google-account',
            title: 'Google Account Protection',
            items: [
              {
                id: 'two-step',
                title: 'Enable 2-Step Verification',
                description: 'Add an extra layer of security to your Google account',
                steps: [
                  'Go to Settings > Google > Manage your Google Account > Security',
                  'Turn on 2-Step Verification',
                  'Configure backup methods (SMS, Authenticator app, backup codes)'
                ],
                images: [
                  hero1.src,
                  hero15.src,
                  hero16.src,
                  hero17.src,
                  hero18.src,
                  hero19.src,
                ],
              },
              {
                id: 'security-checkup',
                title: 'Perform Security Checkup',
                description: 'Regularly review your account security settings',
                steps: [
                  'Review devices with account access',
                  'Remove unrecognized or unused devices',
                  'Check third-party access to your account'
                ],
                images: [
                  hero15.src,
                  hero16.src,
                  hero17.src,
                  hero20.src,
                  hero21.src,
                  hero22.src,
                  hero23.src,
                  hero24.src,
                  hero25.src,
                ],
              }
            ]
          },
          {
            id: 'find-device',
            title: 'Find My Device',
            items: [
              {
                id: 'enable-find',
                title: 'Enable in Settings > Security > Find My Device',
                description: 'Activate device tracking features',
                images: [
                  hero1.src,
                  hero9.src,
                  freepik.src,
                  hero.src,
                  freepik.src,
                ],
              },
              {
                id: 'verify-find',
                title: 'Verify it works by testing at android.com/find',
                description: 'Ensure the feature is properly configured',
                images: [
                  hero1.src,
                  hero.src,
                  freepik.src,
                  hero.src,
                  freepik.src,
                ],
              },
              {
                id: 'configure-find',
                title: 'Configure device tracking features',
                description: 'Set up all available tracking and security options',
                steps: [
                  'Locate device',
                  'Play sound',
                  'Lock device remotely',
                  'Erase data in emergency situations'
                ],
                images: [
                  hero1.src,
                  hero.src,
                  freepik.src,
                  hero.src,
                  freepik.src,
                ],
              }
            ]
          }
        ]
      },
      {
        id: 'advanced-security',
        title: 'Advanced Security Settings',
        sections: [
          {
            id: 'encryption',
            title: 'Encryption',

            items: [
              {
                id: 'verify-encryption',
                title: 'Verify device encryption is enabled',
                description: 'Check encryption status in device settings',
                steps: [
                  'Settings > Security > Encryption & credentials',
                  'Modern Android devices are encrypted by default. Ensure encryption is enabled.',
                ],
                images: [
                  hero1.src,
                  hero.src,
                  freepik.src,
                  hero.src,
                  freepik.src,
                ],
              },
              {
                id: 'enable-encryption',
                title: 'Enable storage encryption if not already active',
                description: 'Encrypt your device data for additional protection',
                images: [
                  hero1.src,
                  hero.src,
                  freepik.src,
                  hero.src,
                  freepik.src,
                ],
              }
            ]
          },
          {
            id: 'app-permissions',
            title: 'App Permissions Management',
            items: [
              {
                id: 'review-permissions',
                title: 'Review app permissions',
                description: 'Regularly check what apps can access on your device',
                steps: [
                  'Settings > Apps > [App name] > Permissions'
                ],
                images: [
                  hero1.src,
                  hero.src,
                  freepik.src,
                  hero.src,
                  freepik.src,
                ],
              },
              {
                id: 'sensitive-permissions',
                title: 'Focus on sensitive permissions',
                description: 'Pay special attention to high-risk permissions',
                steps: [
                  'Location (set to "Only while using")',
                  'Camera and Microphone (deny when not needed)',
                  'Contacts, SMS, Call logs (restrict access)',
                  'Body sensors and activity recognition'
                ],
                images: [
                  hero1.src,
                  hero.src,
                  freepik.src,
                  hero.src,
                  freepik.src,
                ],
              },
              {
                id: 'audit-permissions',
                title: 'Regularly audit permissions (monthly)',
                description: 'Set a schedule to review app permissions',
                images: [
                  hero1.src,
                  hero.src,
                  freepik.src,
                  hero.src,
                  freepik.src,
                ],
              },
              {
                id: 'permission-manager',
                title: 'Use Permission Manager',
                description: 'Access the centralized permission control panel',
                steps: [
                  'Settings > Privacy > Permission Manager'
                ],
                images: [
                  hero1.src,
                  hero.src,
                  freepik.src,
                  hero.src,
                  freepik.src,
                ],
              }
            ]
          },
          {
            id: 'developer-options',
            title: 'Developer Options and USB Debugging',
            items: [
              {
                id: 'disable-dev',
                title: 'Disable Developer Options if not needed',
                description: 'Turn off advanced settings when not in use',
                steps: [
                  'Settings > System > Developer options > toggle off'
                ],
                images: [
                  hero1.src,
                  hero.src,
                  freepik.src,
                  hero.src,
                  freepik.src,
                ],
              },
              {
                id: 'secure-dev',
                title: 'If you need Developer Options',
                description: 'Secure developer settings when they must remain enabled',
                steps: [
                  'Disable USB debugging when not in use',
                  'Enable "Revoke USB debugging authorizations"',
                  'Set "Select USB Configuration" to "Charging"'
                ],
                images: [
                  hero1.src,
                  hero.src,
                  freepik.src,
                  hero.src,
                  freepik.src,
                ],
              }
            ]
          },
          {
            id: 'network-security',
            title: 'Network Security',
            items: [
              {
                id: 'wifi-autoconnect',
                title: 'Disable Auto-connect to Wi-Fi networks',
                description: 'Prevent automatic connections to unknown networks',
                steps: [
                  'Settings > Network & internet > Wi-Fi > Wi-Fi preferences',
                  'Turn off "Connect to open networks"'
                ],
                images: [
                  hero1.src,
                  hero.src,
                  freepik.src,
                  hero.src,
                  freepik.src,
                ],
              },
              {
                id: 'private-dns',
                title: 'Configure Private DNS',
                description: 'Use encrypted DNS for enhanced privacy',
                steps: [
                  'Settings > Network & internet > Advanced > Private DNS',
                  'Set to "Private DNS provider hostname" and use "dns.google" or "1dot1dot1dot1.cloudflare-dns.com"'
                ],
                images: [
                  hero1.src,
                  hero.src,
                  freepik.src,
                  hero.src,
                  freepik.src,
                ],
              }
            ]
          },
          {
            id: 'system-updates',
            title: 'System Updates',
            items: [
              {
                id: 'auto-updates',
                title: 'Enable automatic system updates',
                description: 'Keep your device software current automatically',
                steps: [
                  'Settings > System > Advanced > System update',
                  'Set to download and install automatically'
                ],
                images: [
                  hero1.src,
                  hero.src,
                  freepik.src,
                  hero.src,
                  freepik.src,
                ]
              },
              {
                id: 'manual-updates',
                title: 'Check for updates manually monthly',
                description: 'Regularly verify your device has the latest updates',
                images: [
                  hero1.src,
                  hero.src,
                  freepik.src,
                  hero.src,
                  freepik.src,
                ]
              },
              {
                id: 'security-patches',
                title: 'Install security patches immediately when available',
                description: 'Apply security fixes as soon as they are released',
                images: [
                  hero1.src,
                  hero.src,
                  freepik.src,
                  hero.src,
                  freepik.src,
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'app-security',
        title: 'App Security',
        sections: [
          {
            id: 'play-protect',
            title: 'Google Play Protect',
            items: [
              {
                id: 'enable-protect',
                title: 'Ensure Play Protect is enabled',
                description: 'Verify Google\'s built-in malware protection is active',
                steps: [
                  'Open Google Play Store > Profile > Play Protect',
                  'Verify "Scan apps with Play Protect" is on',
                  'Enable "Improve harmful app detection"'
                ],
                images: [
                  hero1.src,
                  hero.src,
                  freepik.src,
                  hero.src,
                  freepik.src,
                ]
              }
            ]
          },
          {
            id: 'app-installation',
            title: 'App Installation Security',
            items: [
              {
                id: 'restrict-sources',
                title: 'Restrict app installation sources',
                description: 'Limit where apps can be installed from',
                steps: [
                  'Settings > Apps > Special app access > Install unknown apps',
                  'Disable for all apps except trusted ones'
                ],
                images: [
                  hero1.src,
                  hero.src,
                  freepik.src,
                  hero.src,
                  freepik.src,
                ]
              },
              {
                id: 'app-verification',
                title: 'Before installing apps',
                description: 'Verify app legitimacy before installation',
                steps: [
                  'Check reviews and rating',
                  'Verify developer reputation',
                  'Review permissions requested',
                  'Check privacy policy'
                ],
                images: [
                  hero1.src,
                  hero.src,
                  freepik.src,
                  hero.src,
                  freepik.src,
                ]
              }
            ]
          },
          {
            id: 'app-updates',
            title: 'App Updates',
            items: [
              {
                id: 'auto-app-updates',
                title: 'Enable automatic app updates',
                description: 'Keep apps updated with the latest security patches',
                steps: [
                  'Google Play Store > Settings > Network preferences',
                  'Set "Auto-update apps" to "Over Wi-Fi only"'
                ],
                images: [
                  hero1.src,
                  hero.src,
                  freepik.src,
                  hero.src,
                  freepik.src,
                ]
              },
              {
                id: 'manual-app-review',
                title: 'Manually review updates for critical apps',
                description: 'Pay special attention to updates for sensitive applications',
                images: [
                  hero1.src,
                  hero.src,
                  freepik.src,
                  hero.src,
                  freepik.src,
                ]
              }
            ]
          },
          {
            id: 'app-vetting',
            title: 'App Vetting Process',
            items: [
              {
                id: 'app-research',
                title: 'Before installing any app',
                description: 'Thoroughly evaluate apps before installation',
                steps: [
                  'Research the developer',
                  'Read privacy policy for data collection practices',
                  'Check required permissions against app functionality',
                  'Review recent user feedback for security concerns'
                ],
                images: [
                  hero1.src,
                  hero.src,
                  freepik.src,
                  hero.src,
                  freepik.src,
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'data-protection',
        title: 'Data Backup and Protection',
        sections: [
          {
            id: 'google-backup',
            title: 'Google Backup',
            items: [
              {
                id: 'configure-backup',
                title: 'Configure automated backups',
                description: 'Set up cloud backups of your device data',
                steps: [
                  'Settings > System > Backup',
                  'Enable "Back up to Google Drive"',
                  'Verify what data is being backed up'
                ],
                images: [
                  hero1.src,
                  hero.src,
                  freepik.src,
                  hero.src,
                  freepik.src,
                ]
              }
            ]
          },
          {
            id: 'local-backup',
            title: 'Local Backups',
            items: [
              {
                id: 'create-local',
                title: 'Create periodic local backups',
                description: 'Maintain offline copies of important data',
                steps: [
                  'Connect to computer via USB in file transfer mode',
                  'Copy important files to secure external storage'
                ],
                images: [
                  hero1.src,
                  hero.src,
                  freepik.src,
                  hero.src,
                  freepik.src,
                ]
              },
              {
                id: 'encrypt-backup',
                title: 'Encrypt backup files with tools like 7-Zip',
                description: 'Add password protection to your backup archives',
                images: [
                  hero1.src,
                  hero.src,
                  freepik.src,
                  hero.src,
                  freepik.src,
                ],
              }
            ]
          },
          {
            id: 'secure-folders',
            title: 'Secure Folders/Spaces',
            items: [
              {
                id: 'use-secure-folder',
                title: 'Use Secure Folder (Samsung) or equivalent',
                description: 'Create an encrypted space for sensitive apps and data',
                steps: [
                  'Settings > Biometrics and security > Secure Folder',
                  'Configure separate authentication',
                  'Move sensitive apps and data inside'
                ],
                images: [
                  hero1.src,
                  hero.src,
                  freepik.src,
                  hero.src,
                  freepik.src,
                ],
              }
            ]
          }
        ]
      },
      {
        id: 'anti-theft',
        title: 'Anti-theft Measures',
        sections: [
          {
            id: 'lock-screen-info',
            title: 'Lock Screen Information',
            items: [
              {
                id: 'owner-info',
                title: 'Add owner information to lock screen',
                description: 'Display contact details in case device is lost',
                steps: [
                  'Settings > Display > Lock screen > Contact information',
                  'Include alternate contact method (not your main phone number)'
                ],
                images: [
                  hero1.src,
                  hero.src,
                  freepik.src,
                  hero.src,
                  freepik.src,
                ],
              }
            ]
          },
          {
            id: 'anti-theft-apps',
            title: 'Anti-theft Apps',
            items: [
              {
                id: 'dedicated-solutions',
                title: 'Consider dedicated anti-theft solutions',
                description: 'Install specialized security applications',
                steps: [
                  'Cerberus (advanced anti-theft features)',
                  'Prey Anti Theft (cross-platform tracking)',
                  'Configure to take photos after failed unlock attempts'
                ],
                images: [
                  hero1.src,
                  hero.src,
                  freepik.src,
                  hero.src,
                  freepik.src,
                ],
              }
            ]
          }
        ]
      }
    ]
  }; 
 
  
 // iOS Security Data
export const iosSecurityData: DeviceSecurityData = {
    id: 'ios',
    title: 'iOS Security',
    categories: [
      {
        id: 'basic-security-ios',
        title: 'Basic Security Settings',
        sections: [
          {
            id: 'passcode-touchid',
            title: 'Passcode and Face/Touch ID',
            items: [
              {
                id: 'strong-passcode',
                title: 'Set strong passcode',
                description: 'Configure a secure passcode to protect your device',
                steps: [
                  'Settings > Face ID & Passcode (or Touch ID & Passcode)',
                  'Use Custom Alphanumeric Code (strongest)',
                  'Minimum 8 characters with complexity'
                ],
                images: [
                  hero1.src,
                  hero.src,
                  freepik.src,
                  hero.src,
                  freepik.src,
                ],
              },
              {
                id: 'biometric-setup',
                title: 'Configure Face ID/Touch ID',
                description: 'Set up biometric authentication for convenient secure access',
                steps: [
                  'Register alternative appearance for Face ID',
                  'Set up multiple fingerprints for Touch ID'
                ],
                images: [
                  hero1.src,
                  hero.src,
                  freepik.src,
                  hero.src,
                  freepik.src,
                ],
              },
              {
                id: 'immediate-passcode',
                title: 'Set "Require Passcode" to "Immediately"',
                description: 'Ensure your device locks immediately when screen turns off',
                images: [
                  hero1.src,
                  hero.src,
                  freepik.src,
                  hero.src,
                  freepik.src,
                ],
              }
            ]
          },
          {
            id: 'auto-lock-restrictions',
            title: 'Auto-Lock and Restrictions',
            items: [
              {
                id: 'auto-lock-setting',
                title: 'Set Auto-Lock to 30 seconds',
                description: 'Configure your device to lock quickly when not in use',
                steps: [
                  'Settings > Display & Brightness > Auto-Lock'
                ],
                images: [
                  hero1.src,
                  hero.src,
                  freepik.src,
                  hero.src,
                  freepik.src,
                ],
              },
              {
                id: 'screen-time',
                title: 'Configure Screen Time restrictions',
                description: 'Set up content and privacy restrictions',
                steps: [
                  'Settings > Screen Time > Content & Privacy Restrictions',
                  'Limit sensitive features like location services',
                  'Password-protect changes'
                ],
                images: [
                  hero1.src,
                  hero.src,
                  freepik.src,
                  hero.src,
                  freepik.src,
                ],
              }
            ]
          },
          {
            id: 'icloud-security',
            title: 'iCloud Security',
            items: [
              {
                id: 'icloud-2fa',
                title: 'Enable Two-Factor Authentication',
                description: 'Add an extra layer of security to your Apple ID',
                steps: [
                  'Settings > [your name] > Password & Security',
                  'Turn on Two-Factor Authentication',
                  'Set up trusted phone numbers and devices'
                ],
                images: [
                  hero1.src,
                  hero.src,
                  freepik.src,
                  hero.src,
                  freepik.src,
                ],
              },
              {
                id: 'review-devices',
                title: 'Review connected devices',
                description: 'Check and manage devices connected to your Apple ID',
                steps: [
                  'Settings > [your name] > scroll to device list',
                  'Remove unrecognized devices'
                ],
                images: [
                  hero1.src,
                  hero.src,
                  freepik.src,
                  hero.src,
                  freepik.src,
                ],
              },
              {
                id: 'manage-icloud-access',
                title: 'Manage app access to iCloud',
                description: 'Control which apps can access your iCloud data',
                steps: [
                  'Settings > [your name] > iCloud',
                  'Toggle off access for unnecessary apps'
                ],
                images: [
                  hero1.src,
                  hero.src,
                  freepik.src,
                  hero.src,
                  freepik.src,
                ],
              }
            ]
          },
          {
            id: 'find-my-iphone',
            title: 'Find My iPhone',
            items: [
              {
                id: 'enable-find-my',
                title: 'Enable all Find My features',
                description: 'Activate device tracking and recovery features',
                steps: [
                  'Settings > [your name] > Find My',
                  'Turn on Find My iPhone, Find My network, Send Last Location'
                ],
                images: [
                  hero1.src,
                  hero.src,
                  freepik.src,
                  hero.src,
                  freepik.src,
                ],
              },
              {
                id: 'test-find-my',
                title: 'Test functionality at icloud.com/find',
                description: 'Verify that Find My iPhone is working correctly',
                images: [
                  hero1.src,
                  hero.src,
                  freepik.src,
                  hero.src,
                  freepik.src,
                ],
              },
              {
                id: 'find-my-features',
                title: 'Configure Find My features',
                description: 'Set up all available tracking and security options',
                steps: [
                  'Locate device',
                  'Play sound',
                  'Enable Lost Mode',
                  'Remotely erase if necessary'
                ],
                images: [
                  hero1.src,
                  hero.src,
                  freepik.src,
                  hero.src,
                  freepik.src,
                ],
              }
            ]
          }
        ]
      },
      {
        id: 'advanced-security-ios',
        title: 'Advanced Security Settings',
        sections: [
          {
            id: 'system-updates-ios',
            title: 'System Updates',
            items: [
              {
                id: 'auto-updates-ios',
                title: 'Enable automatic updates',
                description: 'Keep your iOS software current automatically',
                steps: [
                  'Settings > General > Software Update > Automatic Updates',
                  'Turn on "Download iOS Updates" and "Install iOS Updates"'
                ],
                images: [
                  hero1.src,
                  hero.src,
                  freepik.src,
                  hero.src,
                  freepik.src,
                ],
              },
              {
                id: 'check-updates',
                title: 'Check for updates weekly',
                description: 'Regularly verify your device has the latest updates',
                steps: [
                  'Settings > General > Software Update'
                ],
                images: [
                  hero1.src,
                  hero.src,
                  freepik.src,
                  hero.src,
                  freepik.src,
                ],
              }
            ]
          },
          {
            id: 'privacy-controls',
            title: 'Privacy Controls',
            items: [
              {
                id: 'location-management',
                title: 'Location Services management',
                description: 'Control which apps can access your location',
                steps: [
                  'Settings > Privacy > Location Services',
                  'Review app by app, set to "While Using" or "Ask Next Time"',
                  'Disable "Precise Location" for non-essential apps'
                ],
                images: [
                  hero1.src,
                  hero.src,
                  freepik.src,
                  hero.src,
                  freepik.src,
                ],
              },
              {
                id: 'mic-camera-access',
                title: 'Microphone and Camera access',
                description: 'Manage app access to your microphone and camera',
                steps: [
                  'Settings > Privacy > Microphone/Camera',
                  'Regularly audit app access'
                ],
                images: [
                  hero1.src,
                  hero.src,
                  freepik.src,
                  hero.src,
                  freepik.src,
                ],
              },
              {
                id: 'analytics-ads',
                title: 'Analytics and advertising',
                description: 'Control data sharing and personalized advertising',
                steps: [
                  'Settings > Privacy > Analytics & Improvements',
                  'Disable "Share iPhone Analytics"',
                  'Settings > Privacy > Apple Advertising > turn off "Personalized Ads"'
                ],
                images: [
                  hero1.src,
                  hero.src,
                  freepik.src,
                  hero.src,
                  freepik.src,
                ],
              }
            ]
          },
          {
            id: 'safari-security',
            title: 'Safari Security',
            items: [
              {
                id: 'safari-privacy',
                title: 'Enable privacy features',
                description: 'Configure Safari browser privacy settings',
                steps: [
                  'Settings > Safari > Privacy & Security',
                  'Turn on "Prevent Cross-Site Tracking"',
                  'Enable "Fraudulent Website Warning"',
                  'Block all cookies or only from third parties'
                ],
                images: [
                  hero1.src,
                  hero.src,
                  freepik.src,
                  hero.src,
                  freepik.src,
                ],
              },
              {
                id: 'clear-browsing',
                title: 'Clear browsing data regularly',
                description: 'Remove browsing history and website data',
                steps: [
                  'Settings > Safari > Clear History and Website Data'
                ],
                images: [
                  hero1.src,
                  hero.src,
                  freepik.src,
                  hero.src,
                  freepik.src,
                ],
              }
            ]
          },
          {
            id: 'network-security-ios',
            title: 'Network Security',
            items: [
              {
                id: 'private-wifi',
                title: 'Configure Private Wi-Fi address',
                description: 'Prevent tracking through Wi-Fi networks',
                steps: [
                  'Settings > Wi-Fi > (i) next to network > Private Address',
                  'Enable for all networks'
                ],
                images: [
                  hero1.src,
                  hero.src,
                  freepik.src,
                  hero.src,
                  freepik.src,
                ],
              },
              {
                id: 'limit-ip-tracking',
                title: 'Enable Limit IP Address Tracking',
                description: 'Prevent websites from tracking your IP address',
                steps: [
                  'Settings > Safari > Hide IP Address > Turn on'
                ],
                images: [
                  hero1.src,
                  hero.src,
                  freepik.src,
                  hero.src,
                  freepik.src,
                ],
              },
              {
                id: 'private-relay',
                title: 'Use iCloud Private Relay (iCloud+ subscribers)',
                description: 'Route web traffic through two separate relays',
                steps: [
                  'Settings > [your name] > iCloud > Private Relay'
                ],
                images: [
                  hero1.src,
                  hero.src,
                  freepik.src,
                  hero.src,
                  freepik.src,
                ],
              }
            ]
          },
          {
            id: 'app-security-ios',
            title: 'App Security',
            items: [
              {
                id: 'app-permissions-ios',
                title: 'Review app permissions',
                description: 'Regularly check what apps can access on your device',
                steps: [
                  'Settings > Privacy > review each category'
                ],
                images: [
                  hero1.src,
                  hero.src,
                  freepik.src,
                  hero.src,
                  freepik.src,
                ],
              },
              {
                id: 'app-restrictions',
                title: 'App download restrictions',
                description: 'Control app installation and purchases',
                steps: [
                  'Settings > Screen Time > Content & Privacy Restrictions',
                  'iTunes & App Store Purchases > set to "Don\'t Allow"',
                  'Require password for additional purchases'
                ],
                images: [
                  hero1.src,
                  hero.src,
                  freepik.src,
                  hero.src,
                  freepik.src,
                ],
              }
            ]
          }
        ]
      },
      {
        id: 'data-protection-ios',
        title: 'Data Protection',
        sections: [
          {
            id: 'icloud-backup',
            title: 'iCloud Backup',
            items: [
              {
                id: 'secure-backups',
                title: 'Configure secure backups',
                description: 'Set up automatic backups to iCloud',
                steps: [
                  'Settings > [your name] > iCloud > iCloud Backup',
                  'Enable "iCloud Backup"'
                ],
                images: [
                  hero1.src,
                  hero.src,
                  freepik.src,
                  hero.src,
                  freepik.src,
                ],
              },
              {
                id: 'review-backup',
                title: 'Understand what\'s being backed up',
                description: 'Review and manage your backup content',
                steps: [
                  'Settings > [your name] > iCloud > Manage Storage',
                  'Review and adjust backup content'
                ],
                images: [
                  hero1.src,
                  hero.src,
                  freepik.src,
                  hero.src,
                  freepik.src,
                ],
              }
            ]
          },
          {
            id: 'local-backup-ios',
            title: 'Local Backup',
            items: [
              {
                id: 'encrypted-backup',
                title: 'Create encrypted iTunes/Finder backups',
                description: 'Make secure local backups of your device',
                steps: [
                  'Connect to computer',
                  'In iTunes/Finder, select your device',
                  'Check "Encrypt local backup" and set strong password',
                  'Store password in secure password manager'
                ],
                images: [
                  hero1.src,
                  hero.src,
                  freepik.src,
                  hero.src,
                  freepik.src,
                ],
              }
            ]
          },
          {
            id: 'secure-notes',
            title: 'Secure Notes and Personal Data',
            items: [
              {
                id: 'locked-notes',
                title: 'Use locked notes for sensitive information',
                description: 'Password-protect individual notes',
                steps: [
                  'In Notes app, swipe left on note > Lock icon',
                  'Set unique password different from device passcode'
                ],
                images: [
                  hero1.src,
                  hero.src,
                  freepik.src,
                  hero.src,
                  freepik.src,
                ],
              },
              {
                id: 'keychain',
                title: 'Use Keychain for passwords',
                description: 'Store passwords securely in iCloud Keychain',
                steps: [
                  'Settings > Passwords',
                  'Enable AutoFill Passwords'
                ],
                images: [
                  hero1.src,
                  hero.src,
                  freepik.src,
                  hero.src,
                  freepik.src,
                ],
              }
            ]
          }
        ]
      },
      {
        id: 'communication-security',
        title: 'Communication Security',
        sections: [
          {
            id: 'imessage-facetime',
            title: 'iMessage and FaceTime',
            items: [
              {
                id: 'verify-encryption',
                title: 'Verify end-to-end encryption',
                description: 'Ensure secure messaging is enabled',
                steps: [
                  'Settings > Messages > ensure iMessage is on'
                ],
                images: [
                  hero1.src,
                  hero.src,
                  freepik.src,
                  hero.src,
                  freepik.src,
                ],
              },
              {
                id: 'filter-senders',
                title: 'Filter unknown senders',
                description: 'Separate messages from unknown contacts',
                steps: [
                  'Settings > Messages > Filter Unknown Senders'
                ],
                images: [
                  hero1.src,
                  hero.src,
                  freepik.src,
                  hero.src,
                  freepik.src,
                ],
              },
              {
                id: 'limit-facetime',
                title: 'Limit FaceTime calls',
                description: 'Control when FaceTime is active',
                steps: [
                  'Settings > FaceTime > toggle off "FaceTime" when not in use'
                ],
                images: [
                  hero1.src,
                  hero.src,
                  freepik.src,
                  hero.src,
                  freepik.src,
                ],
              }
            ]
          },
          {
            id: 'mail-settings',
            title: 'Mail Settings',
            items: [
              {
                id: 'remote-content',
                title: 'Disable remote content loading',
                description: 'Prevent tracking through email images',
                steps: [
                  'Settings > Mail > toggle off "Load Remote Images"'
                ],
                images: [
                  hero1.src,
                  hero.src,
                  freepik.src,
                  hero.src,
                  freepik.src,
                ],
              },
              {
                id: 'advanced-mail',
                title: 'Configure advanced settings',
                description: 'Set up secure mail handling options',
                steps: [
                  'Set to fetch data manually or hourly',
                  'Don\'t use VIP or notifications for unknown senders'
                ],
                images: [
                  hero1.src,
                  hero.src,
                  freepik.src,
                  hero.src,
                  freepik.src,
                ],
              }
            ]
          }
        ]
      },
      {
        id: 'specialized-features',
        title: 'Specialized iOS Security Features',
        sections: [
          {
            id: 'lockdown-mode',
            title: 'Lockdown Mode (iOS 16+)',
            items: [
              {
                id: 'high-risk',
                title: 'For users at high risk of targeted attacks',
                description: 'Extreme protection for high-risk situations',
                steps: [
                  'Settings > Privacy & Security > Lockdown Mode',
                  'Understand limitations (blocks many features)',
                  'Enable only during high-risk periods'
                ],
                images: [
                  hero1.src,
                  hero.src,
                  freepik.src,
                  hero.src,
                  freepik.src,
                ],
              }
            ]
          },
          {
            id: 'hide-email',
            title: 'Hide My Email',
            items: [
              {
                id: 'unique-email',
                title: 'Use unique email addresses',
                description: 'Create disposable email addresses for services',
                steps: [
                  'Settings > [your name] > iCloud > Hide My Email',
                  'Create unique addresses for each service',
                  'Deactivate addresses if compromised'
                ],
                images: [
                  hero1.src,
                  hero.src,
                  freepik.src,
                  hero.src,
                  freepik.src,
                ],
              }
            ]
          },
          {
            id: 'app-tracking',
            title: 'App Tracking Transparency',
            items: [
              {
                id: 'control-tracking',
                title: 'Control app tracking',
                description: 'Manage how apps track your activity',
                steps: [
                  'Settings > Privacy > Tracking',
                  'Toggle off "Allow Apps to Request to Track"'
                ],
                images: [
                  hero1.src,
                  hero.src,
                  freepik.src,
                  hero.src,
                  freepik.src,
                ],
              },
              {
                id: 'review-tracking',
                title: 'Review and revoke existing permissions',
                description: 'Check which apps have tracking permissions',
                steps: [
                  'Settings > Privacy > Tracking',
                  'Revoke permissions for apps you no longer use'
                ],
                images: [
                  hero1.src,
                  hero.src,
                  freepik.src,
                  hero.src,
                  freepik.src,
                ],
              }
            ]
          }
        ]
      }
    ]
  };

  