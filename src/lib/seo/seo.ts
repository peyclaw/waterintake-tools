const SITE_URL = "https://waterintake.tools";
const SITE_NAME = "Water Intake Calculator";

interface SeoOptions {
	title: string;
	description: string;
	keywords?: string;
	ogImage?: string;
	canonicalPath?: string;
	ogImageDimensions?: { width: number; height: number };
	ogImageAlt?: string;
	ogLocale?: string;
}

export function seo(options: SeoOptions): Array<Record<string, string>> {
	const {
		title,
		description,
		keywords,
		ogImage = "/og-image.png",
		canonicalPath,
		ogImageDimensions = { width: 1200, height: 630 },
		ogImageAlt = `${SITE_NAME} — Science-backed daily hydration`,
		ogLocale = "en_US",
	} = options;

	const ogImageUrl = ogImage.startsWith("http")
		? ogImage
		: `${SITE_URL}${ogImage}`;
	const canonicalUrl = canonicalPath
		? `${SITE_URL}${canonicalPath}`
		: undefined;

	const meta: Array<Record<string, string>> = [
		{ title },
		{ name: "description", content: description },
		// Open Graph
		{ property: "og:title", content: title },
		{ property: "og:description", content: description },
		{ property: "og:type", content: "website" },
		{ property: "og:image", content: ogImageUrl },
		{
			property: "og:image:width",
			content: String(ogImageDimensions.width),
		},
		{
			property: "og:image:height",
			content: String(ogImageDimensions.height),
		},
		{ property: "og:image:type", content: "image/png" },
		{ property: "og:image:alt", content: ogImageAlt },
		{ property: "og:locale", content: ogLocale },
		{ property: "og:site_name", content: SITE_NAME },
		// Twitter
		{ name: "twitter:card", content: "summary_large_image" },
		{ name: "twitter:title", content: title },
		{ name: "twitter:description", content: description },
		{ name: "twitter:image", content: ogImageUrl },
		{ name: "twitter:image:alt", content: ogImageAlt },
	];

	if (keywords) {
		meta.push({ name: "keywords", content: keywords });
	}

	if (canonicalUrl) {
		meta.push({ property: "og:url", content: canonicalUrl });
	}

	return meta;
}

export function seoLinks(
	canonicalPath?: string,
): Array<Record<string, string>> {
	if (!canonicalPath) return [];
	return [{ rel: "canonical", href: `${SITE_URL}${canonicalPath}` }];
}
