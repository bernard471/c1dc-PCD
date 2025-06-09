import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Create transporter using your SMTP credentials
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail', // Since you're using a Gmail address
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });
};

export async function POST(request: NextRequest) {
  try {
    const meetingData = await request.json();
    
    // Validate required fields
    const requiredFields = ['organizationName', 'contactPerson', 'email', 'preferredDate', 'preferredTime'];
    for (const field of requiredFields) {
      if (!meetingData[field]) {
        return NextResponse.json(
          { error: `${field} is required` },
          { status: 400 }
        );
      }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(meetingData.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    const transporter = createTransporter();
    const meetingId = `MTG-${Date.now()}`;

    // Format date for better readability
    const formatDate = (dateString: string) => {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    };

    // Format time for better readability
    const formatTime = (timeString: string) => {
      const [hours, minutes] = timeString.split(':');
      const date = new Date();
      date.setHours(parseInt(hours), parseInt(minutes));
      return date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      });
    };

    // Email to your team (notification)
    const adminEmailOptions = {
      from: process.env.SMTP_EMAIL,
      to: process.env.SMTP_EMAIL, // Send to your own email
      subject: `🚨 New Training Meeting Request - ${meetingData.organizationName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div style="background-color: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #2563eb; margin: 0; font-size: 24px;">🛡️ New Training Meeting Request</h1>
              <p style="color: #6b7280; margin: 5px 0 0 0;">Meeting ID: ${meetingId}</p>
            </div>
            
            <div style="background-color: #eff6ff; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h2 style="color: #1e40af; margin: 0 0 15px 0; font-size: 18px;">Organization Details</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #374151; width: 40%;">Organization:</td>
                  <td style="padding: 8px 0; color: #6b7280;">${meetingData.organizationName}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #374151;">Contact Person:</td>
                  <td style="padding: 8px 0; color: #6b7280;">${meetingData.contactPerson}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #374151;">Email:</td>
                  <td style="padding: 8px 0; color: #6b7280;"><a href="mailto:${meetingData.email}" style="color: #2563eb; text-decoration: none;">${meetingData.email}</a></td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #374151;">Phone:</td>
                  <td style="padding: 8px 0; color: #6b7280;">${meetingData.phone || 'Not provided'}</td>
                </tr>
              </table>
            </div>

            <div style="background-color: #f0fdf4; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h2 style="color: #166534; margin: 0 0 15px 0; font-size: 18px;">Meeting Details</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #374151; width: 40%;">Preferred Date:</td>
                  <td style="padding: 8px 0; color: #6b7280;">${formatDate(meetingData.preferredDate)}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #374151;">Preferred Time:</td>
                  <td style="padding: 8px 0; color: #6b7280;">${formatTime(meetingData.preferredTime)}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #374151;">Training Type:</td>
                  <td style="padding: 8px 0; color: #6b7280;">${meetingData.trainingType.charAt(0).toUpperCase() + meetingData.trainingType.slice(1)} Training</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #374151;">Number of Employees:</td>
                  <td style="padding: 8px 0; color: #6b7280;">${meetingData.numberOfEmployees || 'Not specified'}</td>
                </tr>
              </table>
            </div>

            ${meetingData.additionalNotes ? `
            <div style="background-color: #fef3c7; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h2 style="color: #92400e; margin: 0 0 15px 0; font-size: 18px;">Additional Notes</h2>
              <p style="color: #6b7280; margin: 0; line-height: 1.6;">${meetingData.additionalNotes}</p>
            </div>
            ` : ''}

            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
              <p style="color: #6b7280; margin: 0; font-size: 14px;">
                Please respond to this meeting request within 24 hours.
              </p>
            </div>
          </div>
        </div>
      `
    };

    // Confirmation email to the client
    const clientEmailOptions = {
      from: process.env.SMTP_EMAIL,
      to: meetingData.email,
      subject: `✅ Meeting Request Confirmation - Personal Cyber Defense Training`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div style="background-color: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #059669; margin: 0; font-size: 24px;">🛡️ Thank You for Your Interest!</h1>
              <p style="color: #6b7280; margin: 5px 0 0 0;">Meeting Request Confirmation</p>
            </div>
            
            <div style="background-color: #ecfdf5; padding: 20px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #10b981;">
              <p style="color: #374151; margin: 0; font-size: 16px; line-height: 1.6;">
                Dear <strong>${meetingData.contactPerson}</strong>,
              </p>
              <p style="color: #374151; margin: 15px 0 0 0; font-size: 16px; line-height: 1.6;">
                We have successfully received your request to schedule a personal cyber defense training meeting for <strong>${meetingData.organizationName}</strong>.
              </p>
            </div>

            <div style="background-color: #eff6ff; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h2 style="color: #1e40af; margin: 0 0 15px 0; font-size: 18px;">📅 Your Requested Meeting Details</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 10px 0; font-weight: bold; color: #374151; width: 30%;">Date:</td>
                  <td style="padding: 10px 0; color: #6b7280; font-size: 16px;">${formatDate(meetingData.preferredDate)}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; font-weight: bold; color: #374151;">Time:</td>
                  <td style="padding: 10px 0; color: #6b7280; font-size: 16px;">${formatTime(meetingData.preferredTime)}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; font-weight: bold; color: #374151;">Training Type:</td>
                  <td style="padding: 10px 0; color: #6b7280; font-size: 16px;">${meetingData.trainingType.charAt(0).toUpperCase() + meetingData.trainingType.slice(1)} Training</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; font-weight: bold; color: #374151;">Reference ID:</td>
                  <td style="padding: 10px 0; color: #6b7280; font-size: 16px; font-family: monospace;">${meetingId}</td>
                </tr>
              </table>
            </div>

            <div style="background-color: #fef3c7; padding: 20px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #f59e0b;">
              <h3 style="color: #92400e; margin: 0 0 10px 0; font-size: 16px;">⏰ What Happens Next?</h3>
              <ul style="color: #6b7280; margin: 0; padding-left: 20px; line-height: 1.8;">
                <li>Our team will review your request within <strong>24 hours</strong></li>
                <li>We'll contact you to confirm the meeting details</li>
                <li>We'll discuss your organization's specific cybersecurity training needs</li>
                <li>We'll provide a customized training proposal</li>
              </ul>
            </div>

            <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h3 style="color: #374151; margin: 0 0 10px 0; font-size: 16px;">📞 Need Immediate Assistance?</h3>
              <p style="color: #6b7280; margin: 0; line-height: 1.6;">
                If you have any urgent questions or need to modify your request, please contact us:
              </p>
              <p style="color: #6b7280; margin: 10px 0 0 0;">
                📧 Email: <a href="mailto:${process.env.SMTP_EMAIL}" style="color: #2563eb; text-decoration: none;">${process.env.SMTP_EMAIL}</a><br>
                📱 WhatsApp: <a href="https://wa.me/233552373603" style="color: #2563eb; text-decoration: none;">+233 55 237 3603</a>
              </p>
            </div>

            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
              <p style="color: #6b7280; margin: 0; font-size: 14px;">
                Thank you for choosing PCD System for your cybersecurity training needs.
              </p>
              <p style="color: #6b7280; margin: 5px 0 0 0; font-size: 14px;">
                <strong>PCD System Team</strong>
              </p>
            </div>
          </div>
        </div>
      `
    };

    // Send both emails
    await Promise.all([
      transporter.sendMail(adminEmailOptions),
      transporter.sendMail(clientEmailOptions)
    ]);

    return NextResponse.json(
      { 
        success: true, 
        message: 'Meeting request submitted successfully',
        meetingId: meetingId
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error processing meeting request:', error);
    
    // Check if it's an email-related error
    if (error instanceof Error && error.message.includes('Invalid login')) {
      return NextResponse.json(
        { error: 'Email configuration error. Please contact support.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to process meeting request. Please try again.' },
      { status: 500 }
    );
  }
}
