const axios = require('axios');

const BASE_URL = 'http://localhost:5000/api';

async function testServer() {
  console.log('🧪 Testing FixMyBike Server...\n');

  try {
    // Test health endpoint
    console.log('1. Testing health endpoint...');
    const healthResponse = await axios.get(`${BASE_URL}/health`);
    console.log('✅ Health check:', healthResponse.data);

    // Test auth endpoints
    console.log('\n2. Testing auth endpoints...');
    
    // Test signup
    const signupData = {
      username: 'testuser',
      email: 'test@example.com',
      password: 'testpassword123',
      role: 'customer'
    };
    
    console.log('📤 Sending signup data:', signupData);
    
    try {
      const signupResponse = await axios.post(`${BASE_URL}/auth/signup`, signupData);
      console.log('✅ Signup successful:', signupResponse.data.message);
      
      // Test login
      const loginData = {
        emailOrUser: 'testuser',
        password: 'testpassword123'
      };
      
      const loginResponse = await axios.post(`${BASE_URL}/auth/login`, loginData);
      console.log('✅ Login successful:', loginResponse.data.message);
      
      const token = loginResponse.data.token;
      
      // Test authenticated endpoint
      console.log('\n3. Testing authenticated endpoints...');
      
      const meResponse = await axios.get(`${BASE_URL}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log('✅ Auth me endpoint:', meResponse.data.message);
      
      // Test bookings endpoint
      const bookingsResponse = await axios.get(`${BASE_URL}/bookings`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log('✅ Bookings endpoint:', bookingsResponse.data.message);
      
    } catch (error) {
      if (error.response?.status === 400 && error.response?.data?.message?.includes('already')) {
        console.log('ℹ️  User already exists, testing login...');
        
        const loginData = {
          emailOrUser: 'testuser',
          password: 'testpassword123'
        };
        
        const loginResponse = await axios.post(`${BASE_URL}/auth/login`, loginData);
        console.log('✅ Login successful:', loginResponse.data.message);
        
        const token = loginResponse.data.token;
        
        // Test authenticated endpoint
        console.log('\n3. Testing authenticated endpoints...');
        
        const meResponse = await axios.get(`${BASE_URL}/auth/me`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        console.log('✅ Auth me endpoint:', meResponse.data.message);
        
        // Test bookings endpoint
        const bookingsResponse = await axios.get(`${BASE_URL}/bookings`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        console.log('✅ Bookings endpoint:', bookingsResponse.data.message);
      } else {
        throw error;
      }
    }

    console.log('\n🎉 All tests passed! Server is working correctly.');
    
  } catch (error) {
    console.error('\n❌ Test failed:', error.message);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
    process.exit(1);
  }
}

testServer();
