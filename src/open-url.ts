function getLinksInText(text: string): string[] {
  if (!text) return [];

  return (
    text.match(
      /(\w+):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#%=~_|/]/g,
    ) || []
  );
}

function getLinksForProject(project: Project) {
  return getLinksInText(project.note);
}

function getLinksForTask(task: Task) {
  let links = [...getLinksInText(task.name), ...getLinksInText(task.note)];

  if (links && links.length !== 0) return links;

  if (task.inInbox) return [];

  // 找到父级去处理
  // 受限于目前 API 不能找到 parent node 而只能找到 parent project
  if (!task.containingProject) return [];
  return getLinksForProject(task.containingProject);
}

function getLinksFromSelection(selection: Selection) {
  const tasks = selection.tasks;
  const projects = selection.projects;

  let result = [];

  for (let task of tasks) {
    const links = getLinksForTask(task);

    if (links) result.push(...links);
  }

  for (let project of projects) {
    const links = getLinksForProject(project);

    if (links) result.push(...links);
  }

  const links = [];

  for (let i = 0; i < result.length; i++) {
    if (links.indexOf(result[i]) === -1) {
      links.push(result[i]);
    }
  }

  return links;
}

function openLink(link: string, askIfOpen = false) {
  if (askIfOpen) {
    const alert = new Alert("是否打开网址？", link);
    alert.addOption("打开");
    alert.addOption("取消");

    alert.show().then((chosen) => {
      if (chosen === 1) {
        // 取消
        return;
      } else {
        // 打开
        openLink(link);
      }
    });
  } else {
    const url = URL.fromString(link)!;
    url.open();
  }
}

export const action = new PlugIn.Action(function (selection) {
  // Add code to run when the action is invoked
  const links = getLinksFromSelection(selection);

  if (links.length === 1) {
    openLink(links[0]);
  } else {
    // 多个链接，询问是否打开
    const title = "将会打开多个链接，是否继续？";
    let message = `将会打开 ${links.length} 个链接`;

    for (let link of links) {
      message += "\n" + link;
    }

    const alert = new Alert(title, message);
    alert.addOption("全部打开");
    alert.addOption("取消");
    alert.addOption("让我决定每一个");

    alert.show().then((chosen) => {
      if (chosen === 1) {
        // 取消
        return;
      } else if (chosen === 0) {
        // 全部打开
        for (let link of links) {
          openLink(link);
        }
      } else {
        // 分别询问
        for (let link of links) {
          openLink(link, true);
        }
      }
    });
  }
});

action.validate = function (selection) {
  return getLinksFromSelection(selection).length !== 0;
};

export const meta: Meta = {
  label: "Open URL",
  identifier: "me.singee.open_url",
  version: "0.1",
  description: "Open URL(s) for task",
  author: "Bryan",
};
