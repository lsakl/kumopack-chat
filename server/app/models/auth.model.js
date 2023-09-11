const mongoClient   = require('../config/db');
const { ObjectId }  = require('mongodb');
const Auth          = function(Auth) { };

Auth.loginCheckUserAccount = async (userId, result) => {
    try {
        /////////////////////////////////////////ใช้สำหรับทดสอบ/////////////////////////////////////////////////

        const count = await mongoClient.collection('users').countDocuments();
        if (count === 0) {
            await mongoClient.collection('users').insertMany([
                {
                    "_id": new ObjectId('64e0a34aeb61f1a0e4efbc9d'),
                    "firstName": "นาย สมาณย์",
                    "lastName": "ฉันมิตร",
                    "email": "samand.sanmit@yahoo.com",
                    "image": "/assets/images/avatar/b-sm.jpg",
                    "userType": 1,
                    "status": 1
                },
                {
                    "_id": new ObjectId('64e0a34aeb61f1a0e4efbc9e'),
                    "firstName": "นายร้อย สันตการน์",
                    "lastName": "มิลมาย",
                    "email": "santikan.s@thailand.com",
                    "image": "/assets/images/avatar/a-sm.jpg",
                    "userType": 0,
                    "status": 2
                },
                {
                    "_id": new ObjectId('64e0a34aeb61f1a0e4efbc9f'),
                    "firstName": "นางสาว สาวิกา",
                    "lastName": "ประดิฐฐิฐาน",
                    "email": "savika_zaza@hotmail.com",
                    "image": "/assets/images/avatar/c-sm.jpg",
                    "userType": 1,
                    "status": 1
                },
                {
                    "_id": new ObjectId('64e0a34aeb61f1a0e4efbca0'),
                    "firstName": "นาง สมหญิง",
                    "lastName": "ฉิมพลี",
                    "email": "som.ying.zim@gmail.com",
                    "image": "/assets/images/avatar/d-sm.jpg",
                    "userType": 1,
                    "status": 2
                },
                {
                    "_id": new ObjectId('64e0a34aeb61f1a0e4efbca1'),
                    "firstName": "นาย จิระกูล",
                    "lastName": "มโนธรรม",
                    "email": "jirakul555@gmail.com",
                    "image": "/assets/images/avatar/e-sm.jpg",
                    "userType": 1,
                    "status": 1
                },
                {
                    "_id": new ObjectId('64e0a34aeb61f1a0e4efbca2'),
                    "firstName": "นาย อรรคพันธ์",
                    "lastName": "ธรรมดี",
                    "email": "arkkapan-tummadee@gmail.com",
                    "image": "/assets/images/avatar/f-sm.jpg",
                    "userType": 1,
                    "status": 2
                },
                {
                    "_id": new ObjectId('64e0a34aeb61f1a0e4efbca3'),
                    "firstName": "นาง มณี",
                    "lastName": "จันทร์ยา",
                    "email": "janya.manee2022@hotmail.com",
                    "image": "/assets/images/avatar/g-sm.jpg",
                    "userType": 1,
                    "status": 0
                },
                {
                    "_id": new ObjectId('64e0a34aeb61f1a0e4efbca4'),
                    "firstName": "นาย สมชาย",
                    "lastName": "ยอดดี",
                    "email": "somchai2555@gmail.com",
                    "image": "/assets/images/avatar/h-sm.jpg",
                    "userType": 1,
                    "status": 2
                },
                {
                    "_id": new ObjectId('64e0a34aeb61f1a0e4efbca5'),
                    "firstName": "นาง จตุการณ์",
                    "lastName": "ฉายมุนา",
                    "email": "jan.jatukan@gmail.com",
                    "image": "/assets/images/avatar/j-sm.jpg",
                    "userType": 1,
                    "status": 1
                },
                {
                    "_id": new ObjectId('64e0a34aeb61f1a0e4efbca6'),
                    "firstName": "นาง หรูหรา",
                    "lastName": "ออมตอง",
                    "email": "sara@gmail.com",
                    "image": "/assets/images/avatar/k-sm.jpg",
                    "userType": 1,
                    "status": 0
                }
            ]);

            await mongoClient.collection('contacts').insertMany([
                {
                    "_id": new ObjectId('64f83282754a2aee430fa086'),
                    "userId": "64e0a34aeb61f1a0e4efbc9d",
                    "contactUserId": "64e0a34aeb61f1a0e4efbc9e",
                    "datetime": "2023-09-06T08:04:18.585Z",
                    "lastMessage": "f",
                    "messageFrom": "64e0a34aeb61f1a0e4efbc9d",
                    "messageTo": "64e0a34aeb61f1a0e4efbc9e",
                    "messageUpdate": "2023-09-07T06:38:01.599Z",
                    "status": 0
                },
                {
                    "_id": new ObjectId('64f83282754a2aee430fa087'),
                    "userId": "64e0a34aeb61f1a0e4efbc9e",
                    "contactUserId": "64e0a34aeb61f1a0e4efbc9d",
                    "datetime": "2023-09-06T08:04:18.585Z",
                    "lastMessage": "f",
                    "messageFrom": "64e0a34aeb61f1a0e4efbc9d",
                    "messageTo": "64e0a34aeb61f1a0e4efbc9e",
                    "messageUpdate": "2023-09-07T06:38:01.599Z",
                    "status": 1
                },
                {
                    "_id": new ObjectId('64f873639ed5605bc279887b'),
                    "userId": "64e0a34aeb61f1a0e4efbc9d",
                    "contactUserId": "64e0a34aeb61f1a0e4efbc9f",
                    "datetime": "2023-09-06T12:41:07.348Z",
                    "lastMessage": "",
                    "messageFrom": "",
                    "messageTo": "",
                    "messageUpdate": "2023-09-06T12:41:07.348Z",
                    "status": 0
                },
                {
                    "_id": new ObjectId('64f873639ed5605bc279887c'),
                    "userId": "64e0a34aeb61f1a0e4efbc9f",
                    "contactUserId": "64e0a34aeb61f1a0e4efbc9d",
                    "datetime": "2023-09-06T12:41:07.348Z",
                    "lastMessage": "",
                    "messageFrom": "",
                    "messageTo": "",
                    "messageUpdate": "2023-09-06T12:41:07.348Z",
                    "status": 1
                },
                {
                    "_id": new ObjectId('64f873699ed5605bc279887d'),
                    "userId": "64e0a34aeb61f1a0e4efbc9d",
                    "contactUserId": "64e0a34aeb61f1a0e4efbca0",
                    "datetime": "2023-09-06T12:41:13.835Z",
                    "lastMessage": "",
                    "messageFrom": "",
                    "messageTo": "",
                    "messageUpdate": "2023-09-06T12:41:13.835Z",
                    "status": 0
                },
                {
                    "_id": new ObjectId('64f873699ed5605bc279887e'),
                    "userId": "64e0a34aeb61f1a0e4efbca0",
                    "contactUserId": "64e0a34aeb61f1a0e4efbc9d",
                    "datetime": "2023-09-06T12:41:13.835Z",
                    "lastMessage": "",
                    "messageFrom": "",
                    "messageTo": "",
                    "messageUpdate": "2023-09-06T12:41:13.835Z",
                    "status": 1
                },
                {
                    "_id": new ObjectId('64f8736f9ed5605bc279887f'),
                    "userId": "64e0a34aeb61f1a0e4efbc9d",
                    "contactUserId": "64e0a34aeb61f1a0e4efbca1",
                    "datetime": "2023-09-06T12:41:19.855Z",
                    "lastMessage": "",
                    "messageFrom": "",
                    "messageTo": "",
                    "messageUpdate": "2023-09-06T12:41:19.855Z",
                    "status": 0
                },
                {
                    "_id": new ObjectId('64f8736f9ed5605bc2798880'),
                    "userId": "64e0a34aeb61f1a0e4efbca1",
                    "contactUserId": "64e0a34aeb61f1a0e4efbc9d",
                    "datetime": "2023-09-06T12:41:19.855Z",
                    "lastMessage": "",
                    "messageFrom": "",
                    "messageTo": "",
                    "messageUpdate": "2023-09-06T12:41:19.855Z",
                    "status": 1
                },
                {
                    "_id": new ObjectId('64f873779ed5605bc2798881'),
                    "userId": "64e0a34aeb61f1a0e4efbc9d",
                    "contactUserId": "64e0a34aeb61f1a0e4efbca2",
                    "datetime": "2023-09-06T12:41:27.871Z",
                    "lastMessage": "",
                    "messageFrom": "",
                    "messageTo": "",
                    "messageUpdate": "2023-09-06T12:41:27.871Z",
                    "status": 0
                },
                {
                    "_id": new ObjectId('64f873779ed5605bc2798882'),
                    "userId": "64e0a34aeb61f1a0e4efbca2",
                    "contactUserId": "64e0a34aeb61f1a0e4efbc9d",
                    "datetime": "2023-09-06T12:41:27.871Z",
                    "lastMessage": "",
                    "messageFrom": "",
                    "messageTo": "",
                    "messageUpdate": "2023-09-06T12:41:27.871Z",
                    "status": 1
                },
                {
                    "_id": new ObjectId('64f8737f9ed5605bc2798883'),
                    "userId": "64e0a34aeb61f1a0e4efbc9d",
                    "contactUserId": "64e0a34aeb61f1a0e4efbca3",
                    "datetime": "2023-09-06T12:41:35.356Z",
                    "lastMessage": "",
                    "messageFrom": "",
                    "messageTo": "",
                    "messageUpdate": "2023-09-06T12:41:35.356Z",
                    "status": 0
                },
                {
                    "_id": new ObjectId('64f8737f9ed5605bc2798884'),
                    "userId": "64e0a34aeb61f1a0e4efbca3",
                    "contactUserId": "64e0a34aeb61f1a0e4efbc9d",
                    "datetime": "2023-09-06T12:41:35.356Z",
                    "lastMessage": "",
                    "messageFrom": "",
                    "messageTo": "",
                    "messageUpdate": "2023-09-06T12:41:35.356Z",
                    "status": 1
                },
                {
                    "_id": new ObjectId('64f873869ed5605bc2798885'),
                    "userId": "64e0a34aeb61f1a0e4efbc9d",
                    "contactUserId": "64e0a34aeb61f1a0e4efbca4",
                    "datetime": "2023-09-06T12:41:42.643Z",
                    "lastMessage": "",
                    "messageFrom": "",
                    "messageTo": "",
                    "messageUpdate": "2023-09-06T12:41:42.643Z",
                    "status": 0
                },
                {
                    "_id": new ObjectId('64f873869ed5605bc2798886'),
                    "userId": "64e0a34aeb61f1a0e4efbca4",
                    "contactUserId": "64e0a34aeb61f1a0e4efbc9d",
                    "datetime": "2023-09-06T12:41:42.643Z",
                    "lastMessage": "",
                    "messageFrom": "",
                    "messageTo": "",
                    "messageUpdate": "2023-09-06T12:41:42.643Z",
                    "status": 1
                },
                {
                    "_id": new ObjectId('64f8738c9ed5605bc2798887'),
                    "userId": "64e0a34aeb61f1a0e4efbc9d",
                    "contactUserId": "64e0a34aeb61f1a0e4efbca5",
                    "datetime": "2023-09-06T12:41:48.481Z",
                    "lastMessage": "",
                    "messageFrom": "",
                    "messageTo": "",
                    "messageUpdate": "2023-09-06T12:41:48.481Z",
                    "status": 0
                },
                {
                    "_id": new ObjectId('64f8738c9ed5605bc2798888'),
                    "userId": "64e0a34aeb61f1a0e4efbca5",
                    "contactUserId": "64e0a34aeb61f1a0e4efbc9d",
                    "datetime": "2023-09-06T12:41:48.481Z",
                    "lastMessage": "",
                    "messageFrom": "",
                    "messageTo": "",
                    "messageUpdate": "2023-09-06T12:41:48.481Z",
                    "status": 1
                },
                {
                    "_id": new ObjectId('64f873929ed5605bc2798889'),
                    "userId": "64e0a34aeb61f1a0e4efbc9d",
                    "contactUserId": "64e0a34aeb61f1a0e4efbca6",
                    "datetime": "2023-09-06T12:41:54.012Z",
                    "lastMessage": "",
                    "messageFrom": "",
                    "messageTo": "",
                    "messageUpdate": "2023-09-06T12:41:54.012Z",
                    "status": 0
                },
                {
                    "_id": new ObjectId('64f873929ed5605bc279888a'),
                    "userId": "64e0a34aeb61f1a0e4efbca6",
                    "contactUserId": "64e0a34aeb61f1a0e4efbc9d",
                    "datetime": "2023-09-06T12:41:54.012Z",
                    "lastMessage": "",
                    "messageFrom": "",
                    "messageTo": "",
                    "messageUpdate": "2023-09-06T12:41:54.012Z",
                    "status": 1
                }
            ]);
        }

        ////////////////////////////////////////////////////////////////////////////////////////////////////////

        const res = await mongoClient.collection('users').findOne({ _id: new ObjectId(userId) });
        result(null, {status:200, message:"ดึงข้อมูลเรียบร้อยแล้ว", data:res });
        return;
        
    } catch (error) {
        result({status:500, message:"เกิดข้อผิดพลาดในการดำเนินการ", data:error });
        return;
    }

};

module.exports = Auth;