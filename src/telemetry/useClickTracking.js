import { useEffect, useRef } from 'react';
import { useTelemetry } from './TelemetryProvider';

/**
 * Hook to automatically track clicks on an element
 * @param {string} label - Label for the click event
 * @param {Object} options - Options for tracking
 * @returns {Object} - Ref to attach to the element
 */
export function useClickTracking(label, options = {}) {
  const { record, enabled } = useTelemetry();
  const elementRef = useRef(null);

  useEffect(() => {
    if (!enabled || !label) return;

    const element = elementRef.current;
    if (!element) return;

    const handleClick = (e) => {
      record({ 
        type: 'click', 
        label,
        element: {
          tag: e.currentTarget.tagName,
          id: e.currentTarget.id || null,
          className: e.currentTarget.className || null,
        }
      });
    };

    element.addEventListener('click', handleClick);

    return () => {
      element.removeEventListener('click', handleClick);
    };
  }, [label, record, enabled]);

  return elementRef;
}

/**
 * Hook to track clicks globally on common interactive elements
 * This can be used in MainLayout to automatically track clicks on buttons, links, etc.
 */
export function useGlobalClickTracking() {
  const { record, enabled } = useTelemetry();

  useEffect(() => {
    if (!enabled) return;

    const handleClick = (e) => {
      const target = e.target;
      
      // Skip if clicking inside telemetry panel
      if (target.closest('[role="dialog"]')) return;

      // Generate label based on element
      let label = null;
      
      // Check for data-telemetry-label attribute first
      const labeledElement = target.closest('[data-telemetry-label]');
      if (labeledElement) {
        label = labeledElement.getAttribute('data-telemetry-label');
      } else {
        // Auto-generate labels for common elements
        if (target.tagName === 'A') {
          const href = target.getAttribute('href');
          const text = target.textContent?.trim() || 'Link';
          label = `Link: ${text}${href ? ` (${href})` : ''}`;
        } else if (target.tagName === 'BUTTON' || target.closest('button')) {
          const button = target.closest('button') || target;
          const text = button.textContent?.trim() || button.getAttribute('aria-label') || 'Button';
          label = `Button: ${text}`;
        } else if (target.closest('a')) {
          const link = target.closest('a');
          const text = link.textContent?.trim() || 'Link';
          const href = link.getAttribute('href');
          label = `Link: ${text}${href ? ` (${href})` : ''}`;
        }
      }

      if (label) {
        record({ 
          type: 'click', 
          label,
          element: {
            tag: target.tagName,
            id: target.id || null,
            className: target.className || null,
          }
        });
      }
    };

    document.addEventListener('click', handleClick, true); // Use capture phase

    return () => {
      document.removeEventListener('click', handleClick, true);
    };
  }, [record, enabled]);
}
