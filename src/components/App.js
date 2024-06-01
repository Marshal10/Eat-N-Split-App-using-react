import { useState } from "react";
import Button from "./Button";
import FriendsList from "./FriendsList";
import FriendAddForm from "./FriendAddForm";
import FormSplitBill from "./FormSplitBill";

const initialFriends = [];

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
