import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';

describe('<Blog />', () => {
  let container;
  let handleDelete;
  let handleLike;

  beforeEach(() => {
    const user = {
      id: 123,
      username: 'johndoe',
      name: 'John Doe'
    };

    const blog = {
      title: 'Test Blog',
      author: 'John Doe',
      user: user.id,
      url: 'www.test.com',
      likes: 999
    };

    handleDelete = jest.fn();
    handleLike = jest.fn();

    container = render(
      <Blog
        blog={blog}
        user={user}
        handleDelete={handleDelete}
        handleLike={handleLike}
      />
    ).container;
  });

  test('5.13 blog displays title and author but does not render url and likes by default', async () => {
    const titleAndAuthor = screen.getByText('Test Blog John Doe');

    expect(titleAndAuthor).toBeDefined();

    const div = container.querySelector('.blogDetailsContent');
    expect(div).toHaveStyle('display: none');
  });

  test('5.14 url and number of likes are shown when the view button is clicked', async () => {
    let viewButton = screen.getByText('view');
    expect(viewButton).toBeDefined();

    const user = userEvent.setup();
    await user.click(viewButton);

    viewButton = screen.getByText('hide');
    expect(viewButton).toBeDefined();

    const div = container.querySelector('.blogDetailsContent');
    expect(div).not.toHaveStyle('display: none');
  });

  test('5.15 when like button is clicked twice the event handler the component received as props is called twice', async () => {
    const user = userEvent.setup();
    const likeButton = screen.getByText('like');
    await user.click(likeButton);
    await user.click(likeButton);

    expect(handleLike.mock.calls).toHaveLength(2);
  });
});