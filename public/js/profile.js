const newFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#notes-name').value.trim();
  const content = document.querySelector('#notes-desc').value.trim();

  if (title && content) {
    const response = await fetch(`/api/notes`, {
      method: 'POST',
      body: JSON.stringify({ title, content }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to create a post');
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/notes/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to delete notes post');
    }
  }
};

document
  .querySelector('.new-notes-form')
  .addEventListener('submit', newFormHandler);

document
  .querySelector('.notes-list')
  .addEventListener('click', delButtonHandler);