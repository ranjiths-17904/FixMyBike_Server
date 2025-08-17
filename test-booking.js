const axios = require('axios');

async function testBooking() {
  try {
    console.log('Testing booking endpoint...');
    
    // Create a new user first
    console.log('🔄 Creating a new user...');
    
    // Send OTP
    const otpResponse = await axios.post('http://localhost:5001/api/auth/send-otp', {
      email: 'bookingtest@example.com',
      username: 'bookingtest'
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    console.log('✅ OTP sent for new user');
    
    // Verify OTP and create user
    const verifyResponse = await axios.post('http://localhost:5001/api/auth/verify-otp', {
      tempUserId: otpResponse.data.tempUserId,
      otp: '123456',
      password: 'testpassword123'
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    console.log('✅ New user created successfully!');
    const token = verifyResponse.data.token;
    
    // Test booking creation
    const bookingData = {
      service: 'wash-polish',
      serviceName: 'Wash & Polish',
      date: '2024-01-20',
      time: '10:00',
      location: 'Chennai',
      bikeModel: 'Honda Activa',
      bikeNumber: 'TN01AB1234',
      description: 'Regular wash and polish service',
      urgency: 'normal',
      cost: 300
    };
    
    const bookingResponse = await axios.post('http://localhost:5001/api/bookings', bookingData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    
    console.log('✅ Booking created successfully!');
    console.log('Response:', bookingResponse.data);
    
  } catch (error) {
    console.error('❌ Error testing booking:', error.response?.data || error.message);
  }
}

testBooking();
