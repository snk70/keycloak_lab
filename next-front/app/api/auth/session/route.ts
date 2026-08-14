import { NextResponse } from "next/server";

import { cookies } from "next/headers";

import {
    getSession
} from "@/app/lib/auth/session";

export async function GET() {

    const cookieStore = await cookies();

    const session = await getSession();

    if (!session) {

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

        expiresAt: session.session.expiresAt
    });
}