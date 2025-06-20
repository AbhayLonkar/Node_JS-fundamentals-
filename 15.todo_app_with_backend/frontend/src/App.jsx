import AppName from "./components/AppName";
import AddTodo from "./components/AddTodo";
import TodoItems from "./components/TodoItems";
import WelcomeMessage from "./components/WelcomeMessage";
import "./App.css";
import { useEffect, useState } from "react";
import { addItemToServer, deleteItem, getItemFromServer } from "../services/itemsService";

function App() {
  const [todoItems, setTodoItems] = useState([]);

  useEffect(() => {
    getItemFromServer().then(items => {
      setTodoItems(items);
    })
  }, []);

  const handleNewItem = async (itemName, itemDueDate) => {
    const response = await addItemToServer(itemName, itemDueDate);
    const newTodoItems = [
      ...todoItems,
      response,
    ];
    setTodoItems(newTodoItems);
  };

  const handleDeleteItem = async (itemId) => {
    const id = await deleteItem(itemId)
    const newTodoItems = todoItems.filter((item) => item.id !== id);
    setTodoItems(newTodoItems);
  };

  return (
    <div className="app-bg">
      <main className="todo-wrapper">
        <section className="todo-card">
          <AppName />
          <AddTodo onNewItem={handleNewItem} />
          {todoItems.length === 0 && <WelcomeMessage />}
          <TodoItems
            todoItems={todoItems}
            onDeleteClick={handleDeleteItem}
          />
        </section>
      </main>
    </div>
  );
}

export default App;
