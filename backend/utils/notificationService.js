import nodemailer from 'nodemailer';

export const PRIMARY_EMAIL = process.env.PRIMARY_EMAIL || 'welcomefurniture.co@gmail.com';
export const PRIMARY_PHONE = process.env.PRIMARY_PHONE || '8128374219';
export const PRIMARY_WHATSAPP = process.env.PRIMARY_WHATSAPP || '918128374219';

/**
 * Creates and returns Nodemailer transporter if configured
 */
const getTransporter = () => {
    const user = process.env.EMAIL_USER || PRIMARY_EMAIL;
    const pass = process.env.EMAIL_PASS;

    if (!user || !pass) {
        return null;
    }

    return nodemailer.createTransport({
        service: 'gmail',
        auth: { user, pass }
    });
};

/**
 * Format Order details into an automated WhatsApp message link
 */
export const generateOrderWhatsAppUrl = (order) => {
    const { _id, items = [], amount, address = {}, paymentMethod, payment } = order;
    const fullName = `${address.firstName || ''} ${address.lastName || ''}`.trim() || 'Valued Customer';
    const phone = address.phone || 'N/A';
    const email = address.email || 'N/A';
    const fullAddress = `${address.street || ''}, ${address.city || ''}, ${address.state || ''} - ${address.zipcode || ''}`.trim();

    let itemsList = '';
    items.forEach((item, idx) => {
        const deptTag = item.department === 'furniture' ? '🛋️' : '🪵';
        const pricing = item.ratePerSqFt ? `(₹${item.ratePerSqFt}/sqft)` : '';
        itemsList += `\n${idx + 1}. ${deptTag} *${item.name}* x ${item.quantity || 1} - ₹${Number(item.price).toLocaleString()} ${pricing}`;
    });

    const text = 
`🔔 *NEW ORDER RECEIVED - WELCOME ENTERPRISE*
━━━━━━━━━━━━━━━━━━━━━━━━━
📦 *Order ID:* ${_id ? String(_id).slice(-8).toUpperCase() : 'PENDING'}
👤 *Customer:* ${fullName}
📞 *Phone:* ${phone}
✉️ *Email:* ${email}
📍 *Delivery Address:* ${fullAddress}
💳 *Payment Mode:* ${paymentMethod || 'COD'} (${payment ? 'PAID ✅' : 'PENDING'})
💰 *Total Amount:* ₹${Number(amount || 0).toLocaleString()}

🛒 *ITEMS ORDERED:*${itemsList}

━━━━━━━━━━━━━━━━━━━━━━━━━
ℹ️ *Fulfillment Notes:*
• Furniture: Handcrafted On-Demand (Min. 10 Days)
• Hardware: Ready Stock Site Dispatch
_Notification dispatched to primary WhatsApp: +91 81283 74219_`;

    return `https://wa.me/${PRIMARY_WHATSAPP}?text=${encodeURIComponent(text)}`;
};

/**
 * Format Inquiry details into WhatsApp message link
 */
export const generateInquiryWhatsAppUrl = ({ name, phone, email, message, type = 'General Inquiry', details = '' }) => {
    const text = 
`💬 *NEW INQUIRY - WELCOME ENTERPRISE*
━━━━━━━━━━━━━━━━━━━━━━━━━
📌 *Type:* ${type}
👤 *Name:* ${name || 'N/A'}
📞 *Phone:* ${phone || 'N/A'}
✉️ *Email:* ${email || 'N/A'}

📝 *Message / Requirement:*
${message || 'Customer requested consultation.'}
${details ? `\n🔍 *Additional Details:*\n${details}\n` : ''}
━━━━━━━━━━━━━━━━━━━━━━━━━
_Sent to primary contact: ${PRIMARY_EMAIL} • +91 81283 74219_`;

    return `https://wa.me/${PRIMARY_WHATSAPP}?text=${encodeURIComponent(text)}`;
};

/**
 * Send Order Email to welcomefurniture.co@gmail.com
 */
