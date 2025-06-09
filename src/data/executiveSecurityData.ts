import { 
  FaShieldAlt, 
  FaUserSecret, 
  FaLaptop, 
  FaPhone, 
  FaHome, 
  FaCar, 
  FaPlane, 
  FaUsers, 
  FaEye, 
  FaExclamationTriangle, 
  FaNetworkWired,
  FaBuilding,
  FaGavel,
  FaHeadset,
  FaCamera
} from 'react-icons/fa';
import { IconType } from 'react-icons';

export interface ExecutiveSecurityItem {
  title: string;
  description: string;
  steps: {
    name: string;
    details: string[];
  }[];
  icon: IconType;
  riskLevel: 'Critical' | 'High' | 'Medium';
  implementationTime: string;
}

export interface ExecutiveSecurityCategory {
  title: string;
  description: string;
  items: ExecutiveSecurityItem[];
  icon: IconType;
  priority: 'Immediate' | 'Short-term' | 'Long-term';
}

export const executiveSecurityData: ExecutiveSecurityCategory[] = [
  {
    title: "Personal Digital Security",
    description: "Advanced cybersecurity measures for high-value targets",
    icon: FaShieldAlt,
    priority: "Immediate",
    items: [
      {
        title: "Executive Device Hardening",
        description: "Secure all personal and professional devices against advanced threats",
        icon: FaLaptop,
        riskLevel: "Critical",
        implementationTime: "1-2 days",
        steps: [
          {
            name: "Mobile Device Security",
            details: [
              "Use enterprise-grade mobile device management (MDM) solutions",
              "Enable remote wipe capabilities on all devices",
              "Install only vetted applications from corporate app stores",
              "Use separate devices for personal and professional activities",
              "Enable advanced threat protection and behavioral analysis",
              "Implement zero-trust network access for all connections",
              "Use hardware security modules (HSM) for key storage"
            ]
          },
          {
            name: "Laptop and Computer Security",
            details: [
              "Deploy full-disk encryption with enterprise key management",
              "Use dedicated secure workstations for sensitive operations",
              "Implement application whitelisting and endpoint detection",
              "Enable tamper-evident seals and hardware monitoring",
              "Use air-gapped systems for highly classified information",
              "Deploy advanced persistent threat (APT) detection tools",
              "Implement secure boot and trusted platform modules (TPM)"
            ]
          }
        ]
      },
      {
        title: "Advanced Authentication Systems",
        description: "Multi-layered authentication beyond standard 2FA",
        icon: FaUserSecret,
        riskLevel: "Critical",
        implementationTime: "3-5 days",
        steps: [
          {
            name: "Hardware Security Keys",
            details: [
              "Deploy FIDO2/WebAuthn hardware security keys for all accounts",
              "Use multiple backup keys stored in secure locations",
              "Implement biometric authentication where available",
              "Use smart cards for government and corporate access",
              "Deploy certificate-based authentication for critical systems",
              "Implement risk-based adaptive authentication",
              "Use hardware tokens for offline authentication scenarios"
            ]
          },
          {
            name: "Privileged Access Management",
            details: [
              "Implement just-in-time (JIT) privileged access",
              "Use privileged access workstations (PAWs) for admin tasks",
              "Deploy session recording and monitoring for all privileged access",
              "Implement break-glass emergency access procedures",
              "Use separate identities for different privilege levels",
              "Deploy privileged account analytics and anomaly detection",
              "Implement approval workflows for high-risk operations"
            ]
          }
        ]
      },
      {
        title: "Secure Communications Infrastructure",
        description: "Military-grade communication security protocols",
        icon: FaPhone,
        riskLevel: "Critical",
        implementationTime: "1 week",
        steps: [
          {
            name: "Encrypted Communication Channels",
            details: [
              "Use NSA-approved encrypted communication platforms",
              "Deploy secure voice over IP (VoIP) with end-to-end encryption",
              "Implement secure messaging with perfect forward secrecy",
              "Use encrypted satellite communication for remote locations",
              "Deploy secure video conferencing with identity verification",
              "Use encrypted email with S/MIME or PGP certificates",
              "Implement secure file transfer protocols (SFTP/FTPS)"
            ]
          },
          {
            name: "Communication Security Protocols",
            details: [
              "Establish secure communication trees for crisis situations",
              "Use code words and authentication phrases for voice calls",
              "Implement communication blackout procedures when necessary",
              "Use multiple communication channels for redundancy",
              "Deploy communication interception detection systems",
              "Establish secure communication with security teams",
              "Use encrypted radio communications for security details"
            ]
          }
        ]
      }
    ]
  },
  {
    title: "Physical Security Measures",
    description: "Comprehensive physical protection strategies",
    icon: FaHome,
    priority: "Immediate",
    items: [
      {
        title: "Residential Security Systems",
        description: "Advanced home security for executive residences",
        icon: FaHome,
        riskLevel: "High",
        implementationTime: "2-3 weeks",
        steps: [
          {
            name: "Perimeter Security",
            details: [
              "Install multi-layered perimeter detection systems",
              "Deploy thermal imaging and night vision cameras",
              "Use motion sensors with AI-powered threat detection",
              "Install vehicle barriers and access control systems",
              "Deploy drone detection and countermeasure systems",
              "Use landscaping as natural security barriers",
              "Install panic rooms with independent communication systems"
            ]
          },
          {
            name: "Access Control and Monitoring",
            details: [
              "Implement biometric access control for all entry points",
              "Use visitor management systems with background checks",
              "Deploy 24/7 professional security monitoring",
              "Install redundant alarm systems with multiple monitoring centers",
              "Use smart locks with audit trails and remote management",
              "Deploy internal surveillance with facial recognition",
              "Implement secure package delivery and screening procedures"
            ]
          }
        ]
      },
      {
        title: "Executive Transportation Security",
        description: "Secure transportation protocols and procedures",
        icon: FaCar,
        riskLevel: "High",
        implementationTime: "1-2 weeks",
        steps: [
          {
            name: "Vehicle Security Measures",
            details: [
              "Use armored vehicles with ballistic protection",
              "Install GPS tracking with panic button integration",
              "Deploy vehicle intrusion detection systems",
              "Use run-flat tires and reinforced glass",
              "Install communication jammers and signal detection",
              "Deploy explosive detection equipment",
              "Use multiple decoy vehicles for high-risk situations"
            ]
          },
          {
            name: "Transportation Protocols",
            details: [
              "Vary routes and timing to prevent pattern recognition",
              "Use advance security teams for route reconnaissance",
              "Implement secure parking and staging areas",
              "Deploy counter-surveillance teams during transport",
              "Use secure communication between all security elements",
              "Establish emergency evacuation procedures and routes",
              "Coordinate with local law enforcement when necessary"
            ]
          }
        ]
      },
      {
        title: "Office and Workplace Security",
        description: "Comprehensive workplace security measures",
        icon: FaBuilding,
        riskLevel: "High",
        implementationTime: "2-4 weeks",
        steps: [
          {
            name: "Executive Office Security",
            details: [
              "Install TEMPEST-certified equipment to prevent electronic eavesdropping",
              "Use white noise generators and acoustic dampening",
              "Deploy bug detection and electronic countermeasures",
              "Install secure document storage and destruction systems",
              "Use privacy glass and visual barriers for sensitive meetings",
              "Deploy air quality monitoring for chemical threats",
              "Install independent power and communication systems"
            ]
          },
          {
            name: "Workplace Access Control",
            details: [
              "Implement multi-factor authentication for building access",
              "Use elevator controls to restrict floor access",
              "Deploy mantrap entry systems for sensitive areas",
              "Install X-ray and metal detection for visitors",
              "Use escort requirements for all non-employees",
              "Deploy real-time location tracking for authorized personnel",
              "Implement clean desk policies and document security"
            ]
          }
        ]
      }
    ]
  },
  {
    title: "Travel and Event Security",
    description: "Security protocols for travel and public appearances",
    icon: FaPlane,
    priority: "Short-term",
    items: [
      {
        title: "Executive Travel Security",
        description: "Comprehensive travel security planning and execution",
        icon: FaPlane,
        riskLevel: "Critical",
        implementationTime: "1-2 weeks planning",
        steps: [
          {
            name: "Pre-Travel Security Planning",
            details: [
              "Conduct comprehensive threat assessments for destinations",
              "Coordinate with local security services and law enforcement",
              "Establish secure accommodations with advance security teams",
              "Plan multiple transportation routes and backup options",
              "Arrange secure communication channels at destination",
              "Coordinate medical support and emergency evacuation plans",
              "Establish local safe houses and emergency rally points"
            ]
          },
          {
            name: "Travel Execution Security",
            details: [
              "Use private aviation with vetted crew and secure airports",
              "Deploy advance security teams 24-48 hours prior",
              "Implement counter-surveillance during all movements",
              "Use secure ground transportation with trained drivers",
              "Maintain 24/7 communication with security operations center",
              "Deploy close protection teams with medical training",
              "Implement operational security (OPSEC) for all activities"
            ]
          }
        ]
      },
      {
        title: "Public Event Security",
        description: "Security measures for speeches, meetings, and public appearances",
        icon: FaUsers,
        riskLevel: "High",
        implementationTime: "2-3 weeks planning",
        steps: [
          {
            name: "Event Security Planning",
            details: [
              "Conduct site surveys and vulnerability assessments",
              "Coordinate with venue security and local authorities",
              "Implement attendee screening and background checks",
              "Plan secure arrival and departure routes",
              "Establish command and control centers for event security",
              "Deploy counter-sniper teams for outdoor events",
              "Implement crowd control and emergency evacuation procedures"
            ]
          },
          {
            name: "Event Execution Security",
            details: [
              "Deploy plainclothes security throughout venue",
              "Use metal detectors and explosive detection equipment",
              "Implement real-time threat monitoring and intelligence",
              "Deploy medical teams with trauma capabilities",
              "Use secure communication networks for all security personnel",
              "Implement stage and podium security measures",
              "Deploy rapid response teams for emergency situations"
            ]
          }
        ]
      }
    ]
  },
  {
    title: "Intelligence and Threat Management",
    description: "Proactive threat detection and intelligence gathering",
    icon: FaEye,
    priority: "Short-term",
    items: [
      {
        title: "Threat Intelligence and Monitoring",
        description: "Continuous monitoring of potential threats and risks",
        icon: FaEye,
        riskLevel: "High",
        implementationTime: "Ongoing",
        steps: [
          {
            name: "Intelligence Collection and Analysis",
            details: [
              "Monitor social media and online forums for threats",
              "Use open source intelligence (OSINT) gathering tools",
              "Coordinate with law enforcement intelligence units",
              "Deploy human intelligence (HUMINT) networks when appropriate",
              "Monitor dark web activities and threat actor communications",
              "Use artificial intelligence for threat pattern recognition",
              "Establish information sharing agreements with security agencies"
            ]
          },
          {
            name: "Risk Assessment and Mitigation",
            details: [
              "Conduct regular threat assessments and security reviews",
              "Implement dynamic risk scoring based on current intelligence",
              "Use predictive analytics for threat forecasting",
              "Develop threat-specific response protocols",
              "Maintain updated threat profiles and watchlists",
              "Implement automated alerting for high-priority threats",
              "Coordinate threat mitigation with appropriate authorities"
            ]
          }
        ]
      },
      {
        title: "Counter-Surveillance Operations",
        description: "Detection and mitigation of surveillance activities",
        icon: FaCamera,
        riskLevel: "High",
        implementationTime: "Ongoing",
        steps: [
          {
            name: "Surveillance Detection",
            details: [
              "Deploy counter-surveillance teams during high-risk activities",
              "Use technical surveillance countermeasures (TSCM) regularly",
              "Implement behavioral analysis for surveillance detection",
              "Use electronic surveillance detection equipment",
              "Deploy decoy operations to identify surveillance teams",
              "Monitor communication intercepts and electronic signatures",
              "Use pattern analysis to identify surveillance activities"
            ]
          },
          {
            name: "Counter-Surveillance Response",
            details: [
              "Implement surveillance disruption techniques",
              "Use route changes and timing variations",
              "Deploy counter-surveillance vehicles and personnel",
              "Coordinate with law enforcement for surveillance investigations",
              "Implement communication security during counter-operations",
              "Use technical countermeasures to defeat electronic surveillance",
              "Document and report all surveillance activities"
            ]
          }
        ]
      }
    ]
  },
  {
    title: "Crisis Management and Incident Response",
    description: "Comprehensive emergency response and crisis management",
    icon: FaExclamationTriangle,
    priority: "Immediate",
    items: [
      {
        title: "Emergency Response Protocols",
        description: "Immediate response procedures for security incidents",
        icon: FaExclamationTriangle,
        riskLevel: "Critical",
        implementationTime: "1 week",
        steps: [
          {
            name: "Incident Response Procedures",
            details: [
              "Establish 24/7 security operations center (SOC)",
              "Implement automated threat detection and alerting systems",
              "Deploy rapid response teams with specialized capabilities",
              "Establish communication protocols for emergency situations",
              "Coordinate with law enforcement and emergency services",
              "Implement secure evacuation procedures and safe houses",
              "Deploy crisis management teams with decision-making authority"
            ]
          },
          {
            name: "Business Continuity Planning",
            details: [
              "Establish alternate command and control facilities",
              "Implement secure remote work capabilities",
              "Deploy backup communication systems and networks",
              "Establish succession planning and delegation of authority",
              "Implement data backup and recovery procedures",
              "Coordinate with business partners and stakeholders",
              "Establish media relations and public communication protocols"
            ]
          }
        ]
      },
      {
        title: "Legal and Compliance Considerations",
        description: "Legal frameworks and compliance requirements",
        icon: FaGavel,
        riskLevel: "Medium",
        implementationTime: "2-3 weeks",
        steps: [
          {
            name: "Legal Framework Development",
            details: [
              "Establish legal authority for security measures",
              "Coordinate with legal counsel on privacy and surveillance laws",
              "Implement compliance with industry and government regulations",
              "Establish information sharing agreements with authorities",
              "Document security procedures for legal compliance",
              "Implement data protection and privacy safeguards",
              "Establish liability and insurance coverage for security operations"
            ]
          },
          {
            name: "Regulatory Compliance",
            details: [
              "Comply with government security clearance requirements",
              "Implement industry-specific security standards (SOX, HIPAA, etc.)",
              "Establish audit trails and documentation requirements",
              "Coordinate with regulatory bodies and oversight agencies",
              "Implement cross-border security compliance for international travel",
              "Establish export control compliance for security technologies",
              "Maintain security certifications and accreditations"
            ]
          }
        ]
      }
    ]
  },
  {
    title: "Family and Personal Protection",
    description: "Extended security measures for family members and personal associates",
    icon: FaUsers,
    priority: "Short-term",
    items: [
      {
        title: "Family Security Programs",
        description: "Comprehensive security for family members and dependents",
        icon: FaUsers,
        riskLevel: "High",
        implementationTime: "2-4 weeks",
        steps: [
          {
            name: "Family Member Protection",
            details: [
              "Conduct threat assessments for all family members",
              "Implement age-appropriate security training and awareness",
              "Deploy personal protection details for high-risk family members",
              "Establish secure transportation for family activities",
              "Implement school and workplace security coordination",
              "Deploy tracking and communication devices for family members",
              "Establish emergency response procedures for family incidents"
            ]
          },
          {
            name: "Residential Family Security",
            details: [
              "Extend security systems to cover all family areas",
              "Implement child-safe security measures and protocols",
              "Deploy domestic staff background checks and security training",
              "Establish visitor screening procedures for family guests",
              "Implement secure communication systems for family use",
              "Deploy medical emergency response capabilities",
              "Establish family emergency rally points and procedures"
            ]
          }
        ]
      },
      {
        title: "Digital Privacy and Reputation Management",
        description: "Protecting digital footprint and managing public image",
        icon: FaNetworkWired,
        riskLevel: "Medium",
        implementationTime: "3-4 weeks",
        steps: [
          {
            name: "Digital Footprint Management",
            details: [
              "Conduct comprehensive digital footprint audits",
              "Implement social media monitoring and management",
              "Deploy online reputation monitoring services",
              "Establish digital asset protection and backup procedures",
              "Implement privacy settings optimization across all platforms",
              "Deploy deep fake and impersonation detection systems",
              "Establish digital legacy and succession planning"
            ]
          },
          {
            name: "Information Security and Privacy",
            details: [
              "Implement personal information classification systems",
              "Deploy data loss prevention (DLP) for personal information",
              "Establish secure document management and storage",
              "Implement personal email and communication security",
              "Deploy identity monitoring and theft protection services",
              "Establish secure financial and legal document management",
              "Implement personal data breach response procedures"
            ]
          }
        ]
      }
    ]
  },
  {
    title: "Advanced Security Technologies",
    description: "Cutting-edge security technologies and countermeasures",
    icon: FaShieldAlt,
    priority: "Long-term",
    items: [
      {
        title: "Electronic Countermeasures",
        description: "Advanced technical security measures and countermeasures",
        icon: FaShieldAlt,
        riskLevel: "High",
        implementationTime: "4-6 weeks",
        steps: [
          {
            name: "Technical Surveillance Countermeasures (TSCM)",
            details: [
              "Deploy regular electronic sweeps for listening devices",
              "Use spectrum analyzers and RF detection equipment",
              "Implement Faraday cage technology for sensitive areas",
              "Deploy acoustic masking and white noise systems",
              "Use TEMPEST-certified equipment to prevent electronic emanations",
              "Implement cellular and WiFi jamming capabilities",
              "Deploy thermal imaging for hidden device detection"
            ]
          },
          {
            name: "Advanced Detection Systems",
            details: [
              "Deploy AI-powered behavioral analysis systems",
              "Use biometric identification and verification systems",
              "Implement quantum encryption for ultra-secure communications",
              "Deploy drone detection and countermeasure systems",
              "Use advanced persistent threat (APT) detection tools",
              "Implement blockchain-based secure document verification",
              "Deploy predictive analytics for threat forecasting"
            ]
          }
        ]
      },
      {
        title: "Secure Communications Infrastructure",
        description: "Military-grade communication systems and protocols",
        icon: FaHeadset,
        riskLevel: "Critical",
        implementationTime: "6-8 weeks",
        steps: [
          {
            name: "Encrypted Communication Networks",
            details: [
              "Deploy mesh networking for redundant communications",
              "Use satellite communication systems for global coverage",
              "Implement quantum key distribution for ultimate security",
              "Deploy secure voice over IP (VoIP) with end-to-end encryption",
              "Use frequency-hopping radios for tactical communications",
              "Implement secure video conferencing with identity verification",
              "Deploy emergency communication systems with battery backup"
            ]
          },
          {
            name: "Communication Security Protocols",
            details: [
              "Establish communication security (COMSEC) procedures",
              "Implement key management and distribution systems",
              "Deploy communication interception detection systems",
              "Use authentication protocols for all communications",
              "Implement communication blackout procedures",
              "Establish secure communication with government agencies",
              "Deploy emergency broadcast and alert systems"
            ]
          }
        ]
      }
    ]
  },
  {
    title: "Training and Awareness Programs",
    description: "Comprehensive security training for executives and staff",
    icon: FaUsers,
    priority: "Short-term",
    items: [
      {
        title: "Executive Security Training",
        description: "Specialized security training for high-profile individuals",
        icon: FaUserSecret,
        riskLevel: "Medium",
        implementationTime: "2-3 weeks",
        steps: [
          {
            name: "Personal Security Awareness",
            details: [
              "Conduct situational awareness and threat recognition training",
              "Implement social engineering and phishing awareness programs",
              "Deploy operational security (OPSEC) training and procedures",
              "Conduct emergency response and evacuation training",
              "Implement travel security and cultural awareness training",
              "Deploy communication security and protocol training",
              "Conduct regular security drills and exercises"
            ]
          },
          {
            name: "Advanced Security Skills",
            details: [
              "Provide defensive driving and evasive maneuvers training",
              "Conduct basic self-defense and personal protection training",
              "Implement crisis management and decision-making training",
              "Deploy secure communication and technology usage training",
              "Conduct threat assessment and risk evaluation training",
              "Implement media relations and public speaking security training",
              "Deploy family security and emergency procedures training"
            ]
          }
        ]
      },
      {
        title: "Staff and Team Security Training",
        description: "Security training for support staff and security teams",
        icon: FaUsers,
        riskLevel: "Medium",
        implementationTime: "4-6 weeks",
        steps: [
          {
            name: "Security Team Training",
            details: [
              "Conduct close protection and executive security training",
              "Implement tactical response and emergency procedures training",
              "Deploy advanced weapons and defensive tactics training",
              "Conduct surveillance and counter-surveillance training",
              "Implement medical and first aid training for security personnel",
              "Deploy communication and coordination training",
              "Conduct regular certification and skills maintenance training"
            ]
          },
          {
            name: "Support Staff Security Training",
            details: [
              "Implement security awareness and threat recognition training",
              "Conduct visitor management and access control training",
              "Deploy information security and confidentiality training",
              "Implement emergency response and evacuation training",
              "Conduct background check and vetting procedures training",
              "Deploy incident reporting and communication training",
              "Implement ongoing security awareness and update training"
            ]
          }
        ]
      }
    ]
  }
];

// Additional utility functions for executive security
export const getSecurityPriorityItems = (priority: 'Immediate' | 'Short-term' | 'Long-term') => {
  return executiveSecurityData.filter(category => category.priority === priority);
};

export const getCriticalRiskItems = () => {
  return executiveSecurityData.flatMap(category => 
    category.items.filter(item => item.riskLevel === 'Critical')
  );
};

export const getImplementationTimeline = () => {
  const timeline = {
    immediate: executiveSecurityData.filter(cat => cat.priority === 'Immediate'),
    shortTerm: executiveSecurityData.filter(cat => cat.priority === 'Short-term'),
    longTerm: executiveSecurityData.filter(cat => cat.priority === 'Long-term')
  };
  return timeline;
};
