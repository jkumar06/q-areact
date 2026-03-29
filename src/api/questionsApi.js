/**
 * API service for fetching Q&A questions
 * Uses static data from data.js (no backend required)
 */

import { QA_DATA } from '../data.js';

// Simulate async API calls with a small delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Fetch all questions
 */
export async function fetchQuestions() {
  await delay(100);
  
  return {
    success: true,
    data: QA_DATA,
    total: QA_DATA.length,
    timestamp: new Date().toISOString()
  };
}

/**
 * Search questions with query and experience filter
 */
export async function searchQuestions(query, experience = 'all') {
  await delay(100);
  
  const q = query.toLowerCase().trim();
  
  // Require at least 2 characters for search
  if (query && q.length < 2) {
    return {
      success: false,
      error: 'Search query must be at least 2 characters',
      data: []
    };
  }
  
  // Filter questions
  let results = QA_DATA;
  
  // Apply experience filter
  if (experience !== 'all') {
    results = results.filter(item => item.experience === experience);
  }
  
  // Apply search filter
  if (q) {
    results = results.filter(item =>
      item.question.toLowerCase().includes(q) ||
      item.tags.some(tag => tag.toLowerCase().includes(q)) ||
      item.answer.toLowerCase().includes(q)
    );
  }
  
  return {
    success: true,
    data: results,
    total: results.length,
    query: q,
    experience,
    timestamp: new Date().toISOString()
  };
}

/**
 * Fetch a single question by ID
 */
export async function fetchQuestionById(id) {
  await delay(50);
  
  const question = QA_DATA.find(q => q.id === id);
  
  if (!question) {
    throw new Error(`Question with id ${id} not found`);
  }
  
  return question;
}

/**
 * Fetch questions by experience level
 */
export async function fetchQuestionsByExperience(level) {
  await delay(100);
  
  const validLevels = ['junior', 'mid', 'senior'];
  
  if (!validLevels.includes(level)) {
    throw new Error(`Invalid experience level. Must be one of: ${validLevels.join(', ')}`);
  }
  
  const results = QA_DATA.filter(q => q.experience === level);
  
  return {
    success: true,
    data: results,
    level,
    total: results.length,
    timestamp: new Date().toISOString()
  };
}

/**
 * Fetch API statistics
 */
export async function fetchStats() {
  await delay(50);
  
  const stats = {
    total: QA_DATA.length,
    junior: QA_DATA.filter(q => q.experience === 'junior').length,
    mid: QA_DATA.filter(q => q.experience === 'mid').length,
    senior: QA_DATA.filter(q => q.experience === 'senior').length,
    tags: [...new Set(QA_DATA.flatMap(q => q.tags))].length
  };
  
  return {
    success: true,
    data: stats,
    timestamp: new Date().toISOString()
  };
}
