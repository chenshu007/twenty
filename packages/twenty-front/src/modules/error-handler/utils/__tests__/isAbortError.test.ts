import { isAbortError } from '@/error-handler/utils/isAbortError';

describe('isAbortError', () => {
  it('should return true for a standard AbortError', () => {
    const error = new DOMException('The user aborted a request.', 'AbortError');

    expect(isAbortError(error)).toBe(true);
  });

  it('should return true when the network error is an AbortError', () => {
    const error = {
      networkError: new DOMException('Request aborted', 'AbortError'),
    };

    expect(isAbortError(error)).toBe(true);
  });

  it('should return true for the WebKit "Cancelled" fetch error', () => {
    expect(isAbortError(new TypeError('Cancelled'))).toBe(true);
  });

  it('should return true for the WebKit "Canceled" fetch error', () => {
    expect(isAbortError(new TypeError('Canceled'))).toBe(true);
  });

  it('should return true regardless of case', () => {
    expect(isAbortError(new TypeError('cancelled'))).toBe(true);
    expect(isAbortError(new TypeError('canceled'))).toBe(true);
  });

  it('should return false for a TypeError with another message', () => {
    expect(isAbortError(new TypeError('Load failed'))).toBe(false);
  });

  it('should return false for a non-TypeError with a cancel message', () => {
    expect(isAbortError(new Error('Canceled'))).toBe(false);
  });

  it('should return false for non-object values', () => {
    expect(isAbortError(undefined)).toBe(false);
    expect(isAbortError(null)).toBe(false);
    expect(isAbortError('AbortError')).toBe(false);
  });
});
