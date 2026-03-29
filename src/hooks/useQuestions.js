/**
 * Custom hook for fetching questions using React Query
 * Handles caching, loading states, errors, and refetching
 */

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchQuestions, fetchQuestionById } from '../api/questionsApi.js';

/**
 * Hook to fetch all questions
 * Caches for 5 minutes, refetches in background
 */
export function useAllQuestions() {
  return useQuery({
    queryKey: ['questions', 'all'],
    queryFn: fetchQuestions,
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10,    // 10 minutes (garbage collection time)
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
}

/**
 * Hook to fetch a specific question by ID
 */
export function useQuestion(id) {
  return useQuery({
    queryKey: ['questions', id],
    queryFn: () => fetchQuestionById(id),
    enabled: !!id, // only fetch if id exists
    staleTime: 1000 * 60 * 10,
  });
}

/**
 * Hook for manual query manipulation
 */
export function useQuestionsQueryClient() {
  return useQueryClient();
}
