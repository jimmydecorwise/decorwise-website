import type { Handler, HandlerEvent, HandlerContext } from '@netlify/functions';
import { Resend } from 'resend';

// Get API key from environment with better error handling
const RESEND_API_KEY = process.env.RESEND_API_KEY;
if (!RESEND_API_KEY) {
  console.error('ERROR: RESEND_API_KEY environment variable is not set');
  // Don't throw here as it would prevent the function from being deployed
}

const resend = new Resend(RESEND_API_KEY);

interface EmailPayload {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

export const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  // Define response headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json',
  };

  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers,
      body: '',
    };
  }

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  }

  try {
    if (!event.body) {
return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Request body is required' }),
      };
    }

    const { name, email, phone, message } = JSON.parse(event.body) as EmailPayload;

    if (!name || !email || !message) {
return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Missing required fields' }),
      };
    }

    if (!RESEND_API_KEY) {
      throw new Error('Resend API key is not configured');
    }

    try {
      console.log('Attempting to send email with Resend...');
      
      // Ensure the sender email is verified in your Resend account
      const fromEmail = 'noreply@decorwisepainting.com'; // Must be a verified domain in Resend
      const toEmail = 'jimmy@decorwisepainting.com'; // Must be a verified email in test mode
      
      console.log('Email details:', { fromEmail, toEmail });
      
      // Send email using Resend
      const { data, error } = await resend.emails.send({
        from: fromEmail,
        to: toEmail,
        subject: `New Contact Form Submission from ${name}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        `,
      });

      if (error) {
        console.error('Resend API error:', JSON.stringify(error, null, 2));
        return {
          statusCode: 500,
          headers,
          body: JSON.stringify({ 
            error: 'Failed to send email', 
            details: error,
            message: error.message || 'Unknown error',
            name: error.name || 'Error'
          })
        };
      }
      
      console.log('Email sent successfully:', data);

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ success: true, data }),
      };
    } catch (error) {
      console.error('Error processing request:', error);
console.error('Unexpected error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ 
          error: 'Internal Server Error',
          message: errorMessage
        }),
      };
    }
  } catch (error) {
    console.error('Error processing request:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Internal Server Error',
        details: error instanceof Error ? error.message : 'Unknown error' 
      }),
    };
  }
};
