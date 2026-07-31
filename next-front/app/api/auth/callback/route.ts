import { NextRequest, NextResponse } from "next/server";

import {
    readAuthCookie,
    deleteAuthCookie
} from "@/app/lib/auth/cookies";

import {
    exchangeAuthorizationCode
} from "@/app/lib/auth/token";

import {
    createSession
} from "@/app/lib/auth/session";

export async function GET(request: NextRequest) {

    const params = request.nextUrl.searchParams;

    const code = params.get("code");

    const state = params.get("state");

    if (!code) {

        return NextResponse.json(
            {
                error: "Authorization Code missing"
            },
            {
                status: 400
            }
        );
    }

    if (!state) {

        return NextResponse.json(
            {
                error: "State missing"
            },
            {
                status: 400
            }
        );
    }

    const authCookie = await readAuthCookie();

    if (!authCookie) {

        return NextResponse.json(
            {
                error: "Authentication cookie not found"
            },
            {
                status: 400
            }
        );
    }

    if (authCookie.state !== state) {

        return NextResponse.json(
            {
                error: "Invalid state"
            },
            {
                status: 400
            }
        );
    }

    const token = await exchangeAuthorizationCode(
        code,
        authCookie.codeVerifier
    );

    await createSession({

        accessToken: token.access_token,

        refreshToken: token.refresh_token,

        idToken: token.id_token,

        expiresAt:
            Date.now() +
            token.expires_in * 1000
    });

    await deleteAuthCookie();

    return NextResponse.redirect(
        new URL(
            "/dashboard",
            request.url
        )
    );
}