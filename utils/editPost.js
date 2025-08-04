export async function EditComment(postId, updatedData) {;
    return fetch(`${process.env.NEXT_PUBLIC_POST_API_KEY}/${postId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
    })
    .then(response => response.json())
    .catch(error => {
        console.error('Error updating post:', error);
        throw error;
    });
}

export async function DeleteComment(postId) {
    return fetch(`${process.env.NEXT_PUBLIC_POST_API_KEY}/${postId}`, {
        method: 'DELETE',
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .catch(error => {
        console.error('Error deleting post:', error);
        throw error;
    });
}