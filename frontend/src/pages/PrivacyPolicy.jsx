import React from 'react';

const PrivacyPolicy = () => {
  const containerStyle = {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    lineHeight: '1.6',
  };

  const headerStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '10px',
  };

  const paragraphStyle = {
    marginBottom: '10px',
  };

  return (
    <div style={{ ...containerStyle, marginTop: '40px' }}>
      {/* Header */}
      <h1 style={headerStyle}>Privacy Policy</h1>
      <p style={paragraphStyle}>
        Welcome to Welcome Furniture ("we," "us," or "our"). This Privacy Policy outlines how we collect, use, store, and protect your personal information when you visit our website (Welcome Furniture). By using our website, you consent to the practices described in this policy.
      </p>

      {/* Information We Collect */}
      <h2 style={headerStyle}>1. Information We Collect</h2>
      <p style={paragraphStyle}>
        We may collect the following types of information to provide and improve our services:
      </p>
      <ul>
        <li><strong>Personal Information:</strong> Name, email address, phone number, shipping address, and billing address.</li>
        <li><strong>Order Information:</strong> Details of products purchased, payment information, and order history.</li>
        <li><strong>Usage Data:</strong> Information about how you interact with our website, including IP address, browser type, pages visited, and time spent on the site.</li>
        <li><strong>Cookies and Tracking Technologies:</strong> We use cookies and similar technologies to enhance your browsing experience and analyze website traffic.</li>
      </ul>

      {/* How We Use Your Information */}
      <h2 style={headerStyle}>2. How We Use Your Information</h2>
      <p style={paragraphStyle}>
        We use the collected information for the following purposes:
      </p>
      <ul>
        <li>To process and fulfill your orders.</li>
        <li>To communicate with you about your orders, inquiries, and promotions.</li>
        <li>To personalize your shopping experience and recommend products.</li>
        <li>To improve our website, products, and services.</li>
        <li>To comply with legal obligations and resolve disputes.</li>
      </ul>

      {/* Sharing Your Information */}
      <h2 style={headerStyle}>3. Sharing Your Information</h2>
      <p style={paragraphStyle}>
        We do not sell, trade, or rent your personal information to third parties. However, we may share your information in the following circumstances:
      </p>
      <ul>
        <li><strong>Service Providers:</strong> Third-party vendors who assist us in processing payments, delivering orders, or providing customer support.</li>
        <li><strong>Legal Requirements:</strong> When required by law or to protect our rights, property, or safety.</li>
        <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of the transaction.</li>
      </ul>

      {/* Cookies and Tracking Technologies */}
      <h2 style={headerStyle}>4. Cookies and Tracking Technologies</h2>
      <p style={paragraphStyle}>
        We use cookies and similar technologies to enhance your browsing experience. You can manage your cookie preferences through your browser settings. However, disabling cookies may affect the functionality of our website.
      </p>

      {/* Security of Your Information */}
      <h2 style={headerStyle}>5. Security of Your Information</h2>
      <p style={paragraphStyle}>
        We implement industry-standard security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
      </p>

      {/* Your Rights */}
      <h2 style={headerStyle}>6. Your Rights</h2>
      <p style={paragraphStyle}>
        Under Indian law, you have the following rights regarding your personal information:
      </p>
      <ul>
        <li><strong>Access:</strong> You can request a copy of the personal information we hold about you.</li>
        <li><strong>Correction:</strong> You can request corrections to any inaccurate or incomplete information.</li>
        <li><strong>Deletion:</strong> You can request the deletion of your personal information, subject to applicable laws.</li>
        <li><strong>Opt-Out:</strong> You can opt out of receiving promotional communications from us.</li>
      </ul>

      {/* Children's Privacy */}
      <h2 style={headerStyle}>7. Children's Privacy</h2>
      <p style={paragraphStyle}>
        Our website is not intended for children under the age of 18. We do not knowingly collect personal information from children. If we become aware that we have collected such information, we will take steps to delete it promptly.
      </p>

      {/* Changes to This Privacy Policy */}
      <h2 style={headerStyle}>8. Changes to This Privacy Policy</h2>
      <p style={paragraphStyle}>
        We reserve the right to update or modify this Privacy Policy at any time. Any changes will be effective immediately upon posting the updated policy on our website. We encourage you to review this policy periodically.
      </p>

      {/* Contact Us */}
      <h2 style={headerStyle}>9. Contact Us</h2>
      <p style={paragraphStyle}>
        If you have any questions or concerns about this Privacy Policy, please contact us at:
      </p>
      <ul>
        <li>Email: welcomefurniture.co@gmail.com</li>
        <li>Phone: +91 81283 74219</li>
        <li>Address: Shop No 2, Vallabh Nagar Complex
        Tarsali, Vadodara 390010, India</li>
      </ul>
    </div>
  );
};

export default PrivacyPolicy;