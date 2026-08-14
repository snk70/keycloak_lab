import { NextResponse } from "next/server";

import {
    getValidAccessToken
} from "@/app/lib/auth/session-manager";

export async function GET() {

    const accessToken =
        await getValidAccessToken();

    if (!accessToken) {
        return NextResponse.json(
            {
                authenticated: false
            },
            {
                status: 401
            }
        );
    }

    return NextResponse.json({
        authenticated: true,
        message: "Valid access token available"
    });
}