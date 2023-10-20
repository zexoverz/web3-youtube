/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
        return [
            {
                // matching all API routes
                source: "/api/:path*",
                headers: [
                    { key: "Access-Control-Allow-Credentials", value: "true" },
                    { key: "Access-Control-Allow-Origin", value: "*" }, // replace this your actual origin
                    { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT" },
                    { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
                ]
            }
        ]
    },
    // env: {
    //     WEB3_STORAGE_TOKEN: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDg2MjU4NjM1M0FjYTQxMjYzMDIwYmU5NzEwNDczYUYxQzU5NThkOTgiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2OTc4MDMyNjk2MjUsIm5hbWUiOiJvbmJvYXJkIn0.BvV-sSOF8s507ieqkTrXdqYD682z3piqXqW1e60Qbkk",
    //     LIVE_PEER_TOKEN: "7402068f-5ff4-4e20-97f9-dab6ac8ff158"
    // }
}

module.exports = nextConfig
