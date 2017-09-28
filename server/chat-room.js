async function initializeChatRoom(db) {
  const result = await db.run('INSERT INTO ChatRooms DEFAULT VALUES');
  const chatRoomId = result.stmt.lastID;
}

module.exports = {
  initializeChatRoom,
};
