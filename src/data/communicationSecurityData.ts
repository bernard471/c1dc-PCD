import { 
    FaUsers, 
    FaShieldAlt, 
    FaMobileAlt, 
    FaMapMarkerAlt, 
    FaCar, 
    FaBluetooth, 
    FaMicrophone, 
    FaVideo, 
    FaCog, 
    FaUserFriends, 
    FaHome, 
    FaEnvelope, 
    FaFile
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
  
  export const communicationSecurityData: SecurityCategory[] = [
    {
      title: "In-Person Meeting Security",
      description: "Protect sensitive discussions during in-person meetings",
      icon: FaUsers,
      items: [
        {
          title: "Physical Space Assessment",
          description: "Evaluate and secure the physical meeting environment",
          icon: FaShieldAlt,
          steps: [
            {
              name: "Room security sweep",
              details: [
                "Check for hidden cameras (look for unusual objects, pinhole lenses)",
                "Inspect smoke detectors, wall outlets, and air vents",
                "Use RF detector to identify transmitting devices",
                "Consider professional TSCM (Technical Surveillance Countermeasures) for high-security needs"
              ]
            },
            {
              name: "Environmental security",
              details: [
                "Be aware of adjacent rooms and spaces",
                "Check for windows that could allow visual surveillance",
                "Consider sound-masking devices for sensitive discussions",
                "Implement clean desk policy during meetings"
              ]
            }
          ]
        },
        {
          title: "Electronic Device Management",
          description: "Control electronic devices during sensitive meetings",
          icon: FaMobileAlt,
          steps: [
            {
              name: "Mobile device policies",
              details: [
                "Consider \"no phones\" policy for highly sensitive meetings",
                "Collect devices in Faraday bags or designated areas",
                "Disable smart assistants in meeting room",
                "Turn off Bluetooth and Wi-Fi when not needed"
              ]
            },
            {
              name: "Jamming considerations",
              details: [
                "Signal jammers for highly sensitive discussions (where legal)",
                "Faraday room shielding for critical infrastructure",
                "Note: Verify legality in your jurisdiction before implementing"
              ]
            }
          ]
        },
        {
          title: "Meeting Materials",
          description: "Secure physical and digital meeting materials",
          icon: FaFile,
          steps: [
            {
              name: "Document security",
              details: [
                "Number and track physical copies",
                "Collect all materials after meeting",
                "Use watermarks on sensitive documents",
                "Implement information classification system"
              ]
            },
            {
              name: "Presentation security",
              details: [
                "Disable screen sharing in virtual meetings when not required",
                "Use secure presentation modes that hide notifications",
                "Avoid connecting to unknown projectors/displays"
              ]
            }
          ]
        }
      ]
    },
    {
      title: "Mobile Communication Security",
      description: "Secure your mobile communications against eavesdropping and interception",
      icon: FaMobileAlt,
      items: [
        {
          title: "Voice Call Security",
          description: "Protect voice conversations from interception",
          icon: FaMicrophone,
          steps: [
            {
              name: "Secure calling practices",
              details: [
                "Use end-to-end encrypted calling apps (Signal, WhatsApp)",
                "Be aware of background noise and surroundings",
                "Avoid discussing highly sensitive information on any call",
                "Verify recipient identity before sharing sensitive information"
              ]
            },
            {
              name: "Signs of compromise",
              details: [
                "Unusual background noise or clicking",
                "Battery draining unusually quickly",
                "Phone heating up when not in use",
                "Unexpected screen lighting up"
              ]
            }
          ]
        },
        {
          title: "Messaging Security",
          description: "Secure text and multimedia messages",
          icon: FaEnvelope,
          steps: [
            {
              name: "Secure messaging configuration",
              details: [
                "Use apps with end-to-end encryption (Signal, WhatsApp)",
                "Enable disappearing messages for sensitive conversations",
                "Verify security codes/keys with important contacts",
                "Disable cloud backups of messages"
              ]
            },
            {
              name: "Best practices",
              details: [
                "Regularly delete old conversations",
                "Use screen lock for messaging apps",
                "Disable notification previews",
                "Don't click links from unknown contacts"
              ]
            }
          ]
        },
        {
          title: "Device Tracking Detection",
          description: "Identify if your device is being tracked or monitored",
          icon: FaMapMarkerAlt,
          steps: [
            {
              name: "Physical inspection",
              details: [
                "Regularly check device for tampering",
                "Look for unusual hardware additions",
                "Verify battery compartment is clean",
                "Inspect SIM card slot for manipulation"
              ]
            },
            {
              name: "Electronic detection",
              details: [
                "Use RF detectors to find transmitting bugs",
                "Monitor for unusual network traffic",
                "Check for unknown apps or processes",
                "Observe battery performance"
              ]
            }
          ]
        },
        {
          title: "Travel Communication Security",
          description: "Maintain secure communications while traveling",
          icon: FaMapMarkerAlt,
          steps: [
            {
              name: "Pre-travel preparation",
              details: [
                "Update all software before departure",
                "Back up and then wipe sensitive data if traveling to high-risk areas",
                "Set up travel-specific accounts if needed",
                "Consider temporary/burner devices for high-risk travel"
              ]
            },
            {
              name: "During travel",
              details: [
                "Keep devices with you at all times",
                "Use VPN for all connections",
                "Disable Bluetooth and Wi-Fi when not in use",
                "Avoid public charging stations (use power banks)"
              ]
            }
          ]
        }
      ]
    },
    {
      title: "Vehicle Communication Security",
      description: "Secure communications in and around vehicles",
      icon: FaCar,
      items: [
        {
          title: "Car Privacy Assessment",
          description: "Evaluate and improve privacy in modern vehicles",
          icon: FaShieldAlt,
          steps: [
            {
              name: "Modern vehicle security",
              details: [
                "Understand what data your car collects",
                "Review privacy settings in vehicle infotainment system",
                "Disable unnecessary connectivity features",
                "Clear paired devices when selling vehicle"
              ]
            },
            {
              name: "Physical security",
              details: [
                "Check for unauthorized GPS trackers under vehicle",
                "Inspect inside wheel wells and behind bumpers",
                "Look inside interior panels for tracking devices",
                "Use GPS/RF detector for more thorough checks"
              ]
            }
          ]
        },
        {
          title: "Bluetooth and Wi-Fi Security",
          description: "Secure wireless connections in vehicles",
          icon: FaBluetooth,
          steps: [
            {
              name: "Connection management",
              details: [
                "Disable Bluetooth and Wi-Fi when not needed",
                "Remove unused paired devices",
                "Use \"invisible\" or \"non-discoverable\" mode",
                "Update infotainment system regularly"
              ]
            },
            {
              name: "Usage best practices",
              details: [
                "Avoid pairing with rental cars or unknown vehicles",
                "Be cautious about what data you sync to car systems",
                "Use guest mode for passengers when available"
              ]
            }
          ]
        },
        {
          title: "Audio Privacy",
          description: "Protect conversations within vehicles",
          icon: FaMicrophone,
          steps: [
            {
              name: "Conversation security",
              details: [
                "Be aware of built-in microphones in modern vehicles",
                "Disable voice assistants if not needed",
                "Remember that passengers may be recording",
                "Have sensitive conversations outside the vehicle"
              ]
            },
            {
              name: "Counter-surveillance",
              details: [
                "Use white noise generators for sensitive discussions",
                "Conduct regular sweeps for unauthorized devices",
                "Be aware of cameras in rideshare vehicles"
              ]
            }
          ]
        }
      ]
    },
    {
      title: "Video Conference Security",
      description: "Secure video meetings and conferences",
      icon: FaVideo,
      items: [
        {
          title: "Platform Selection and Configuration",
          description: "Choose and configure secure video conferencing platforms",
          icon: FaCog,
          steps: [
            {
              name: "Security features to require",
              details: [
                "End-to-end encryption",
                "Meeting passwords/PINs",
                "Waiting rooms/lobbies",
                "Host controls for screen sharing",
                "Ability to remove participants"
              ]
            },
            {
              name: "Account security",
              details: [
                "Use strong passwords",
                "Enable two-factor authentication",
                "Don't reuse meeting IDs for sensitive meetings",
                "Review third-party app permissions"
              ]
            }
          ]
        },
        {
          title: "Meeting Management",
          description: "Securely manage video conference sessions",
          icon: FaUserFriends,
          steps: [
            {
              name: "Before meeting",
              details: [
                "Use unique meeting ID and password",
                "Enable waiting room",
                "Disable \"join before host\"",
                "Test security settings before important meetings"
              ]
            },
            {
              name: "During meeting",
              details: [
                "Verify participants",
                "Lock meeting once all participants have joined",
                "Control screen sharing permissions",
                "Monitor participant list for unexpected users"
              ]
            },
            {
              name: "After meeting",
              details: [
                "End meeting for all participants",
                "Delete any recorded content after use",
                "Review meeting logs if available"
              ]
            }
          ]
        },
        {
          title: "Physical and Environmental Security",
          description: "Secure your physical environment during video conferences",
          icon: FaHome,
          steps: [
            {
              name: "Home office security",
              details: [
                "Be aware of what's visible in your background",
                "Check for reflective surfaces that may reveal screens",
                "Consider who can overhear your conversation",
                "Use headphones for sensitive discussions"
              ]
            },
            {
              name: "Privacy features",
              details: [
                "Use virtual backgrounds for location privacy",
                "Test what's visible in virtual backgrounds",
                "Mute microphone when not speaking",
                "Enable in-meeting notifications for recording"
              ]
            }
          ]
        }
      ]
    },
    {
      title: "Email and Document Security",
      description: "Secure email communications and document sharing",
      icon: FaEnvelope,
      items: [
        {
          title: "Secure Email Practices",
          description: "Protect email communications from interception and compromise",
          icon: FaEnvelope,
          steps: [
            {
              name: "Basic email hygiene",
              details: [
                "Use different email addresses for different purposes",
                "Create email aliases for online services",
                "Disable automatic loading of remote content",
                "Be cautious with attachments and links"
              ]
            },
            {
              name: "Advanced protection",
              details: [
                "Consider email encryption for sensitive communications (PGP/GPG)",
                "Use secure email services for confidential matters (ProtonMail, Tutanota)",
                "Configure anti-spoofing protections (SPF, DKIM, DMARC)",
                "Consider secure email gateways for business use"
              ]
            }
          ]
        },
        {
          title: "Document Tracking and Protection",
          description: "Secure documents during sharing and distribution",
          icon: FaFile,
          steps: [
            {
              name: "Document security",
              details: [
                "Use password protection for sensitive files",
                "Encrypt important documents before sending",
                "Add watermarks to track distribution",
                "Consider digital rights management for highly sensitive content"
              ]
            },
            {
              name: "Metadata removal",
              details: [
                "Clean metadata from documents before sharing",
                "Use tools like ExifTool or Metadata Anonymization Toolkit",
                "Verify removal before distribution",
                "Be aware of hidden tracking in PDFs and other documents"
              ]
            }
          ]
        }
      ]
    }
  ];
  