import { allProjects } from "./_const";

/**
 * Add `days` to date `d`, return the new date
 * @param  d - the date to add days to
 * @param days - the number of days to add
 * @returns the new date
 */
export function addDays(d: Date, days: number): Date {
  const date = new Date(d);
  date.setDate(date.getDate() + days);
  return date;
}

export function addOneDay(d: Date): Date {
  return addDays(d, 1);
}

export function minusOneDay(d: Date): Date {
  return addDays(d, -1);
}

/**
 * Set the hour of the specified date, return the new date
 * @param d - the date to set hour
 * @param hour - the hour to set
 * @param minute - the minute to set (default to 0)
 * @param second - the second to set (default to 0)
 * @param msec - the millisecond to set (default to 0)
 * @returns the new date with hour set
 */
export function setHour(
  d: Date,
  hour: number,
  minute = 0,
  second = 0,
  msec = 0,
): Date {
  const date = new Date(d);
  date.setHours(hour, minute, second, msec);
  return date;
}

export function addDaysAndSetHour(
  d: Date,
  addDays: number,
  hour: number,
  minute = 0,
  second = 0,
  msec = 0,
) {
  const newDate = new Date(d);
  newDate.setDate(newDate.getDate() + addDays);
  newDate.setHours(hour, minute, second, msec);
  return newDate;
}

// Generate a random int number between [min, max]
export function randomInt(min: number, max: number): number {
  // 先判断参数是否合法
  if (min > max || isNaN(min) || isNaN(max)) {
    throw new Error("Invalid parameters");
  }

  // 计算随机数的范围
  const range = max - min + 1;

  // 生成随机数并返回
  return Math.floor(Math.random() * range + min);
}

export type dateGetter = (
  hour: number,
  minute?: number,
  second?: number,
  msec?: number,
) => Date;

/**
 * set the hour of today, return the new date
 * @param hour - hour, range from 0-23
 * @param [minute=0] - minute, range from 0-59, default to 0
 * @param [second=0] - second, range from 0-59, default to 0
 * @param [msec=0] - millisecond, range from 0-999, default to 0
 * @returns the new date with hour set
 */
export function getTodayAt(
  hour: number,
  minute = 0,
  second = 0,
  msec = 0,
): Date {
  const now = new Date();
  now.setHours(hour, minute, second, msec);
  return now;
}

/**
 * Get the specified time on the next Monday
 * @param hour - hour, range from 0-23
 * @param [minute=0] - minute, range from 0-59, default to 0
 * @param [second=0] - second, range from 0-59, default to 0
 * @param [msec=0] - millisecond, range from 0-999, default to 0
 * @returns the specified time on the next Monday
 */
export function getNextMondayAt(
  hour: number,
  minute = 0,
  second = 0,
  msec = 0,
): Date {
  const now = getTodayAt(hour, minute, second, msec);

  const currentDay = now.getDay();
  const daysToNextMonday = (1 - currentDay + 7) % 7 || 7;
  const nextMonday = new Date(now.setDate(now.getDate() + daysToNextMonday));

  return nextMonday;
}

/**
 * Get the specified time on the next Friday
 * @param hour - hour, range from 0 - 23
 * @param [minute=0] - minute, range from 0 - 59, default to 0
 * @param [second=0] - second, range from 0 - 59, default to 0
 * @param [msec=0] - millisecond, range from 0 - 999, default to 0
 * @returns the specified time on the next Friday
 */
export function getNextFridayAt(
  hour: number,
  minute = 0,
  second = 0,
  msec = 0,
): Date {
  const monday = getNextMondayAt(hour, minute, second, msec);
  return addDays(monday, 4);
}

export function getNextSundayAt(
  hour: number,
  minute = 0,
  second = 0,
  msec = 0,
): Date {
  const monday = getNextMondayAt(hour, minute, second, msec);
  return addDays(monday, 6);
}

/**
 * Get the specified time on this Monday of the week
 * @param hour - hour, range from 0-23
 * @param [minute=0] - minute, range from 0-59, default to 0
 * @param [second=0] - second, range from 0-59, default to 0
 * @param [msec=0] - millisecond, range from 0-999, default to 0
 * @returns the specified time on this Monday of the week
 */
export function getThisMondayAt(
  hour: number,
  minute = 0,
  second = 0,
  msec = 0,
): Date {
  const next = getNextMondayAt(hour, minute, second, msec);
  return addDays(next, -7);
}

// Return the date part of `d` (resetting the time part to midnight)
export function getDate(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

// Return the difference in days between date1 and date2 (considering only the days)
export function daysBetween(date1: Date, date2: Date) {
  return Math.floor(
    (getDate(date1).getTime() - getDate(date2).getTime()) / 86400000,
  );
}

/**
 * Get the specified time on this Friday of the week
 * @param hour - hour, range from 0-23
 * @param [minute=0] - minute, range from 0-59, default to 0
 * @param [second=0] - second, range from 0-59, default to 0
 * @param [msec=0] - millisecond, range from 0-999, default to 0
 * @returns the specified time on this Friday of the week
 */
export function getThisFridayAt(
  hour: number,
  minute = 0,
  second = 0,
  msec = 0,
): Date {
  const monday = getThisMondayAt(hour, minute, second, msec);
  return addDays(monday, 4);
}

export function getThisSundayAt(
  hour: number,
  minute = 0,
  second = 0,
  msec = 0,
): Date {
  const monday = getThisMondayAt(hour, minute, second, msec);
  return addDays(monday, 6);
}

// db returns current opened db
export function db(): Database {
  return globalThis as any as Database;
}

export async function alert(message: string, title = "") {
  return new Alert(title, message).show();
}

export function catchError(f: ActionPerformFunction): ActionPerformFunction {
  return async (selection, sender) => {
    try {
      await f(selection, sender);
    } catch (err: any) {
      if (!err.causedByUserCancelling) {
        await alert(err.message, "ERROR: " + err.name);
      }
    }
  };
}

export function resetDueDateFor(task: Task, dateGetter: dateGetter) {
  const oldTaskDeferDate = task.deferDate;
  const oldTaskDueDate = task.dueDate;

  if (!oldTaskDueDate) {
    // no due date previous
    task.deferDate = null;
    task.dueDate = dateGetter(22);
  } else {
    // just modify the date part of the due date
    task.dueDate = dateGetter(
      oldTaskDueDate.getHours(),
      oldTaskDueDate.getMinutes(),
      oldTaskDueDate.getSeconds(),
      oldTaskDueDate.getMilliseconds(),
    );

    if (oldTaskDeferDate) {
      // maintain the defer date
      const daysDiff = daysBetween(oldTaskDueDate, oldTaskDeferDate);
      task.deferDate = addDaysAndSetHour(
        task.dueDate,
        -daysDiff,
        oldTaskDeferDate.getHours(),
        oldTaskDeferDate.getMinutes(),
        oldTaskDeferDate.getSeconds(),
        oldTaskDeferDate.getMilliseconds(),
      );
    }
  }

  if (task.inInbox) {
    task.assignedContainer = allProjects.Planned();
  }
}

export function dateString(d: Date) {
  function pad2(x: number): string {
    const xx = String(x);
    if (xx.length >= 2) {
      return xx;
    }
    return "0" + xx;
  }

  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
}

export function datetimeString(d: Date) {
  function pad2(x: number): string {
    const xx = String(x);
    if (xx.length >= 2) {
      return xx;
    }
    return "0" + xx;
  }

  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(
    d.getDate(),
  )} ${pad2(d.getHours())}:${pad2(d.getMinutes())}`;
}
