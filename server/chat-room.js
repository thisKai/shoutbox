let chatRoomId;
async function initializeChatRoom(db) {
  const result = await db.run('INSERT INTO ChatRooms DEFAULT VALUES');
  chatRoomId = result.stmt.lastID;
}

module.exports = {
  initializeChatRoom,
  chatRoomId: () => chatRoomId,
};
