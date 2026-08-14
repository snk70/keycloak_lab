import {
    getSession,
    updateSession
} from "./session";

import {
    refreshAccessToken
} from "./token";

export async function getValidAccessToken(): Promise<string | null> {

    const result = await getSession();

    if (!result) {
        return null;
    }

    const {
        id,
        session
    } = result;

    const now = Date.now();


    const isExpired =
        now >= session.expiresAt - 10_000;

    console.log("+++++++++++++++ isExpired +++++++++++++++", isExpired)


    if (!isExpired) {
        return session.accessToken;
    }

    const token = await refreshAccessToken(
        session.refreshToken
    );

    const updatedSession = {
        accessToken: token.access_token,

        refreshToken:
            token.refresh_token ??
            session.refreshToken,

        idToken:
            token.id_token ??
            session.idToken,

        expiresAt:
            Date.now() +
            token.expires_in * 1000
    };

    await updateSession(
        id,
        updatedSession
    );

    return updatedSession.accessToken;
}