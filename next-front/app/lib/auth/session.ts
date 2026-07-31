import crypto from "crypto";
import { cookies } from "next/headers";

const SESSION_COOKIE = "session_id";

const sessions = new Map<
    string,
    {
        accessToken: string;
        refreshToken: string;
        idToken: string;
        expiresAt: number;
    }
>();

export interface Session {
    accessToken: string;
    refreshToken: string;
    idToken: string;
    expiresAt: number;
}

export async function createSession(
    session: Session
): Promise<string> {

    const sessionId = crypto.randomBytes(32).toString("hex");

    sessions.set(sessionId, session);

    const cookieStore = await cookies();

    cookieStore.set(
        SESSION_COOKIE,
        sessionId,
        {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            path: "/",
            maxAge: 60 * 60 * 24
        }
    );

    return sessionId;
}

export async function getSession(): Promise<Session | null> {

    const cookieStore = await cookies();

    const cookie = cookieStore.get(SESSION_COOKIE);

    if (!cookie) {
        return null;
    }

    const session = sessions.get(cookie.value);

    if (!session) {
        return null;
    }

    return session;
}

export async function destroySession() {

    const cookieStore = await cookies();

    const cookie = cookieStore.get(SESSION_COOKIE);

    if (cookie) {
        sessions.delete(cookie.value);
    }

    cookieStore.delete(SESSION_COOKIE);
}