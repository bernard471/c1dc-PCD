import { NextResponse } from 'next/server';
import { fetchNewBlogPosts } from '@/lib/contentful';
import connectDB from '@/dbConfig/mongodb';
import Subscriber from '@/models/subscriberModel';
import nodemailer from 'nodemailer';
import { BlogPostEntry } from '@/lib/contentful';

// This header is required to ensure only Vercel cron jobs can trigger this endpoint
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request: Request) {
  try {
    // Verify the request is from Vercel Cron
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET_KEY}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    
    // Get the timestamp for 1 hour ago
    const oneHourAgo = new Date();
    oneHourAgo.setHours(oneHourAgo.getHours() - 1);
    
    // Fetch new blog posts from Contentful
    const newPosts = await fetchNewBlogPosts(oneHourAgo);
    
    if (newPosts.length === 0) {
      return NextResponse.json({ 
        success: true, 
        message: 'No new posts found' 
      });
    }
    
    // Get all active subscribers
    const activeSubscribers = await Subscriber.find({ isActive: true });
    
    if (activeSubscribers.length === 0) {
      return NextResponse.json({ 
        success: true, 
        message: 'No active subscribers found' 
      });
    }
    
    // Create email transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });
    
    // Send notification emails
    const emailPromises = activeSubscribers.map(async (subscriber) => {
      const mailOptions = {
        from: process.env.SMTP_EMAIL,
        to: subscriber.email,
        subject: `New Blog Post${newPosts.length > 1 ? 's' : ''}: ${newPosts[0].fields.title}${newPosts.length > 1 ? ' and more' : ''}`,
        html: generateNewPostsEmail(newPosts, subscriber.unsubscribeToken),
      };
      
      await transporter.sendMail(mailOptions);
      
      // Update last notified timestamp
      subscriber.lastNotifiedAt = new Date();
      await subscriber.save();
    });
    
    await Promise.all(emailPromises);
    
    return NextResponse.json({ 
      success: true, 
      message: `Notified ${activeSubscribers.length} subscribers about ${newPosts.length} new posts` 
    });
  } catch (error) {
    console.error('Error in check-new-posts cron job:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Helper function to generate email HTML for new posts
function generateNewPostsEmail(posts: BlogPostEntry[], unsubscribeToken: string) {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://your-app-url.com';
  
  const postsHtml = posts.map(post => {
    const imageUrl = post.fields.thumbnail?.fields?.file?.url 
      ? `https:${post.fields.thumbnail.fields.file.url}` 
      : null;
    
    // Extract a short excerpt from the content
    let excerpt = '';
    try {
      const textContent = post.fields.content?.content?.[0]?.content?.[0];
      if (textContent && 'value' in textContent) {
        excerpt = textContent.value.substring(0, 150) + '...';
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
          <h1>${posts.length > 1 ? 'New Blog Posts Available' : 'New Blog Post Available'}</h1>
          <p>We've published ${posts.length > 1 ? 'new articles' : 'a new article'} that might interest you:</p>
          
          ${postsHtml}
          
          <p>Thank you for subscribing to our newsletter!</p>
          
          <div class="unsubscribe">
            <p>If you wish to unsubscribe, <a href="${appUrl}/api/newsletter/unsubscribe?token=${unsubscribeToken}">click here</a>.</p>
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
