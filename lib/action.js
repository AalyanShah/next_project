'use server';

import { LoginData } from "./loginData";
import { checkLoginCredentials } from "./loginData";
import { savingPost, fetchingPost, fetchingSpecificPost, deletingSpecificPost } from "./savingPost";
import { savingComment, updatingComment, fetchingComment, deletingComment } from "./savingComment";

export async function signupDetails(formData) {

    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
        confirmPassword: formData.get('confirm-password')
    }

    await LoginData(data);

    return { success: true };
}

export async function loginDetails(formData) {
    const data = {
        email: formData.get("email"),
        password: formData.get("password"),
    };

    const user = await checkLoginCredentials(data);

    if (user) {
        return { success: true, user };
    } else {
        return { success: false, message: "Invalid email or password" };
    }
}

export async function fetchingPostData(userId) {
    const data = { userId };
    const posts = await fetchingPost(data);
    return { success: true, posts };
}

export async function fetchingSinglePostData(id) {
    const data = { id };
    const posts = await fetchingSpecificPost(data);
    return { success: true, posts };
}

export async function addingPost(formData) {
    const data = {
        userId: formData.get('id'),
        title: formData.get('title'),
        body: formData.get('body')
    }

    console.log("Adding post with data:", data);
    await savingPost(data);

    return { success: true, message: "Post added successfully" };
}

export async function deletePostData(id) {
    const data = { id };
    const posts = await deletingSpecificPost(data);
    return { success: true, posts };
}

export async function addingComment(formData) {
    const data = {
        postId: formData.get('id'),
        userId: formData.get('userId'),
        name: formData.get('name'),
        email: formData.get('email'),
        body: formData.get('body')
    }
    console.log("Adding comment with data:", data);
    await savingComment(data);

    return { success: true, message: "Comment Added Successfully" };
}

export async function editingComment(formData) {
    const data = {
        id: formData.get('id'),
        body: formData.get('body')
    }
    await updatingComment(data);

    return { success: true, message: "Comment Edited Successfully" };
}

export async function fetchingCommentData(postId) {
    const data = { postId };
    const posts = await fetchingComment(data);
    return { success: true, posts };
}

export async function deletCommentData(id) {
    const data = { id };
    const posts = await deletingComment(data);
    return { success: true, posts };
}