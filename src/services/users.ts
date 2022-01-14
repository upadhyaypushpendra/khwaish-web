import Session from "../utils/Session";
import Client from "./_client";

const getUsers = async (input: string) => {
    const result = await new Client({
        path: `/users?input=${input}`
    }).get();

    if (!(result.ok || result.code === 200)) {
        throw new Error(result.message || 'Uh Oh! Unable to get any users.');
    } else {
        return result;
    }
};

const deleteFriend = async (friendId: string | undefined) => {
    console.log('DEBUG::deleteFriend', friendId);
    if (!Boolean(friendId)) throw new Error('No friend to delete.');

    const result = await new Client({
        path: `/users/${Session.userId}/friends/${friendId}`
    }).delete();

    if (!(result.ok || result.code === 200)) {
        throw new Error(result.message || 'Uh Oh! Unable to get any users.');
    } else {
        return result;
    }
};

export { getUsers, deleteFriend };
