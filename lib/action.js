'use server';

import { LoginData } from "./loginData";
import { checkLoginCredentials } from "./loginData";
import { savingPost } from "./savingPost";
import { savingComment, updatingComment } from "./savingComment";

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

export async function addingPost(formData) {
    const data = {
        userId: formData.get('userId'),
        title: formData.get('title'),
        body: formData.get('body')
    }

    console.log("Adding post with data:", data);
    await savingPost(data);

    return { success: true, message: "Post added successfully" };
}

export async function addingComment(formData) {
    const data = {
        postId: formData.get('userId'),
        name: formData.get('name'),
        email: formData.get('email'),
        body: formData.get('body')
    }

    console.log("Adding comment with data:", data);
    await savingComment(data);

    return { success: true, message: "Post added successfully" };
}

export async function editingComment(formData) {
    const data = {
        postId: formData.get('userId'),
        body: formData.get('body')
    }

    console.log("Adding comment with data:", data);
    await updatingComment(data);

    return { success: true, message: "Post added successfully" };
}