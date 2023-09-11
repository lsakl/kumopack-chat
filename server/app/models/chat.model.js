const mongoClient = require('../config/db');
const { ObjectId } = require('mongodb');
const Chat = function(chat) { };

async function updateMessageToContect(data, action) {
    try {
        
        const dataQuery = { 
            $or: [
                { userId: data.from, contactUserId: data.to },
                { userId: data.to, contactUserId: data.from },
            ]
        };
        const dataUpdate = { 
            $set: { 
                lastMessage: data.message,
                messageFrom: data.from,
                messageTo: data.to,
                messageUpdate: new Date()
            } 
        };
        const stausQuery = action!=="messages"&&data.action===1?{contactUserId: data.contactUserId}:{ contactUserId: { $nin: data.contactUserId } };
        const statusUpdate = { 
            $set: { 
                status: data.status,
            } 
        };
        const res = await mongoClient.collection("contacts").updateMany((action==="messages")?dataQuery:stausQuery, (action==="messages")?dataUpdate:statusUpdate);
        return  { status: 200, message: "อัพเดทข้อมูลเรียบร้อยแล้ว", data: res};

    } catch (err) {
        return { status: 500, message: "เกิดข้อผิดพลาดในการดำเนินการ : " + err, data: []};
    }
}

Chat.userConnected = async (userData, userConnectAll, result) => {
    try {

        await updateMessageToContect({ contactUserId : userData.userId, status : userData.connection?1:0, action : 1 }, 'status');
        const res = await mongoClient.collection('userConnection').insertOne(userData);

        if (userConnectAll.length) {

            const filter = { socketId: { $nin: userConnectAll } };
            const updateData = {
                $set: {
                    connection: false,
                }
            };

            const resDisconnection = await mongoClient.collection('userConnection').updateMany(filter, updateData);
            const findUserIdAlive = await mongoClient.collection('userConnection').find({ connection: true }, { projection: { _id: 0, userId: 1 } }).toArray();
            const userIdAlive = findUserIdAlive.map(user => user.userId);
            await updateMessageToContect({ contactUserId : userIdAlive, status : 0, action : 2 }, 'status');
            result(null, { status: 200, message: "อัพเดทข้อมูลเรียบร้อยแล้ว", data: res, resDisconnection: resDisconnection });
        } else {
            result(null, { status: 200, message: "อัพเดทข้อมูลเรียบร้อยแล้ว", data: res, resDisconnection: [] });
        }

    } catch (err) {
        result({ status: 500, message: "เกิดข้อผิดพลาดในการดำเนินการ : " + err, data: [], resDisconnection: [] });
        return;
    }
};

Chat.userDisconnect = async (userConnectAll, result) => {
    try {
        const filter = { socketId: { $nin: userConnectAll } };
        const updateData = {
            $set: {
                connection: false,
            }
        };

        const res = await mongoClient.collection('userConnection').updateMany(filter, updateData);
        const findUserIdAlive = await mongoClient.collection('userConnection').find({ connection: true }, { projection: { _id: 0, userId: 1 } }).toArray();
        const userIdAlive = findUserIdAlive.map(user => user.userId);
        await updateMessageToContect({ contactUserId : userIdAlive, status : 0, action : 2 }, 'status');
        result(null, {status: 200, message: "อัพเดทข้อมูลเรียบร้อยแล้ว", data: res});
    } catch (error) {
        result({status: 500, message: "เกิดข้อผิดพลาดในการดำเนินการ : " + error, data: []});
    }
};

Chat.saveMessageTextType = async (data, result) => {
    try {

        const res = await mongoClient.collection('messages').insertOne(data);
        if(res){
            await updateMessageToContect({ from : data.from, to : data.to, message : data.message }, 'messages');
            result(null, {status:200, message:"เพื่มข้อมูลเรียบร้อยแล้ว", data:res });
            return;
        }

    } catch (error) {
        result({status:500, message:"เกิดข้อผิดพลาดในการดำเนินการ", data:error });
        return;
    }
};

Chat.getUserConnectionByUserId = async (partnerId, userId, result) => {
    try {
        const query = {
            $or: [
                { userId: partnerId},
                { userId: userId},
            ],
            connection:true
        };//{userId:userId, connection:true}
        const res = await mongoClient.collection('userConnection').find(query).toArray();
        result(null, {status:200, message:"ดึงข้อมูลเรียบร้อยแล้ว", data:res });
        return;

    } catch (error) {
        result({status:500, message:"เกิดข้อผิดพลาดในการดำเนินการ : "+error, data:[] });
        return;
    }
};

Chat.getChatHistory = async (params, result) => {
    const skipAmount = (params.page - 1) * params.limit;
    try {
        const query = {
            $or: [
                { from: params.from, to: params.to},
                { from: params.to, to: params.from},
            ]
        };

        const res = await mongoClient.collection('messages').find(query).skip(skipAmount).limit(params.limit).sort({ _id: -1 }).toArray();
        const count = await mongoClient.collection('messages').countDocuments(query);
        if(res.length){
            result(null, {status:200, message:"ดึงข้อมูลเรียบร้อยแล้ว", data:res.slice().reverse(), total: count });
            return;
        }else{
            result(null, {status:201, message:"ไม่มีประวัติเพิ่มเติมแล้ว", data:[], total: 0 });
            return;
        }

    } catch (error) {
        result({status:500, message:"เกิดข้อผิดพลาดในการดำเนินการ : "+error, data:[], total: 0 });
        return;
    }
};

Chat.getChatHistoryMore = async (params, result) => {
    try {
        const query = {
            _id: { $lt: new ObjectId(params.lastMessage._id)},
            $or: [
                    { from: params.userId, to: params.partnerId},
                    { from: params.partnerId, to: params.userId},
                ]
        };
        
        const res = await mongoClient.collection('messages').find(query).sort({ _id: -1 }).limit(params.limit).toArray();
        if(res.length){
            result(null, {status:200, message:"ดึงข้อมูลประวัติเรียบร้อยแล้ว", data:res.slice().reverse() });
            return;
        }else{
            result(null, {status:201, message:"ไม่มีประวัติเพิ่มเติมแล้ว", data:[] });
            return;
        }

    } catch (error) {
        result({status:500, message:"เกิดข้อผิดพลาดในการดำเนินการ : "+error, data:[]});
        return;
    }
};

Chat.getStatus = async (params, result) => {
    try {

        if (params.partner.length) {

            const resContect = await mongoClient.collection('contacts')
            .find({userId : params.userId, contactUserId : { $in: params.partner }})
            .sort({ messageUpdate: -1 })
            .toArray();

            const onlineTotal = (await mongoClient.collection('contacts').find({userId : params.userId, status:1}).toArray()).length;
            
            result(null, { status: 200, message: "ดึงข้อมูลสถานะเรียบร้อยแล้ว", data: resContect, datetime:new Date(), online : onlineTotal });
            return;
            
        } else {
            result(null, { status: 201, message: "ข้อมูลที่ส่งมาไม่ถูกต้อง", data: [], datetime:new Date(), online : 0 });
            return;
        }

    } catch (error) {
        result({status:500, message:"เกิดข้อผิดพลาดในการดำเนินการ : "+error, data:[], datetime:new Date(), online : 0 });
        return;
    }
};

module.exports = Chat;