import { 
    FaShieldAlt, 
    FaLaptop, 
    FaRobot, 
    FaDownload, 
    FaGlobe, 
    FaLock, 
    FaServer, 
    FaKey, 
    FaCloud, 
    FaDatabase, 
    FaUsb, 
    FaComments, 
    FaEnvelope, 
    FaVideo,
    FaNetworkWired, 
    FaDna, 
    FaChartLine, 
    FaChrome, 
    FaFirefoxBrowser, 
    FaUserSecret, 
    FaHdd, 
    FaTrashAlt
  } from 'react-icons/fa';
  import { IconType } from 'react-icons';
  
  export interface SecurityItem {
    title: string;
    description: string;
    steps: {
      name: string;
      details: string[];
    }[];
    icon: IconType;
  }
  
  export interface SecurityCategory {
    title: string;
    description: string;
    items: SecurityItem[];
    icon: IconType;
  }
  
  export const securitySolutionsData: SecurityCategory[] = [
    {
      title: "Antivirus and Endpoint Protection",
      description: "Software solutions to protect your devices from malware and cyber threats",
      icon: FaShieldAlt,
      items: [
        {
          title: "Consumer Antivirus Solutions",
          description: "Comprehensive protection suites for personal devices",
          icon: FaLaptop,
          steps: [
            {
              name: "Recommended options",
              details: [
                "Bitdefender Total Security",
                "Strengths: Multi-layer ransomware protection, minimal performance impact",
                "Features: VPN, password manager, parental controls",
                "Kaspersky Total Security",
                "Strengths: Excellent malware detection, privacy tools",
                "Features: Secure payment browser, file encryption",
                "Norton 360 Deluxe",
                "Strengths: Comprehensive protection suite, identity monitoring",
                "Features: Cloud backup, parental controls, VPN",
                "ESET Smart Security Premium",
                "Strengths: Light system footprint, advanced heuristics",
                "Features: Password manager, secure file encryption"
              ]
            },
            {
              name: "Implementation best practices",
              details: [
                "Enable real-time scanning",
                "Schedule weekly full system scans",
                "Keep definition databases updated",
                "Configure heuristic detection levels appropriately"
              ]
            }
          ]
        },
        {
          title: "Advanced Endpoint Protection",
          description: "Next-generation security solutions with AI and behavioral analysis",
          icon: FaRobot,
          steps: [
            {
              name: "Next-generation solutions",
              details: [
                "CrowdStrike Falcon (personal plans available)",
                "Strengths: Behavioral AI-based protection, threat hunting",
                "Features: Exploit blocking, advanced persistent threat protection",
                "SentinelOne (personal plans available)",
                "Strengths: Autonomous detection and response",
                "Features: Rollback ransomware changes, fileless malware protection",
                "Malwarebytes Premium",
                "Strengths: Excellent for malware removal, ransomware protection",
                "Features: Exploit protection, malicious website blocking"
              ]
            },
            {
              name: "Configuration considerations",
              details: [
                "Balance security with usability",
                "Configure for your threat profile",
                "Enable exploit protection features",
                "Understand performance implications"
              ]
            }
          ]
        },
        {
          title: "Free Antivirus Options",
          description: "No-cost solutions for basic malware protection",
          icon: FaDownload,
          steps: [
            {
              name: "Reputable free solutions",
              details: [
                "Avast Free Antivirus",
                "Strengths: Strong malware detection, network security scanner",
                "Limitations: Frequent upsell attempts, privacy concerns",
                "AVG AntiVirus Free",
                "Strengths: Real-time protection, performance optimization",
                "Limitations: Limited features compared to paid version",
                "Windows Defender (built-in)",
                "Strengths: No additional installation, decent protection",
                "Limitations: Fewer advanced features",
                "Bitdefender Antivirus Free",
                "Strengths: Lightweight, excellent detection rates",
                "Limitations: Minimal configuration options"
              ]
            },
            {
              name: "Free solution limitations",
              details: [
                "Limited customer support",
                "Reduced feature sets",
                "Possible privacy concerns",
                "More frequent upsell prompts"
              ]
            }
          ]
        }
      ]
    },
    {
      title: "Virtual Private Networks (VPNs)",
      description: "Secure your internet connection and protect your online privacy",
      icon: FaGlobe,
      items: [
        {
          title: "Premium VPN Services",
          description: "Paid VPN solutions with advanced features and strong privacy protections",
          icon: FaLock,
          steps: [
            {
              name: "Top recommendations",
              details: [
                "NordVPN",
                "Strengths: Large server network, strong encryption",
                "Features: Double VPN, Onion over VPN, dedicated IP option",
                "ExpressVPN",
                "Strengths: Extremely fast, excellent global coverage",
                "Features: Split tunneling, TrustedServer technology",
                "Surfshark",
                "Strengths: Unlimited connections, affordable",
                "Features: CleanWeb (ad blocking), MultiHop connections",
                "ProtonVPN",
                "Strengths: Strong privacy focus, transparent security",
                "Features: Secure Core servers, built-in Tor support"
              ]
            },
            {
              name: "Selection criteria",
              details: [
                "No-logs policy (preferably audited)",
                "Strong encryption (AES-256)",
                "Kill switch functionality",
                "DNS leak protection",
                "Jurisdiction (outside 14 Eyes alliance ideal)"
              ]
            }
          ]
        },
        {
          title: "VPN Configuration Best Practices",
          description: "Optimize your VPN setup for maximum security and performance",
          icon: FaLock,
          steps: [
            {
              name: "Security optimization",
              details: [
                "Enable kill switch to prevent leaks",
                "Use OpenVPN or WireGuard protocols",
                "Enable DNS leak protection",
                "Consider disabling IPv6 if not protected",
                "Use strongest available encryption"
              ]
            },
            {
              name: "Usage recommendations",
              details: [
                "Connect before joining public Wi-Fi",
                "Use split tunneling selectively",
                "Test for leaks regularly (ipleak.net)",
                "Keep VPN software updated"
              ]
            }
          ]
        },
        {
          title: "Self-Hosted VPN Options",
          description: "Set up and manage your own VPN infrastructure",
          icon: FaServer,
          steps: [
            {
              name: "DIY solutions",
              details: [
                "WireGuard",
                "Strengths: Modern, fast, simple codebase",
                "Considerations: Requires technical setup knowledge",
                "OpenVPN",
                "Strengths: Well-established, highly configurable",
                "Considerations: More complex setup, slower than WireGuard",
                "Algo VPN",
                "Strengths: Simplified deployment, security-focused",
                "Considerations: Limited customization options"
              ]
            },
            {
              name: "Implementation considerations",
              details: [
                "Server location and jurisdiction",
                "Hardware requirements",
                "Maintenance responsibility",
                "Technical expertise needed"
              ]
            }
          ]
        }
      ]
    },
    {
      title: "Password Managers",
      description: "Securely store and manage your credentials and sensitive information",
      icon: FaKey,
      items: [
        {
          title: "Cloud-Based Password Managers",
          description: "Password management solutions with cross-device synchronization",
          icon: FaCloud,
          steps: [
            {
              name: "Leading solutions",
              details: [
                "Bitwarden",
                "Strengths: Open-source, free tier available",
                "Features: Unlimited passwords, cross-platform sync",
                "1Password",
                "Strengths: User-friendly, travel mode",
                "Features: Watchtower monitoring, secure document storage",
                "LastPass",
                "Strengths: Intuitive interface, auto-fill capabilities",
                "Features: Security dashboard, password sharing",
                "Dashlane",
                "Strengths: Beautiful design, integrated VPN",
                "Features: Dark web monitoring, automatic password changing"
              ]
            },
            {
              name: "Security considerations",
              details: [
                "Enable two-factor authentication",
                "Create strong master password",
                "Use biometric unlock on devices",
                "Keep recovery options current"
              ]
            }
          ]
        },
        {
          title: "Local Password Managers",
          description: "Offline password solutions without cloud dependencies",
          icon: FaDatabase,
          steps: [
            {
              name: "Offline options",
              details: [
                "KeePassXC",
                "Strengths: Open-source, no cloud dependency",
                "Features: Highly customizable, extensible with plugins",
                "Password Safe",
                "Strengths: Designed by security expert Bruce Schneier",
                "Features: Simple interface, YubiKey support"
              ]
            },
            {
              name: "Implementation tips",
              details: [
                "Create secure backups (multiple locations)",
                "Develop sync strategy if using multiple devices",
                "Consider encrypted cloud storage for backups",
                "Test recovery process periodically"
              ]
            }
          ]
        },
        {
          title: "Hardware Password Solutions",
          description: "Physical devices for secure credential storage and authentication",
          icon: FaUsb,
          steps: [
            {
              name: "Physical security devices",
              details: [
                "YubiKey",
                "Strengths: Physical authentication, multiple protocols",
                "Features: FIDO2, U2F, OTP, and static password support",
                "OnlyKey",
                "Strengths: PIN protection, multiple profiles",
                "Features: Built-in password manager, self-destruct option",
                "Mooltipass",
                "Strengths: Offline password management",
                "Features: Touch unlock, encrypted backup"
              ]
            },
            {
              name: "Usage scenarios",
              details: [
                "Second factor for password manager",
                "Master password alternative",
                "FIDO2 authentication for supported sites",
                "Phishing-resistant authentication"
              ]
            }
          ]
        }
      ]
    },
    {
      title: "Secure Communication Tools",
      description: "Protect your conversations, messages, and communications from eavesdropping",
      icon: FaComments,
      items: [
        {
          title: "Encrypted Messaging Apps",
          description: "Applications for private and secure text messaging",
          icon: FaComments,
          steps: [
            {
              name: "Recommended applications",
              details: [
                "Signal",
                "Strengths: Strong encryption, open-source",
                "Features: Disappearing messages, sealed sender",
                "Wire",
                "Strengths: Comprehensive security, business focus",
                "Features: Secure file sharing, guest rooms",
                "Threema",
                "Strengths: Minimal data collection, anonymous use possible",
                "Features: Polling function, private chats",
                "Session",
                "Strengths: No phone number required, decentralized",
                "Features: Onion routing, group encryption"
              ]
            },
            {
              name: "Security features to utilize",
              details: [
                "Disappearing messages",
                "Screen security (anti-screenshot)",
                "Secondary authentication (app lock)",
                "Message verification codes"
              ]
            }
          ]
        },
        {
          title: "Secure Email Providers",
          description: "Privacy-focused email services with enhanced security",
          icon: FaEnvelope,
          steps: [
            {
              name: "Privacy-focused email",
              details: [
                "ProtonMail",
                "Strengths: End-to-end encryption, Swiss privacy laws",
                "Features: Encrypted contacts, self-destructing emails",
                "Tutanota",
                "Strengths: Complete encryption, open-source",
                "Features: Encrypted calendar, anonymous use",
                "Mailfence",
                "Strengths: Digital signatures, PGP support",
                "Features: Integrated calendar and documents",
                "Posteo",
                "Strengths: Sustainable focus, privacy commitment",
                "Features: No tracking, anonymous payment"
              ]
            },
            {
              name: "Implementation approach",
              details: [
                "Create multiple aliases for different purposes",
                "Use domain discretion (work vs. personal)",
                "Configure strongest available encryption",
                "Establish key management process if using PGP"
              ]
            }
          ]
        },
        {
          title: "Voice and Video Communication",
          description: "Secure solutions for calls and video conferences",
          icon: FaVideo,
          steps: [
            {
              name: "Secure calling options",
              details: [
                "Signal (voice and video)",
                "Strengths: End-to-end encryption, call quality",
                "Features: Screen sharing, group calls",
                "Jitsi Meet",
                "Strengths: Open-source, no account required",
                "Features: Screen sharing, meeting lobbies",
                "Wickr",
                "Strengths: Ephemeral messaging, secure rooms",
                "Features: Video calling, file sharing"
              ]
            },
            {
              name: "Security best practices",
              details: [
                "Verify call encryption indicators",
                "Use meeting passwords for group calls",
                "Be aware of metadata collection",
                "Consider background privacy during video calls"
              ]
            }
          ]
        },
      ]
    },
    {
        title: "Network Protection Tools",
        description: "Secure your home network and internet traffic from threats and intrusions",
        icon: FaNetworkWired,
        items: [
          {
            title: "Home Network Security Devices",
            description: "Dedicated hardware to protect all devices on your network",
            icon: FaNetworkWired,
            steps: [
              {
                name: "Dedicated security hardware",
                details: [
                  "Firewalla",
                  "Strengths: Easy setup, comprehensive monitoring",
                  "Features: Intrusion detection, VPN server, ad blocking",
                  "Bitdefender Box",
                  "Strengths: IoT protection, vulnerability assessment",
                  "Features: Parental controls, anomaly detection",
                  "CUJO Smart Firewall",
                  "Strengths: Simple interface, business-grade security",
                  "Features: Threat intelligence, device recognition",
                  "Gryphon Guardian",
                  "Strengths: Mesh capability, advanced parental controls",
                  "Features: Malware filtering, content filtering"
                ]
              },
              {
                name: "Implementation considerations",
                details: [
                  "Network topology compatibility",
                  "Subscription requirements",
                  "Technical expertise needed",
                  "Integration with existing equipment"
                ]
              }
            ]
          },
          {
            title: "DNS Protection",
            description: "Secure DNS services to filter malicious domains and enhance privacy",
            icon: FaDna,
            steps: [
              {
                name: "Secure DNS services",
                details: [
                  "NextDNS",
                  "Strengths: Highly customizable, analytics",
                  "Features: Custom blocklists, activity logs",
                  "Quad9",
                  "Strengths: Threat intelligence integration, privacy focus",
                  "Features: Malicious domain blocking, DNSSEC validation",
                  "AdGuard DNS",
                  "Strengths: Ad and tracker blocking, family protection",
                  "Features: Custom filtering, statistics",
                  "Cloudflare 1.1.1.1 with WARP",
                  "Strengths: Speed, privacy commitment",
                  "Features: Malware blocking, WARP+ VPN"
                ]
              },
              {
                name: "Setup guidance",
                details: [
                  "Router-level configuration preferred",
                  "Device-specific settings as alternative",
                  "Test for DNS leaks after configuration",
                  "Implement DoH (DNS over HTTPS) where possible"
                ]
              }
            ]
          },
          {
            title: "Traffic Analysis Tools",
            description: "Monitor and analyze network traffic for security and performance",
            icon: FaChartLine,
            steps: [
              {
                name: "Network monitoring solutions",
                details: [
                  "Wireshark",
                  "Strengths: Deep packet inspection, comprehensive analysis",
                  "Features: Protocol decoding, capture filters",
                  "Glasswire",
                  "Strengths: User-friendly interface, alerts",
                  "Features: Visual network monitoring, firewall control",
                  "Little Snitch (Mac)",
                  "Strengths: Application-focused firewall, detailed control",
                  "Features: Network monitoring, connection blocking",
                  "NetLimiter (Windows)",
                  "Strengths: Traffic control, application rules",
                  "Features: Connection monitoring, bandwidth limiting"
                ]
              },
              {
                name: "Implementation strategy",
                details: [
                  "Regular network traffic analysis",
                  "Baseline normal activity patterns",
                  "Configure alerts for anomalies",
                  "Document authorized applications and connections"
                ]
              }
            ]
          }
        ]
      },
      {
        title: "Privacy Enhancement Tools",
        description: "Protect your personal data and browsing habits from tracking and surveillance",
        icon: FaUserSecret,
        items: [
          {
            title: "Browser Privacy Extensions",
            description: "Add-ons to enhance privacy and security while browsing",
            icon: FaChrome,
            steps: [
              {
                name: "Essential add-ons",
                details: [
                  "uBlock Origin",
                  "Strengths: Efficient ad blocking, resource-light",
                  "Features: Custom filters, element zapper",
                  "Privacy Badger",
                  "Strengths: Learning-based tracking prevention",
                  "Features: Automatic detection, minimal configuration",
                  "HTTPS Everywhere",
                  "Strengths: Automatic TLS upgrade",
                  "Features: SSL enforcement, custom rules",
                  "Decentraleyes",
                  "Strengths: Local CDN emulation",
                  "Features: Reduces third-party requests"
                ]
              },
              {
                name: "Configuration recommendations",
                details: [
                  "Balance privacy with usability",
                  "Whitelist trusted sites as needed",
                  "Regular updates essential",
                  "Test for fingerprinting protection"
                ]
              }
            ]
          },
          {
            title: "Privacy-Focused Browsers",
            description: "Alternative browsers designed with privacy and security in mind",
            icon: FaFirefoxBrowser,
            steps: [
              {
                name: "Alternative browser options",
                details: [
                  "Brave Browser",
                  "Strengths: Built-in ad blocking, tracking prevention",
                  "Features: HTTPS upgrades, Tor integration",
                  "Firefox with privacy hardening",
                  "Strengths: Open-source, community support",
                  "Features: Enhanced Tracking Protection, containers",
                  "Tor Browser",
                  "Strengths: Anonymity network, anti-fingerprinting",
                  "Features: Circuit isolation, gradual security levels",
                  "Ungoogled Chromium",
                  "Strengths: Google services removed, privacy focus",
                  "Features: Chrome compatibility, reduced tracking"
                ]
              },
              {
                name: "Implementation approach",
                details: [
                  "Browser compartmentalization strategy",
                  "Separate browsers for different purposes",
                  "Regular privacy settings audit",
                  "Private browsing mode usage strategy"
                ]
              }
            ]
          },
          {
            title: "System-Wide Privacy Tools",
            description: "Comprehensive solutions for privacy across your entire system",
            icon: FaUserSecret,
            steps: [
              {
                name: "Comprehensive privacy solutions",
                details: [
                  "Tails OS (portable privacy-focused operating system)",
                  "Strengths: Amnesic design, Tor routing",
                  "Features: Leaves no traces, encrypted persistence",
                  "Little Snitch/LuLu (application firewall)",
                  "Strengths: Granular connection control",
                  "Features: Application-specific rules, silent mode",
                  "Micro Snitch (webcam/microphone monitor)",
                  "Strengths: Real-time hardware access alerts",
                  "Features: Activity history, visual indicators",
                  "PrivacyTools (collection of privacy resources)",
                  "Strengths: Curated recommendations",
                  "Features: Comprehensive tools by category"
                ]
              },
              {
                name: "Implementation considerations",
                details: [
                  "Balance security with usability",
                  "Consider operating system compatibility",
                  "Evaluate performance impacts",
                  "Test functionality after setup"
                ]
              }
            ]
          }
        ]
      },
      {
        title: "Data Protection Tools",
        description: "Secure your files and data from unauthorized access and data loss",
        icon: FaShieldAlt,
        items: [
          {
            title: "File Encryption Solutions",
            description: "Tools to encrypt your files and storage devices",
            icon: FaLock,
            steps: [
              {
                name: "Full-disk encryption",
                details: [
                  "BitLocker (Windows)",
                  "Strengths: Integrated with OS, TPM support",
                  "Features: Automatic unlocking, recovery options",
                  "FileVault (macOS)",
                  "Strengths: Seamless integration, minimal performance impact",
                  "Features: Recovery key, institutional management",
                  "VeraCrypt (cross-platform)",
                  "Strengths: Open-source, plausible deniability",
                  "Features: Hidden volumes, multiple encryption algorithms",
                  "LUKS (Linux)",
                  "Strengths: Integrated with many distributions",
                  "Features: Multiple key slots, hibernation protection"
                ]
              },
              {
                name: "Usage recommendations",
                details: [
                  "Enable pre-boot authentication",
                  "Store recovery keys securely",
                  "Consider performance implications",
                  "Test recovery procedures"
                ]
              }
            ]
          },
          {
            title: "Secure File Storage",
            description: "Encrypted storage solutions for sensitive files",
            icon: FaHdd,
            steps: [
              {
                name: "Encrypted cloud storage",
                details: [
                  "Tresorit",
                  "Strengths: Zero-knowledge encryption, business focus",
                  "Features: Encrypted sharing, version history",
                  "pCloud Crypto",
                  "Strengths: Client-side encryption, lifetime plans",
                  "Features: Separate encrypted folder, flexible access",
                  "Sync.com",
                  "Strengths: Zero-knowledge design, HIPAA compliance",
                  "Features: Password-protected sharing, recovery options",
                  "Cryptomator (works with any cloud service)",
                  "Strengths: Open-source, transparent operation",
                  "Features: Virtual disk mounting, filename encryption"
                ]
              },
              {
                name: "Implementation approach",
                details: [
                  "Use strong, unique passwords",
                  "Enable two-factor authentication",
                  "Understand recovery limitations",
                  "Test synchronization across devices"
                ]
              }
            ]
          },
          {
            title: "Secure Deletion Tools",
            description: "Solutions to permanently erase sensitive data",
            icon: FaTrashAlt,
            steps: [
              {
                name: "Data wiping solutions",
                details: [
                  "Eraser (Windows)",
                  "Strengths: Multiple overwrite methods, scheduler",
                  "Features: Integration with Explorer, custom patterns",
                  "FileShredder (Windows)",
                  "Strengths: Simple interface, quick operation",
                  "Features: Context menu integration, multiple algorithms",
                  "Secure Delete (macOS)",
                  "Strengths: Native integration, verification",
                  "Features: Terminal or GUI operation",
                  "BleachBit (cross-platform)",
                  "Strengths: Open-source, system cleaner",
                  "Features: Multiple shredding methods, batch processing"
                ]
              },
              {
                name: "Usage guidelines",
                details: [
                  "Understand recovery implications for SSD vs. HDD",
                  "Select appropriate wiping standards",
                  "Verify deletion when critical",
                  "Consider full-disk encryption as complementary strategy"
                ]
              }
            ]
          }
        ]
      }
    ];
    