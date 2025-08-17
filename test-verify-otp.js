const axios = require('axios');

async function testVerifyOTP() {
  try {
    console.log('Testing OTP verification endpoint...');
    
    // First send OTP
    const sendResponse = await axios.post('http://localhost:5001/api/auth/send-otp', {
      email: 'test@example.com',
      username: 'testuser'
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    console.log('✅ OTP sent successfully!');
    console.log('Response:', sendResponse.data);
    
    if (sendResponse.data.previewUrl) {
      console.log('📧 Email preview URL:', sendResponse.data.previewUrl);
    }
    
    const tempUserId = sendResponse.data.tempUserId;
    
    // For testing, let's check what OTP is stored in memory
    console.log('\n🔍 Checking OTP store...');
    console.log('TempUserId:', tempUserId);
    
    // Since we can't directly access the OTP store from here, let's use a simple approach
    // The OTP is 6 digits, so let's try a few common patterns
    const possibleOTPs = ['123456', '000000', '111111', '999999', '654321'];
    
    for (const testOTP of possibleOTPs) {
      try {
        console.log(`\n🔄 Trying OTP: ${testOTP}`);
        
        const verifyResponse = await axios.post('http://localhost:5001/api/auth/verify-otp', {
          tempUserId: tempUserId,
          otp: testOTP,
          password: 'testpassword123'
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        
        console.log('✅ OTP verification successful!');
        console.log('Response:', verifyResponse.data);
        return;
        
      } catch (error) {
        if (error.response?.status === 400) {
          console.log(`❌ OTP ${testOTP} failed:`, error.response.data.message);
        } else {
          console.error('❌ Error:', error.response?.data || error.message);
        }
      }
    }
    
    console.log('\n❌ All test OTPs failed. Please check the email preview URL for the actual OTP.');
    
  } catch (error) {
    console.error('❌ Error testing OTP verification:', error.response?.data || error.message);
  }
}

testVerifyOTP();
