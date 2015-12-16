'use strict';
export const DAY_CLICKED = 'DAY_CLICKED';

export function clickDay(day) {
  return {
    type: DAY_CLICKED,
    day: day,
  };
}
