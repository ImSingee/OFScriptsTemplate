import { resetDueDateFor, getTodayAt } from "./_utils";

export const action = new PlugIn.Action(function (selection) {
  for (const task of selection.tasks) {
    resetDueDateFor(task, getTodayAt);
  }
});

action.validate = function (selection) {
  return selection.tasks.length >= 1;
};

export const meta: Meta = {
  label: "Due - 1 Today",
  identifier: "me.singee.to_today",
  description: "Set the due date to today 22:00.",
  author: "Bryan",
  version: "0.1",
};
