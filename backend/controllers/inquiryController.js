import { sendInquiryEmailNotification, generateInquiryWhatsAppUrl, PRIMARY_EMAIL, PRIMARY_PHONE, PRIMARY_WHATSAPP } from '../utils/notificationService.js';

/**
 * Handle new customer inquiry:
 * 1. Generates WhatsApp trigger URL for 8128374219
 * 2. Sends notification email to welcomefurniture.co@gmail.com
 */
const sendInquiry = async (req, res) => {
    try {
        const { name, phone, email, message, type, details } = req.body;

        if (!name && !phone && !email) {
            return res.json({ success: false, message: 'Please provide your contact details.' });
        }

        // Generate WhatsApp trigger URL
        const whatsAppUrl = generateInquiryWhatsAppUrl({ name, phone, email, message, type, details });

        // Trigger email notification to primary email
        sendInquiryEmailNotification({ name, phone, email, message, type, details }).catch((err) => {
            console.error('Async inquiry email error:', err.message);
        });

        res.json({
            success: true,
            message: 'Inquiry received successfully! WhatsApp and Email notifications triggered.',
            whatsAppUrl,
            primaryContact: {
                email: PRIMARY_EMAIL,
                phone: PRIMARY_PHONE,
                whatsApp: PRIMARY_WHATSAPP
            }
        });

    } catch (error) {
        console.error('Inquiry error:', error);
        res.json({ success: false, message: error.message });
    }
};

export { sendInquiry };
