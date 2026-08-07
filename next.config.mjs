/** @type {import('next').NextConfig} */
const nextConfig = {
  // next dev가 AGENTS.md / CLAUDE.md 를 자동 생성하지 않도록 끔
  agentRules: false,
};

export default nextConfig;
