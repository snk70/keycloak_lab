import { discover } from "./oidc";
import { oidcConfig } from "../config";
import crypto from "crypto";

export interface AuthorizationData {
    authorizationUrl: string;
    state: string;
    nonce: string;
    codeVerifier: string;
}

export async function buildAuthorizationUrl(
    state: string,
    nonce: string,
    codeVerifier: string,
): Promise<AuthorizationData> {

    const discovery = await discover();

    const codeChallenge = crypto
        .createHash("sha256")
        .update(codeVerifier)
        .digest("base64url");

    const url = new URL(discovery.authorization_endpoint);

    url.searchParams.set("client_id", oidcConfig.clientId);
    url.searchParams.set("redirect_uri", oidcConfig.redirectUri);
    url.searchParams.set("response_type", "code");
    url.searchParams.set("scope", oidcConfig.scopes);
    url.searchParams.set("state", state);
    url.searchParams.set("nonce", nonce);
    url.searchParams.set("code_challenge", codeChallenge);
    url.searchParams.set("code_challenge_method", "S256");

    return {
        authorizationUrl: url.toString(),
        state,
        nonce,
        codeVerifier
    };
}