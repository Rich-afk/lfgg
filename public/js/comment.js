async function commentFormHandler(event) {
  event.preventDefault();

  const description = document.querySelector('textarea[name="comment-body"]').value.trim();
  const post_id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];

  if (description) {
    const response = await fetch('/api/comments', {
      method: 'POST',
      body: JSON.stringify({
        post_id,
        description
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert(response.statusText);
    }
  }
}

const handleComment = async (event) => {
  if (event.target.matches('#delete')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/comments/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace(`/blogposts/${postId}`);
    } else {
      alert('Failed to delete comment');
    }

  }
  if (event.target.matches('#edit')) {
    const id = event.target.getAttribute('data-id');
    const textEl = document.createElement('textarea');
    const buttonEl = document.createElement('button');
    const container = event.target.closest(`#comment-${id}`);
    buttonEl.className = 'btn btn-sm btn-danger';
    buttonEl.textContent = 'save';
    buttonEl.dataset.id = id;
    buttonEl.id = 'save';
    container.prepend(buttonEl);
    container.prepend(textEl);
    const pEl = container.querySelector('p');
    textEl.value = pEl.textContent;



  }
  if (event.target.matches('#save')) {
    const id = event.target.getAttribute('data-id');
    const container = event.target.closest(`#comment-${id}`);
    const textEl = container.querySelector('textarea');
    const response = await fetch(`/api/comments/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        description: textEl.value.trim()
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      document.location.replace(`/blogposts/${postId}`);
    } else {
      alert('Failed to update comment');
    }
  }
};

document.querySelector('.comment-form').addEventListener('submit', commentFormHandler);
document.querySelector('.comment-list').addEventListener('click', handleComment);