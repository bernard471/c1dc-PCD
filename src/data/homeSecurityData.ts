import { 
    FaNetworkWired, 
    FaShieldAlt, 
    FaChartLine, 
    FaMobileAlt, 
    FaCogs, 
    FaNetworkWired as FaNetwork, 
    FaLock, 
    FaServer, 
    FaMicrochip, 
    FaUserShield, 
    FaMicrophoneAlt, 
    FaVideo, 
    FaKey, 
    FaBatteryFull 
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
  
  export const homeSecurityData: SecurityCategory[] = [
    {
      title: "Network Assessment and Monitoring",
      description: "Tools and techniques to assess and monitor your home network security",
      icon: FaNetworkWired,
      items: [
        {
          title: "Network Discovery and Mapping",
          description: "Identify and document all devices on your network",
          icon: FaNetworkWired,
          steps: [
            {
              name: "Perform regular network scan",
              details: [
                "Use Fing app (mobile) or Advanced IP Scanner (desktop)",
                "Identify all connected devices on network",
                "Create inventory document with device name, IP address, MAC address, manufacturer, and purpose"
              ]
            },
            {
              name: "Map network topology",
              details: [
                "Document how devices connect (wired vs. wireless)",
                "Identify critical infrastructure devices"
              ]
            }
          ]
        },
        {
          title: "Vulnerability Scanning",
          description: "Regularly scan your network for security vulnerabilities",
          icon: FaShieldAlt,
          steps: [
            {
              name: "Basic home vulnerability scan",
              details: [
                "Use Nessus Home (free for up to 16 IP addresses)",
                "Run monthly scans on router and critical devices",
                "Focus on critical and high-severity findings"
              ]
            },
            {
              name: "Automated scanning options",
              details: [
                "Configure scheduled scans where possible",
                "Document and track findings over time",
                "Create remediation plan for discovered issues"
              ]
            }
          ]
        },
        {
          title: "Traffic Monitoring",
          description: "Monitor network traffic for unusual patterns and potential threats",
          icon: FaChartLine,
          steps: [
            {
              name: "Analyze network traffic",
              details: [
                "Check router traffic logs if available",
                "Look for unusual patterns like unexpected outbound connections, large data transfers at odd hours, or connections to unknown IP addresses"
              ]
            },
            {
              name: "Advanced monitoring",
              details: [
                "Consider dedicated hardware like Firewalla or Bitdefender Box",
                "Set up alerts for suspicious activities"
              ]
            }
          ]
        }
      ]
    },
    {
      title: "IoT Device Security",
      description: "Secure your Internet of Things devices from potential threats",
      icon: FaMobileAlt,
      items: [
        {
          title: "Pre-Purchase Security Assessment",
          description: "Evaluate security before buying IoT devices",
          icon: FaShieldAlt,
          steps: [
            {
              name: "Research before buying",
              details: [
                "Check vendor security track record",
                "Verify device receives regular updates",
                "Look for security certifications",
                "Read privacy policy thoroughly"
              ]
            },
            {
              name: "Prioritize features",
              details: [
                "Automatic updates",
                "Two-factor authentication",
                "Data encryption",
                "Local processing (vs. cloud dependency)"
              ]
            }
          ]
        },
        {
          title: "Initial Device Setup",
          description: "Securely set up new IoT devices",
          icon: FaCogs,
          steps: [
            {
              name: "Secure onboarding process",
              details: [
                "Change default passwords immediately",
                "Update firmware before full deployment",
                "Disable unnecessary features and services",
                "Register devices with manufacturer for update notifications"
              ]
            },
            {
              name: "Create device-specific credentials",
              details: [
                "Use unique password for each device",
                "Store credentials in password manager",
                "Set up 2FA where available"
              ]
            }
          ]
        },
        {
          title: "Network Segmentation for IoT",
          description: "Isolate IoT devices from your main network",
          icon: FaNetwork,
          steps: [
            {
              name: "Create dedicated IoT network",
              details: [
                "Set up separate VLAN or guest network",
                "Configure router to isolate from main network",
                "Prevent IoT devices from accessing personal computers"
              ]
            },
            {
              name: "Implement access controls",
              details: [
                "Restrict IoT devices to only necessary internet access",
                "Block inbound connections to IoT devices",
                "Configure firewall rules to limit communication"
              ]
            }
          ]
        },
        {
          title: "Ongoing Maintenance",
          description: "Keep your IoT devices secure over time",
          icon: FaCogs,
          steps: [
            {
              name: "Update schedule",
              details: [
                "Enable automatic updates where available",
                "Create monthly calendar reminder for manual updates",
                "Check manufacturer websites quarterly for security bulletins"
              ]
            },
            {
              name: "Regular audits",
              details: [
                "Test device connections (who they talk to)",
                "Verify security settings haven't changed",
                "Remove or reset unused devices"
              ]
            }
          ]
        },
        {
          title: "Device-Specific Security",
          description: "Security measures for specific types of IoT devices",
          icon: FaMicrochip,
          steps: [
            {
              name: "Smart speakers and assistants",
              details: [
                "Disable unnecessary listening features",
                "Review and delete voice recordings regularly",
                "Mute microphones when not in use"
              ]
            },
            {
              name: "Smart cameras",
              details: [
                "Enable encryption for video streams",
                "Use two-factor authentication",
                "Position to avoid sensitive areas",
                "Consider local storage over cloud"
              ]
            },
            {
              name: "Smart locks and security systems",
              details: [
                "Use highest available encryption",
                "Create individual access codes for different people",
                "Enable tampering alerts",
                "Disable remote unlock if not needed"
              ]
            }
          ]
        }
      ]
    },
    {
      title: "Home Network Defense",
      description: "Protect your home network with multiple layers of security",
      icon: FaShieldAlt,
      items: [
        {
          title: "Defensive Layers",
          description: "Implement multiple security layers for better protection",
          icon: FaShieldAlt,
          steps: [
            {
              name: "Hardware firewall",
              details: [
                "Enable and configure router firewall",
                "Consider dedicated hardware firewall for enhanced protection",
                "Set to block inbound connections by default"
              ]
            },
            {
              name: "Software firewalls",
              details: [
                "Enable on all computers and mobile devices",
                "Configure application-specific rules",
                "Block unnecessary outbound connections"
              ]
            },
            {
              name: "Intrusion detection/prevention",
              details: [
                "Consider Suricata or Snort for advanced users",
                "Look for router models with built-in IDS/IPS"
              ]
            }
          ]
        },
        {
          title: "Advanced Router Configuration",
          description: "Optimize your router settings for better security",
          icon: FaServer,
          steps: [
            {
              name: "DMZ (demilitarized zone)",
              details: [
                "Configure for internet-facing services if needed",
                "Never place personal computers in DMZ"
              ]
            },
            {
              name: "Network Address Translation (NAT)",
              details: [
                "Ensure NAT is enabled",
                "Use as additional security layer"
              ]
            },
            {
              name: "DNS filtering",
              details: [
                "Use Pi-hole or AdGuard Home",
                "Block malicious domains",
                "Implement family-friendly filtering if needed"
              ]
            }
          ]
        },
        {
          title: "Network Encryption",
          description: "Encrypt your network communications",
          icon: FaLock,
          steps: [
            {
              name: "Secure internal communications",
              details: [
                "Use HTTPS for all web interfaces",
                "Configure devices to require encrypted connections",
                "Disable HTTP access to devices where possible"
              ]
            },
            {
              name: "VPN considerations",
              details: [
                "Set up VPN server on router if supported",
                "Use for secure remote access to home network",
                "Configure split tunneling appropriately"
              ]
            }
          ]
        }
      ]
    },
    {
      title: "Smart Home Platform Security",
      description: "Secure your smart home platforms and controllers",
      icon: FaServer,
      items: [
        {
          title: "Hub and Controller Security",
          description: "Secure your smart home hubs and controllers",
          icon: FaServer,
          steps: [
            {
              name: "Secure central systems",
              details: [
                "Apply all security updates immediately",
                "Use strong authentication",
                "Limit admin access to necessary users only"
              ]
            },
            {
              name: "Platform selection criteria",
              details: [
                "Security update frequency",
                "Encryption standards",
                "Privacy policy transparency",
                "Local control options (vs. cloud-only)"
              ]
            }
          ]
        },
        {
          title: "Automation and Rule Security",
          description: "Secure your smart home automation rules",
          icon: FaCogs,
          steps: [
            {
              name: "Secure automation rules",
              details: [
                "Review all automations for security implications",
                "Prevent rules that could compromise physical security",
                "Test fail-safe mechanisms for critical systems"
              ]
            },
            {
              name: "Access controls",
              details: [
                "Implement role-based access",
                "Limit guest access to viewing, not changing",
                "Review access permissions quarterly"
              ]
            }
          ]
        },
        {
          title: "Voice Control Security",
          description: "Secure voice-controlled smart home features",
          icon: FaMicrophoneAlt,
          steps: [
            {
              name: "Secure assistant configuration",
              details: [
                "Require voice match or PIN for sensitive actions",
                "Disable purchasing by voice",
                "Review third-party skill/action permissions"
              ]
            },
            {
              name: "Physical protections",
              details: [
                "Implement mute function when away",
                "Consider unplugging in highly sensitive situations"
              ]
            }
          ]
        }
      ]
    },
    {
      title: "Physical Security Integration",
      description: "Integrate physical security with your smart home",
      icon: FaUserShield,
      items: [
        {
          title: "Camera and Surveillance Systems",
          description: "Secure your home surveillance systems",
          icon: FaVideo,
          steps: [
            {
              name: "Security camera best practices",
              details: [
                "Change default passwords",
                "Enable encryption for all video streams",
                "Disable remote access if not needed",
                "Update firmware regularly"
              ]
            },
            {
              name: "Storage security",
              details: [
                "Encrypt video storage",
                "Use local storage with backup",
                "If using cloud, enable two-factor authentication",
                "Set appropriate retention periods"
              ]
            }
          ]
        },
        {
          title: "Access Control Systems",
          description: "Secure your smart locks and access control systems",
          icon: FaKey,
          steps: [
            {
              name: "Smart lock configuration",
              details: [
                "Enable multi-factor authentication",
                "Use auto-lock features",
                "Maintain backup physical key",
                "Disable remote unlock if not needed"
              ]
            },
            {
              name: "User management",
              details: [
                "Create individual access codes",
                "Set time-limited access for temporary visitors",
                "Review access logs monthly",
                "Revoke access immediately when no longer needed"
              ]
            }
          ]
        },
        {
          title: "Backup Power Planning",
          description: "Ensure security during power outages",
          icon: FaBatteryFull,
          steps: [
            {
              name: "Secure during outages",
              details: [
                "Ensure security systems have battery backup",
                "Configure fail-secure vs. fail-safe appropriately",
                "Test backup systems quarterly"
              ]
            },
            {
              name: "Recovery procedures",
              details: [
                "Document steps to restore security after power loss",
                "Test restoration process semi-annually"
              ]
            }
          ]
        }
      ]
    }
  ];
  