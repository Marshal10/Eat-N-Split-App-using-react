import { useState } from "react";
import Button from "./Button";

export default function FriendAddForm({ handleAddFriend }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");

  function handleSubmit(e) {
    e.preventDefault();
    if (!name || !image) return;

    const id = crypto.randomUUID();
    const newFriend = { id, name, image: `${image}?=${id}`, balance: 0 };
    handleAddFriend(newFriend);
    setName("");
    setImage("https://i.pravatar.cc/48");
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <label>🧑‍🤝‍🧑 Friend name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName((n) => e.target.value)}
      ></input>

      <label>📷 Image url</label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage((i) => e.target.value)}
      ></input>

      <Button>Add</Button>
    </form>
  );
}
