import { jest, describe, it, expect } from '@jest/globals';
import { login } from './login.js';
import { remove, save } from '../../storage/index.js';
import { logout } from './logout.js';

jest.mock('../../storage/index.js', () => ({
  save: jest.fn(),
  remove: jest.fn(),
}));

jest.mock('../headers.js', () => ({
  headers: jest.fn(() => ({ 'Content-Type': 'application/json' })),
}));

globalThis.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () =>
      Promise.resolve({ accessToken: 'fake-token', user: 'test-user' }),
  }),
);

describe('Login function', () => {
  it('stores a token when provided with valid credentials', async () => {
    const email = 'test@example.com';
    const password = 'password';
    const profile = await login(email, password);
    expect(save).toHaveBeenCalledWith('token', 'fake-token');
    expect(save).toHaveBeenCalledWith('profile', { user: 'test-user' });
    expect(profile).toEqual({ user: 'test-user' });
  });
});

describe('Logout function', () => {
  it('clears the token from browser storage when a user logs out', async () => {
    const email = 'test@example.com';
    const password = 'password';
    const profile = await login(email, password);
    expect(save).toHaveBeenCalledWith('token', 'fake-token');
    expect(save).toHaveBeenCalledWith('profile', { user: 'test-user' });
    expect(profile).toEqual({ user: 'test-user' });
    logout();
    expect(remove).toHaveBeenCalledWith('token');
    expect(remove).toHaveBeenCalledWith('profile');
  });
});
