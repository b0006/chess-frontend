import { useState, useEffect, useCallback } from 'react';

interface MediaResult {
  matches: boolean;
  media: string;
}

type MediaType = 'min' | 'max';

const fallbackMatchMedia = (query: string) => {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return null;
  }

  return window.matchMedia(query);
};

const omitMatchMediaResult = (matchMediaResult: MediaResult | null) => {
  if (!matchMediaResult) {
    return null;
  }

  return { media: matchMediaResult.media, matches: matchMediaResult.matches };
};

const useMedia = (
  query: string
): {
  media: string;
  matches: boolean;
} | null => {
  const [result, setResult] = useState(() => omitMatchMediaResult(fallbackMatchMedia(query)));

  const callback = useCallback((matchMediaResult) => setResult(omitMatchMediaResult(matchMediaResult)), [setResult]);

  useEffect(() => {
    const matchMediaResult = fallbackMatchMedia(query);
    callback(matchMediaResult);
    matchMediaResult?.addEventListener('change', callback);
    return () => {
      return matchMediaResult?.removeEventListener('change', callback);
    };
  }, [callback, query]);

  return result;
};

/**
 * Проверяет, находится ли текущее разрешение в интервале между параметрами
 * @param {number} minWidth
 * @param {number} maxWidth
 * @returns {boolean}
 */
const useBreakpointInterval = (minWidth: number, maxWidth: number): boolean => {
  const result = useMedia(`(min-width: ${minWidth}px) and (max-width: ${maxWidth}px)`);
  return result?.matches || false;
};

const useMediaPredicate = (query: string): boolean => {
  const result = useMedia(query);
  return (result && result.matches) || false;
};

const useMediaBreakpoint = (breakpoint: number, mediaType: MediaType = 'min'): boolean => {
  const result = useMedia(`(${mediaType}-width: ${breakpoint}px)`);
  return (result && result.matches) || false;
};

export { useBreakpointInterval, useMediaBreakpoint, useMedia, useMediaPredicate };
export type { MediaResult, MediaType };
