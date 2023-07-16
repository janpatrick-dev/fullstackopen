import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';

describe('<Blog />', () => {
  let container;

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

    const handleDelete = jest.fn();
    const handleLike = jest.fn();

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
});