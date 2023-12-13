import { addOneDay } from "./_utils";

export const action = new PlugIn.Action(function (selection) {
  for (const task of selection.tasks) {
    if (task.deferDate) task.deferDate = addOneDay(task.deferDate);
    if (task.dueDate) task.dueDate = addOneDay(task.dueDate);
  }
});

action.validate = function (selection) {
  return selection.tasks.length >= 1;
};

export const meta: Meta = {
  identifier: "me.singee.add_one",
  label: "+1d",
  description: "Add one day to both the start and due dates of the task.",
  author: "Bryan",
  version: "0.1",
};
