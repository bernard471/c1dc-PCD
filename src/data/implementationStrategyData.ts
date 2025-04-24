import { 
  FaClipboardCheck, 
  FaSearch, 
  FaListOl, 
  FaFileAlt, 
  FaCalendarAlt, 
  FaExclamationTriangle, 
  FaGraduationCap, 
  FaUsers, 
  FaPlane, 
  FaKey
} from 'react-icons/fa';
import { IconType } from 'react-icons';
import hero1 from '../images/hero1.jpg';
import hero from '../images/hero.webp';
import freepik from '../images/freepik.jpeg';

export interface StrategyItem {
  title: string;
  description: string;
  steps: {
    name: string;
    details: string[];
  }[];
  icon: IconType;
  images?: string[]; // Array of image paths
}

export interface StrategyCategory {
  title: string;
  description: string;
  items: StrategyItem[];
  icon: IconType;
}

export const implementationStrategyData: StrategyCategory[] = [
  {
    title: "Initial Setup and Assessment",
    description: "Establish your security foundation with proper planning and evaluation",
    icon: FaClipboardCheck,
    items: [
      {
        title: "Security Baseline Assessment",
        description: "Evaluate your current security posture and identify priorities",
        icon: FaSearch,
        images: [
          hero1.src,
          hero.src,
          freepik.src,
          hero.src,
          freepik.src,
        ],
        steps: [
          {
            name: "Personal threat model development",
            details: [
              "Identify valuable assets (data, accounts, devices)",
              "Define potential adversaries (criminals, marketers, governments)",
              "Assess likelihood and impact of different threats",
              "Prioritize protections based on risk assessment"
            ]
          },
          {
            name: "Current security audit",
            details: [
              "Inventory all devices and accounts",
              "Document existing security measures",
              "Identify gaps and vulnerabilities",
              "Create prioritized improvement plan"
            ]
          }
        ]
      },
      {
        title: "Implementation Prioritization",
        description: "Organize security improvements in order of importance",
        icon: FaListOl,
        images: [
          hero1.src,
          hero.src,
          freepik.src,
          hero.src,
          freepik.src,
        ],
        steps: [
          {
            name: "Critical security fundamentals",
            details: [
              "Password manager deployment",
              "Two-factor authentication for critical accounts",
              "Device update and patch management",
              "Data backup implementation"
            ]
          },
          {
            name: "Second-phase implementation",
            details: [
              "Network security hardening",
              "Advanced device protection",
              "Communication security",
              "Privacy enhancement tools"
            ]
          },
          {
            name: "Advanced security (as needed)",
            details: [
              "Specialized hardware security",
              "Compartmentalization strategies",
              "Counter-surveillance measures",
              "Legal and regulatory compliance"
            ]
          }
        ]
      },
      {
        title: "Documentation Development",
        description: "Create comprehensive records of your security setup",
        icon: FaFileAlt,
        images: [
          hero1.src,
          hero.src,
          freepik.src,
          hero.src,
          freepik.src,
        ],
        steps: [
          {
            name: "Personal security handbook",
            details: [
              "Compile device-specific instructions",
              "Document account recovery procedures",
              "Create security incident response plans",
              "Maintain updated password reset procedures"
            ]
          },
          {
            name: "Security contact list",
            details: [
              "Financial institutions fraud departments",
              "Identity theft reporting resources",
              "Law enforcement contacts",
              "Technical support resources"
            ]
          }
        ]
      }
    ]
  },
  {
    title: "Maintenance and Continuous Improvement",
    description: "Sustain and enhance your security posture over time",
    icon: FaCalendarAlt,
    items: [
      {
        title: "Regular Security Reviews",
        description: "Establish recurring security maintenance schedules",
        icon: FaCalendarAlt,
        images: [
          hero1.src,
          hero.src,
          freepik.src,
          hero.src,
          freepik.src,
        ],
        steps: [
          {
            name: "Monthly security tasks",
            details: [
              "Password audit and rotation for critical accounts",
              "Software and system updates",
              "Backup verification",
              "Connected device inventory review"
            ]
          },
          {
            name: "Quarterly security checks",
            details: [
              "Comprehensive account audit",
              "Permission reviews across platforms",
              "Credit report monitoring",
              "Network security assessment"
            ]
          }
        ]
      },
      {
        title: "Incident Response Plans",
        description: "Prepare for security breaches before they happen",
        icon: FaExclamationTriangle,
        images: [
          hero1.src,
          hero.src,
          freepik.src,
          hero.src,
          freepik.src,
        ],
        steps: [
          {
            name: "Preparation for common scenarios",
            details: [
              "Device loss or theft procedure",
              "Account compromise response",
              "Malware infection handling",
              "Identity theft recovery"
            ]
          },
          {
            name: "Documentation requirements",
            details: [
              "Step-by-step response instructions",
              "Contact information for reporting",
              "Evidence preservation guidelines",
              "Recovery verification procedures"
            ]
          }
        ]
      },
      {
        title: "Continuous Learning",
        description: "Stay informed about evolving security threats and defenses",
        icon: FaGraduationCap,
        images: [
          hero1.src,
          hero.src,
          freepik.src,
          hero.src,
          freepik.src,
        ],
        steps: [
          {
            name: "Security knowledge development",
            details: [
              "Follow reputable security news sources",
              "Subscribe to vendor security bulletins",
              "Join community forums for security discussions",
              "Consider basic security certifications"
            ]
          },
          {
            name: "Simulation and testing",
            details: [
              "Conduct personal phishing tests",
              "Practice recovery procedures",
              "Test backup restoration",
              "Verify security monitoring effectiveness"
            ]
          }
        ]
      }
    ]
  },
  {
    title: "Special Considerations",
    description: "Address unique security scenarios that require specific approaches",
    icon: FaUsers,
    items: [
      {
        title: "Family Security Planning",
        description: "Extend security practices to protect your entire household",
        icon: FaUsers,
        images: [
          hero1.src,
          hero.src,
          freepik.src,
          hero.src,
          freepik.src,
        ],
        steps: [
          {
            name: "Multi-user household security",
            details: [
              "Develop age-appropriate guidelines",
              "Create shared and individual security responsibilities",
              "Implement parental controls where appropriate",
              "Establish family communication about security issues"
            ]
          },
          {
            name: "Education and awareness",
            details: [
              "Regular family security discussions",
              "Basic security training for all family members",
              "Emergency response procedures",
              "Recognition of social engineering attempts"
            ]
          }
        ]
      },
      {
        title: "Travel Security Protocols",
        description: "Maintain security while away from your normal environment",
        icon: FaPlane,
        images: [
          hero1.src,
          hero.src,
          freepik.src,
          hero.src,
          freepik.src,
        ],
        steps: [
          {
            name: "Pre-travel preparation",
            details: [
              "Device security hardening",
              "Data minimization strategies",
              "Backup and recovery planning",
              "Documentation of emergency contacts"
            ]
          },
          {
            name: "During-travel procedures",
            details: [
              "Public Wi-Fi safety protocols",
              "Physical device security",
              "Border crossing considerations",
              "Regular security check-ins"
            ]
          }
        ]
      },
      {
        title: "Digital Legacy Planning",
        description: "Ensure proper handling of your digital assets in case of emergency",
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
            name: "Access continuity planning",
            details: [
              "Emergency access to password manager",
              "Account recovery documentation",
              "Digital asset inventory",
              "Trusted contact designation"
            ]
          },
          {
            name: "Digital estate planning",
            details: [
              "Account closure instructions",
              "Data preservation preferences",
              "Social media legacy contacts",
              "Digital inheritance documentation"
            ]
          }
        ]
      }
    ]
  }
];
