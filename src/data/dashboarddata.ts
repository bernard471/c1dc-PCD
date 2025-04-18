// data/dashboardData.js
export const securityStats = {
  overallScore: 72,
  securityDomains: [
    { id: 'mobile', name: 'Mobile Security', score: 85, status: 'good' },
    { id: 'wifi', name: 'Wi-Fi Security', score: 60, status: 'warning' },
    { id: 'network', name: 'Network & IoT', score: 45, status: 'danger' },
    { id: 'communication', name: 'Communication', score: 80, status: 'good' },
    { id: 'social', name: 'Social Media', score: 90, status: 'good' },
    { id: 'email', name: 'Email Security', score: 75, status: 'good' },
    { id: 'identity', name: 'Identity Protection', score: 65, status: 'warning' }
  ],
  recentThreats: [
    { id: 1, type: 'Phishing Attempt', date: '2 days ago', status: 'blocked' },
    { id: 2, type: 'Suspicious Login', date: '5 days ago', status: 'detected' },
    { id: 3, type: 'Weak Password', date: '1 week ago', status: 'warning' }
  ],
  pendingActions: 4
};

export const securityChecklist = [
  {
    id: 'update-passwords',
    title: 'Update mobile device passwords',
    description: 'Recommended to change every 90 days',
    priority: 'medium',
    domain: 'mobile',
    completed: false
  },
  {
    id: 'enable-2fa',
    title: 'Enable two-factor auth for email',
    description: 'Increases account security by 99%',
    priority: 'high',
    domain: 'email',
    completed: false
  },
  {
    id: 'update-router',
    title: 'Update router firmware',
    description: 'Current version is 3 months old',
    priority: 'high',
    domain: 'wifi',
    completed: false
  },
  {
    id: 'check-app-permissions',
    title: 'Review app permissions',
    description: 'Check permissions for recently installed apps',
    priority: 'medium',
    domain: 'mobile',
    completed: false
  }
];

// data/mobileSecurityData.js
export const androidSecurityData = {
  securityScore: 85,
  lastScan: '2025-04-09T14:30:00Z',
  checklist: [
    { 
      id: 'screen-lock', 
      title: 'Screen Lock Configured', 
      description: 'Set strong screen lock with PIN, pattern, or password',
      completed: true,
      howTo: [
        'Navigate to Settings > Security > Screen lock',
        'Choose a strong authentication method',
        'Set screen timeout to 30 seconds or less',
        'Enable Smart Lock only for trusted locations'
      ]
    },
    { 
      id: 'biometric', 
      title: 'Biometric Security Setup', 
      description: 'Configure fingerprint authentication',
      completed: true,
      howTo: [
        'Settings > Security > Fingerprint',
        'Register multiple fingers for convenience',
        'Use fingerprint + PIN/password for critical apps'
      ]
    },
    { 
      id: 'google-2fa', 
      title: 'Google Account 2FA Enabled', 
      description: 'Enable 2-Step Verification for Google account',
      completed: false,
      howTo: [
        'Go to Settings > Google > Manage your Google Account > Security',
        'Turn on 2-Step Verification',
        'Configure backup methods (SMS, Authenticator app, backup codes)'
      ]
    },
    { 
      id: 'find-device', 
      title: 'Find My Device Active', 
      description: 'Enable device tracking and remote wipe capabilities',
      completed: true,
      howTo: [
        'Enable in Settings > Security > Find My Device',
        'Verify it works by testing at android.com/find',
        'Configure to locate device, play sound, lock device, erase data'
      ]
    },
    { 
      id: 'encryption', 
      title: 'Device Encryption Verified', 
      description: 'Ensure device encryption is enabled',
      completed: true,
      howTo: [
        'Verify device encryption is enabled in Settings > Security > Encryption & credentials',
        'Modern Android devices are encrypted by default',
        'Enable storage encryption if not already active'
      ]
    },
    { 
      id: 'app-permissions', 
      title: 'App Permissions Reviewed', 
      description: 'Audit app permissions, especially for location and contacts',
      completed: false,
      howTo: [
        'Settings > Apps > [App name] > Permissions',
        'Focus on sensitive permissions like Location, Camera, Microphone, Contacts',
        'Set Location to "Only while using" when possible',
        'Regularly audit permissions (monthly)'
      ]
    },
    { 
      id: 'usb-debugging', 
      title: 'Developer Options Secured', 
      description: 'Disable USB debugging when not in use',
      completed: true,
      howTo: [
        'Disable Developer Options if not needed (Settings > System > Developer options > toggle off)',
        'If needed, disable USB debugging when not in use',
        'Enable "Revoke USB debugging authorizations"'
      ]
    },
    { 
      id: 'auto-updates', 
      title: 'Automatic Updates Enabled', 
      description: 'Configure auto-updates for OS and apps',
      completed: false,
      howTo: [
        'Enable automatic system updates in Settings > System > Advanced > System update',
        'Enable automatic app updates in Google Play Store > Settings > Network preferences',
        'Set "Auto-update apps" to "Over Wi-Fi only"'
      ]
    }
  ],
  recentActivity: [
    {
      id: 1,
      type: 'update',
      title: 'System update installed',
      description: 'Android Security Update - April 2025',
      timestamp: '2025-04-08T10:15:00Z'
    },
    {
      id: 2,
      type: 'warning',
      title: 'Suspicious app permission detected',
      description: 'Weather App requested background location access',
      timestamp: '2025-04-07T14:30:00Z'
    },
    {
      id: 3,
      type: 'scan',
      title: 'Security scan completed',
      description: 'No threats detected',
      timestamp: '2025-04-03T09:45:00Z'
    }
  ]
};

