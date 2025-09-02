require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');

async function testConnection() {
  try {
    console.log('🔍 Testing MongoDB connection...');
    console.log(`📍 MongoDB URI: ${process.env.MONGODB_URI ? process.env.MONGODB_URI.replace(/\/\/.*:.*@/, '//***:***@') : 'NOT SET'}`);
    
    if (!process.env.MONGODB_URI) {
      console.log('❌ MONGODB_URI not found in .env.local');
      console.log('💡 Please create .env.local with your MongoDB connection string');
      return;
    }

    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Successfully connected to MongoDB!');

    // Get database info
    const db = mongoose.connection.db;
    const dbName = db.databaseName;
    console.log(`📊 Connected to database: ${dbName}`);

    // Check collections
    const collections = await db.listCollections().toArray();
    console.log(`📁 Found ${collections.length} collections:`);
    
    for (const collection of collections) {
      const count = await db.collection(collection.name).countDocuments();
      console.log(`   • ${collection.name}: ${count} documents`);
    }

    // Test each model if collections exist
    const modelsToCheck = [
      { name: 'users', model: 'User' },
      { name: 'projects', model: 'Project' },
      { name: 'skills', model: 'Skill' },
      { name: 'abouts', model: 'About' },
      { name: 'testimonials', model: 'Testimonial' },
      { name: 'contacts', model: 'Contact' }
    ];

    console.log('\n📋 Data Summary:');
    for (const { name, model } of modelsToCheck) {
      try {
        const count = await db.collection(name).countDocuments();
        if (count > 0) {
          console.log(`✅ ${model}: ${count} records`);
          
          // Show sample data for some collections
          if (name === 'users') {
            const users = await db.collection(name).find({}, { projection: { email: 1, role: 1 } }).toArray();
            users.forEach(user => console.log(`   👤 ${user.email} (${user.role})`));
          } else if (name === 'projects') {
            const projects = await db.collection(name).find({}, { projection: { title: 1, featured: 1 } }).toArray();
            projects.forEach(project => console.log(`   💼 ${project.title} ${project.featured ? '⭐' : ''}`));
          }
        } else {
          console.log(`⚠️  ${model}: No records found`);
        }
      } catch (error) {
        console.log(`❌ ${model}: Error checking collection`);
      }
    }

    console.log('\n🎯 MongoDB Compass Connection Info:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    
    if (process.env.MONGODB_URI.includes('mongodb://localhost') || process.env.MONGODB_URI.includes('127.0.0.1')) {
      console.log('📍 Local MongoDB detected');
      console.log('🔗 Connection String for Compass: mongodb://localhost:27017');
      console.log(`📊 Database Name: ${dbName}`);
    } else if (process.env.MONGODB_URI.includes('mongodb+srv://')) {
      console.log('☁️  MongoDB Atlas detected');
      console.log('🔗 Use your Atlas connection string in Compass');
      console.log(`📊 Database Name: ${dbName}`);
    } else {
      console.log('🔗 Connection String for Compass:');
      console.log(process.env.MONGODB_URI.replace(/\/\/.*:.*@/, '//[username]:[password]@'));
      console.log(`📊 Database Name: ${dbName}`);
    }

  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    
    if (error.message.includes('ENOTFOUND')) {
      console.log('\n💡 Troubleshooting:');
      console.log('   • Check if MongoDB is running locally');
      console.log('   • Verify your connection string in .env.local');
      console.log('   • For Atlas: Check network access and credentials');
    } else if (error.message.includes('authentication failed')) {
      console.log('\n💡 Authentication issue:');
      console.log('   • Check your username and password');
      console.log('   • Verify database user permissions');
    }
  } finally {
    await mongoose.disconnect();
    console.log('\n👋 Disconnected from MongoDB');
  }
}

testConnection();
