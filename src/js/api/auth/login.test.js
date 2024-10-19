import { login } from './login';
import { describe, it, expect, jest } from '@jest/globals';
import { save } from '../../storage/index.js';

jest.mock('../../storage/index.js', () => ({
  save: jest.fn(),
}));

globalThis.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () =>
      Promise.resolve({ accessToken: 'fake-token', user: 'test-user' }),
  }),
);

describe('Login', () => {
  describe('Logging in', () => {
    // it('stores a token when provided with valid credentials', async () => {
    //   const email = 'test@example.com';
    //   const password = 'password';
    //   const profile = await login(email, password);
    //   expect(save).toHaveBeenCalledWith('token', 'fake-token');
    //   expect(save).toHaveBeenCalledWith('profile', { user: 'test-user' });
    //   expect(profile).toEqual({ user: 'test-user' });
    // });
  });

  // describe('Logging out', () => {
  //   it('clears the token from browser storage', () => {
  //     clear('token');
  //     clear('profile');

  //     expect(clear).toHaveBeenCalledWith('token');
  //     expect(clear).toHaveBeenCalledWith('profile');
  //   });
  // });
});
