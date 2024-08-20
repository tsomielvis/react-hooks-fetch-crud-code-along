import { rest } from "msw";

let items = [
  { id: 1, name: "Yogurt", category: "Dairy", isInCart: false },
  { id: 2, name: "Pomegranate", category: "Fruit", isInCart: false },
  { id: 3, name: "Lettuce", category: "Vegetable", isInCart: false },
];

export const handlers = [
  rest.get("/api/items", (req, res, ctx) => {
    return res(ctx.json(items));
  }),

  rest.post("/api/items", (req, res, ctx) => {
    const newItem = req.body;
    newItem.id = items.length + 1;
    items.push(newItem);
    return res(ctx.json(newItem));
  }),

  rest.put("/api/items/:id", (req, res, ctx) => {
    const { id } = req.params;
    const updatedItem = req.body;
    items = items.map((item) =>
      item.id === parseInt(id) ? updatedItem : item
    );
    return res(ctx.json(updatedItem));
  }),

  rest.delete("/api/items/:id", (req, res, ctx) => {
    const { id } = req.params;
    items = items.filter((item) => item.id !== parseInt(id));
    return res(ctx.status(204));
  }),
];

export const resetData = () => {
  items = [
    { id: 1, name: "Yogurt", category: "Dairy", isInCart: false },
    { id: 2, name: "Pomegranate", category: "Fruit", isInCart: false },
    { id: 3, name: "Lettuce", category: "Vegetable", isInCart: false },
  ];
};