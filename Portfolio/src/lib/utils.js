import { clsx } from "clsx";                            // Lightweight JavaScript utility library for conditionally constructing className strings in React applications
import { twMerge } from "tailwind-merge";               // Resolves conflicting Tailwind CSS utility class by automatically merging classes and selecting the latter as the most president

/*  
  function that accepts any number of class-ish arguments;
  normalizes the arguments into a single space-separated class string;
  resolves any tailwind conflicts found
*/
export function cn(...inputs) {
  return twMerge(clsx(...inputs));
}
