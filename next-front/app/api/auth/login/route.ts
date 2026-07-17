import { NextResponse } from "next/server";

import { generateCodeVerifier } from "@/app/lib/auth/pkce";
import {
    generateNonce,
    generateState
} from "@/app/lib/auth/state";
import { buildAuthorizationUrl } from "@/app/lib/auth/authorization";
import { saveAuthCookie } from "@/app/lib/auth/cookies";

export async function GET() {

    const state = generateState();

    const nonce = generateNonce();

    const codeVerifier = generateCodeVerifier();

    const auth = await buildAuthorizationUrl(
        state,
        nonce,
        codeVerifier
    );

    console.log("====== LOGIN ======");

    console.log(auth);

    await saveAuthCookie({

        state,

        nonce,

        codeVerifier
    });

    return NextResponse.redirect(auth.authorizationUrl);
}