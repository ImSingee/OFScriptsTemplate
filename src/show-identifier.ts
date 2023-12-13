function showForObject(obj: DatabaseObject) {
  const id = obj.id.primaryKey;
  Pasteboard.general.string = id;
  new Alert("Identifier", id).show();
}

function showForObjects(objs: Array<DatabaseObject>) {
  for (const obj of objs) {
    showForObject(obj);
  }
}

export const action = new PlugIn.Action(function (selection) {
  showForObjects(selection.projects);
  showForObjects(selection.tags);
});

action.validate = function (selection) {
  return 1 === selection.projects.length + selection.tags.length;
};

export const meta: Meta = {
  label: "Show Identifier",
  description: "Show Identifier (only support project and tag now)",
  identifier: "me.singee.show_identifier",
  author: "Bryan",
  version: "0.1",
};
