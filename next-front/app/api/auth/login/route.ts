import { NextResponse } from "next/server";

import { generateCodeVerifier } from "@/app/lib/auth/pkce";
import {
    generateNonce,
    generateState
} from "@/app/lib/auth/state";
import { buildAuthorizationUrl } from "@/app/lib/auth/authorization";


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

    return NextResponse.redirect(auth.authorizationUrl);
}