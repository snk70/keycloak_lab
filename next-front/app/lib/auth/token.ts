import { oidcConfig } from "../config";
import { discover } from "./oidc";

export interface TokenResponse {

    access_token: string;

    expires_in: number;

    refresh_expires_in: number;

    refresh_token: string;

    token_type: string;

    id_token: string;

    session_state: string;

    scope: string;
}

export async function exchangeAuthorizationCode(
    code: string,
    codeVerifier: string
): Promise<TokenResponse> {

    const discovery = await discover();

    const body = new URLSearchParams({

        grant_type: "authorization_code",

        client_id: oidcConfig.clientId,

        code,

        redirect_uri: oidcConfig.redirectUri,

        code_verifier: codeVerifier
    });

    const response = await fetch(discovery.token_endpoint, {

        method: "POST",

        headers: {

            "Content-Type":
                "application/x-www-form-urlencoded"
        },

        body
    });

    if (!response.ok) {

        const error = await response.text();

        throw new Error(error);
    }

    return response.json();
}