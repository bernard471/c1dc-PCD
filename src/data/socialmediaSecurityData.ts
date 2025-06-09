import { 
    FaShieldAlt, 
    FaUserLock, 
    FaSignInAlt, 
    FaPuzzlePiece, 
    FaKey, 
    FaEyeSlash, 
    FaShareAlt, 
    FaMapMarkerAlt, 
    FaHistory, 
    FaGlobe, 
    FaComments, 
    FaExclamationTriangle, 
    FaClipboardCheck, 
    FaSearchPlus
  } from 'react-icons/fa';
  import { IconType } from 'react-icons';
  import hero1 from '../images/insta0.jpg';
  import hero2 from '../images/insta.jpg';
  import hero3 from '../images/insta1.jpg';
  import hero4 from '../images/insta3.jpg';
  import hero5 from  '../images/insta4.jpg';
  import hero6 from '../images/x.jpg';
  import hero7 from '../images/x1.jpg';
  import hero8 from '../images/x2.jpg';
  import hero9 from '../images/x3.jpg';
  import hero10 from '../images/x4.jpg';
  import hero11 from '../images/x5.jpg';
  import hero12 from '../images/email.jpg';
  import hero13 from '../images/email1.jpg';
  import hero14 from '../images/email2.jpg';
  import hero15 from '../images/socialmediagoogle.jpg';
  import hero16 from '../images/socialmediagoogle1.jpg';
  import hero17 from '../images/linkedin.jpg';
  import hero18 from '../images/linkedin1.jpg';
  import hero19 from '../images/linkedin2.jpg';
  import hero20 from '../images/linkedin3.jpg';
  import hero21 from '../images/linkedin4.jpg';
  import hero22 from '../images/linkedin5.jpg';
  // import hero23 from '../images/fb1.jpg';
  import hero24 from '../images/fb2.jpg';
  import hero25 from '../images/fb3.jpg';
  import hero26 from '../images/fb4.jpg';
  import hero27 from '../images/fb5.jpg';
  import hero28 from '../images/fb6.jpg';
  import hero29 from '../images/fb7.jpg';
  import hero30 from '../images/fb8.jpg';

  export interface SecurityItem {
    title: string;
    description: string;
    steps: {
      name: string;
      details: string[];
      images?: string[]; // Array of image paths
    }[];
    icon: IconType;
  }
  
  export interface SecurityCategory {
    title: string;
    description: string;
    items: SecurityItem[];
    icon: IconType;
  }
  
  export const socialMediaSecurityData: SecurityCategory[] = [
    {
      title: "Account Protection",
      description: "Secure your social media accounts against unauthorized access",
      icon: FaUserLock,
      items: [
        {
          title: "Authentication Security",
          description: "Strengthen login security for your social media accounts",
          icon: FaShieldAlt,
          steps: [
            {
              name: "Strong authentication setup",
              details: [
                "Create platform-specific passwords (don't reuse across sites)",
                "Use maximum allowed password length (aim for 16+ characters)",
                "Enable two-factor authentication on all platforms",
                "Use authenticator apps over SMS where possible",
                "Consider hardware security keys for highest security"
              ],
              // images: [
              //   hero1.src,
              //   hero.src,
              //   freepik.src,
              //   hero.src,
              //   freepik.src,
              // ]
            },
            {
              name: "Review account recovery options",
              details: [
                "Update recovery email and phone",
                "Disable SMS recovery if other methods available",
                "Set strong security questions with non-guessable answers"
              ],
              // images: [
              //   hero1.src,
              //   hero.src,
              //   freepik.src,
              //   hero.src,
              //   freepik.src,
              // ]
            }
          ]
        },
        {
          title: "Login Monitoring",
          description: "Track and manage active sessions on your accounts",
          icon: FaSignInAlt,
          steps: [
            {
              name: "Regular session audits",
              details: [
                "Review active sessions and logged-in devices monthly",
                "Facebook: Settings > Security and Login > Where You're Logged In",
                "Instagram: Settings > Security > Login Activity",
                "Twitter: Settings > Security > Sessions",
                "LinkedIn: Settings > Security > Where you're signed in",
                "Google: Security Checkup > Your devices",
                "Microsoft: Account > Security > Sign-in activity"
              ],
              images: [
                hero29.src,
                  hero24.src,
                  hero25.src,
                  hero26.src,
                  hero27.src,
                  hero28.src,
                  hero30.src,
                  hero1.src,
                  hero2.src,
                  hero3.src,
                  hero4.src,
                  hero5.src,
                  hero6.src,
                  hero7.src,
                  hero8.src,
                  hero9.src,
                  hero10.src,
                  hero11.src,
                  hero17.src,
                  hero18.src,
                  hero19.src,
                  hero20.src,
                  hero21.src,
                  hero22.src,
                  hero12.src,
                  hero13.src,
                  hero14.src,
                  hero15.src,
                  hero16.src,
              ],
            },
            {
              name: "Set up alerts for new logins",
              details: [
                "Enable login notifications via email or app",
                "Review unknown login attempts immediately",
                "Log out suspicious sessions remotely",
                "Change password after suspicious activity"
              ],
              // images: [
              //   hero1.src,
              //   hero.src,
              //   freepik.src,
              //   hero.src,
              //   freepik.src,
              // ]
            }
          ]
        },
        {
          title: "Third-Party App Connections",
          description: "Manage applications connected to your social media accounts",
          icon: FaPuzzlePiece,
          steps: [
            {
              name: "Audit connected applications",
              details: [
                "Review all third-party apps with access",
                "Facebook: Settings > Apps and Websites",
                "Twitter: Settings > Security and account access > Apps and sessions",
                "Google: Security > Third-party apps with account access",
                "Instagram: Settings > Security > Apps and Websites",
                "Remove unused or suspicious applications",
                "Limit permissions to minimum necessary"
              ],
              // images: [
              //   hero1.src,
              //   hero.src,
              //   freepik.src,
              //   hero.src,
              //   freepik.src,
              // ],
            },
            {
              name: "Permission management",
              details: [
                "Review what data each app can access",
                "Revoke unnecessary permissions",
                "Set calendar reminder for quarterly audits",
                "Be cautious when granting new permissions"
              ],
              // images: [
              //   hero1.src,
              //   hero.src,
              //   freepik.src,
              //   hero.src,
              //   freepik.src,
              // ]
            }
          ]
        },
        {
          title: "Account Recovery Preparation",
          description: "Prepare for potential account lockouts or compromise",
          icon: FaKey,
          steps: [
            {
              name: "Proactive measures",
              details: [
                "Document account recovery procedures for each platform",
                "Save backup codes in secure location (password manager)",
                "Keep screenshot of QR codes for authenticator apps",
                "Add trusted contacts where available (Facebook)"
              ],
              // images: [
              //   hero1.src,
              //   hero.src,
              //   freepik.src,
              //   hero.src,
              //   freepik.src,
              // ]
            },
            {
              name: "Recovery kit creation",
              details: [
                "Prepare proof of identity documents",
                "Document account creation date and details",
                "Save original email used for registration",
                "Keep record of payment methods associated with accounts"
              ],
              // images: [
              //   hero1.src,
              //   hero.src,
              //   freepik.src,
              //   hero.src,
              //   freepik.src,
              // ],
            }
          ]
        }
      ]
    },
    {
  title: "WhatsApp Security",
  description: "Comprehensive security measures for WhatsApp messaging and data protection",
  icon: FaComments,
  items: [
    {
      title: "Account Security & Authentication",
      description: "Secure your WhatsApp account against unauthorized access",
      icon: FaUserLock,
      steps: [
        {
          name: "Two-Step Verification Setup",
          details: [
            "Enable Two-Step Verification in Settings > Account > Two-step verification",
            "Create a strong 6-digit PIN that's not easily guessable",
            "Add a recovery email address for PIN reset",
            "Regularly update your recovery email if it changes",
            "Never share your two-step verification PIN with anyone"
          ]
        },
        {
          name: "Phone Number Protection",
          details: [
            "Avoid sharing your phone number publicly on social media",
            "Contact your carrier to add a SIM lock/PIN to prevent SIM swapping",
            "Be cautious when switching to a new phone number",
            "Verify your number is not listed in public directories",
            "Consider using a separate number for WhatsApp if you're high-risk"
          ]
        },
        {
          name: "Device Security",
          details: [
            "Enable screen lock (PIN, password, fingerprint, or face unlock)",
            "Set WhatsApp to require fingerprint/face ID for app access",
            "Keep your device's operating system updated",
            "Don't leave your phone unattended and unlocked",
            "Use remote wipe capabilities if device is lost or stolen"
          ]
        }
      ]
    },
    {
      title: "Privacy Controls & Settings",
      description: "Configure WhatsApp privacy settings to protect your information",
      icon: FaEyeSlash,
      steps: [
        {
          name: "Profile Privacy Settings",
          details: [
            "Set 'Last Seen' to 'Nobody' or 'My Contacts' in Privacy settings",
            "Configure profile photo visibility (Nobody/Contacts/Everyone)",
            "Set 'About' information visibility to contacts only",
            "Control who can see your status updates",
            "Disable read receipts if you want privacy (affects both ways)",
            "Turn off 'Live Location' sharing when not needed"
          ]
        },
        {
          name: "Contact and Group Privacy",
          details: [
            "Set 'Who can add me to groups' to 'My Contacts' or 'Nobody'",
            "Configure who can see your contacts list",
            "Regularly review and clean your contacts list",
            "Block unknown or suspicious numbers immediately",
            "Use 'Disappearing Messages' for sensitive conversations",
            "Set group admin approval for new members in important groups"
          ]
        },
        {
          name: "Status and Online Presence",
          details: [
            "Limit who can see your WhatsApp status updates",
            "Turn off 'Last Seen' to prevent activity tracking",
            "Disable typing indicators if you want more privacy",
            "Be selective about what you share in status updates",
            "Regularly review who has viewed your status"
          ]
        }
      ]
    },
    {
      title: "Message Security & Encryption",
      description: "Maximize the security of your WhatsApp communications",
      icon: FaShieldAlt,
      steps: [
        {
          name: "End-to-End Encryption Verification",
          details: [
            "Verify encryption keys with important contacts in person",
            "Check for 'Messages and calls are end-to-end encrypted' notice",
            "Tap contact name > Encryption to view security code",
            "Compare security codes in person or via secure channel",
            "Be alert to 'Security code changed' notifications",
            "Understand that media files are also encrypted"
          ]
        },
        {
          name: "Disappearing Messages",
          details: [
            "Enable disappearing messages for sensitive conversations",
            "Set appropriate time limits (24 hours, 7 days, or 90 days)",
            "Remember that recipients can still screenshot messages",
            "Use for temporary information like passwords or addresses",
            "Enable for all new chats if maximum privacy is needed",
            "Regularly audit which chats have disappearing messages enabled"
          ]
        },
        {
          name: "Backup Security",
          details: [
            "Enable end-to-end encrypted backups (iOS 15+ and Android)",
            "Create a strong backup password (64-character key or custom password)",
            "Store backup password securely in password manager",
            "Regularly verify backup encryption status",
            "Consider disabling cloud backups for maximum security",
            "Understand that encrypted backups can't be recovered without password"
          ]
        }
      ]
    },
    {
      title: "Advanced Security Features",
      description: "Utilize WhatsApp's advanced security and privacy features",
      icon: FaKey,
      steps: [
        {
          name: "WhatsApp Web & Desktop Security",
          details: [
            "Regularly review active WhatsApp Web sessions",
            "Log out of WhatsApp Web when not in use",
            "Only use WhatsApp Web on trusted computers",
            "Enable notifications for new WhatsApp Web logins",
            "Use private/incognito browser mode for WhatsApp Web",
            "Keep WhatsApp Desktop app updated to latest version"
          ]
        },
        {
          name: "Business Account Considerations",
          details: [
            "Understand that Business accounts have different privacy policies",
            "Review what data businesses can see when you message them",
            "Be cautious about sharing personal information with business accounts",
            "Check business verification status before sharing sensitive data",
            "Understand that some business messages may not be end-to-end encrypted"
          ]
        },
        {
          name: "Multi-Device Security",
          details: [
            "Review all linked devices regularly in Settings > Linked Devices",
            "Remove devices you no longer use or recognize",
            "Understand that multi-device doesn't require phone to be online",
            "Each device maintains its own encryption keys",
            "Log out of all devices if you suspect compromise",
            "Monitor for unauthorized device linking notifications"
          ]
        }
      ]
    },
    {
      title: "Threat Detection & Response",
      description: "Identify and respond to WhatsApp security threats",
      icon: FaExclamationTriangle,
      steps: [
        {
          name: "Scam and Fraud Detection",
          details: [
            "Be suspicious of messages asking for money or personal information",
            "Verify identity through voice call for unusual requests from contacts",
            "Don't click suspicious links or download unknown files",
            "Be wary of 'WhatsApp Gold' or other fake premium versions",
            "Report and block accounts sending spam or suspicious content",
            "Don't share verification codes received via SMS with anyone"
          ]
        },
        {
          name: "Account Takeover Prevention",
          details: [
            "Never share your WhatsApp verification code with anyone",
            "Be suspicious if someone asks for your verification code",
            "Contact WhatsApp immediately if you receive unexpected verification codes",
            "Enable two-step verification to prevent unauthorized registration",
            "If locked out, wait 12 hours before trying to re-register",
            "Report account takeover attempts to WhatsApp support"
          ]
        },
        {
          name: "Malware and Suspicious Content",
          details: [
            "Don't download APK files claiming to be WhatsApp updates",
            "Only download WhatsApp from official app stores",
            "Be cautious of forwarded messages with suspicious claims",
            "Don't click on shortened URLs from unknown contacts",
            "Scan any downloaded files with antivirus software",
            "Report malicious content using WhatsApp's reporting feature"
          ]
        },
        {
          name: "Incident Response Plan",
          details: [
            "If compromised, immediately enable two-step verification",
            "Change your phone's lock screen password",
            "Log out of all WhatsApp Web/Desktop sessions",
            "Review recent messages for any sent without your knowledge",
            "Inform important contacts about potential compromise",
            "Consider temporarily deactivating account if severely compromised",
            "Contact WhatsApp support through official channels only"
          ]
        }
      ]
    }
  ]
},

{
  title: "Telegram Security",
  description: "Advanced security and privacy features for Telegram messaging",
  icon: FaComments,
  items: [
    {
      title: "Account Security & Authentication",
      description: "Secure your Telegram account with advanced authentication methods",
      icon: FaUserLock,
      steps: [
        {
          name: "Two-Factor Authentication Setup",
          details: [
            "Enable 2FA in Settings > Privacy and Security > Two-Step Verification",
            "Create a strong password (not just a PIN like other apps)",
            "Add a recovery email address for password reset",
            "Set a password hint that only you understand",
            "Store your password securely in a password manager",
            "Regularly update your 2FA password every 6 months"
          ]
        },
        {
          name: "Phone Number Security",
          details: [
            "Enable 'Who can find me by my number' restrictions",
            "Set up a username to avoid sharing your phone number",
            "Use 'Nobody' for phone number visibility in Privacy settings",
            "Consider using a separate number for Telegram if high-risk",
            "Enable SIM card PIN to prevent SIM swapping attacks",
            "Monitor for unexpected login codes via SMS"
          ]
        },
        {
          name: "Session Management",
          details: [
            "Regularly review active sessions in Settings > Devices",
            "Terminate sessions from unknown or unused devices",
            "Enable 'If Away For' auto-logout for inactive sessions",
            "Set session timeout to maximum 1 week for security",
            "Monitor login notifications and investigate suspicious activity",
            "Use 'Terminate all other sessions' if compromise suspected"
          ]
        }
      ]
    },
    {
      title: "Privacy Controls & Settings",
      description: "Configure Telegram's extensive privacy options",
      icon: FaEyeSlash,
      steps: [
        {
          name: "Profile Privacy Configuration",
          details: [
            "Set 'Last Seen & Online' to 'Nobody' or 'My Contacts'",
            "Configure profile photo visibility (Nobody/Contacts/Everyone)",
            "Set phone number visibility to 'Nobody' for maximum privacy",
            "Control forwarded message attribution settings",
            "Disable 'Allow finding by username' if not needed",
            "Set up username instead of sharing phone number"
          ]
        },
        {
          name: "Message Privacy Settings",
          details: [
            "Enable 'Delete messages for both sides' by default",
            "Set auto-delete timer for all new chats",
            "Configure read receipts settings per your preference",
            "Use 'Restrict Saving Content' for sensitive chats",
            "Enable 'Protect Content' to prevent screenshots in groups",
            "Set up disappearing messages for temporary conversations"
          ]
        },
        {
          name: "Contact and Group Privacy",
          details: [
            "Set 'Who can add me to groups' to 'My Contacts' or 'Nobody'",
            "Configure 'Who can call me' restrictions",
            "Enable admin approval for group join requests",
            "Use invite links with expiration dates for groups",
            "Regularly audit group memberships and leave unused groups",
            "Set up group permissions to restrict member actions"
          ]
        }
      ]
    },
    {
      title: "Secret Chats & Advanced Encryption",
      description: "Utilize Telegram's most secure messaging features",
      icon: FaShieldAlt,
      steps: [
        {
          name: "Secret Chat Implementation",
          details: [
            "Use Secret Chats for highly sensitive conversations",
            "Understand that Secret Chats are device-specific (not cloud-synced)",
            "Enable self-destruct timer for secret chat messages",
            "Verify encryption keys by comparing with contact in person",
            "Use screenshot notifications in secret chats",
            "Remember that secret chats don't support message forwarding"
          ]
        },
        {
          name: "Self-Destructing Messages",
          details: [
            "Set appropriate self-destruct timers (1 second to 1 week)",
            "Use self-destructing media for sensitive photos/videos",
            "Enable 'Delete messages for me and [contact]' for regular chats",
            "Set up auto-delete for all messages in specific timeframes",
            "Understand that self-destruct doesn't prevent screenshots",
            "Use disappearing messages for temporary information sharing"
          ]
        },
        {
          name: "Encryption Verification",
          details: [
            "Verify secret chat encryption keys with important contacts",
            "Check for 'This chat is secured with end-to-end encryption' notice",
            "Compare encryption key fingerprints in person when possible",
            "Be alert to key change notifications in secret chats",
            "Understand difference between cloud chats and secret chats",
            "Use secret chats for discussions requiring perfect forward secrecy"
          ]
        }
      ]
    },
    {
      title: "Advanced Security Features",
      description: "Leverage Telegram's unique security capabilities",
      icon: FaKey,
      steps: [
        {
          name: "Telegram Desktop & Web Security",
          details: [
            "Use official Telegram Desktop app instead of web version when possible",
            "Enable local passcode for Telegram Desktop application",
            "Set up automatic lock timer for desktop application",
            "Regularly update Telegram Desktop to latest version",
            "Use separate sessions for different devices/purposes",
            "Enable hardware acceleration only on trusted devices"
          ]
        },
        {
          name: "Bot and Channel Security",
          details: [
            "Carefully review bot permissions before authorization",
            "Regularly audit and remove unused bot authorizations",
            "Be cautious with bots requesting extensive permissions",
            "Verify official status of channels before joining",
            "Use channel invite links with limited uses when sharing",
            "Monitor channel admin activities in important channels"
          ]
        },
        {
          name: "Cloud Storage Security",
          details: [
            "Understand that regular chats are stored in Telegram cloud",
            "Use secret chats for information you don't want cloud-stored",
            "Regularly clean up cloud storage by deleting old media",
            "Be aware of Telegram's data retention policies",
            "Use local device storage for highly sensitive files",
            "Enable 'Clear Cache' regularly to remove local temporary files"
          ]
        },
        {
          name: "Proxy and Network Security",
          details: [
            "Use MTProto proxies for enhanced connection security",
            "Set up SOCKS5 proxy if in restrictive network environments",
            "Verify proxy server authenticity before connecting",
            "Use Telegram's built-in proxy support rather than system-wide VPN",
            "Monitor connection status and switch proxies if needed",
            "Understand that proxies can see your IP but not message content"
          ]
        }
      ]
    },
    {
      title: "Threat Detection & Response",
      description: "Identify and respond to Telegram security threats",
      icon: FaExclamationTriangle,
      steps: [
        {
          name: "Scam and Fraud Prevention",
          details: [
            "Be suspicious of unsolicited messages asking for personal information",
            "Verify identity through voice/video call for unusual requests",
            "Don't click suspicious links or download unknown files",
            "Be wary of fake Telegram Premium or cryptocurrency scams",
            "Report spam and scam accounts using built-in reporting tools",
            "Never share your login code or 2FA password with anyone"
          ]
        },
        {
          name: "Impersonation and Social Engineering",
          details: [
            "Verify official accounts by checking verification badges",
            "Be cautious of accounts impersonating contacts or celebrities",
            "Cross-verify unusual requests through alternative communication",
            "Check account creation date and activity patterns",
            "Report impersonation accounts to Telegram support",
            "Use usernames to verify authentic accounts"
          ]
        },
        {
          name: "Malware and Suspicious Content",
          details: [
            "Don't download APK files or unofficial Telegram versions",
            "Only download Telegram from official app stores or website",
            "Be cautious of forwarded messages with suspicious claims",
            "Scan downloaded files with antivirus before opening",
            "Avoid clicking shortened URLs from unknown contacts",
            "Report malicious content and channels to Telegram"
          ]
        },
        {
          name: "Account Compromise Response",
          details: [
            "If compromised, immediately change 2FA password",
            "Terminate all active sessions except your current device",
            "Review recent message history for unauthorized activity",
            "Check for unauthorized bot authorizations and revoke them",
            "Inform important contacts about potential compromise",
            "Enable additional security measures like session timeouts",
            "Contact Telegram support if unable to regain control",
            "Consider creating new account if compromise is severe"
          ]
        },
        {
          name: "Privacy Breach Response",
          details: [
            "If personal information leaked, assess the scope of exposure",
            "Change privacy settings to more restrictive levels",
            "Remove or edit messages containing sensitive information",
            "Leave groups where privacy breach occurred",
            "Block contacts who misused your information",
            "Consider changing phone number if widely compromised",
            "Document the incident for potential legal action"
          ]
        }
      ]
    },
    {
      title: "Business & Channel Security",
      description: "Security considerations for Telegram business use and channel management",
      icon: FaPuzzlePiece,
      steps: [
        {
          name: "Channel Administration Security",
          details: [
            "Use separate admin accounts for channel management",
            "Implement admin approval process for new administrators",
            "Regularly audit admin permissions and remove inactive admins",
            "Use admin titles to clearly identify roles and responsibilities",
            "Enable admin log to monitor all administrative actions",
            "Set up channel backup and recovery procedures"
          ]
        },
        {
          name: "Business Account Protection",
          details: [
            "Separate business and personal Telegram usage",
            "Use business-specific phone number for business account",
            "Implement team access controls for shared business accounts",
            "Regular security training for team members using Telegram",
            "Establish incident response procedures for business accounts",
            "Monitor for brand impersonation and trademark violations"
          ]
        },
        {
          name: "Content Moderation Security",
          details: [
            "Set up automated moderation bots with limited permissions",
            "Regularly review and update content filtering rules",
            "Monitor for spam and malicious content in channels/groups",
            "Implement user verification processes for sensitive groups",
            "Use slow mode and member restrictions to prevent spam",
            "Establish clear community guidelines and enforcement procedures"
          ]
        }
      ]
    }
  ]
},


    {
      title: "Privacy Settings",
      description: "Control what information is visible and how it's used",
      icon: FaEyeSlash,
      items: [
        {
          title: "Information Visibility Control",
          description: "Manage who can see your profile and content",
          icon: FaEyeSlash,
          steps: [
            {
              name: "Profile privacy optimization",
              details: [
                "Review who can see your content",
                "Set posts to friends-only by default",
                "Limit past post visibility",
                "Control tag review and approval",
                "Manage location tagging permissions"
              ],
              // images: [
              //   hero1.src,
              //   hero.src,
              //   freepik.src,
              //   hero.src,
              //   freepik.src,
              // ],
            },
            {
              name: "Information restrictions",
              details: [
                "Limit visibility of contact information",
                "Control who can see friends list",
                "Restrict profile findability through search engines",
                "Review profile information and remove sensitive details"
              ],
              // images: [
              //   hero1.src,
              //   hero.src,
              //   freepik.src,
              //   hero.src,
              //   freepik.src,
              // ],
            }
          ]
        },
        {
          title: "Data Sharing Settings",
          description: "Control how platforms use and share your data",
          icon: FaShareAlt,
          steps: [
            {
              name: "Control platform data usage",
              details: [
                "Review and limit ad personalization",
                "Facebook: Settings > Ads > Ad Settings",
                "Google: Data & Privacy > Ad personalization",
                "Twitter: Settings > Privacy and safety > Ads preferences"
              ],
              // images: [
              //   hero1.src,
              //   hero.src,
              //   freepik.src,
              //   hero.src,
              //   freepik.src,
              // ],
            },
            {
              name: "Manage data collection",
              details: [
                "Disable \"activity outside the platform\"",
                "Turn off location history",
                "Limit personalization based on browsing history",
                "Review \"On this day\" and memory features"
              ]
            }
          ]
        },
        {
          title: "Location Privacy",
          description: "Manage location data in social media",
          icon: FaMapMarkerAlt,
          steps: [
            {
              name: "Location sharing management",
              details: [
                "Disable location sharing by default",
                "Review location history and delete regularly",
                "Turn off precise location when approximate is sufficient",
                "Use temporary location sharing when needed"
              ],
              // images: [
              //   hero1.src,
              //   hero.src,
              //   freepik.src,
              //   hero.src,
              //   freepik.src,
              // ],
            },
            {
              name: "Post location scrubbing",
              details: [
                "Remove location data from photos before posting",
                "Check for and delete location metadata in old posts",
                "Disable automatic location tagging",
                "Be aware of indirect location disclosures (landmarks in photos)"
              ]
            }
          ]
        }
      ]
    },
    {
      title: "Content Security",
      description: "Protect the information you share on social media",
      icon: FaHistory,
      items: [
        {
          title: "Post and Content Audit",
          description: "Review and secure your social media content",
          icon: FaHistory,
          steps: [
            {
              name: "Historical content review",
              details: [
                "Systematically review old posts for sensitive information",
                "Delete or restrict posts with personal identifiers (address, phone number)",
                "Remove posts with travel plans or patterns",
                "Check for work details or financial information",
                "Review family information that could aid in identity theft"
              ],
              // images: [
              //   hero1.src,
              //   hero.src,
              //   freepik.src,
              //   hero.src,
              //   freepik.src,
              // ],
            },
            {
              name: "Use platform tools for bulk review",
              details: [
                "Facebook: Activity Log",
                "Twitter: Download archive and review",
                "Instagram: Saved posts and archive"
              ],
              // images: [
              //   hero1.src,
              //   hero.src,
              //   freepik.src,
              //   hero.src,
              //   freepik.src,
              // ],
            },
            {
              name: "Future posting guidelines",
              details: [
                "Create personal policy for content sharing",
                "Establish review process before posting sensitive content",
                "Consider timing delays for location-based posts",
                "Use close friends or private groups for sensitive content"
              ],
              // images: [
              //   hero1.src,
              //   hero.src,
              //   freepik.src,
              //   hero.src,
              //   freepik.src,
              // ],
            }
          ]
        },
        {
          title: "Digital Footprint Management",
          description: "Monitor and control your online presence",
          icon: FaGlobe,
          steps: [
            {
              name: "Search presence audit",
              details: [
                "Google yourself regularly (use incognito mode)",
                "Set up Google alerts for your name",
                "Check image search results",
                "Review social media presence in search results"
              ],
              // images: [
              //   hero1.src,
              //   hero.src,
              //   freepik.src,
              //   hero.src,
              //   freepik.src,
              // ],
            },
            {
              name: "Content removal strategies",
              details: [
                "Request removal of compromising content from websites",
                "Use platform reporting tools for impersonation accounts",
                "Contact search engines for removal of sensitive information",
                "Consider professional reputation management services"
              ],
              // images: [
              //   hero1.src,
              //   hero.src,
              //   freepik.src,
              //   hero.src,
              //   freepik.src,
              // ],
            }
          ]
        },
        {
          title: "Secure Messaging Within Platforms",
          description: "Protect private communications on social media",
          icon: FaComments,
          steps: [
            {
              name: "Direct message security",
              details: [
                "Enable encryption for messages where available",
                "Set messages to auto-delete when possible",
                "Don't share sensitive information via platform messaging",
                "Be aware that platform admins may have access to \"private\" messages"
              ],
              // images: [
              //   hero1.src,
              //   hero.src,
              //   freepik.src,
              //   hero.src,
              //   freepik.src,
              // ],
            },
            {
              name: "Group conversation management",
              details: [
                "Review member lists regularly",
                "Use strict privacy settings for groups",
                "Be cautious about what's shared in larger groups",
                "Leave unused or unnecessary groups"
              ],
              // images: [
              //   hero1.src,
              //   hero.src,
              //   freepik.src,
              //   hero.src,
              //   freepik.src,
              // ],
            }
          ]
        }
      ]
    },
    {
      title: "Compromise Detection and Response",
      description: "Identify and respond to account security incidents",
      icon: FaExclamationTriangle,
      items: [
        {
          title: "Signs of Account Compromise",
          description: "Recognize when your account may be compromised",
          icon: FaSearchPlus,
          steps: [
            {
              name: "Monitoring for unusual activity",
              details: [
                "Posts you don't remember making",
                "Messages sent without your knowledge",
                "Friend/follow requests you didn't initiate",
                "Profile or setting changes you didn't make",
                "Unrecognized logins or devices"
              ],
              // images: [
              //   hero1.src,
              //   hero.src,
              //   freepik.src,
              //   hero.src,
              //   freepik.src,
              // ],
            },
            {
              name: "Automated alerts",
              details: [
                "Enable all security alerts offered by platform",
                "Set up email notifications for account changes",
                "Monitor for password reset emails you didn't request",
                "Watch for new device verification requests"
              ],
              // images: [
              //   hero1.src,
              //   hero.src,
              //   freepik.src,
              //   hero.src,
              //   freepik.src,
              // ],
            }
          ]
        },
        {
          title: "Immediate Response Plan",
          description: "Steps to take when your account is compromised",
          icon: FaClipboardCheck,
          steps: [
            {
              name: "Step-by-step recovery",
              details: [
                "Change password immediately",
                "Enable two-factor authentication if not already active",
                "Log out of all sessions",
                "Review and revoke third-party app access",
                "Check for profile changes and revert if necessary",
                "Scan device for malware"
              ],
              // images: [
              //   hero1.src,
              //   hero.src,
              //   freepik.src,
              //   hero.src,
              //   freepik.src,
              // ],
            },
            {
              name: "Notification process",
              details: [
                "Inform contacts about compromise",
                "Report to platform using official channels",
                "Document incident with screenshots",
                "Consider legal reporting if identity theft occurs"
              ],
              // images: [
              //   hero1.src,
              //   hero.src,
              //   freepik.src,
              //   hero.src,
              //   freepik.src,
              // ],
            }
          ]
        },
        {
          title: "Ongoing Monitoring",
          description: "Maintain vigilance after a security incident",
          icon: FaShieldAlt,
          steps: [
            {
              name: "Post-recovery vigilance",
              details: [
                "Increase login verification frequency",
                "Monitor for repeated compromise attempts",
                "Check linked accounts for security issues",
                "Review privacy settings after any platform updates"
              ],
              // images: [
              //   hero1.src,
              //   hero.src,
              //   freepik.src,
              //   hero.src,
              //   freepik.src,
              // ],
            },
            {
              name: "Security posture improvement",
              details: [
                "Analyze how compromise occurred",
                "Strengthen weak security areas",
                "Consider separate devices for sensitive accounts",
                "Implement lessons learned"
              ],
              // images: [
              //   hero1.src,
              //   hero.src,
              //   freepik.src,
              //   hero.src,
              //   freepik.src,
              // ],
            }
          ]
        }
      ]
    }
  ];
  