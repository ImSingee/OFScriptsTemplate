import { getThisFridayAt, resetDueDateFor } from "./_utils";

export const action = new PlugIn.Action(function (selection) {
  for (const task of selection.tasks) {
    resetDueDateFor(task, getThisFridayAt);
  }
});

action.validate = function (selection) {
  return selection.tasks.length >= 1;
};

export const meta: Meta = {
  label: "Due - 3 Friday",
  identifier: "me.singee.to_this_friday",
  description: "Set the due date to this Friday 22:00.",
  author: "Bryan",
  version: "0.1",
};
