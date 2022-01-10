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


export { getUsers };
