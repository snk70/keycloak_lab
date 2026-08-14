import { NextRequest, NextResponse } from "next/server";

import {
    destroySession,
    getSession
} from "@/app/lib/auth/session";

import {
    discover
} from "@/app/lib/auth/oidc";

export async function GET(
    request: NextRequest
) {
    const sessionResult = await getSession();

    await destroySession();

    const discovery = await discover();

    const logoutUrl = new URL(
        discovery.end_session_endpoint
    );

    if (sessionResult) {
        logoutUrl.searchParams.set(
            "id_token_hint",
            sessionResult.session.idToken
        );
    }

    logoutUrl.searchParams.set(
        "post_logout_redirect_uri",
        new URL("/", request.url).toString()
    );

    return NextResponse.redirect(logoutUrl);
}