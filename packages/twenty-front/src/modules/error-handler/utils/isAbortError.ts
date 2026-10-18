import { isObject } from '@sniptt/guards';

// WebKit rejects cancelled fetches with a TypeError instead of an AbortError,
// spelled "Cancelled" or "Canceled" depending on the version
const WEBKIT_CANCELLED_FETCH_MESSAGE_REGEX = /^cancell?ed$/i;

export const isAbortError = (error: unknown): boolean => {
  if (!isObject(error)) {
    return false;
  }

  const { name, networkError } = error as {
    name?: unknown;
    networkError?: { name?: unknown };
  };

  if (name === 'AbortError' || networkError?.name === 'AbortError') {
    return true;
  }

  return (
    error instanceof TypeError &&
    WEBKIT_CANCELLED_FETCH_MESSAGE_REGEX.test(error.message.trim())
  );
};
