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
  return (
    <div className="App">
      <div className="left">
        <FriendsList />
        <FriendAddForm />
        <Button>Add Friend</Button>
      </div>
      <div className="right">
        <FormSplitBill />
      </div>
    </div>
  );
}

function Button({ children }) {
  return <button className="btn">{children}</button>;
}

function FriendsList() {
  const friends = initialFriends;
  return (
    <ul>
      {friends.map((friend) => (
        <Friend friend={friend} key={friend.id} />
      ))}
    </ul>
  );
}

function Friend({ friend }) {
  return (
    <li>
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
      <Button>Select</Button>
    </li>
  );
}

function FriendAddForm() {
  return (
    <form className="add-form">
      <label>🧑‍🤝‍🧑 Friend name</label>
      <input type="text"></input>

      <label>📷 Image url</label>
      <input type="text"></input>

      <Button>Add</Button>
    </form>
  );
}

function FormSplitBill() {
  return (
    <form className="split-bill-form">
      <h2>Split a bill with X</h2>
      <label>💰 Bill value</label>
      <input type="number"></input>

      <label>🧍‍♂️Your expense</label>
      <input type="number"></input>

      <label>🧑‍🤝‍🧑 X's Expense</label>
      <input type="number" disabled></input>

      <label>🤑 Who is paying the bill</label>
      <select>
        <option value="user">You</option>
        <option value="friend">X</option>
      </select>

      <Button>Split bill</Button>
    </form>
  );
}
