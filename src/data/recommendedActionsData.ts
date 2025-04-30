// Data file for recommended actions

export interface RecommendedAction {
  id: number;
  title: string;
  description: string;
  icon: 'clock' | 'alert' | 'shield';
  priority: 'high' | 'medium' | 'low';
  dueDate?: string;
  category: 'mobile' | 'network' | 'account' | 'data' | 'privacy';
  steps?: string[];
}

export const recommendedActionsData: RecommendedAction[] = [
  { 
    id: 1, 
    title: 'Update mobile device passwords', 
    description: 'Recommended to change every 90 days',
    icon: 'clock',
    priority: 'high',
    category: 'mobile',
    dueDate: '2023-12-30',
    steps: [
      'Open device settings',
      'Navigate to security settings',
      'Select "Change password"',
      'Create a strong password with mixed characters'
    ]
  },
  { 
    id: 2, 
    title: 'Enable two-factor auth for email', 
    description: 'Increases account security by 99%',
    icon: 'alert',
    priority: 'high',
    category: 'account',
    dueDate: '2023-12-15',
    steps: [
      'Log into your email account',
      'Go to security settings',
      'Find two-factor authentication option',
      'Follow the setup wizard',
      'Save backup codes in a secure location'
    ]
  },
  { 
    id: 3, 
    title: 'Update router firmware', 
    description: 'Current version is 3 months old',
    icon: 'shield',
    priority: 'medium',
    category: 'network',
    dueDate: '2024-01-10',
    steps: [
      'Access router admin panel (typically 192.168.1.1)',
      'Log in with admin credentials',
      'Navigate to firmware section',
      'Check for updates',
      'Download and install if available',
      'Restart router when prompted'
    ]
  },
  { 
    id: 4, 
    title: 'Review app permissions', 
    description: 'Check which apps have access to sensitive data',
    icon: 'alert',
    priority: 'medium',
    category: 'privacy',
    dueDate: '2023-12-05',
    steps: [
      'Open device settings',
      'Go to Apps or Application Manager',
      'Review permissions for each app',
      'Revoke unnecessary permissions',
      'Consider alternatives for apps requesting excessive permissions'
    ]
  },
  { 
    id: 5, 
    title: 'Set up a password manager', 
    description: 'Consolidate and secure all your passwords',
    icon: 'shield',
    priority: 'high',
    category: 'account',
    dueDate: '2023-12-20',
    steps: [
      'Research reputable password managers',
      'Install the chosen password manager',
      'Create a strong master password',
      'Import existing passwords',
      'Begin updating weak passwords',
      'Enable browser extensions for auto-fill'
    ]
  },
  { 
    id: 6, 
    title: 'Configure automatic backups', 
    description: 'Protect your data from loss or ransomware',
    icon: 'clock',
    priority: 'medium',
    category: 'data',
    dueDate: '2024-01-05',
    steps: [
      'Choose a backup solution (cloud or local)',
      'Install backup software if needed',
      'Select important folders and files to back up',
      'Set backup frequency (daily recommended)',
      'Test restore functionality',
      'Verify backups are working properly'
    ]
  },
  { 
    id: 7, 
    title: 'Update antivirus definitions', 
    description: 'Ensure protection against latest threats',
    icon: 'shield',
    priority: 'high',
    category: 'data',
    dueDate: '2023-12-01',
    steps: [
      'Open your antivirus software',
      'Navigate to update section',
      'Check for definition updates',
      'Install latest definitions',
      'Run a full system scan after updating'
    ]
  },
  { 
    id: 8, 
    title: 'Secure your home Wi-Fi network', 
    description: 'Update Wi-Fi password and security settings',
    icon: 'alert',
    priority: 'high',
    category: 'network',
    dueDate: '2023-12-18',
    steps: [
      'Access your router settings',
      'Change the default admin password',
      'Update Wi-Fi password to a strong alternative',
      'Enable WPA3 encryption if available (or WPA2)',
      'Disable remote management',
      'Consider setting up a guest network for visitors'
    ]
  },
  { 
    id: 9, 
    title: 'Review social media privacy settings', 
    description: 'Check and update who can see your information',
    icon: 'clock',
    priority: 'medium',
    category: 'privacy',
    dueDate: '2023-12-22',
    steps: [
      'Log into each social media account',
      'Navigate to privacy settings',
      'Review who can see your posts and information',
      'Limit data sharing with third-party apps',
      'Consider removing location data from posts',
      'Review and remove unused connected applications'
    ]
  },
  { 
    id: 10, 
    title: 'Enable encryption on mobile devices', 
    description: 'Protect data if your device is lost or stolen',
    icon: 'shield',
    priority: 'high',
    category: 'mobile',
    dueDate: '2023-12-25',
    steps: [
      'Open device settings',
      'Navigate to security or encryption settings',
      'Enable full device encryption',
      'Create a secure backup of recovery keys',
      'Wait for encryption process to complete',
      'Verify encryption status after completion'
    ]
  }
];