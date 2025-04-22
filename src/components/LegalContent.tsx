import React from 'react';

interface LegalContentProps {
  activeTab: string;
}

export default function LegalContent({ activeTab }: LegalContentProps) {
  switch (activeTab) {
    case 'privacy-policy':
      return <PrivacyPolicy />;
    case 'terms-of-service':
      return <TermsOfService />;
    case 'cookie-policy':
      return <CookiePolicy />;
    case 'data-processing':
      return <DataProcessing />;
    default:
      return <PrivacyPolicy />;
  }
}

function PrivacyPolicy() {
  return (
    <div className="prose max-w-none">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Privacy Policy</h2>
      
      <p className="mb-4">
        Last updated: June 15, 2023
      </p>
      
      <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">1. Introduction</h3>
      <p className="text-gray-700 mb-4">
        PCD System (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
      </p>
      
      <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">2. Information We Collect</h3>
      <p className="text-gray-700 mb-4">
        We may collect personal information that you voluntarily provide to us when you register with us, express an interest in obtaining information about us or our products and services, or otherwise contact us.
      </p>
      <p className="text-gray-700 mb-4">
        The personal information that we collect depends on the context of your interactions with us and the choices you make, including your privacy settings and the products and features you use.
      </p>
      
      <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">3. How We Use Your Information</h3>
      <p className="text-gray-700 mb-4">
        We use personal information collected via our website for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.
      </p>
      <ul className="list-disc pl-6 mb-4 text-gray-700">
        <li className="mb-2">To facilitate account creation and authentication</li>
        <li className="mb-2">To send administrative information to you</li>
        <li className="mb-2">To send you marketing and promotional communications</li>
        <li className="mb-2">To respond to your inquiries and solve any potential issues</li>
      </ul>
      
      <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">4. Disclosure of Your Information</h3>
      <p className="text-gray-700 mb-4">
        We may share your information with third parties that perform services for us or on our behalf, including payment processing, data analysis, email delivery, hosting services, customer service, and marketing assistance.
      </p>
      
      <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">5. Security of Your Information</h3>
      <p className="text-gray-700 mb-4">
        We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.
      </p>
      
      <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">6. Contact Us</h3>
      <p className="text-gray-700 mb-4">
        If you have questions or comments about this Privacy Policy, please contact us at:
      </p>
      <p className="text-gray-700 mb-4">
        Email: info@cyber1defense.com<br />
        Phone: +233 55 237 3603<br />
        Address: Accra, Ghana
      </p>
    </div>
  );
}

function TermsOfService() {
  return (
    <div className="prose max-w-none">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Terms of Service</h2>
      
      <p className="mb-4">
        Last updated: June 15, 2023
      </p>
      
      <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">1. Agreement to Terms</h3>
      <p className="text-gray-700 mb-4">
        By accessing or using our services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing our services.
      </p>
      
      <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">2. Use License</h3>
      <p className="text-gray-700 mb-4">
        Permission is granted to temporarily access the materials on PCD System&apos;s website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
      </p>
      <ul className="list-disc pl-6 mb-4 text-gray-700">
        <li className="mb-2">Modify or copy the materials</li>
        <li className="mb-2">Use the materials for any commercial purpose</li>
        <li className="mb-2">Attempt to decompile or reverse engineer any software contained on the website</li>
        <li className="mb-2">Remove any copyright or other proprietary notations from the materials</li>
        <li className="mb-2">Transfer the materials to another person or &quot;mirror&quot; the materials on any other server</li>
      </ul>
      
      <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">3. Disclaimer</h3>
      <p className="text-gray-700 mb-4">
        The materials on PCD System&apos;s website are provided on an &apos;as is&apos; basis. PCD System makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
      </p>
      
      <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">4. Limitations</h3>
      <p className="text-gray-700 mb-4">
        In no event shall PCD System or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on PCD System&apos;s website, even if PCD System or a PCD System authorized representative has been notified orally or in writing of the possibility of such damage.
      </p>
      
      <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">5. Governing Law</h3>
      <p className="text-gray-700 mb-4">
        These terms and conditions are governed by and construed in accordance with the laws of Ghana and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
      </p>
    </div>
  );
}

function CookiePolicy() {
  return (
    <div className="prose max-w-none">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Cookie Policy</h2>
      
      <p className="mb-4">
        Last updated: June 15, 2023
      </p>
      
      <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">1. What Are Cookies</h3>
      <p className="text-gray-700 mb-4">
        Cookies are small pieces of text sent to your web browser by a website you visit. A cookie file is stored in your web browser and allows the service or a third-party to recognize you and make your next visit easier and more useful to you.
      </p>
      
      <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">2. How We Use Cookies</h3>
      <p className="text-gray-700 mb-4">
        When you use and access our service, we may place a number of cookie files in your web browser. We use cookies for the following purposes:
      </p>
      <ul className="list-disc pl-6 mb-4 text-gray-700">
        <li className="mb-2">To enable certain functions of the service</li>
        <li className="mb-2">To provide analytics</li>
        <li className="mb-2">To store your preferences</li>
        <li className="mb-2">To enable advertisements delivery, including behavioral advertising</li>
      </ul>
      
      <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">3. Types of Cookies We Use</h3>
      <p className="text-gray-700 mb-4">
        We use both session and persistent cookies on the service and we use different types of cookies to run the service:
      </p>
      <ul className="list-disc pl-6 mb-4 text-gray-700">
        <li className="mb-2"><strong>Essential cookies.</strong> We may use essential cookies to authenticate users and prevent fraudulent use of user accounts.</li>
        <li className="mb-2"><strong>Preferences cookies.</strong> We may use preferences cookies to remember information that changes the way the service behaves or looks, such as the &quot;remember me&quot; functionality.</li>
        <li className="mb-2"><strong>Analytics cookies.</strong> We may use analytics cookies to track information how the service is used so that we can make improvements.</li>
        <li className="mb-2"><strong>Marketing cookies.</strong> These type of cookies are used to deliver advertisements on and through the service and track the performance of these advertisements.</li>
      </ul>
      
      <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">4. How to Control Cookies</h3>
      <p className="text-gray-700 mb-4">
        You can control and manage cookies in various ways. Please keep in mind that removing or blocking cookies can negatively impact your user experience and parts of our website might no longer be fully accessible.
      </p>
      <p className="text-gray-700 mb-4">
        Most browsers automatically accept cookies, but you can choose whether or not to accept cookies through your browser controls, often found in your browser&apos;s &quot;Tools&quot; or &quot;Preferences&quot; menu. For more information on how to modify your browser settings or how to block, manage or filter cookies can be found in your browser&apos;s help file or through sites like <a href="https://www.allaboutcookies.org" className="text-blue-600 hover:underline">www.allaboutcookies.org</a>.
      </p>
      
      <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">5. Changes to This Cookie Policy</h3>
      <p className="text-gray-700 mb-4">
        We may update our Cookie Policy from time to time. We will notify you of any changes by posting the new Cookie Policy on this page and updating the &quot;Last Updated&quot; date at the top of this Cookie Policy.
      </p>
      <p className="text-gray-700 mb-4">
        You are advised to review this Cookie Policy periodically for any changes. Changes to this Cookie Policy are effective when they are posted on this page.
      </p>
      
      <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">6. Contact Us</h3>
      <p className="text-gray-700 mb-4">
        If you have any questions about our Cookie Policy, please contact us:
      </p>
      <p className="text-gray-700 mb-4">
        Email: info@cyber1defense.com<br />
        Phone: +233 55 237 3603<br />
        Address: Accra, Ghana
      </p>
    </div>
  );
}

function DataProcessing() {
  return (
    <div className="prose max-w-none">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Data Processing Agreement</h2>
      
      <p className="mb-4">
        Last updated: June 15, 2023
      </p>
      
      <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">1. Introduction</h3>
      <p className="text-gray-700 mb-4">
        This Data Processing Agreement (&quot;DPA&quot;) forms part of the Terms of Service between you (&quot;Data Controller&quot;) and PCD System (&quot;Data Processor&quot;) (together as the &quot;Parties&quot;).
      </p>
      <p className="text-gray-700 mb-4">
        This DPA reflects the parties&apos; agreement with respect to the processing of personal data by the Data Processor on behalf of the Data Controller in connection with the services provided by PCD System.
      </p>
      
      <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">2. Definitions</h3>
      <p className="text-gray-700 mb-4">
      &quot;Personal Data&quot; means any information relating to an identified or identifiable natural person (&quot;data subject&quot;); an identifiable natural person is one who can be identified, directly or indirectly, in particular by reference to an identifier.
      </p>
      <p className="text-gray-700 mb-4">
      &quot;Processing&quot; means any operation or set of operations which is performed on personal data or on sets of personal data, whether or not by automated means.
      </p>
      <p className="text-gray-700 mb-4">
        &quot;Data Controller&quot; means the natural or legal person, public authority, agency or other body which, alone or jointly with others, determines the purposes and means of the processing of personal data.
      </p>
      <p className="text-gray-700 mb-4">
        &quot;Data Processor&quot; means a natural or legal person, public authority, agency or other body which processes personal data on behalf of the controller.
      </p>
      
      <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">3. Data Processing</h3>
      <p className="text-gray-700 mb-4">
        The Data Processor shall process Personal Data only on documented instructions from the Data Controller, including with regard to transfers of Personal Data to a third country or an international organization, unless required to do so by law.
      </p>
      <p className="text-gray-700 mb-4">
        The Data Processor shall ensure that persons authorized to process the Personal Data have committed themselves to confidentiality or are under an appropriate statutory obligation of confidentiality.
      </p>
      
      <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">4. Security Measures</h3>
      <p className="text-gray-700 mb-4">
        The Data Processor shall implement appropriate technical and organizational measures to ensure a level of security appropriate to the risk, including:
      </p>
      <ul className="list-disc pl-6 mb-4 text-gray-700">
        <li className="mb-2">The pseudonymization and encryption of Personal Data</li>
        <li className="mb-2">The ability to ensure the ongoing confidentiality, integrity, availability and resilience of processing systems and services</li>
        <li className="mb-2">The ability to restore the availability and access to Personal Data in a timely manner in the event of a physical or technical incident</li>
        <li className="mb-2">A process for regularly testing, assessing and evaluating the effectiveness of technical and organizational measures for ensuring the security of the processing</li>
      </ul>
      
      <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">5. Sub-processing</h3>
      <p className="text-gray-700 mb-4">
        The Data Processor shall not engage another processor without prior specific or general written authorization of the Data Controller. In the case of general written authorization, the Data Processor shall inform the Data Controller of any intended changes concerning the addition or replacement of other processors, thereby giving the Data Controller the opportunity to object to such changes.
      </p>
      
      <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">6. Data Subject Rights</h3>
      <p className="text-gray-700 mb-4">
        The Data Processor shall assist the Data Controller by appropriate technical and organizational measures, insofar as this is possible, for the fulfillment of the Data Controller&apos;s obligation to respond to requests for exercising the data subject&apos;s rights.
      </p>
      
      <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">7. Contact Information</h3>
      <p className="text-gray-700 mb-4">
        For any questions regarding this Data Processing Agreement, please contact us at:
      </p>
      <p className="text-gray-700 mb-4">
        Email: info@cyber1defense.com<br />
        Phone: +233 55 237 3603<br />
        Address: Accra, Ghana
      </p>
    </div>
  );
}
