import { 
    FaLock, 
    FaShieldAlt, 
    FaUserLock, 
    FaSignInAlt, 
    FaEye, 
    FaKey, 
    FaEnvelope, 
    FaPaperclip, 
    FaFileAlt, 
    FaBan, 
    FaCode, 
    FaCog, 
    FaLayerGroup, 
    FaClipboardList, 
    FaExclamationTriangle, 
    FaSearchPlus,
    FaClipboardCheck
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
  
  export const emailSecurityData: SecurityCategory[] = [
    {
      title: "Account Protection",
      description: "Secure your email accounts against unauthorized access",
      icon: FaUserLock,
      items: [
        {
          title: "Email Authentication",
          description: "Strengthen login security for your email accounts",
          icon: FaShieldAlt,
          steps: [
            {
              name: "Secure account credentials",
              details: [
                "Create a unique, complex password (16+ characters)",
                "Enable two-factor authentication:",
                "Gmail: Security > 2-Step Verification",
                "Outlook: Security > Advanced security options > Two-step verification",
                "Yahoo: Account security > Two-step verification",
                "ProtonMail: Settings > Password & recovery > Two-factor authentication",
                "Use hardware security keys for highest protection"
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
              name: "Recovery options",
              details: [
                "Configure multiple recovery methods",
                "Set up recovery email on different provider",
                "Securely store backup codes",
                "Update recovery information yearly"
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
          title: "Access Control",
          description: "Manage active sessions and device access to your email",
          icon: FaSignInAlt,
          steps: [
            {
              name: "Session management",
              details: [
                "Review active sessions regularly:",
                "Gmail: Last account activity (bottom of inbox)",
                "Outlook: View and manage app activity in security settings",
                "Yahoo: Recent activity in account security",
                "Log out remote sessions",
                "Set automatic logout after inactivity",
                "Check for unauthorized app access"
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
              name: "Device security",
              details: [
                "Limit email access to trusted devices",
                "Remove old devices from approved list",
                "Require re-authentication periodically",
                "Use email client security features (app lock)"
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
          title: "Account Monitoring",
          description: "Track and review email account activity for suspicious behavior",
          icon: FaEye,
          steps: [
            {
              name: "Audit account activity",
              details: [
                "Check login history weekly",
                "Review \"sent items\" folder for unauthorized emails",
                "Monitor for unexpected password reset requests",
                "Watch for unusual forwarding or filtering rules"
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
              name: "Alert configuration",
              details: [
                "Enable notifications for new device logins",
                "Set up alerts for suspicious activity",
                "Configure email or SMS for security events",
                "Review notification settings after provider updates"
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
      title: "Email Content Security",
      description: "Protect the information you send and receive via email",
      icon: FaEnvelope,
      items: [
        {
          title: "Email Encryption",
          description: "Secure the contents of your email communications",
          icon: FaLock,
          steps: [
            {
              name: "End-to-end encryption options",
              details: [
                "ProtonMail or Tutanota for native encryption",
                "PGP/GPG for standard email providers:",
                "Install plugin (Mailvelope for webmail)",
                "Generate key pair",
                "Exchange public keys with contacts",
                "Encrypt sensitive emails",
                "S/MIME for business communications:",
                "Obtain certificate from trusted authority",
                "Install on email clients",
                "Exchange certificates with contacts"
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
              name: "Everyday encryption practices",
              details: [
                "Use TLS-secured email providers",
                "Verify TLS connection (lock icon in webmail)",
                "Password-protect sensitive attachments",
                "Send passwords via different channel (SMS, call)"
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
          title: "Attachment and Link Safety",
          description: "Safely handle email attachments and links",
          icon: FaPaperclip,
          steps: [
            {
              name: "Safe attachment handling",
              details: [
                "Scan all attachments before opening",
                "Don't open unexpected attachments",
                "Use document viewers instead of full applications when possible",
                "Consider sandbox environments for suspicious files"
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
              name: "Link verification",
              details: [
                "Hover over links to preview destination",
                "Use link scanning tools:",
                "Virus Total URL checker",
                "PhishTank",
                "Google Safe Browsing",
                "Type URLs directly rather than clicking",
                "Be cautious of shortened URLs (use unshorteners)"
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
          title: "Sensitive Content Practices",
          description: "Protect confidential information in emails",
          icon: FaFileAlt,
          steps: [
            {
              name: "Information protection",
              details: [
                "Never send highly sensitive info via regular email",
                "Use secure sharing platforms for confidential documents",
                "Consider secure document destruction after use",
                "Implement information classification system"
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
              name: "Self-destructing messages",
              details: [
                "Use services with expiration features:",
                "ProtonMail expiring emails",
                "Snapmail",
                "Confidential mode in Gmail",
                "Set appropriate expiration timeframes",
                "Verify recipient understands expiration limitations"
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
      title: "Structural Email Security",
      description: "Configure email settings and systems for enhanced protection",
      icon: FaCog,
      items: [
        {
          title: "Spam and Phishing Protection",
          description: "Defend against unwanted and malicious emails",
          icon: FaBan,
          steps: [
            {
              name: "Filter configuration",
              details: [
                "Use provider's spam filtering:",
                "Gmail: Report spam and enable automatic filtering",
                "Outlook: Junk email protection settings",
                "Yahoo: Security > Blocked addresses",
                "Create custom filters for persistent spam",
                "Use \"plus addressing\" for signups (username+service@domain.com)",
                "Regularly empty spam folder"
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
              name: "Phishing prevention",
              details: [
                "Enable anti-phishing features if available",
                "Never provide credentials from email links",
                "Verify sender email address carefully",
                "Be suspicious of urgency or threats in messages"
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
          title: "Email Header Analysis",
          description: "Examine email headers to identify suspicious messages",
          icon: FaCode,
          steps: [
            {
              name: "Header examination techniques",
              details: [
                "View full headers when suspicious:",
                "Gmail: Three dots > Show original",
                "Outlook: Three dots > View message details",
                "Check \"Received\" fields for unusual servers",
                "Verify SPF, DKIM, and DMARC status",
                "Look for mismatched display name and email address"
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
              name: "Red flags in headers",
              details: [
                "Mismatched return paths",
                "Multiple forwarding hops through unusual servers",
                "Failed authentication checks",
                "Suspicious originating IP addresses"
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
          title: "Advanced Protection Features",
          description: "Implement additional security measures for email",
          icon: FaShieldAlt,
          steps: [
            {
              name: "Provider security options",
              details: [
                "Gmail Advanced Protection Program (for high-risk users)",
                "Microsoft Defender for Office 365 (business accounts)",
                "Domain-based protections (SPF, DKIM, DMARC)",
                "Email gateway security solutions"
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
              name: "Anti-tracking measures",
              details: [
                "Disable remote image loading:",
                "Gmail: Settings > General > Images",
                "Outlook: Settings > View all Outlook settings > Mail > External content",
                "Use text-only email when possible",
                "Consider email privacy tools (Ugly Email, PixelBlock)",
                "Be cautious with read receipts"
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
      title: "Multi-Account Security",
      description: "Manage multiple email accounts securely",
      icon: FaLayerGroup,
      items: [
        {
          title: "Email Separation Strategy",
          description: "Organize email accounts by purpose and security level",
          icon: FaClipboardList,
          steps: [
            {
              name: "Purpose-based accounts",
              details: [
                "Primary personal account (close contacts only)",
                "Secondary account (online services, shopping)",
                "Professional email (work communications)",
                "Throwaway accounts (temporary signups)"
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
              name: "Isolation practices",
              details: [
                "Use different providers for critical accounts",
                "Consider separate devices for highest security",
                "Don't forward between security levels",
                "Implement different security measures by account type"
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
          title: "Account Management",
          description: "Track and maintain multiple email accounts",
          icon: FaKey,
          steps: [
            {
              name: "Organization system",
              details: [
                "Document all email accounts and their purposes",
                "Use password manager to track credentials",
                "Schedule regular security reviews by account",
                "Consider account deletion for unused emails"
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
              name: "Cross-account protection",
              details: [
                "Avoid using one email as recovery for another",
                "Prevent daisy-chaining compromises",
                "Use non-email recovery options when possible",
                "Create unique security questions for each account"
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
      title: "Compromise Recovery",
      description: "Identify and respond to email account security incidents",
      icon: FaExclamationTriangle,
      items: [
        {
          title: "Detection of Compromise",
          description: "Recognize when your email account may be compromised",
          icon: FaSearchPlus,
          steps: [
            {
              name: "Warning signs",
              details: [
                "Unexpected password resets",
                "Unrecognized sent emails",
                "Missing or read emails you haven't opened",
                "Contacts receiving emails you didn't send",
                "Unusual account settings or filters",
                "Being locked out of your account"
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
              name: "Proactive verification",
              details: [
                "Check \"sent items\" regularly",
                "Review account activity logs",
                "Set up alerts for forwarding rules",
                "Test account access periodically"
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
          title: "Immediate Response Protocol",
          description: "Steps to take when your email account is compromised",
          icon: FaClipboardCheck,
          steps: [
            {
              name: "Containment steps",
              details: [
                "Change password immediately",
                "Enable two-factor authentication",
                "Check and remove forwarding rules",
                "Review and remove unauthorized filters",
                "Scan for and remove malware on all devices",
                "Log out of all sessions",
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
              name: "Evidence preservation",
              details: [
                "Screenshot unauthorized activities",
                "Save suspicious emails with full headers",
                "Document timeline of events",
                "Preserve login history if available"
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
          title: "Account Recovery Process",
          description: "Regain access to and secure a compromised email account",
          icon: FaKey,
          steps: [
            {
              name: "Service-specific recovery",
              details: [
                "Gmail: account recovery page with verification",
                "Outlook: account recovery with proof of identity",
                "Yahoo: account recovery with alternate email/phone",
                "Follow provider-specific procedures exactly",
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
              name: "Post-recovery security",
              details: [
                "Complete security checkup",
                "Review third-party app access",
                "Update all recovery information",
                "Change passwords on linked accounts",
                "Consider migration to new email if heavily compromised"
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
    }
  ];
