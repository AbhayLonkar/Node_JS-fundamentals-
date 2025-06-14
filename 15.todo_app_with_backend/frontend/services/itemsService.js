export const addItemToServer = async (task, date) => {
  const response = await fetch("http://localhost:3000/api/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: task, dueDate: date }),
  });
  const item = await response.json();
  return mapServerItemsToLocalItems(item);
}

const mapServerItemsToLocalItems = (item) => {
  return {
    id: item._id,
    name: item.tasks,
    dueDate: item.date,
    completed: item.completed,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
  };
}