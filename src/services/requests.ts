import Session from "../utils/Session";
import Client from "./_client";

const sendRequest = async (receiverId: string) => {
    const result = await new Client({
        path: `/requests`,
        payload: {
            senderId: Session.userId,
            receiverId,
        }
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

const acceptRequest = async (requestId: string) => {
    const result = await new Client({
        path: `/requests/${requestId}/accept`
    }).post();

    if (!(result.ok || result.code === 200)) {
        throw new Error(result.message || 'Uh Oh! Unable to accept this request.');
    } else {
        return result;
    }
};

const declineRequest = async (requestId: string) => {
    const result = await new Client({
        path: `/requests/${requestId}/decline`
    }).post();

    if (!(result.ok || result.code === 200)) {
        throw new Error(result.message || 'Uh Oh! Unable to decline this request.');
    } else {
        return result;
    }
};



export { getSentRequests, getReceivedRequests, sendRequest, acceptRequest, declineRequest };
