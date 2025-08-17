// test-email.js
const { sendEmailOTP } = require('./services/otpService');

async function testEmail() {
  console.log('🧪 Testing email configuration...');
  
  try {
    const result = await sendEmailOTP(
      'test@example.com',
      '123456',
      'TestUser'
    );
    
    console.log('📧 Email test result:', result);
    
    if (result.ok) {
      console.log('✅ Email configuration is working!');
      if (result.previewUrl) {
        console.log('🔗 Preview URL:', result.previewUrl);
        console.log('⚠️  This is a test email (Ethereal). For real delivery, configure Gmail credentials.');
      } else {
        console.log('📬 Email sent successfully to test@example.com');
      }
    } else {
      console.log('❌ Email configuration failed:', result.error);
    }
  } catch (error) {
    console.error('💥 Test failed:', error.message);
  }
}

// Run the test
testEmail();
