require('dotenv').config({ path: '.env.local' });

async function runSeed() {
  try {
    console.log('🌱 Running database seed...');

    // Dynamic import of the seed function
    const { seedDatabase } = await import('../src/lib/seed.js');
    
    const result = await seedDatabase();
    
    if (result.success) {
      console.log('\n🎉 Database seeding completed successfully!');
      console.log('🌐 Start the server: npm run dev');
      console.log('🔗 Portfolio: http://localhost:3000');
      console.log('🔐 Admin: http://localhost:3000/admin');
      console.log(`📧 Login: ${result.adminEmail}`);
      console.log(`🔑 Password: ${result.adminPassword}`);
    }
    
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    console.log('\n💡 Troubleshooting:');
    console.log('   1. Ensure .env.local exists with MONGODB_URI');
    console.log('   2. Check MongoDB connection');
    console.log('   3. Run "npm run build" if TypeScript errors occur');
    process.exit(1);
  }
}

runSeed();
