/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	images: {
		domains: ['media.graphassets.com', 'us-east-1-shared-usea1-02.graphassets.com'],
	},
};

module.exports = nextConfig;