export const iosSecurityData = {
  securityScore: 90,
  lastScan: '2025-04-09T16:45:00Z',
  checklist: [
    { 
      id: 'passcode', 
      title: 'Strong Passcode Set', 
      description: 'Configure alphanumeric passcode with minimum 8 characters',
      completed: true,
      howTo: [
        'Settings > Face ID & Passcode (or Touch ID & Passcode)',
        'Use Custom Alphanumeric Code (strongest)',
        'Minimum 8 characters with complexity',
        'Set "Require Passcode" to "Immediately"'
      ]
    },
    { 
      id: 'biometric-ios', 
      title: 'Face ID/Touch ID Configured', 
      description: 'Set up biometric authentication',
      completed: true,
      howTo: [
        'Settings > Face ID & Passcode (or Touch ID & Passcode)',
        'Register alternative appearance for Face ID',
        'Set up multiple fingerprints for Touch ID'
      ]
    },
    { 
      id: 'auto-lock', 
      title: 'Auto-Lock Configured', 
      description: 'Set Auto-Lock to 30 seconds or less',
      completed: true,
      howTo: [
        'Settings > Display & Brightness > Auto-Lock',
        'Select 30 seconds for maximum security'
      ]
    },
    { 
      id: 'icloud-2fa', 
      title: 'iCloud Two-Factor Authentication', 
      description: 'Enable 2FA for Apple ID',
      completed: true,
      howTo: [
        'Settings > [your name] > Password & Security',
        'Turn on Two-Factor Authentication',
        'Set up trusted phone numbers and devices'
      ]
    },
    { 
      id: 'find-my', 
      title: 'Find My iPhone Enabled', 
      description: 'Enable all Find My features including network and last location',
      completed: false,
      howTo: [
        'Settings > [your name] > Find My',
        'Turn on Find My iPhone, Find My network, Send Last Location',
        'Test functionality at icloud.com/find'
      ]
    },
    { 
      id: 'ios-updates', 
      title: 'Automatic iOS Updates',
      description: 'Enable automatic software updates',
      completed: true,
      howTo: [
        'Settings > General > Software Update > Automatic Updates',
        'Turn on "Download iOS Updates" and "Install iOS Updates"',
        'Check for updates weekly'
      ]
    },
    { 
      id: 'location-privacy', 
      title: 'Location Privacy Configured', 
      description: 'Set location access to "While Using" for apps',
      completed: false,
      howTo: [
        'Settings > Privacy > Location Services',
        'Review app by app, set to "While Using" or "Ask Next Time"',
        'Disable "Precise Location" for non-essential apps'
      ]
    },
    { 
      id: 'safari-privacy', 
      title: 'Safari Privacy Features', 
      description: 'Enable Safari privacy and security settings',
      completed: true,
      howTo: [
        'Settings > Safari > Privacy & Security',
        'Turn on "Prevent Cross-Site Tracking"',
        'Enable "Fraudulent Website Warning"',
        'Block all cookies or only from third parties'
      ]
    }
  ],
  recentActivity: [
    {
      id: 1,
      type: 'update',
      title: 'iOS update installed',
      description: 'iOS 18.2.1 Security Update',
      timestamp: '2025-04-06T15:20:00Z'
    },
    {
      id: 2,
      type: 'scan',
      title: 'Security scan completed',
      description: 'No threats detected',
      timestamp: '2025-04-02T11:30:00Z'
    },
    {
      id: 3,
      type: 'action',
      title: 'Privacy settings updated',
      description: 'Location Services disabled for 3 apps',
      timestamp: '2025-03-28T09:15:00Z'
    }
  ]
};

// data/wifiSecurityData.js
export const wifiNetworksData = [
  {
    id: 'home-network',
    name: 'HomeNetwork_5G',
    securityType: 'WPA3',
    securityStatus: 'good',
    lastChecked: '2025-04-10T10:30:00Z',
    devices: 8,
    issues: 0
  },
  {
    id: 'guest-network',
    name: 'Home_Guest',
    securityType: 'WPA2',
    securityStatus: 'medium',
    lastChecked: '2025-04-09T10:30:00Z',
    devices: 2,
    issues: 1
  },
  {
    id: 'iot-network',
    name: 'Home_IoT',
    securityType: 'WPA2',
    securityStatus: 'medium',
    lastChecked: '2025-04-09T10:30:00Z',
    devices: 6,
    issues: 2
  }
];

