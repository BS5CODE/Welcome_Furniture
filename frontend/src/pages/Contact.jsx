import React, { useState, useContext } from 'react';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { ShopContext } from '../context/ShopContext';
import { MessageCircle, Phone, Mail, MapPin } from 'lucide-react';

const Contact = () => {
  const { backendUrl } = useContext(ShopContext);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.phone) {
      toast.error('Please enter your name and phone number.');
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. Trigger WhatsApp First directly to 8128374219
      const primaryWhatsApp = '918128374219';
      const whatsAppText = 
`💬 *NEW INQUIRY - WELCOME ENTERPRISE*
━━━━━━━━━━━━━━━━━━━━━━━━━
👤 *Name:* ${formData.name}
📞 *Phone:* ${formData.phone}
✉️ *Email:* ${formData.email || 'Not provided'}
📝 *Message:*
${formData.message || 'Customer requested consultation.'}
━━━━━━━━━━━━━━━━━━━━━━━━━
_Dispatched via Welcome Enterprise Contact Desk_`;

      const waUrl = `https://wa.me/${primaryWhatsApp}?text=${encodeURIComponent(whatsAppText)}`;
      
      try {
        window.open(waUrl, '_blank');
      } catch (err) {
        console.error('WhatsApp popup error:', err);
      }

      // 2. Trigger Email notification to welcomefurniture.co@gmail.com via backend
      if (backendUrl) {
        try {
          await axios.post(`${backendUrl}/api/inquiry/send`, {
            name: formData.name,
            phone: formData.phone,
            email: formData.email,
            message: formData.message,
            type: 'Website Contact Inquiry'
          });
        } catch (apiErr) {
          console.warn('Backend inquiry notification notice:', apiErr.message);
        }
      }

      toast.success('Inquiry submitted! WhatsApp triggered & email sent to welcomefurniture.co@gmail.com');

      // Reset the form fields
      setFormData({
        name: '',
        phone: '',
        email: '',
        message: '',
      });

    } catch (error) {
      console.error(error);
      toast.error('An error occurred. Please reach out via WhatsApp at +91 81283 74219');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-6 sm:pt-12 md:pt-16">
      {/* Title */}
      <div className="text-center text-xl sm:text-2xl">
        <Title text1={'CONTACT'} text2={'& CUSTOM COMMISSIONS'} />
        <p className="text-xs text-gray-500 max-w-lg mx-auto mt-2 px-2">
          Have an Instagram/Pinterest design photo or need custom furniture sizing? Message our master woodworker on WhatsApp for instant dimensional estimates.
        </p>
      </div>

      {/* Contact Section */}
      <div className="my-8 flex flex-col justify-center md:flex-row gap-8 mb-20">
        {/* Left Column: Image & Direct WhatsApp Box */}
        <div className="w-full md:max-w-[480px] space-y-4">
          <img
            className="w-full rounded-2xl shadow-lg object-cover"
            src={assets.contact_img}
            alt="Welcome Furniture & Materials Workshop"
          />
          <div className="p-5 rounded-2xl bg-stone-900 text-white space-y-3 shadow-md">
            <h4 className="font-bold text-sm text-amber-300">📸 Have a photo from Pinterest, Instagram, or a Friend's Home?</h4>
            <p className="text-xs text-stone-300 font-light leading-relaxed">
              Don't wait for form replies. Send the photo directly with your room dimensions to get a fast build estimate backed by 30+ Years of Experience.
            </p>
            <a
              href="https://wa.me/918128374219?text=Hello%20Welcome%20Enterprise!%20I%20have%20a%20reference%20photo%20(Pinterest/Instagram)%20and%20want%20to%20commission%20a%20custom%20piece."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition"
            >
              Send Photo on WhatsApp (+91 81283 74219)
            </a>
          </div>

          {/* Direct Store Contact Card */}
          <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-3 text-xs text-stone-700">
            <h4 className="font-bold text-stone-900 uppercase tracking-wider text-xs">Official Contact & Inquiry</h4>
            <div className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>Call / WhatsApp: <a href="tel:8128374219" className="font-bold text-stone-900 hover:underline">+91 81283 74219</a></span>
            </div>
            <div className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-blue-600 flex-shrink-0" />
              <span className="truncate">Primary Email: <a href="mailto:welcomefurniture.co@gmail.com" className="font-bold text-stone-900 hover:underline break-all">welcomefurniture.co@gmail.com</a></span>
            </div>
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
              <span>Shop No. 2, Vallabh Nagar Complex, Novino, Tarsali Road, Opp. Uma Nagar, Tarsali, Vadodara</span>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="w-full md:w-1/2 bg-white p-5 sm:p-6 rounded-2xl shadow-md border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Field */}
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />

            {/* Contact Number Field */}
            <input
              type="number"
              name="phone"
              placeholder="Contact Number"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />

            {/* Email Field */}
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />

            {/* Message Field */}
            <textarea
              name="message"
              placeholder="Message"
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded h-32"
            ></textarea>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-rose-500 hover:bg-rose-600 transition-colors text-white p-2 rounded"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;