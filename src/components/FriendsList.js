import Friend from "./Friend";
export default function FriendsList({
  friends,
  selectedFriend,
  handleSelectedFriend,
}) {
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
