const User = require("../../models/user.model");
module.exports = (res) => {
    _io.once('connection', (socket) => {
        socket.on("CLIENT_ADD_FRIEND", async (userId) => {
            const myUserId = res.locals.user.id;
            // console.log(userId);   //id cua B
            // console.log(myUserId); //id cua A
            //Them id cua A vao acceptsFriend cua B
            const existIDAinB = await User.findOne({
                _id: userId,
                acceptFriends: myUserId
            })
            if(!existIDAinB) {
                await User.updateOne({
                    _id: userId
                }, {
                    $push: { acceptFriends: myUserId }
                });
            }
            //them id cua B vao requestFriend cua A
            const existIDBinA = await User.findOne({
                _id: myUserId,
                requestFriends: userId
            })
            if(!existIDBinA) {
                await User.updateOne({
                    _id: myUserId
                }, {
                    $push: { requestFriends: userId }
                });
            }
        });
    })
}