import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { HistoryItem } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date): string {
  const datePart = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  const timePart = date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  return `${datePart} at ${timePart}`;
}

export function saveHistoryToLocalStorage(query: string) {
  const history = localStorage.getItem('history');
  if (history) {
    const historyArray = JSON.parse(history);
    historyArray.push({ query, timestamp: formatDate(new Date()) });
    localStorage.setItem('history', JSON.stringify(historyArray));
  } else {
    localStorage.setItem('history', JSON.stringify([{ query, timestamp: formatDate(new Date()) }]));
  }
}

export function getHistoryFromLocalStorage(): HistoryItem[] {
  const history = localStorage.getItem('history');
  if (history) {
    return JSON.parse(history);
  }
  return [];
}

export function replaceFullHistoryInLocalStorage(newHistory: HistoryItem[]) {
  localStorage.setItem('history', JSON.stringify(newHistory));
}