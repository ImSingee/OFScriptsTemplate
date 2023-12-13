/**/

import { getNextFridayAt, getNextMondayAt } from "./_utils";
import { allProjects } from "./_const";

export const action = new PlugIn.Action(function (selection) {
  for (const task of selection.tasks) {
    task.deferDate = getNextMondayAt(5);
    task.dueDate = getNextFridayAt(20);

    if (task.inInbox) {
      task.assignedContainer = allProjects.Planned();
    }
  }
});

action.validate = function (selection) {
  return selection.tasks.length >= 1;
};

export const meta: Meta = {
  identifier: "me.singee.to_next_week",
  label: "Delay - Next Week",
  description: "Delay the task to next week (Monday to Friday).",
  version: "0.1",
  author: "Bryan",
};