export const sendOrderEmailNotification = async (order) => {
    try {
        const { _id, items = [], amount, address = {}, paymentMethod, payment, date } = order;
        const fullName = `${address.firstName || ''} ${address.lastName || ''}`.trim() || 'Customer';
        const phone = address.phone || 'N/A';
        const customerEmail = address.email || 'N/A';
        const fullAddress = `${address.street || ''}, ${address.city || ''}, ${address.state || ''} - ${address.zipcode || ''}`.trim();
        const orderDate = new Date(date || Date.now()).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

        console.log(`[ORDER NOTIFICATION] New order placed: ID=${_id}, Total=₹${amount}, Customer=${fullName} (${phone})`);
        console.log(`[ORDER NOTIFICATION] Primary notification targets: WhatsApp=+91 ${PRIMARY_PHONE}, Email=${PRIMARY_EMAIL}`);

        const transporter = getTransporter();
        if (!transporter) {
            console.warn(`[EMAIL NOTICE] Nodemailer EMAIL_PASS not set in backend/.env. Email to ${PRIMARY_EMAIL} logged to console. Provide Gmail App Password in backend/.env to activate live SMTP delivery.`);
            return { success: false, message: 'EMAIL_PASS not configured' };
        }

        const itemsRows = items.map((item, idx) => `
            <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 10px; font-size: 13px;">${idx + 1}</td>
                <td style="padding: 10px; font-size: 13px;">
                    <strong>${item.name}</strong><br/>
                    <span style="color: #666; font-size: 11px;">Department: ${item.department === 'furniture' ? '🛋️ Furniture' : '🪵 Hardware'} ${item.category ? `• ${item.category}` : ''}</span>
                </td>
                <td style="padding: 10px; font-size: 13px; text-align: center;">${item.quantity || 1}</td>
                <td style="padding: 10px; font-size: 13px; text-align: right; font-weight: bold;">₹${Number(item.price).toLocaleString()}</td>
            </tr>
        `).join('');

        const mailOptions = {
            from: `"Welcome Enterprise" <${process.env.EMAIL_USER || PRIMARY_EMAIL}>`,
            to: PRIMARY_EMAIL,
            replyTo: customerEmail,
            subject: `🛒 New Order: ₹${Number(amount).toLocaleString()} from ${fullName} [${String(_id).slice(-6).toUpperCase()}]`,
            html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 650px; margin: auto; padding: 25px; border: 1px solid #e0d5c1; border-radius: 12px; background: #ffffff;">
                <div style="background: linear-gradient(135deg, #1c1917, #292524); color: #ffffff; padding: 20px; border-radius: 8px; text-align: center;">
                    <h2 style="margin: 0; font-size: 24px; color: #f59e0b; letter-spacing: 1px;">WELCOME ENTERPRISE</h2>
                    <p style="margin: 5px 0 0; font-size: 13px; color: #d6d3d1;">Furniture & Architectural Hardware • Vadodara</p>
                </div>

                <div style="margin: 20px 0; padding: 15px; background: #fef3c7; border-left: 4px solid #f59e0b; border-radius: 4px;">
                    <h3 style="margin: 0; color: #92400e; font-size: 16px;">New Order Received Successfully!</h3>
                    <p style="margin: 5px 0 0; color: #78350f; font-size: 13px;">Date: ${orderDate} IST</p>
                </div>

                <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                    <tr>
                        <td style="width: 50%; vertical-align: top; padding-right: 10px;">
                            <h4 style="margin: 0 0 8px; color: #444; font-size: 14px; text-transform: uppercase;">Customer Details</h4>
                            <p style="margin: 0; font-size: 13px; line-height: 1.5; color: #333;">
                                <strong>${fullName}</strong><br/>
                                📞 <a href="tel:${phone}" style="color: #059669; text-decoration: none;">${phone}</a><br/>
                                ✉️ <a href="mailto:${customerEmail}" style="color: #2563eb; text-decoration: none;">${customerEmail}</a>
                            </p>
                        </td>
                        <td style="width: 50%; vertical-align: top; padding-left: 10px;">
                            <h4 style="margin: 0 0 8px; color: #444; font-size: 14px; text-transform: uppercase;">Delivery Address</h4>
                            <p style="margin: 0; font-size: 13px; line-height: 1.5; color: #333;">
                                ${fullAddress}<br/>
                                <strong>Payment:</strong> ${paymentMethod} (${payment ? 'PAID ✅' : 'PENDING'})
                            </p>
                        </td>
                    </tr>
                </table>

                <h4 style="margin: 20px 0 10px; color: #444; font-size: 14px; text-transform: uppercase; border-bottom: 2px solid #eee; padding-bottom: 6px;">Order Items</h4>
                <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                    <thead>
                        <tr style="background: #f8fafc; text-align: left; font-size: 12px; color: #64748b;">
                            <th style="padding: 8px;">#</th>
                            <th style="padding: 8px;">Item</th>
                            <th style="padding: 8px; text-align: center;">Qty</th>
                            <th style="padding: 8px; text-align: right;">Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${itemsRows}
                    </tbody>
                    <tfoot>
                        <tr style="border-top: 2px solid #1c1917;">
                            <td colspan="3" style="padding: 12px 10px; font-weight: bold; font-size: 15px; text-align: right;">Total Amount:</td>
                            <td style="padding: 12px 10px; font-weight: bold; font-size: 16px; color: #059669; text-align: right;">₹${Number(amount).toLocaleString()}</td>
                        </tr>
                    </tfoot>
                </table>

                <div style="background: #f3f4f6; padding: 15px; border-radius: 8px; font-size: 12px; color: #4b5563; line-height: 1.5;">
                    <strong>Fulfillment Standard:</strong><br/>
                    • <strong>Furniture:</strong> 100% On-Demand Custom Build (Min. 10 - 15 Days). Backed by 30+ Years of Experience.<br/>
                    • <strong>Hardware:</strong> Ready-Stock Dispatch for Plywood, Sunmica & Hardware Fittings.<br/>
                    • Quick WhatsApp dispatch link: <a href="https://wa.me/${phone}" style="color: #059669; font-weight: bold;">Message Customer on WhatsApp</a>
                </div>

                <div style="margin-top: 25px; text-align: center;">
                    <a href="http://localhost:5174/orders" style="background: #1c1917; color: #ffffff; padding: 10px 22px; border-radius: 6px; text-decoration: none; font-size: 13px; font-weight: bold; display: inline-block;">
                        Open Admin Orders Dashboard
                    </a>
                </div>
            </div>
            `
        };

        const result = await transporter.sendMail(mailOptions);
        console.log(`[ORDER NOTIFICATION] Email sent successfully to ${PRIMARY_EMAIL}: ${result.messageId}`);
        return { success: true, messageId: result.messageId };
    } catch (err) {
        console.error('[ORDER NOTIFICATION] Failed to send email:', err.message);
        return { success: false, error: err.message };
    }
};

/**
 * Send Inquiry Email to welcomefurniture.co@gmail.com
 */
export const sendInquiryEmailNotification = async ({ name, phone, email, message, type = 'General Inquiry', details = '' }) => {
    try {
        console.log(`[INQUIRY NOTIFICATION] New inquiry from ${name} (${phone}, ${email}) - Type: ${type}`);
        console.log(`[INQUIRY NOTIFICATION] Notification target: Email=${PRIMARY_EMAIL}, WhatsApp=+91 ${PRIMARY_PHONE}`);

        const transporter = getTransporter();
        if (!transporter) {
            console.warn(`[EMAIL NOTICE] Nodemailer EMAIL_PASS not set. Inquiry recorded for ${PRIMARY_EMAIL}.`);
            return { success: false, message: 'EMAIL_PASS not configured' };
        }

        const mailOptions = {
            from: `"Welcome Enterprise Inquiry" <${process.env.EMAIL_USER || PRIMARY_EMAIL}>`,
            to: PRIMARY_EMAIL,
            replyTo: email || PRIMARY_EMAIL,
            subject: `💬 New Inquiry from ${name || 'Customer'}: ${type}`,
            html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: auto; padding: 25px; border: 1px solid #e0d5c1; border-radius: 12px; background: #ffffff;">
                <div style="background: #1c1917; color: #ffffff; padding: 18px; border-radius: 8px; text-align: center;">
                    <h2 style="margin: 0; font-size: 22px; color: #f59e0b;">WELCOME ENTERPRISE</h2>
                    <p style="margin: 4px 0 0; font-size: 12px; color: #d6d3d1;">Customer Inquiry Notification</p>
                </div>

                <div style="margin: 20px 0; padding: 15px; background: #ecfdf5; border-left: 4px solid #059669; border-radius: 4px;">
                    <h3 style="margin: 0; color: #065f46; font-size: 15px;">New Customer Inquiry: ${type}</h3>
                    <p style="margin: 4px 0 0; color: #047857; font-size: 12px;">Triggered on WhatsApp & Email</p>
                </div>

                <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 13px;">
                    <tr>
                        <td style="padding: 8px 0; color: #666; width: 30%;"><strong>Customer Name:</strong></td>
                        <td style="padding: 8px 0; color: #111;"><strong>${name || 'N/A'}</strong></td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0; color: #666;"><strong>Phone:</strong></td>
                        <td style="padding: 8px 0; color: #111;">
                            <a href="tel:${phone}" style="color: #059669; font-weight: bold; text-decoration: none;">${phone || 'N/A'}</a>
                            ${phone ? ` • <a href="https://wa.me/${phone}" style="color: #059669; text-decoration: underline;">WhatsApp Direct</a>` : ''}
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0; color: #666;"><strong>Email:</strong></td>
                        <td style="padding: 8px 0; color: #111;">
                            <a href="mailto:${email}" style="color: #2563eb; text-decoration: none;">${email || 'N/A'}</a>
                        </td>
                    </tr>
                </table>

                <div style="background: #f8fafc; border: 1px solid #e2e8f0; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                    <h4 style="margin: 0 0 8px; color: #334155; font-size: 13px; text-transform: uppercase;">Inquiry Message:</h4>
                    <p style="margin: 0; color: #1e293b; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${message || 'No specific message.'}</p>
                    ${details ? `<div style="margin-top: 10px; padding-top: 10px; border-top: 1px dashed #cbd5e1; font-size: 12px; color: #475569;">${details}</div>` : ''}
                </div>

                <div style="text-align: center; margin-top: 20px;">
                    <a href="https://wa.me/${phone ? phone.replace(/[^0-9]/g, '') : PRIMARY_WHATSAPP}" style="background: #059669; color: #ffffff; padding: 10px 22px; border-radius: 6px; text-decoration: none; font-size: 13px; font-weight: bold; display: inline-block;">
                        Reply on WhatsApp
                    </a>
                </div>
            </div>
            `
        };

        const result = await transporter.sendMail(mailOptions);
        console.log(`[INQUIRY NOTIFICATION] Email sent successfully to ${PRIMARY_EMAIL}: ${result.messageId}`);
        return { success: true, messageId: result.messageId };
    } catch (err) {
        console.error('[INQUIRY NOTIFICATION] Failed to send email:', err.message);
        return { success: false, error: err.message };
    }
};
