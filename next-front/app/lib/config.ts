export const oidcConfig = {
    issuer: "http://localhost:8080/realms/company",

    clientId: "react-app",

    redirectUri: "http://localhost:3000/api/auth/callback",

    scopes: "openid profile email"
};