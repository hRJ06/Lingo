import { auth } from "@clerk/nextjs/server";

const adminIds = ["user_2iyQxkFznBzcNVUYxXWuasgONZw"];

export const isAdmin = async() => {
    const {userId} = await auth();
    if(!userId) return false;
    return adminIds.includes(userId);
}