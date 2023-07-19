import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import CreateBlogForm from './CreateBlogForm';

describe('<CreateBlogForm />', () => {
  let handleCreateBlog = jest.fn();

  beforeEach(() => {
    render(<CreateBlogForm handleCreateBlog={handleCreateBlog} />);
  });

  test('5.16 form calls the event handler it received as props with the right details when a new blog is created.', async () => {
    const title = screen.getByPlaceholderText('title');
    const author = screen.getByPlaceholderText('author');
    const url = screen.getByPlaceholderText('url');

    const user = userEvent.setup();
    await user.type(title, 'Test Blog');
    await user.type(author, 'John Doe');
    await user.type(url, 'www.test.com');

    const createButton = screen.getByText('create');
    await user.click(createButton);

    const eventHandlerMockCalls = handleCreateBlog.mock.calls;
    expect(eventHandlerMockCalls).toHaveLength(1);
    expect(eventHandlerMockCalls[0][0].title).toBe('Test Blog');
    expect(eventHandlerMockCalls[0][0].author).toBe('John Doe');
    expect(eventHandlerMockCalls[0][0].url).toBe('www.test.com');
  });
});