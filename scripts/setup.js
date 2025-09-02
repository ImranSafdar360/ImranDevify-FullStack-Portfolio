require('dotenv').config({ path: '.env.local' });

// Import the seed function from our TypeScript file
// We need to use dynamic import since this is a JS file importing TS
async function setup() {
  try {
    console.log('🚀 Starting portfolio setup...');

    // Dynamic import of the seed function
    const { seedDatabase } = await import('../src/lib/seed.js');
    
    const result = await seedDatabase();
    
    if (result.success) {
      console.log('🌐 You can now start the development server with: npm run dev');
      console.log('🔗 Access your portfolio at: http://localhost:3000');
      console.log('🔐 Admin dashboard at: http://localhost:3000/admin');
    }
    
  } catch (error) {
    console.error('❌ Setup failed:', error);
    console.log('\n💡 Make sure you have:');
    console.log('   1. Created .env.local with your MongoDB URI');
    console.log('   2. Your MongoDB database is accessible');
    console.log('   3. Run "npm run build" first if there are TypeScript errors');
  }
}

setup();

