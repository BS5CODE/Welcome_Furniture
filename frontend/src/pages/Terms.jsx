import React from 'react';

const Terms = () => {
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
      <h1 style={headerStyle}>Terms and Conditions</h1>
      <p style={paragraphStyle}>
        Welcome to Welcome Furniture ("we," "us," or "our"). By accessing or using our website (Welcome Furniture), you agree to comply with and be bound by these terms and conditions. If you do not agree to these terms, please refrain from using our website.
      </p>

      {/* General Terms */}
      <h2 style={headerStyle}>1. Acceptance of Terms</h2>
      <p style={paragraphStyle}>
        By using our website, you confirm that you are at least 18 years old and legally capable of entering into a binding contract under Indian law. These terms govern your use of our website, products, and services.
      </p>

      {/* Product Information */}
      <h2 style={headerStyle}>2. Product Information</h2>
      <p style={paragraphStyle}>
        We strive to provide accurate product descriptions, images, and pricing. However, we do not guarantee that all details are error-free. Colors and finishes may vary slightly due to manufacturing processes and screen settings. All products are subject to availability.
      </p>

      {/* Pricing and Payment */}
      <h2 style={headerStyle}>3. Pricing and Payment</h2>
      <p style={paragraphStyle}>
        All prices displayed on our website are inclusive of applicable taxes unless stated otherwise. Prices are subject to change without prior notice, but changes will not affect orders already placed. Payments can be made via credit/debit cards, UPI, net banking, or other approved payment gateways.
      </p>

      {/* Shipping and Delivery */}
      <h2 style={headerStyle}>4. Shipping and Delivery</h2>
      <p style={paragraphStyle}>
        Delivery timelines are estimates and may vary depending on location, product availability, and logistics. We partner with third-party courier services for delivery. Any delays caused by these services are beyond our control. You are responsible for inspecting the product upon delivery and reporting any damages or defects within 48 hours.
      </p>

      {/* Cancellation and Returns */}
      <h2 style={headerStyle}>5. Cancellation and Returns</h2>
      <p style={paragraphStyle}>
        - Orders can be canceled within 24 hours of placement. After this period, cancellations may not be possible if the product has already been shipped. <br />
        - Returns are accepted within 7 days of delivery, provided the product is unused, undamaged, and in its original packaging. Customized or assembled furniture cannot be returned unless defective. <br />
        - Refunds will be processed within 7-10 business days after receiving the returned product. Return shipping costs are borne by the customer unless the return is due to our error.
      </p>

      {/* Warranty and Liability */}
      <h2 style={headerStyle}>6. Warranty and Liability</h2>
      <p style={paragraphStyle}>
        Products come with a limited warranty as specified in the product description. The warranty covers manufacturing defects but does not cover normal wear and tear, misuse, or damage caused by improper handling. Our liability is limited to repairing or replacing defective products or issuing a refund. We are not liable for indirect or consequential damages.
      </p>

      {/* Intellectual Property */}
      <h2 style={headerStyle}>7. Intellectual Property</h2>
      <p style={paragraphStyle}>
        All content on this website, including text, images, logos, and designs, is the property of Welcome Furniture and is protected by Indian copyright laws. Unauthorized use, reproduction, or distribution of any content is strictly prohibited.
      </p>

      {/* User Conduct */}
      <h2 style={headerStyle}>8. User Conduct</h2>
      <p style={paragraphStyle}>
        You agree not to use our website for any unlawful or prohibited activities. Do not attempt to gain unauthorized access to our systems or interfere with the functioning of the website.
      </p>

      {/* Cookies */}
      <h2 style={headerStyle}>9. Cookies</h2>
      <p style={paragraphStyle}>
        We employ the use of cookies to enhance your browsing experience. By accessing Welcome Furniture, you agree to use cookies in accordance with our Privacy Policy.
      </p>

      {/* Hyperlinking to Our Content */}
      <h2 style={headerStyle}>10. Hyperlinking to Our Content</h2>
      <p style={paragraphStyle}>
        The following organizations may link to our website without prior written approval:
      </p>
      <ul>
        <li>Government agencies;</li>
        <li>Search engines;</li>
        <li>News organizations;</li>
        <li>Online directory distributors may link to our website in the same manner as they hyperlink to the websites of other listed businesses; and</li>
        <li>System-wide Accredited Businesses except soliciting non-profit organizations, charity shopping malls, and charity fundraising groups, which may not hyperlink to our website.</li>
      </ul>

      {/* iFrames */}
      <h2 style={headerStyle}>11. iFrames</h2>
      <p style={paragraphStyle}>
        Without prior approval and written permission, you may not create frames around our webpages that alter in any way the visual presentation or appearance of our website.
      </p>

      {/* Content Liability */}
      <h2 style={headerStyle}>12. Content Liability</h2>
      <p style={paragraphStyle}>
        We shall not be held responsible for any content that appears on third-party websites linking to our website. You agree to protect and defend us against all claims arising from your use of our website.
      </p>

      {/* Reservation of Rights */}
      <h2 style={headerStyle}>13. Reservation of Rights</h2>
      <p style={paragraphStyle}>
        We reserve the right to request that you remove all links or any particular link to our website. You agree to immediately remove all links to our website upon request.
      </p>

      {/* Removal of Links */}
      <h2 style={headerStyle}>14. Removal of Links</h2>
      <p style={paragraphStyle}>
        If you find any link on our website that is offensive or inappropriate, you are free to contact and inform us at any time. We will consider requests to remove links but are not obligated to do so or respond directly.
      </p>

      {/* Disclaimer */}
      <h2 style={headerStyle}>15. Disclaimer</h2>
      <p style={paragraphStyle}>
        To the maximum extent permitted by applicable law, we exclude all representations, warranties, and conditions relating to our website and the use of this website. This includes, but is not limited to, implied warranties of merchantability, fitness for a particular purpose, and non-infringement.
      </p>

      {/* Governing Law */}
      <h2 style={headerStyle}>16. Governing Law</h2>
      <p style={paragraphStyle}>
        These terms and conditions are governed by and construed in accordance with the laws of India. Any disputes arising out of or related to these terms will be subject to the exclusive jurisdiction of the courts in Gujarat.
      </p>

      {/* Contact Us */}
      <h2 style={headerStyle}>17. Contact Us</h2>
      <p style={paragraphStyle}>
        If you have any questions or concerns regarding these terms and conditions, please contact us at:
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

export default Terms;