const axios = require('axios');

async function testOTP() {
  try {
    console.log('Testing OTP endpoint...');
    
    const response = await axios.post('http://localhost:5001/api/auth/send-otp', {
      email: 'test@example.com',
      username: 'testuser'
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    console.log('✅ OTP sent successfully!');
    console.log('Response:', response.data);
    
    if (response.data.previewUrl) {
      console.log('📧 Email preview URL:', response.data.previewUrl);
    }
    
  } catch (error) {
    console.error('❌ Error testing OTP:', error.response?.data || error.message);
    console.error('Full error:', error);
  }
}

testOTP();
