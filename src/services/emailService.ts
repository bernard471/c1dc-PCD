import nodemailer from 'nodemailer';
import { BlogPostEntry } from '@/lib/contentful';

// Create a transporter once
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

// Base URL for the application
const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://your-app-url.com';

export interface EmailResult {
  success: boolean;
  error?: string;
}

/**
 * Send welcome email to new subscriber
 */
export async function sendWelcomeEmail(email: string, unsubscribeToken: string): Promise<EmailResult> {
  try {
    const mailOptions = {
      from: process.env.SMTP_EMAIL,
      to: email,
      subject: 'Welcome to Our Newsletter!',
      html: generateWelcomeEmail(unsubscribeToken),
    };

    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error('Error sending welcome email:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to send welcome email' 
    };
  }
}

/**
 * Send reactivation email to subscriber
 */
export async function sendReactivationEmail(email: string, unsubscribeToken: string): Promise<EmailResult> {
  try {
    const mailOptions = {
      from: process.env.SMTP_EMAIL,
      to: email,
      subject: 'Your Newsletter Subscription Has Been Reactivated',
      html: generateReactivationEmail(unsubscribeToken),
    };

    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error('Error sending reactivation email:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to send reactivation email' 
    };
  }
}

/**
 * Send admin notification about new subscriber
 */
export async function sendAdminNotification(email: string): Promise<EmailResult> {
  try {
    const mailOptions = {
      from: process.env.SMTP_EMAIL,
      to: process.env.SMTP_EMAIL, // Send to admin
      subject: 'New Newsletter Subscription',
      html: `
        <h3>New Newsletter Subscription</h3>
        <p><strong>Email:</strong> ${email}</p>
        <p>This user has subscribed to your newsletter.</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error('Error sending admin notification:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to send admin notification' 
    };
  }
}

/**
 * Send new posts notification to subscriber
 */
export async function sendNewPostsEmail(
  email: string, 
  posts: BlogPostEntry[], 
  unsubscribeToken: string
): Promise<EmailResult> {
  try {
    const mailOptions = {
      from: process.env.SMTP_EMAIL,
      to: email,
      subject: `New Blog Post${posts.length > 1 ? 's' : ''}: ${posts[0].fields.title}${posts.length > 1 ? ' and more' : ''}`,
      html: generateNewPostsEmail(posts, unsubscribeToken),
    };

    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error('Error sending new posts email:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to send new posts email' 
    };
  }
}

/**
 * Generate HTML for welcome email
 */
function generateWelcomeEmail(unsubscribeToken: string): string {
  return `
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
          
          <center>
            <a href="https://cyber1defense.com" class="button">Visit Our Website</a>
          </center>
          
          <p>If you didn't subscribe to our newsletter, please disregard this email or <a href="mailto:${process.env.SMTP_EMAIL}" style="color: #3b82f6; text-decoration: none;">contact us</a>.</p>
          
          <div class="unsubscribe">
            <p>If you wish to unsubscribe at any time, <a href="${appUrl}/api/newsletter/unsubscribe?token=${unsubscribeToken}">click here</a>.</p>
          </div>
        </div>
        <div class="footer">
          <p>© ${new Date().getFullYear()} C1DC PCD. All rights reserved.</p>
          <p>Created by <a href="https://cyber1defense.com" style="color: #3b82f6; text-decoration: none;">Cyber<span style="color: #f97316;">1</span>defense</a></p>
        </div>
      </div>
    </body>
    </html>
  `;
}

/**
 * Generate HTML for reactivation email
 */
function generateReactivationEmail(unsubscribeToken: string): string {
  return `
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
            <p>If you wish to unsubscribe at any time, <a href="${appUrl}/api/newsletter/unsubscribe?token=${unsubscribeToken}">click here</a>.</p>
          </div>
        </div>
        <div class="footer">
          <p>© ${new Date().getFullYear()} C1DC PCD. All rights reserved.</p>
          <p>Created by <a href="https://cyber1defense.com" style="color: #3b82f6; text-decoration: none;">Cyber<span style="color: #f97316;">1</span>defense</a></p>
        </div>
      </div>
    </body>
    </html>
  `;
}

/**
 * Generate HTML for new posts email
 */
function generateNewPostsEmail(posts: BlogPostEntry[], unsubscribeToken: string): string {
  const postsHtml = posts.map(post => {
    const imageUrl = post.fields.thumbnail?.fields?.file?.url 
      ? `https:${post.fields.thumbnail.fields.file.url}` 
      : null;
    
    // Extract a short excerpt from the content
    let excerpt = '';
    try {
      const firstContent = post.fields.content?.content?.[0]?.content?.[0];
      if (firstContent && firstContent.nodeType === 'text' && 'value' in firstContent) {
        excerpt = (firstContent.value as string).substring(0, 150) + '...';
      }
        } catch (e) {
        console.error('Error extracting excerpt:', e);
        excerpt = 'Read the full article on our website...';
        }
    
    return `
      <div style="margin-bottom: 30px; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
        ${imageUrl ? `
          <div style="height: 200px; overflow: hidden;">
            <img src="${imageUrl}" alt="${post.fields.title}" style="width: 100%; height: 100%; object-fit: cover;">
          </div>
        ` : ''}
        <div style="padding: 20px;">
          <h2 style="margin-top: 0; margin-bottom: 10px; color: #1f2937; font-size: 20px;">${post.fields.title}</h2>
          <p style="margin-bottom: 15px; color: #4b5563;">
            ${excerpt}
          </p>
          <a href="${appUrl}/blogs/${post.fields.slug}" style="display: inline-block; background-color: #2563eb; color: white; padding: 8px 16px; border-radius: 4px; text-decoration: none; font-weight: 500;">Read Article</a>
        </div>
      </div>
    `;
  }).join('');
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Blog Posts from PCD System</title>
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
        .posts-container {
          margin-top: 25px;
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
          <h1>New Blog Posts Just Published!</h1>
          <p>We've published ${posts.length > 1 ? 'some new articles' : 'a new article'} that might interest you:</p>
          
          <div class="posts-container">
            ${postsHtml}
          </div>
          
          <p>Thank you for subscribing to our newsletter. We hope you enjoy the content!</p>
          
          <div class="unsubscribe">
            <p>If you wish to unsubscribe at any time, <a href="${appUrl}/api/newsletter/unsubscribe?token=${unsubscribeToken}">click here</a>.</p>
          </div>
        </div>
        <div class="footer">
          <p>© ${new Date().getFullYear()} C1DC PCD. All rights reserved.</p>
          <p>Created by <a href="https://cyber1defense.com" style="color: #3b82f6; text-decoration: none;">Cyber<span style="color: #f97316;">1</span>defense</a></p>
        </div>
      </div>
    </body>
    </html>
  `;
}
