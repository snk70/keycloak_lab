import { oidcConfig } from "../config";

export async function discover() {

    const response = await fetch(
        `${oidcConfig.issuer}/.well-known/openid-configuration`
    );

    if (!response.ok) {
        throw new Error("Discovery failed");
    }

    return response.json();
}