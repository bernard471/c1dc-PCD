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
  import hero1 from '../images/hero1.jpg';
  import hero from '../images/hero.webp';
  import freepik from '../images/freepik.jpeg';
  
  export interface SecurityItem {
    title: string;
    description: string;
    steps: {
      name: string;
      details: string[];
    }[];
    icon: IconType;
    images?: string[]; // Array of image paths
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
          images: [
            hero1.src,
            hero.src,
            freepik.src,
            hero.src,
            freepik.src,
          ],
          steps: [
            {
              name: "Strong authentication setup",
              details: [
                "Create platform-specific passwords (don't reuse across sites)",
                "Use maximum allowed password length (aim for 16+ characters)",
                "Enable two-factor authentication on all platforms",
                "Use authenticator apps over SMS where possible",
                "Consider hardware security keys for highest security"
              ]
            },
            {
              name: "Review account recovery options",
              details: [
                "Update recovery email and phone",
                "Disable SMS recovery if other methods available",
                "Set strong security questions with non-guessable answers"
              ]
            }
          ]
        },
        {
          title: "Login Monitoring",
          description: "Track and manage active sessions on your accounts",
          icon: FaSignInAlt,
          images: [
            hero1.src,
            hero.src,
            freepik.src,
            hero.src,
            freepik.src,
          ],
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
              ]
            },
            {
              name: "Set up alerts for new logins",
              details: [
                "Enable login notifications via email or app",
                "Review unknown login attempts immediately",
                "Log out suspicious sessions remotely",
                "Change password after suspicious activity"
              ]
            }
          ]
        },
        {
          title: "Third-Party App Connections",
          description: "Manage applications connected to your social media accounts",
          icon: FaPuzzlePiece,
          images: [
            hero1.src,
            hero.src,
            freepik.src,
            hero.src,
            freepik.src,
          ],
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
              ]
            },
            {
              name: "Permission management",
              details: [
                "Review what data each app can access",
                "Revoke unnecessary permissions",
                "Set calendar reminder for quarterly audits",
                "Be cautious when granting new permissions"
              ]
            }
          ]
        },
        {
          title: "Account Recovery Preparation",
          description: "Prepare for potential account lockouts or compromise",
          icon: FaKey,
          images: [
            hero1.src,
            hero.src,
            freepik.src,
            hero.src,
            freepik.src,
          ],
          steps: [
            {
              name: "Proactive measures",
              details: [
                "Document account recovery procedures for each platform",
                "Save backup codes in secure location (password manager)",
                "Keep screenshot of QR codes for authenticator apps",
                "Add trusted contacts where available (Facebook)"
              ]
            },
            {
              name: "Recovery kit creation",
              details: [
                "Prepare proof of identity documents",
                "Document account creation date and details",
                "Save original email used for registration",
                "Keep record of payment methods associated with accounts"
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
          images: [
            hero1.src,
            hero.src,
            freepik.src,
            hero.src,
            freepik.src,
          ],
          steps: [
            {
              name: "Profile privacy optimization",
              details: [
                "Review who can see your content",
                "Set posts to friends-only by default",
                "Limit past post visibility",
                "Control tag review and approval",
                "Manage location tagging permissions"
              ]
            },
            {
              name: "Information restrictions",
              details: [
                "Limit visibility of contact information",
                "Control who can see friends list",
                "Restrict profile findability through search engines",
                "Review profile information and remove sensitive details"
              ]
            }
          ]
        },
        {
          title: "Data Sharing Settings",
          description: "Control how platforms use and share your data",
          icon: FaShareAlt,
          images: [
            hero1.src,
            hero.src,
            freepik.src,
            hero.src,
            freepik.src,
          ],
          steps: [
            {
              name: "Control platform data usage",
              details: [
                "Review and limit ad personalization",
                "Facebook: Settings > Ads > Ad Settings",
                "Google: Data & Privacy > Ad personalization",
                "Twitter: Settings > Privacy and safety > Ads preferences"
              ]
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
          images: [
            hero1.src,
            hero.src,
            freepik.src,
            hero.src,
            freepik.src,
          ],
          steps: [
            {
              name: "Location sharing management",
              details: [
                "Disable location sharing by default",
                "Review location history and delete regularly",
                "Turn off precise location when approximate is sufficient",
                "Use temporary location sharing when needed"
              ]
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
          images: [
            hero1.src,
            hero.src,
            freepik.src,
            hero.src,
            freepik.src,
          ],
          steps: [
            {
              name: "Historical content review",
              details: [
                "Systematically review old posts for sensitive information",
                "Delete or restrict posts with personal identifiers (address, phone number)",
                "Remove posts with travel plans or patterns",
                "Check for work details or financial information",
                "Review family information that could aid in identity theft"
              ]
            },
            {
              name: "Use platform tools for bulk review",
              details: [
                "Facebook: Activity Log",
                "Twitter: Download archive and review",
                "Instagram: Saved posts and archive"
              ]
            },
            {
              name: "Future posting guidelines",
              details: [
                "Create personal policy for content sharing",
                "Establish review process before posting sensitive content",
                "Consider timing delays for location-based posts",
                "Use close friends or private groups for sensitive content"
              ]
            }
          ]
        },
        {
          title: "Digital Footprint Management",
          description: "Monitor and control your online presence",
          icon: FaGlobe,
          images: [
            hero1.src,
            hero.src,
            freepik.src,
            hero.src,
            freepik.src,
          ],
          steps: [
            {
              name: "Search presence audit",
              details: [
                "Google yourself regularly (use incognito mode)",
                "Set up Google alerts for your name",
                "Check image search results",
                "Review social media presence in search results"
              ]
            },
            {
              name: "Content removal strategies",
              details: [
                "Request removal of compromising content from websites",
                "Use platform reporting tools for impersonation accounts",
                "Contact search engines for removal of sensitive information",
                "Consider professional reputation management services"
              ]
            }
          ]
        },
        {
          title: "Secure Messaging Within Platforms",
          description: "Protect private communications on social media",
          icon: FaComments,
          images: [
            hero1.src,
            hero.src,
            freepik.src,
            hero.src,
            freepik.src,
          ],
          steps: [
            {
              name: "Direct message security",
              details: [
                "Enable encryption for messages where available",
                "Set messages to auto-delete when possible",
                "Don't share sensitive information via platform messaging",
                "Be aware that platform admins may have access to \"private\" messages"
              ]
            },
            {
              name: "Group conversation management",
              details: [
                "Review member lists regularly",
                "Use strict privacy settings for groups",
                "Be cautious about what's shared in larger groups",
                "Leave unused or unnecessary groups"
              ]
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
          images: [
            hero1.src,
            hero.src,
            freepik.src,
            hero.src,
            freepik.src,
          ],
          steps: [
            {
              name: "Monitoring for unusual activity",
              details: [
                "Posts you don't remember making",
                "Messages sent without your knowledge",
                "Friend/follow requests you didn't initiate",
                "Profile or setting changes you didn't make",
                "Unrecognized logins or devices"
              ]
            },
            {
              name: "Automated alerts",
              details: [
                "Enable all security alerts offered by platform",
                "Set up email notifications for account changes",
                "Monitor for password reset emails you didn't request",
                "Watch for new device verification requests"
              ]
            }
          ]
        },
        {
          title: "Immediate Response Plan",
          description: "Steps to take when your account is compromised",
          icon: FaClipboardCheck,
          images: [
            hero1.src,
            hero.src,
            freepik.src,
            hero.src,
            freepik.src,
          ],
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
              ]
            },
            {
              name: "Notification process",
              details: [
                "Inform contacts about compromise",
                "Report to platform using official channels",
                "Document incident with screenshots",
                "Consider legal reporting if identity theft occurs"
              ]
            }
          ]
        },
        {
          title: "Ongoing Monitoring",
          description: "Maintain vigilance after a security incident",
          icon: FaShieldAlt,
          images: [
            hero1.src,
            hero.src,
            freepik.src,
            hero.src,
            freepik.src,
          ],
          steps: [
            {
              name: "Post-recovery vigilance",
              details: [
                "Increase login verification frequency",
                "Monitor for repeated compromise attempts",
                "Check linked accounts for security issues",
                "Review privacy settings after any platform updates"
              ]
            },
            {
              name: "Security posture improvement",
              details: [
                "Analyze how compromise occurred",
                "Strengthen weak security areas",
                "Consider separate devices for sensitive accounts",
                "Implement lessons learned"
              ]
            }
          ]
        }
      ]
    }
  ];
  