import Session from "../utils/Session";
import Client from "./_client";

const restoreSession = async () => {
    const result = await new Client({
        path: "/auth/access"
    }).get();

    if (!(result.ok || result.code === 200)) {
        throw new Error(result.message || 'Uh Oh! Unable to restore you session. Please sign in.');
    } else {
        Session.onRestoreSession(result);
        return result;
    }
};

const signOut = async () => {
    Session.clearSession();
};

const signIn = async (data: SignInPayload) => {
    const result = await new Client({
        path: "/auth/login",
        payload: data
    }).post();

    if (!(result.ok || result.code === 200)) {
        throw new Error(result.message || 'Uh Oh! Unable to log you in.');
    } else {
        Session.onCreateSession({
            userId: result._id,
            name: result.name,
            phone: result.phone,
            about: result.about,
            ...result.tokens,
        });
        return result;
    }
};

const signup = async (data: SignupPayload) => {
    try {
        const result = await new Client({
            path: "/auth/signup",
            payload: data
        }).post();

        if (result.ok || result.code === 200) {
            Session.onCreateSession({
                userId: result._id,
                name: result.name,
                phone: result.phone,
                about: result.about,
                ...result.tokens,
            });
            return result;
        }
    } catch (error) {
        const _error = error as any;
        throw new Error('Uh Oh! Unable to sign you up. Please try again.');
    }
};

export { restoreSession, signOut, signIn, signup };
