import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import sharp from "sharp";

const PUBLIC = resolve(import.meta.dirname, "../public");

const BRAND_BG = "#1976D2";

// Water drop SVG path on solid background — used for PWA/apple icons
function iconSvg(size: number): Buffer {
	// Scale the drop proportionally to the icon size
	const pad = Math.round(size * 0.15);
	const dropSize = size - pad * 2;
	const cx = size / 2;
	const cy = size / 2;

	const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect width="${size}" height="${size}" fill="${BRAND_BG}" rx="${Math.round(size * 0.18)}"/>
  <g transform="translate(${cx}, ${cy}) scale(${dropSize / 32})">
    <path d="M0 -11c-.35.5-5 6.8-5 10a5 5 0 0 0 10 0c0-3.2-4.65-9.5-5-10z" fill="white" opacity="0.92"/>
    <ellipse cx="-1.5" cy="-1" rx="1.4" ry="2.1" fill="white" opacity="0.3" transform="rotate(-15 -1.5 -1)"/>
  </g>
</svg>`;

	return Buffer.from(svg);
}

// ICO file format: header + directory entry + PNG data
function pngToIco(pngBuffer: Buffer, size: number): Buffer {
	const dir = Buffer.alloc(6 + 16);
	// ICONDIR header
	dir.writeUInt16LE(0, 0); // reserved
	dir.writeUInt16LE(1, 2); // ICO type
	dir.writeUInt16LE(1, 4); // 1 image

	// ICONDIRENTRY
	dir.writeUInt8(size >= 256 ? 0 : size, 6); // width (0 = 256)
	dir.writeUInt8(size >= 256 ? 0 : size, 7); // height
	dir.writeUInt8(0, 8); // color palette
	dir.writeUInt8(0, 9); // reserved
	dir.writeUInt16LE(1, 10); // color planes
	dir.writeUInt16LE(32, 12); // bits per pixel
	dir.writeUInt32LE(pngBuffer.length, 14); // image size
	dir.writeUInt32LE(22, 18); // offset to image data

	return Buffer.concat([dir, pngBuffer]);
}

async function main() {
	console.log("Generating icons...");

	// Generate PWA / apple icons from programmatic SVG
	const sizes = [
		{ name: "apple-touch-icon.png", size: 180 },
		{ name: "icon-192.png", size: 192 },
		{ name: "icon-512.png", size: 512 },
	];

	for (const { name, size } of sizes) {
		const png = await sharp(iconSvg(size)).png().toBuffer();
		writeFileSync(resolve(PUBLIC, name), png);
		console.log(`  ${name} (${size}x${size})`);
	}

	// Generate favicon.ico from the SVG favicon
	const faviconSvg = readFileSync(resolve(PUBLIC, "favicon.svg"));
	const favicon48 = await sharp(faviconSvg).resize(48, 48).png().toBuffer();
	const ico = pngToIco(favicon48, 48);
	writeFileSync(resolve(PUBLIC, "favicon.ico"), ico);
	console.log("  favicon.ico (48x48)");

	console.log("Done!");
}

main();
