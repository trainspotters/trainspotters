'use strict';
export const DAY_CLICKED = 'DAY_CLICKED';

export function clickDay(num) {
  return {
    type: DAY_CLICKED,
    payload: num,
  };
}
