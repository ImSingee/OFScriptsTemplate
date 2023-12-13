import { minusOneDay } from "./_utils";

export const action = new PlugIn.Action(function (selection) {
  for (const task of selection.tasks) {
    if (task.deferDate) task.deferDate = minusOneDay(task.deferDate);
    if (task.dueDate) task.dueDate = minusOneDay(task.dueDate);
  }
});

action.validate = function (selection) {
  return selection.tasks.length >= 1;
};

export const meta: Meta = {
  label: "-1d",
  identifier: "me.singee.minus_one",
  description:
    "Subtract one day from both the start and due dates of the task.",
  version: "0.1",
  author: "Bryan",
};
