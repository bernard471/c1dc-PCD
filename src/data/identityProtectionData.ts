import { 
  FaUserShield, 
  FaIdCard, 
  FaFileAlt, 
  FaIdBadge, 
  FaCreditCard, 
  FaUniversity, 
  FaShieldAlt, 
  FaGlobe, 
  FaKey, 
  FaFingerprint, 
  FaExclamationTriangle, 
  FaHospital, 
  FaChild, 
  FaLock, 
  FaClipboardList, 
  FaSearchPlus
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

export const identityProtectionData: SecurityCategory[] = [
  {
    title: "Personal Information Security",
    description: "Protect your personal data from unauthorized access and misuse",
    icon: FaUserShield,
    items: [
      {
        title: "Data Minimization",
        description: "Reduce your digital footprint and limit information sharing",
        icon: FaIdCard,
        steps: [
          {
            name: "Information sharing limits",
            details: [
              "Only provide required information on forms",
              "Question requests for sensitive data",
              "Use minimal details for online accounts",
              "Consider alternative information when possible (e.g., business address instead of home)"
            ]
          },
          {
            name: "Digital footprint reduction",
            details: [
              "Regularly search your name and information online",
              "Request removal from data broker sites:",
              "DeleteMe",
              "Incogni",
              "PrivacyDuck",
              "Manual opt-out procedures",
              "Check and remove information from people finder sites",
              "Use GDPR/CCPA rights for data deletion where applicable"
            ]
          }
        ]
      },
      {
        title: "Document Security",
        description: "Secure physical and digital documents containing personal information",
        icon: FaFileAlt,
        steps: [
          {
            name: "Physical document protection",
            details: [
              "Use locking file cabinet for sensitive documents",
              "Shred documents containing personal information",
              "Consider RFID-blocking wallet for credit cards and ID",
              "Limit what you carry in physical wallet"
            ]
          },
          {
            name: "Digital document safeguards",
            details: [
              "Encrypt files containing personal information",
              "Use secure cloud storage with two-factor authentication",
              "Password-protect sensitive PDFs",
              "Consider digital document vault (1Password, LastPass)"
            ]
          }
        ]
      },
      {
        title: "Social Security Number Protection",
        description: "Safeguard your Social Security Number from theft and misuse",
        icon: FaIdBadge,
        steps: [
          {
            name: "SSN security measures",
            details: [
              "Never carry SSN card unless absolutely necessary",
              "Question when asked for SSN and provide alternatives when possible",
              "Provide only last 4 digits when feasible",
              "Monitor for SSN usage in credit reports"
            ]
          },
          {
            name: "SSN compromise response",
            details: [
              "Place fraud alert with credit bureaus",
              "Consider credit freeze",
              "File identity theft report with FTC",
              "Report to Social Security Administration"
            ]
          }
        ]
      }
    ]
  },
  {
    title: "Financial Identity Protection",
    description: "Secure your financial accounts and credit information",
    icon: FaCreditCard,
    items: [
      {
        title: "Credit Monitoring",
        description: "Track and review your credit reports and scores",
        icon: FaSearchPlus,
        steps: [
          {
            name: "Regular credit checks",
            details: [
              "Review free annual credit reports from all three bureaus:",
              "Equifax",
              "Experian",
              "TransUnion",
              "Stagger requests every four months",
              "Check for unauthorized accounts or inquiries",
              "Dispute inaccuracies promptly"
            ]
          },
          {
            name: "Credit monitoring services",
            details: [
              "Consider paid services for real-time alerts",
              "Use free monitoring through credit card companies",
              "Set up fraud alerts with credit bureaus",
              "Evaluate identity theft insurance options"
            ]
          }
        ]
      },
      {
        title: "Financial Account Security",
        description: "Protect your bank accounts and credit cards",
        icon: FaUniversity,
        steps: [
          {
            name: "Bank account protection",
            details: [
              "Enable two-factor authentication for all accounts",
              "Use strong, unique passwords",
              "Set up account alerts for:",
              "Large transactions",
              "Foreign transactions",
              "Password changes",
              "New payees",
              "Monitor accounts weekly for unauthorized transactions"
            ]
          },
          {
            name: "Credit card security",
            details: [
              "Use virtual card numbers for online shopping",
              "Consider dedicated card for automatic payments",
              "Enable purchase notifications",
              "Periodically audit recurring charges"
            ]
          }
        ]
      },
      {
        title: "Preventative Measures",
        description: "Implement proactive steps to prevent financial identity theft",
        icon: FaShieldAlt,
        steps: [
          {
            name: "Credit freezes",
            details: [
              "Implement security freezes at all three bureaus",
              "Understand temporary thaw procedures",
              "Consider freezes for vulnerable family members",
              "Document freeze PINs securely"
            ]
          },
          {
            name: "Financial identity monitoring",
            details: [
              "Watch for tax return fraud",
              "Monitor medical insurance claims",
              "Check Social Security benefits statement annually",
              "Review investment account activity regularly"
            ]
          }
        ]
      }
    ]
  },
  {
    title: "Digital Identity Protection",
    description: "Secure your online presence and digital credentials",
    icon: FaGlobe,
    items: [
      {
        title: "Online Presence Management",
        description: "Control your personal information online",
        icon: FaGlobe,
        steps: [
          {
            name: "Personal information audit",
            details: [
              "Search your name in multiple search engines",
              "Check image search results",
              "Review social media profiles for oversharing",
              "Use privacy tools to scan for exposed information"
            ]
          },
          {
            name: "Data removal process",
            details: [
              "Contact websites directly for content removal",
              "Use Google's removal request process for sensitive info",
              "Submit opt-out requests to data brokers",
              "Consider professional removal services"
            ]
          }
        ]
      },
      {
        title: "Credential Security",
        description: "Secure your passwords and login information",
        icon: FaKey,
        steps: [
          {
            name: "Password management",
            details: [
              "Use password manager (1Password, Bitwarden, LastPass)",
              "Generate unique credentials for every site",
              "Implement maximum-length passwords",
              "Change passwords for critical accounts quarterly"
            ]
          },
          {
            name: "Multi-factor everywhere",
            details: [
              "Enable 2FA on all accounts that offer it",
              "Prefer authenticator apps over SMS",
              "Consider hardware security keys",
              "Backup recovery codes securely"
            ]
          }
        ]
      },
      {
        title: "Authentication Strategy",
        description: "Develop a comprehensive approach to account security",
        icon: FaFingerprint,
        steps: [
          {
            name: "Identity verification hierarchy",
            details: [
              "Implement strongest authentication for financial accounts",
              "Use medium security for email and social media",
              "Apply basic security for non-sensitive accounts",
              "Consider account deletion for unused services"
            ]
          },
          {
            name: "Biometric security",
            details: [
              "Understand where biometric data is stored",
              "Use biometrics for convenience with fallback methods",
              "Be aware of legal implications of biometric use",
              "Consider privacy implications before enrolling biometrics"
            ]
          }
        ]
      }
    ]
  },
  {
    title: "Identity Theft Prevention",
    description: "Recognize and prevent identity theft before it happens",
    icon: FaExclamationTriangle,
    items: [
      {
        title: "Warning Signs Detection",
        description: "Identify potential indicators of identity theft",
        icon: FaExclamationTriangle,
        steps: [
          {
            name: "Financial red flags",
            details: [
              "Unexpected changes in credit score",
              "Unfamiliar accounts on credit report",
              "Unrecognized credit inquiries",
              "Bills or statements stop arriving",
              "Debt collection calls for unknown accounts"
            ]
          },
          {
            name: "Digital indicators",
            details: [
              "Account access problems",
              "Unexpected password reset emails",
              "Notifications about profile changes",
              "Unfamiliar account activity",
              "Two-factor codes you didn't request"
            ]
          }
        ]
      },
      {
        title: "Medical Identity Protection",
        description: "Safeguard your healthcare information",
        icon: FaHospital,
        steps: [
          {
            name: "Healthcare information security",
            details: [
              "Review Explanation of Benefits statements",
              "Request annual benefits paid summary",
              "Check medical records for accuracy",
              "Secure physical medical cards"
            ]
          },
          {
            name: "Medical identity theft response",
            details: [
              "Request accounting of disclosures from providers",
              "Correct inaccurate medical records",
              "File complaints with HHS for HIPAA violations",
              "Report to FTC and law enforcement"
            ]
          }
        ]
      },
      {
        title: "Child Identity Protection",
        description: "Protect children from identity theft",
        icon: FaChild,
        steps: [
          {
            name: "Proactive measures",
            details: [
              "Check if your child has a credit report",
              "Consider credit freeze for minors",
              "Be careful with children's SSNs",
              "Teach children about information privacy"
            ]
          },
          {
            name: "Warning signs for child identity theft",
            details: [
              "Credit card offers addressed to your child",
              "Collection calls for your child",
              "Tax notices regarding your child",
              "Health insurance claim denials for reaching limits"
            ]
          }
        ]
      }
    ]
  },
  {
    title: "Identity Theft Response",
    description: "Take action if your identity has been compromised",
    icon: FaLock,
    items: [
      {
        title: "Immediate Containment",
        description: "First steps to take after discovering identity theft",
        icon: FaLock,
        steps: [
          {
            name: "First steps after discovering theft",
            details: [
              "Place initial fraud alert with one credit bureau",
              "Order credit reports from all three bureaus",
              "Create identity theft report with FTC (IdentityTheft.gov)",
              "File police report with local law enforcement"
            ]
          },
          {
            name: "Account security",
            details: [
              "Change passwords for all financial accounts",
              "Enable highest security settings",
              "Notify financial institutions of fraud",
              "Close compromised accounts"
            ]
          }
        ]
      },
      {
        title: "Mitigation Process",
        description: "Limit damage and begin recovery",
        icon: FaClipboardList,
        steps: [
          {
            name: "Credit bureau procedures",
            details: [
              "Place extended fraud alert (7 years)",
              "Request credit freezes at all three bureaus",
              "Dispute fraudulent information in writing",
              "Request fraud victim statements in your file"
            ]
          },
          {
            name: "Creditor notifications",
            details: [
              "Send written dispute letters with ID theft affidavit",
              "Request fraudulent account information",
              "Ask for removal of fraudulent charges",
              "Document all communications"
            ]
          }
        ]
      },
      {
        title: "Long-term Recovery",
        description: "Ongoing monitoring and follow-up",
        icon: FaSearchPlus,
        steps: [
          {
            name: "Ongoing monitoring",
            details: [
              "Continue checking credit reports quarterly",
              "Review account statements monthly",
              "Watch for signs of new fraudulent activity",
              "Follow up on unresolved disputes"
            ]
          },
          {
            name: "Legal considerations",
            details: [
              "Understand state-specific identity theft laws",
              "Consider attorney consultation for serious cases",
              "Maintain records for statute of limitations period",
              "Report to appropriate regulatory agencies"
            ]
          }
        ]
      }
    ]
  }
];
