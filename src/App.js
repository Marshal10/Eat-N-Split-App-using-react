import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export default function App() {
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [friends, setFriends] = useState(initialFriends);
  const [selectedFriend, setSelectedFriend] = useState(null);

  function handleShowAddFriend() {
    setShowAddFriend((s) => !s);
  }

  function handleAddFriend(friend) {
    setFriends((f) => [...f, friend]);
    setShowAddFriend(false);
  }

  function handleSelectedFriend(friend) {
    setSelectedFriend((sf) => (sf?.id === friend.id ? null : friend));
    setShowAddFriend(false);
  }

  function onSplitBill(value) {
    setFriends((friends) =>
      friends.map((friend) =>
        friend.id === selectedFriend.id
          ? { ...friend, balance: friend.balance + value }
          : friend
      )
    );

    setSelectedFriend(null);
  }

  return (
    <div className="app">
      <div className="left">
        <FriendsList
          friends={friends}
          selectedFriend={selectedFriend}
          handleSelectedFriend={handleSelectedFriend}
        />
        {showAddFriend && <FriendAddForm handleAddFriend={handleAddFriend} />}
        <Button onClick={handleShowAddFriend}>
          {showAddFriend ? "Close" : "Add Friend"}
        </Button>
      </div>
      <div className="right">
        {selectedFriend && (
          <FormSplitBill
            selectedFriend={selectedFriend}
            onSplitBill={onSplitBill}
          />
        )}
      </div>
    </div>
  );
}

function Button({ children, onClick }) {
  return (
    <button className="btn" onClick={onClick}>
      {children}
    </button>
  );
}

function FriendsList({ friends, selectedFriend, handleSelectedFriend }) {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend
          friend={friend}
          key={friend.id}
          selectedFriend={selectedFriend}
          onClick={handleSelectedFriend}
        />
      ))}
    </ul>
  );
}

function Friend({ friend, selectedFriend, onClick }) {
  const isSelected = selectedFriend?.id === friend.id;
  return (
    <li className={isSelected ? "selected" : ""}>
      <img src={friend.image} alt={friend.name}></img>
      <div className="details">
        <h3>{friend.name}</h3>
        {friend.balance > 0 && (
          <p className="green">
            {friend.name} owes you ${Math.abs(friend.balance)}
          </p>
        )}
        {friend.balance < 0 && (
          <p className="red">
            You owe {friend.name} ${Math.abs(friend.balance)}
          </p>
        )}
        {friend.balance === 0 && <p>You and {friend.name} are even</p>}
      </div>
      <Button onClick={() => onClick(friend)}>
        {isSelected ? "Close" : "Select"}
      </Button>
    </li>
  );
}

function FriendAddForm({ handleAddFriend }) {
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

function FormSplitBill({ selectedFriend, onSplitBill }) {
  const [bill, setBill] = useState("");
  const [paidByUser, setPaidByUser] = useState("");
  const paidByFriend = bill ? bill - paidByUser : "";
  const [whoIsPaying, setWhoIsPaying] = useState("user");

  function handleSplitBill(e) {
    e.preventDefault();

    if (!bill || !paidByUser) return;

    onSplitBill(whoIsPaying === "user" ? paidByFriend : -paidByUser);
  }
  return (
    <form className="split-bill-form" onSubmit={handleSplitBill}>
      <h2>Split a bill with {selectedFriend.name}</h2>
      <label>💰 Bill value</label>
      <input
        type="number"
        value={bill}
        onChange={(e) => setBill((s) => +e.target.value)}
      ></input>

      <label>🧍‍♂️Your expense</label>
      <input
        type="number"
        value={paidByUser}
        onChange={(e) =>
          setPaidByUser((pbu) =>
            +e.target.value > bill ? paidByUser : +e.target.value
          )
        }
      ></input>

      <label>🧑‍🤝‍🧑 X's Expense</label>
      <input type="number" value={paidByFriend} disabled></input>

      <label>🤑 Who is paying the bill</label>
      <select
        value={whoIsPaying}
        onChange={(e) => setWhoIsPaying((wip) => e.target.value)}
      >
        <option value="user">You</option>
        <option value="friend">{selectedFriend.name}</option>
      </select>

      <Button>Split bill</Button>
    </form>
  );
}
