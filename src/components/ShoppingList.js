import React, { useState, useEffect } from "react";

const ShoppingList = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: "", category: "" });

  useEffect(() => {
    const fetchItems = async () => {
      const response = await fetch("/api/items");
      const data = await response.json();
      setItems(data);
    };

    fetchItems();
  }, []);

  const handleAddItem = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newItem),
    });
    const addedItem = await response.json();
    setItems((prevItems) => [...prevItems, addedItem]);
    setNewItem({ name: "", category: "" });
  };

  const handleToggleInCart = async (itemId) => {
    const item = items.find((i) => i.id === itemId);
    const updatedItem = { ...item, isInCart: !item.isInCart };

    await fetch(`/api/items/${itemId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedItem),
    });

    setItems((prevItems) =>
      prevItems.map((i) => (i.id === itemId ? updatedItem : i))
    );
  };

  const handleDeleteItem = async (itemId) => {
    await fetch(`/api/items/${itemId}`, {
      method: "DELETE",
    });

    setItems((prevItems) => prevItems.filter((i) => i.id !== itemId));
  };

  return (
    <div>
      <form onSubmit={handleAddItem}>
        <label>
          Name:
          <input
            type="text"
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
          />
        </label>
        <label>
          Category:
          <input
            type="text"
            value={newItem.category}
            onChange={(e) =>
              setNewItem({ ...newItem, category: e.target.value })
            }
          />
        </label>
        <button type="submit">Add to List</button>
      </form>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name} ({item.category})
            <button onClick={() => handleToggleInCart(item.id)}>
              {item.isInCart ? "Remove From Cart" : "Add to Cart"}
            </button>
            <button onClick={() => handleDeleteItem(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShoppingList;