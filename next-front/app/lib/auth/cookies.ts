import { cookies } from "next/headers";

const COOKIE_NAME = "oidc_auth";

export interface AuthCookie {

    state: string;

    nonce: string;

    codeVerifier: string;
}

export async function saveAuthCookie(data: AuthCookie) {

    const cookieStore = await cookies();

    cookieStore.set(COOKIE_NAME, JSON.stringify(data), {

        httpOnly: true,

        secure: false,

        sameSite: "lax",

        path: "/",

        maxAge: 300
    });
}

export async function readAuthCookie(): Promise<AuthCookie | null> {

    const cookieStore = await cookies();

    const cookie = cookieStore.get(COOKIE_NAME);

    if (!cookie)
        return null;

    return JSON.parse(cookie.value);
}

export async function deleteAuthCookie() {

    const cookieStore = await cookies();

    cookieStore.delete(COOKIE_NAME);
}