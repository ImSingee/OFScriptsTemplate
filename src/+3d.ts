import { addDays } from "./_utils";

export const action = new PlugIn.Action(function (selection) {
  for (const task of selection.tasks) {
    if (task.deferDate) task.deferDate = addDays(task.deferDate, 3);
    if (task.dueDate) task.dueDate = addDays(task.dueDate, 3);
  }
});

action.validate = function (selection) {
  return selection.tasks.length >= 1;
};

export const meta: Meta = {
  label: "+3d",
  description: "Add three days to both the start and due dates of the task.",
  identifier: "me.singee.add_three",
  author: "Bryan",
  version: "0.1",
};
