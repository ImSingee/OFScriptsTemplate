import { getNextFridayAt, resetDueDateFor } from "./_utils";

export const action = new PlugIn.Action(function (selection) {
  for (const task of selection.tasks) {
    resetDueDateFor(task, getNextFridayAt);
  }
});

action.validate = function (selection) {
  return selection.tasks.length >= 1;
};

export const meta: Meta = {
  label: "Due - 5 Next Friday",
  identifier: "me.singee.to_next_friday",
  description: "Set the due date to the next Friday.",
  author: "Bryan",
  version: "0.1",
};
