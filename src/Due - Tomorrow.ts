import { addDays, getTodayAt, resetDueDateFor } from "./_utils";

export const action = new PlugIn.Action(function (selection) {
  for (const task of selection.tasks) {
    resetDueDateFor(task, (hour, minute, second, msec) => {
      return addDays(getTodayAt(hour, minute, second, msec), 1);
    });
  }
});

action.validate = function (selection) {
  return selection.tasks.length >= 1;
};

export const meta: Meta = {
  label: "Due - 2 Tomorrow",
  identifier: "me.singee.to_tomorrow",
  description: "Set the due date to tomorrow 22:00.",
  author: "Bryan",
  version: "0.1",
};
