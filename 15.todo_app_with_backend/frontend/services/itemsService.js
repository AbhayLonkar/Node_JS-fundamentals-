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

export const getItemFromServer = async () => {
  const response = await fetch('http://localhost:3000/api/', { method: "GET" });
  const items = await response.json();
  return items.map(mapServerItemsToLocalItems);
}

export const markItemCompleted = async (id) => {
  const response = await fetch(`http://localhost:3000/api/${id}/completed`, {
    method: "PUT",
  });
  const item = await response.json();
  return mapServerItemsToLocalItems(item);
}

export const deleteItem = async (id) => {
  await fetch(`http://localhost:3000/api/delete/${id}`, {
    method: "delete",
  });
  return id;
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