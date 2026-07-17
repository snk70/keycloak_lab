import { NextRequest, NextResponse } from "next/server";

import {

    readAuthCookie,

    deleteAuthCookie

} from "@/app/lib/auth/cookies";

export async function GET(request: NextRequest) {

    const params = request.nextUrl.searchParams;

    const code = params.get("code");

    const state = params.get("state");

    if (!code)
        return NextResponse.json({

            error: "Authorization Code missing"

        }, { status: 400 });

    const authCookie = await readAuthCookie();

    if (!authCookie)
        return NextResponse.json({

            error: "Cookie not found"

        }, { status: 400 });

    if (authCookie.state !== state)
        return NextResponse.json({

            error: "Invalid State"

        }, { status: 400 });

    await deleteAuthCookie();

    return NextResponse.json({

        message: "State validated successfully",

        authorizationCode: code

    });
}