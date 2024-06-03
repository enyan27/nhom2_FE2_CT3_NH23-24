import { auth } from "@clerk/nextjs";

const adminIds = [
    "user_2hMJqrFGVUh0QYyHLkx8hpX6dPR",
];

export const isAdmin = () => {
    const { userId } = auth();

    if (!userId) {
        return false;
    };

    return adminIds.indexOf(userId) !== -1;
};