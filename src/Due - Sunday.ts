import { getThisSundayAt, resetDueDateFor } from "./_utils";

export const action = new PlugIn.Action(function (selection) {
  for (const task of selection.tasks) {
    resetDueDateFor(task, getThisSundayAt);
  }
});

action.validate = function (selection) {
  return selection.tasks.length >= 1;
};

export const meta: Meta = {
  label: "Due - 4 Sunday",
  identifier: "me.singee.to_this_sunday",
  description: "Set the due date to this Sunday 22:00.",
  author: "Bryan",
  version: "0.1",
};
