import { NextResponse } from 'next/server';

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

// Response headers with JSON content type
const jsonHeaders = {
  ...corsHeaders,
  'Content-Type': 'application/json',
};

// Define response data type
interface JsonResponseData {
  [key: string]: unknown;
  error?: string;
  details?: string;
  success?: boolean;
  message?: string;
  id?: string;
}

// Helper function to create JSON responses
const jsonResponse = (data: JsonResponseData, status: number = 200) => {
  return new NextResponse(JSON.stringify(data), {
    status,
    headers: jsonHeaders,
  });
};

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      ...corsHeaders,
      'Content-Length': '0',
    },
  });
}

export async function POST(request: Request) {
  try {
    // Parse the request body
    let body;
    try {
      body = await request.json();
    } catch (e) {
      console.error('Error parsing request body:', e);
      return jsonResponse(
        { error: 'Invalid request body' },
        400
      );
    }

    // Validate required fields
    if (!body.name || !body.email || !body.message) {
      return jsonResponse(
        { error: 'Name, email, and message are required' },
        400
      );
    }

    console.log('Sending email with data:', { 
      ...body, 
      message: body.message.substring(0, 50) + (body.message.length > 50 ? '...' : '') 
    });
    
    const resendApiKey = process.env.RESEND_API_KEY;
    if (!resendApiKey) {
      console.error('Missing RESEND_API_KEY environment variable');
      return jsonResponse(
        { error: 'Server configuration error' },
        500
      );
    }

    // Send email using Resend
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${resendApiKey}`
      },
      body: JSON.stringify({
        from: 'noreply@decorwisepainting.com',
        to: 'jimmy@decorwisepainting.com',
        subject: `New Customer Request - ${body.name}`,
        html: `
          <h1>New Customer Request</h1>
          <p><strong>Name:</strong> ${body.name}</p>
          <p><strong>Email:</strong> ${body.email}</p>
          <p><strong>Phone:</strong> ${body.phone || 'Not provided'}</p>
          <p><strong>Message:</strong></p>
          <p>${body.message.replace(/\n/g, '<br>')}</p>
        `
      })
    });

    const responseData = await response.json();

    if (!response.ok) {
      console.error('Resend API error:', responseData);
      return jsonResponse(
        { 
          error: 'Failed to send email', 
          details: responseData.message || 'Unknown error' 
        },
        response.status
      );
    }

    return jsonResponse({
      success: true, 
      message: 'Email sent successfully',
      id: responseData.id 
    });
  } catch (error) {
    console.error('Error in send API route:', error);
    return jsonResponse(
      { error: 'Internal server error' },
      500
    );
  }
}