export const wifiSecurityChecklist = [
  {
    id: 'admin-credentials',
    title: 'Changed Default Admin Credentials',
    description: 'Router admin username and password have been changed from defaults',
    completed: true,
    howTo: [
      'Access router admin interface (typically 192.168.0.1 or 192.168.1.1)',
      'Replace default username/password with strong alternatives',
      'Store these credentials in password manager'
    ]
  },
  {
    id: 'firmware',
    title: 'Router Firmware Updated',
    description: 'Router firmware is up to date with latest security patches',
    completed: true,
    howTo: [
      'Check manufacturer website for latest firmware',
      'Download firmware update if available',
      'Apply update through router admin interface',
      'Schedule quarterly manual checks'
    ]
  },
  {
    id: 'ssid',
    title: 'SSID Name Changed',
    description: 'Default network name has been changed to not reveal router model',
    completed: true,
    howTo: [
      'Access router wireless settings',
      'Change SSID to a neutral name',
      'Don\'t include personal information or router model'
    ]
  },
  {
    id: 'password',
    title: 'Strong Wi-Fi Password Set',
    description: 'Using complex Wi-Fi password with mix of characters',
    completed: true,
    howTo: [
      'Set password with minimum 12 characters',
      'Include uppercase, lowercase, numbers, and symbols',
      'Avoid dictionary words or personal information',
      'Change password every 6-12 months'
    ]
  },
  {
    id: 'encryption',
    title: 'WPA3 Encryption Enabled',
    description: 'Using latest encryption protocol for wireless security',
    completed: false,
    howTo: [
      'Check router security settings',
      'Select WPA3-Personal or WPA3/WPA2-Mixed if devices are compatible',
      'If WPA3 unavailable, use WPA2-PSK (AES)',
      'Avoid TKIP or WEP encryption (obsolete and insecure)'
    ]
  },
  {
    id: 'guest-network',
    title: 'Separate Guest Network Configured',
    description: 'Guest network set up for visitors with restricted access',
    completed: true,
    howTo: [
      'Enable guest network feature in router settings',
      'Use different password from main network',
      'Disable guest access to local network resources'
    ]
  },
  {
    id: 'mac-filtering',
    title: 'MAC Address Filtering',
    description: 'Only allow specific devices to connect to network',
    completed: false,
    howTo: [
      'Locate "MAC filtering" or "Access control" in router settings',
      'Add MAC addresses of all trusted devices',
      'Set to "allow only listed devices"',
      'Record all device MAC addresses for reference'
    ]
  },
  {
    id: 'upnp',
    title: 'UPnP Disabled',
    description: 'Universal Plug and Play feature disabled for security',
    completed: true,
    howTo: [
      'Find UPnP in "Advanced" or "Security" settings',
      'Turn off unless specifically needed for gaming or media servers'
    ]
  },
  {
    id: 'dns',
    title: 'Secure DNS Configured',
    description: 'Using Cloudflare or Google secure DNS servers',
    completed: false,
    howTo: [
      'Replace ISP\'s DNS with secure alternatives in router settings',
      'Cloudflare: 1.1.1.1 and 1.0.0.1',
      'Google: 8.8.8.8 and 8.8.4.4',
      'Quad9: 9.9.9.9 and 149.112.112.112'
    ]
  }
];



export const connectedDevices = [
  {
    id: 'device-1',
    name: 'iPhone 13 Pro',
    type: 'mobile',
    ipAddress: '192.168.1.5',
    macAddress: '00:1B:44:11:3A:B7',
    networkId: 'home-network',
    connectionTime: '2025-04-10T08:30:00Z',
    status: 'trusted'
  },
  {
    id: 'device-2',
    name: 'Samsung Galaxy S23',
    type: 'mobile',
    ipAddress: '192.168.1.10',
    macAddress: '00:1C:25:AA:BB:CC',
    networkId: 'home-network',
    connectionTime: '2025-04-10T06:15:00Z',
    status: 'trusted'
  },
  {
    id: 'device-3',
    name: 'Amazon Echo',
    type: 'iot',
    ipAddress: '192.168.1.15',
    macAddress: '44:65:0D:75:CC:EE',
    networkId: 'iot-network',
    connectionTime: '2025-04-08T12:00:00Z',
    status: 'iot'
  },
  {
    id: 'device-4',
    name: 'Unknown Device',
    type: 'unknown',
    ipAddress: '192.168.1.22',
    macAddress: 'EC:FA:BC:11:22:33',
    networkId: 'home-network',
    connectionTime: '2025-04-10T11:30:00Z',
    status: 'suspicious'
  }
];

// Additional data files would follow similar patterns for other security domains
