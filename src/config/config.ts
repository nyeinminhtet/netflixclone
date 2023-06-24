interface Config {
  jwtSecret: string;
  nextAuthSecret: string;
  githubClientId: string;
  githubClientSecret: string;
  googleClientId: string;
  googleClientSecret: string;
  nextauthUrl: string;
}

export const config: Config = {
  nextauthUrl: process.env.NEXTAUTH_URL || "",
  jwtSecret: process.env.NEXTAUTH_JWT_SECRET || "",
  nextAuthSecret: process.env.NEXTAUTH_SECRET || "",
  githubClientId: process.env.GITHUB_CLIENT_ID || "",
  githubClientSecret: process.env.GITHUB_CLIENT_SECRET || "",
  googleClientId: process.env.GOOGLE_CLIENT_ID || "",
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
};
