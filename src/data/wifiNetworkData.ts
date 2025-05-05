import { 
  FaWifi, 
  FaLock, 
  FaShieldAlt, 
  FaCog, 
  FaNetworkWired, 
  FaUserShield, 
  FaKey, 
  FaServer, 
  FaEye, 
  FaDesktop, 
  FaGlobe, 
  FaHome, 
  FaMobileAlt, 
  FaClipboardCheck
} from 'react-icons/fa';
import { IconType } from 'react-icons';

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

export const wifiSecurityData: SecurityCategory[] = [
  {
    title: "Router Configuration",
    description: "Secure your router settings and firmware",
    icon: FaCog,
    items: [
      {
        title: "Admin Access Security",
        description: "Secure the administrative access to your router",
        icon: FaLock,
        steps: [
          {
            name: "Change default admin credentials",
            details: [
              "Access router admin interface (typically 192.168.0.1 or 192.168.1.1)",
              "Replace default username/password with strong alternatives",
              "Store these credentials in password manager"
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
            name: "Update router firmware",
            details: [
              "Check manufacturer website for latest firmware",
              "Enable automatic updates if available",
              "Schedule quarterly manual checks"
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
            name: "Disable remote management",
            details: [
              "Find \"Remote Management\" or \"Remote Administration\" settings",
              "Ensure this feature is turned off"
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
        title: "Network Name and Password",
        description: "Configure secure network identification and access",
        icon: FaWifi,
        steps: [
          {
            name: "Change default SSID (network name)",
            details: [
              "Don't include personal information or router model",
              "Create neutral name that doesn't stand out"
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
            name: "Set strong Wi-Fi password",
            details: [
              "Minimum 12 characters",
              "Mix of uppercase, lowercase, numbers, and symbols",
              "Avoid dictionary words or personal information",
              "Change password every 6-12 months"
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
            name: "Hide network SSID (optional, provides minimal security)",
            details: [
              "Disable SSID broadcast in router settings",
              "Note: This requires manual network setup on devices"
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
        title: "Encryption Standards",
        description: "Implement secure encryption for your wireless network",
        icon: FaShieldAlt,
        steps: [
          {
            name: "Use WPA3 encryption if available",
            details: [
              "Check router security settings",
              "Select WPA3-Personal or WPA3/WPA2-Mixed if devices are compatible"
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
            name: "If WPA3 unavailable, use WPA2-PSK (AES)",
            details: [
              "Avoid TKIP or WEP encryption (obsolete and insecure)",
              "Disable WPS (Wi-Fi Protected Setup)"
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
        title: "Network Segmentation",
        description: "Separate your network for different purposes and security levels",
        icon: FaNetworkWired,
        steps: [
          {
            name: "Create guest network",
            details: [
              "Enable guest network feature in router settings",
              "Use different password from main network",
              "Disable guest access to local network resources"
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
            name: "Consider IoT-specific network",
            details: [
              "Create separate VLAN or network for smart devices",
              "Isolate from network with personal data"
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
            name: "Enable AP isolation",
            details: [
              "Prevents devices on same network from communicating",
              "Found in \"Wireless\" or \"Advanced\" settings"
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
    title: "Access Control",
    description: "Manage which devices can connect to your network",
    icon: FaUserShield,
    items: [
      {
        title: "MAC Address Filtering",
        description: "Control network access based on device hardware addresses",
        icon: FaKey,
        steps: [
          {
            name: "Enable MAC filtering",
            details: [
              "Locate \"MAC filtering\" or \"Access control\" in router settings",
              "Add MAC addresses of all trusted devices",
              "Set to \"allow only listed devices\""
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
            name: "Record all device MAC addresses",
            details: [
              "Create spreadsheet of all household devices and their MAC addresses",
              "Update when adding new devices"
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
            name: "Note limitations",
            details: [
              "MAC addresses can be spoofed",
              "Use as supplementary security measure, not primary"
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
        title: "Disable Unnecessary Services",
        description: "Minimize attack surface by turning off unneeded features",
        icon: FaServer,
        steps: [
          {
            name: "Disable Universal Plug and Play (UPnP)",
            details: [
              "Find in \"Advanced\" or \"Security\" settings",
              "Turn off unless specifically needed for gaming or media servers"
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
            name: "Turn off unused features",
            details: [
              "Disable file sharing if not used",
              "Turn off printer sharing if not needed",
              "Disable DLNA media streaming if unused"
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
        title: "Firewall Configuration",
        description: "Configure router firewall for optimal protection",
        icon: FaShieldAlt,
        steps: [
          {
            name: "Enable router firewall",
            details: [
              "Located in \"Security\" or \"Firewall\" settings",
              "Use medium or high security setting"
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
            name: "Configure port forwarding carefully",
            details: [
              "Only open necessary ports",
              "Document any opened ports",
              "Regularly review and close unused ports"
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
            name: "Enable DoS protection",
            details: [
              "Find in \"Security\" or \"Firewall\" settings",
              "Protects against denial-of-service attacks"
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
    title: "Network Monitoring",
    description: "Track and analyze network activity for security issues",
    icon: FaEye,
    items: [
      {
        title: "Connected Device Monitoring",
        description: "Keep track of devices connected to your network",
        icon: FaDesktop,

        steps: [
          {
            name: "Regularly check connected devices",
            details: [
              "Access router client list",
              "Verify all connected devices are recognized",
              "Note unusual connection patterns or unknown devices"
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
            name: "Consider third-party tools",
            details: [
              "Fing (app for network scanning)",
              "Advanced IP Scanner (Windows)",
              "LanScan (Mac)"
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
        title: "Traffic Analysis",
        description: "Monitor network traffic for unusual patterns",
        icon: FaGlobe,
        steps: [
          {
            name: "Enable traffic monitoring if available",
            details: [
              "Check router settings for bandwidth monitoring",
              "Look for unusual spikes in usage"
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
            name: "Configure QoS (Quality of Service)",
            details: [
              "Prioritize traffic for important applications",
              "Limit bandwidth for less critical services"
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
            name: "Consider advanced monitoring solutions",
            details: [
              "Glasswire (visualizes network activity)",
              "Wireshark (for technical users)",
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
        title: "DNS Security",
        description: "Secure your domain name resolution",
        icon: FaNetworkWired,
        steps: [
          {
            name: "Change DNS servers",
            details: [
              "Replace ISP's DNS with secure alternatives:",
              "Cloudflare: 1.1.1.1 and 1.0.0.1",
              "Google: 8.8.8.8 and 8.8.4.4",
              "Quad9: 9.9.9.9 and 149.112.112.112"
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
            name: "Enable DNS over HTTPS if router supports it",
            details: [
              "Provides encrypted DNS queries",
              "Prevents ISP from monitoring DNS requests"
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
            name: "Consider Pi-hole or AdGuard Home",
            details: [
              "Network-wide ad and tracker blocking",
              "Provides additional DNS security"
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
    title: "Physical Security",
    description: "Secure the physical aspects of your network",
    icon: FaHome,
    items: [
      {
        title: "Router Placement",
        description: "Optimize router location for security and performance",
        icon: FaWifi,
        steps: [
          {
            name: "Optimal location",
            details: [
              "Central location for coverage",
              "Away from windows to minimize signal leakage",
              "In secure area not accessible to visitors"
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
            name: "Signal strength management",
            details: [
              "Adjust transmit power if possible (reduce to minimum needed)",
              "Use directional antennas if appropriate for your space"
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
        title: "Reset Protection",
        description: "Prevent unauthorized physical reset of your router",
        icon: FaLock,
        steps: [
          {
            name: "Physically secure router",
            details: [
              "Place in cabinet or secure area",
              "Prevent easy access to reset button"
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
            name: "Document network settings",
            details: [
              "Keep secure backup of all router configurations",
              "Store in encrypted document or password manager"
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
    title: "Wi-Fi Best Practices",
    description: "Additional practices for maintaining network security",
    icon: FaClipboardCheck,
    items: [
      {
        title: "Public Wi-Fi Safety",
        description: "Stay secure when using public networks",
        icon: FaGlobe,
        steps: [
          {
            name: "Avoid sensitive transactions",
            details: [
              "No banking or financial activities",
              "Don't enter passwords for critical accounts"
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
            name: "Use VPN for all public Wi-Fi connections",
            details: [
              "Enable \"Always-on VPN\" in device settings",
              "Confirm VPN is connected before browsing"
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
            name: "Disable auto-join for networks",
            details: [
              "Turn off \"Auto-join\" for public networks",
              "Manually select networks when needed"
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
        title: "Mobile Hotspot Security",
        description: "Secure your personal hotspots",
        icon: FaMobileAlt,
        steps: [
          {
            name: "Secure personal hotspots",
            details: [
              "Use WPA2/WPA3 encryption",
              "Set strong, unique password",
              "Change default hotspot name"
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
            name: "Limit connections",
            details: [
              "Set maximum number of devices",
              "Disable when not in use",
              "Monitor connected devices"
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
        title: "Regular Security Audits",
        description: "Periodically review and update your network security",
        icon: FaClipboardCheck,
        steps: [
          {
            name: "Quarterly router checkup",
            details: [
              "Update firmware",
              "Review connected devices",
              "Check for unusual activity",
              "Update passwords"
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
            name: "Test network security",
            details: [
              "Use tools like Wireshark or Aircrack-ng (advanced)",
              "Run vulnerability scanners like Nessus (basic home edition)"
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

