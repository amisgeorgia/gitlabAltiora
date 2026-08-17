const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imgDir = path.join(__dirname, '..', 'frontend', 'public', 'images');
const images = [
  { name: 'accueil', quality: 85, lossless: false },
  { name: 'comming-mobile', quality: 85, lossless: false },
  { name: 'comming1-web', quality: 85, lossless: false },
  { name: 'logo', quality: 95, lossless: true }
];

async function convert() {
  for (const img of images) {
    const src = path.join(imgDir, img.name + '.png');
    const dest = path.join(imgDir, img.name + '.webp');
    if (fs.existsSync(src)) {
      console.log('Converting', img.name + '.png', '...');
      await sharp(src)
        .webp({ quality: img.quality, lossless: img.lossless })
        .toFile(dest);
      const srcStat = fs.statSync(src);
      const destStat = fs.statSync(dest);
      console.log(`Done: ${img.name}.png (${(srcStat.size / 1024).toFixed(1)} KB) -> ${img.name}.webp (${(destStat.size / 1024).toFixed(1)} KB)`);
    } else {
      console.log('File not found:', src);
    }
  }
}

convert().catch(err => {
  console.error(err);
  process.exit(1);
});
