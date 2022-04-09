async function editFormHandler(event) {
  event.preventDefault();

  const comment = document.querySelector('input[name="comment-body"]').value.trim();
  const id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
  ];
  const response = await fetch(`/api/notes/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
          comment,
          description: comment
      }),
      headers: {
          'Content-Type': 'application/json'
      }
  });

  console.log(response);
  if (response.ok) {
      document.location.reload();
  } else {
      alert(response.statusText);
  }
}

document.querySelector('.comment-body').addEventListener('submit', editFormHandler);