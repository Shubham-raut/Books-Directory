document.addEventListener('DOMContentLoaded', (event) => {
  console.log('DOM fully loaded and parsed');

  const booksContainer = document.querySelector('.books-container');

  // booksContainer.addEventListener('click', (e) => {
  //   console.log(e.target);

  //   if (e.target.className === 'add-fav') {
  //     const bookId = e.target.closest('.book-info').getAttribute('book-id');
  //     console.log(bookId);

  //     const form = document.createElement('form');
  //     form.setAttribute('action', '/favourite');
  //     form.setAttribute('method', 'POST');

  //     const input = document.createElement('input');
  //     input.setAttribute('name', 'bookId');
  //     input.setAttribute('value', bookId);

  //     form.appendChild(input);

  //     console.log(form);
  //     form.submit();
  //   }
  // });
});
