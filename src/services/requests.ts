import Session from "../utils/Session";
import Client from "./_client";

const sendRequest = async (userId: string) => {
    const result = await new Client({
        path: `/requests/${Session.userId}/send/${userId}`
    }).post();

    if (!(result.ok || result.code === 200)) {
        throw new Error(result.message || 'Uh Oh! Unable to send request.');
    } else {
        return result;
    }
};

const getSentRequests = async () => {
    const result = await new Client({
        path: `/requests/${Session.userId}/sent`
    }).get();

    if (!(result.ok || result.code === 200)) {
        throw new Error(result.message || 'Uh Oh! Unable to find sent requests.');
    } else {
        return result;
    }
};

const getReceivedRequests = async () => {
    const result = await new Client({
        path: `/requests/${Session.userId}/received`
    }).get();

    if (!(result.ok || result.code === 200)) {
        throw new Error(result.message || 'Uh Oh! Unable to find received requests.');
    } else {
        return result;
    }
};


export { getSentRequests, getReceivedRequests, sendRequest };
