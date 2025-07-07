// Use the same interface for development and production
interface EmailPayload {
  name: string;
  email: string;
  phone: string;
  message: string;
}

// For production: Use Netlify Function
async function sendViaNetlifyFunction(formData: EmailPayload) {
  const response = await fetch('/.netlify/functions/send-email', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('API error response:', {
      status: response.status,
      statusText: response.statusText,
      errorText
    });
    
    let errorMessage = 'Failed to send email';
    try {
      const errorData = JSON.parse(errorText);
      errorMessage = errorData.error || errorData.message || errorMessage;
    } catch (e) {
      console.error('Failed to parse error response:', e);
    }
    
    throw new Error(errorMessage);
  }

  return await response.json();
}

// For development: Use direct API route
async function sendViaApiRoute(formData: EmailPayload) {
  const response = await fetch('/api/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('API error response:', {
      status: response.status,
      statusText: response.statusText,
      errorText
    });
    
    let errorMessage = 'Failed to send email';
    try {
      const errorData = JSON.parse(errorText);
      errorMessage = errorData.error || errorData.message || errorMessage;
    } catch (e) {
      console.error('Failed to parse error response:', e);
    }
    
    throw new Error(errorMessage);
  }

  return await response.json();
}

export async function sendEmailClientSide(formData: EmailPayload) {
  try {
    console.log('Sending email with data:', { 
      ...formData, 
      message: formData.message.substring(0, 50) + (formData.message.length > 50 ? '...' : '') 
    });
    
    // In development, use the API route; in production, use Netlify Function
    const isDevelopment = process.env.NODE_ENV === 'development';
    const data = isDevelopment 
      ? await sendViaApiRoute(formData)
      : await sendViaNetlifyFunction(formData);
    
    console.log('Email sent successfully:', data);
    return { success: true, data };
  } catch (error) {
    console.error('Error in sendEmailClientSide:', error);
    throw error instanceof Error ? error : new Error('An unknown error occurred');
  }
}
