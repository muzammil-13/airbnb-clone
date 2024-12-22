import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Chatbot from '../Chatbot';

describe('Chatbot', () => {
  it('renders chat interface', () => {
    render(<Chatbot />);
    expect(screen.getByText('FAQ Bot 🏖️')).toBeInTheDocument();
  });

  it('allows message input', () => {
    render(<Chatbot />);
    const input = screen.getByPlaceholderText('Type a message...');
    fireEvent.change(input, { target: { value: 'hello' } });
    expect(input.value).toBe('hello');
  });
});
