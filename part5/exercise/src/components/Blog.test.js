import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';
import Togglable from './Togglable';

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

  test('5.14 url and number of likes are shown when the view button is clicked', async () => {
    let viewButtonText = screen.getByText('view');
    expect(viewButtonText).toBeDefined();

    const user = userEvent.setup();
    const viewButton = container.querySelector('.blogDisplayButton');
    await user.click(viewButton);

    viewButtonText = screen.getByText('hide');
    expect(viewButtonText).toBeDefined();

    const div = container.querySelector('.blogDetailsContent');
    expect(div).not.toHaveStyle('display: none');
  });
});