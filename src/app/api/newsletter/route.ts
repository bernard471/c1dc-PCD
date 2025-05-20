import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import crypto from 'crypto';
import connectDB from '@/dbConfig/mongodb';
import Subscriber from '@/models/subscriberModel';

export async function POST(request: Request) {
  try {
    await connectDB();
    
    const body = await request.json();
    const { email } = body;

    // Validate email
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      );
    }

    // Check if email already exists
    const existingSubscriber = await Subscriber.findOne({ email });
    
    if (existingSubscriber) {
      // If subscriber exists but is inactive, reactivate
      if (!existingSubscriber.isActive) {
        existingSubscriber.isActive = true;
        await existingSubscriber.save();
        
        // Send reactivation email
        await sendReactivationEmail(email, existingSubscriber.unsubscribeToken);
        
        return NextResponse.json({ 
          success: true,
          message: 'Your subscription has been reactivated'
        });
      }
      
      // Already subscribed and active
      return NextResponse.json({ 
        success: true,
        message: 'You are already subscribed to our newsletter'
      });
    }

    // Generate unique unsubscribe token
    const unsubscribeToken = crypto.randomBytes(32).toString('hex');
    
    // Create new subscriber - THIS IS MISSING IN YOUR CODE
    const newSubscriber = new Subscriber({
      email,
      unsubscribeToken,
      isActive: true,
      subscribedAt: new Date()
    });

    
    // Save the subscriber to the database
    await newSubscriber.save();

    // Create a transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    // Email content for admin notification
    const adminMailOptions = {
      from: process.env.SMTP_EMAIL,
      to: process.env.SMTP_EMAIL, // Send to yourself/admin
      subject: 'New Newsletter Subscription',
      html: `
        <h3>New Newsletter Subscription</h3>
        <p><strong>Email:</strong> ${email}</p>
        <p>This user has subscribed to your newsletter.</p>
      `,
    };

    // Email content for subscriber confirmation
    const subscriberMailOptions = {
        from: process.env.SMTP_EMAIL,
        to: email,
        subject: 'Welcome to Our Newsletter!',
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Welcome to PCD System Newsletter</title>
            <style>
              body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                line-height: 1.6;
                color: #333;
                background-color: #f9f9f9;
                margin: 0;
                padding: 0;
              }
              .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #ffffff;
                border-radius: 8px;
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
              }
              .header {
                text-align: center;
                padding: 20px 0;
                border-bottom: 1px solid #eaeaea;
              }
              .logo {
                color: #3b82f6;
                font-size: 24px;
                font-weight: bold;
                display: flex;
                align-items: center;
                justify-content: center;
              }
              .content {
                padding: 30px 20px;
              }
              h1 {
                color: #3b82f6;
                margin-top: 0;
                font-size: 24px;
              }
              p {
                margin: 15px 0;
                font-size: 16px;
              }
              .footer {
                text-align: center;
                padding: 20px;
                font-size: 14px;
                color: #666;
                border-top: 1px solid #eaeaea;
              }
              .highlight {
                background: linear-gradient(to right, #3b82f6, #4f46e5);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
                font-weight: bold;
              }
              .button {
                display: inline-block;
                background: linear-gradient(to right, #3b82f6, #4f46e5);
                color: white;
                text-decoration: none;
                font-color: #fff;
                padding: 12px 25px;
                border-radius: 6px;
                font-weight: bold;
                margin: 20px 0;
              }
              .tips {
                background-color: #f0f7ff;
                border-left: 4px solid #3b82f6;
                padding: 15px;
                margin: 20px 0;
                border-radius: 0 6px 6px 0;
              }
              .unsubscribe {
                color: #6b7280;
                font-size: 12px;
                text-align: center;
                margin-top: 20px;
              }
              .unsubscribe a {
                color: #6b7280;
                text-decoration: underline;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <div class="logo">
                  <span>🛡️ PCD System</span>
                </div>
              </div>
              <div class="content">
                <h1>Thank You for Subscribing!</h1>
                <p>You've successfully subscribed to the <span class="highlight">PCD System newsletter</span>.</p>
                
                <div class="tips">
                  <p><strong>What to expect:</strong></p>
                  <ul>
                    <li>Latest cybersecurity tips and best practices</li>
                    <li>Updates on emerging threats and vulnerabilities</li>
                    <li>Exclusive security resources and guides</li>
                    <li>Product updates and new features</li>
                    <li>New blog post notifications</li>
                  </ul>
                </div>
                
                <p>Stay ahead of threats and secure your online presence with our expert guidance.</p>
                

                
                <p>If you didn't subscribe to our newsletter, please disregard this email or <a href="mailto:${process.env.SMTP_EMAIL}" style="color: #3b82f6; text-decoration: none;">contact us</a>.</p>
                

              </div>

            </div>
          </body>
          </html>
        `,
      };

    // Send emails
    await transporter.sendMail(adminMailOptions);
    await transporter.sendMail(subscriberMailOptions);

    return NextResponse.json({ 
      success: true,
      message: 'Successfully subscribed to the newsletter'
    });
  } catch (error) {
    console.error('Error processing newsletter subscription:', error);
    return NextResponse.json(
      { error: 'Failed to process subscription' },
      { status: 500 }
    );
  }
}

// Helper function to send reactivation email
async function sendReactivationEmail(email: string, unsubscribeToken: string) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.SMTP_EMAIL,
    to: email,
    subject: 'Your Newsletter Subscription Has Been Reactivated',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Subscription Reactivated - PCD System Newsletter</title>
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f9f9f9;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          }
          .header {
            text-align: center;
            padding: 20px 0;
            border-bottom: 1px solid #eaeaea;
          }
          .logo {
            color: #3b82f6;
            font-size: 24px;
            font-weight: bold;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .content {
            padding: 30px 20px;
          }
          h1 {
            color: #3b82f6;
            margin-top: 0;
            font-size: 24px;
          }
          p {
            margin: 15px 0;
            font-size: 16px;
          }
          .footer {
            text-align: center;
            padding: 20px;
            font-size: 14px;
            color: #666;
            border-top: 1px solid #eaeaea;
          }
          .unsubscribe {
            color: #6b7280;
            font-size: 12px;
            text-align: center;
            margin-top: 20px;
          }
          .unsubscribe a {
            color: #6b7280;
            text-decoration: underline;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">
              <span>🛡️ PCD System</span>
            </div>
          </div>
          <div class="content">
            <h1>Welcome Back!</h1>
            <p>Your subscription to the PCD System newsletter has been reactivated.</p>
            <p>You'll now receive updates about new blog posts, security tips, and more.</p>
            <p>Thank you for your continued interest in our content!</p>
            
            <div class="unsubscribe">
              <p>If you wish to unsubscribe at any time, <a href="${process.env.NEXT_PUBLIC_APP_URL}/api/newsletter/unsubscribe?token=${unsubscribeToken}">click here</a>.</p>
            </div>
          </div>
          <div class="footer">
            <p>© ${new Date().getFullYear()} C1DC PCD. All rights reserved.</p>
            <p>Created by <a href="https://cyber1defense.com" style="color: #3b82f6; text-decoration: none;">Cyber<span style="color: #f97316;">1</span>defense</a></p>
          </div>
        </div>
      </body>
      </html>
    `,
  };

  await transporter.sendMail(mailOptions);
}
