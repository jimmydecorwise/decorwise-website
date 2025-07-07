// This script generates favicon files from your logo
// Run with: node scripts/generate-favicon.js

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const sizes = [16, 32, 48, 64, 128, 192, 256, 512];
const publicDir = path.join(__dirname, '../public');
const logoPath = path.join(publicDir, 'images/logo.png');

// Create favicon.ico (multiple sizes in one file)
async function generateFavicon() {
  try {
    // Create a 32x32 favicon.ico
    await sharp(logoPath)
      .resize(32, 32)
      .toFile(path.join(publicDir, 'favicon.ico'));
    
    console.log('Generated favicon.ico');
  } catch (error) {
    console.error('Error generating favicon.ico:', error);
  }
}

// Generate apple-touch-icon.png (180x180)
async function generateAppleTouchIcon() {
  try {
    await sharp(logoPath)
      .resize(180, 180, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 1 }
      })
      .toFile(path.join(publicDir, 'apple-touch-icon.png'));
    
    console.log('Generated apple-touch-icon.png');
  } catch (error) {
    console.error('Error generating apple-touch-icon.png:', error);
  }
}

// Generate favicon-{size}.png for different sizes
async function generatePngIcons() {
  try {
    for (const size of sizes) {
      const filename = `favicon-${size}x${size}.png`;
      await sharp(logoPath)
        .resize(size, size)
        .toFile(path.join(publicDir, filename));
      
      console.log(`Generated ${filename}`);
    }
  } catch (error) {
    console.error('Error generating PNG icons:', error);
  }
}

// Generate site.webmanifest
function generateManifest() {
  const manifest = {
    name: 'Decorwise Paintings',
    short_name: 'Decorwise',
    icons: [
      {
        src: '/favicon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any maskable'
      },
      {
        src: '/favicon-512x512.png',
        sizes: '512x512',
        type: 'image/png'
      }
    ],
    theme_color: '#1a365d',
    background_color: '#ffffff',
    display: 'standalone',
    start_url: '/'
  };

  fs.writeFileSync(
    path.join(publicDir, 'site.webmanifest'),
    JSON.stringify(manifest, null, 2)
  );
  
  console.log('Generated site.webmanifest');
}

// Run all generation functions
async function generateAll() {
  await generateFavicon();
  await generateAppleTouchIcon();
  await generatePngIcons();
  generateManifest();
}

generateAll().catch(console.error);
