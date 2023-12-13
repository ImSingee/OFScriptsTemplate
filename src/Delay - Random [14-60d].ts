import { addDays, getTodayAt, randomInt } from "./_utils";
import { allProjects } from "./_const";

export const action = new PlugIn.Action(function (selection) {
  for (const task of selection.tasks) {
    const date = getTodayAt(5);
    date.setDate(date.getDate() + randomInt(14, 60));

    task.deferDate = date;
    task.dueDate = addDays(date, 3);

    if (task.inInbox) {
      task.assignedContainer = allProjects.Planned();
    }
  }
});

action.validate = function (selection) {
  return selection.tasks.length >= 1;
};

export const meta: Meta = {
  label: "Delay - Random [14-60d]",
  identifier: "me.singee.to_random",
  description:
    "Delay the task to a random date between 14 and 60 days from now.",
  version: "0.1",
  author: "Bryan",
};
