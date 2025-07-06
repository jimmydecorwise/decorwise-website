export async function sendEmailClientSide(formData: {
  name: string;
  email: string;
  phone: string;
  message: string;
}) {
  try {
    console.log('Sending email with data:', { ...formData, message: formData.message.substring(0, 50) + '...' });
    
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

    const data = await response.json();
    console.log('Email sent successfully:', { status: response.status, data });
    return { success: true, data };
  } catch (error) {
    console.error('Error in sendEmailClientSide:', error);
    throw error instanceof Error ? error : new Error('An unknown error occurred');
  }
}
