const mongoClient   = require('../config/db');
const mongoDB       = require('mongodb');
const Contact = function(contact) { };

Contact.addContact = async (userId, contactUserId, result) => {

    const contactData = [
        {
            userId: userId,
            contactUserId: contactUserId,
            datetime: new Date(),
            lastMessage: '',
            messageFrom: '',
            messageTo: '',
            messageUpdate: new Date(),
            status: 1
        },
        {
            userId: contactUserId,
            contactUserId: userId,
            datetime: new Date(),
            lastMessage: '',
            messageFrom: '',
            messageTo: '',
            messageUpdate: new Date(),
            status: 1
        },
    ];

    try {
        const check = await mongoClient.collection('contacts').find({userId:userId, contactUserId:contactUserId});

        if(!check.length){
            const res   = await mongoClient.collection('contacts').insertMany(contactData);
            if (!res.acknowledged) {
                result({ status: 500, message: "เกิดข้อผิดพลาดในการดำเนินการ", data: res });
                return;
            }
            result(null, { status: 200, message: "เพื่มข้อมูลเรียบร้อยแล้ว", data: res });
            return;
        }else{
            result(null, { status: 201, message: "มีรายชื่อผู้ติดต่ออยู่แล้ว", data: check });
            return;
        }

    } catch (err) {
        result({ status: 500, message: "เกิดข้อผิดพลาดในการดำเนินการ", data: err });
    }
};

Contact.getContactList = async (userId, search, page,  limit, result) => {
    const skipAmount = (page - 1) * limit;
    if(search===''){
        try {
            const resContect = await mongoClient.collection('contacts')
                .find({userId : userId})
                .sort({ messageUpdate: -1 })
                .skip(skipAmount)
                .limit(limit)
                .toArray();

            const resContectTotal = (await mongoClient.collection('contacts')
                .find({userId : userId})
                .sort({ messageUpdate: -1 })
                .toArray()).length;
    
            if(resContect.length){
                const partnerIdDataList = resContect.map(user => new mongoDB.ObjectId(user.contactUserId));
                const unsortedUserData = await mongoClient.collection('users').find({_id: { $in: partnerIdDataList }}).toArray();
                const userData = partnerIdDataList.map(id => unsortedUserData.find(user => user._id.toString() === id.toString()));
                result(null, {status:200, message:"ดึงข้อมูลเรียบร้อยแล้ว", data:userData, search:search, total: resContectTotal});
                return;
            }else{
                result(null, {status:200, message:"ดึงข้อมูลเรียบร้อยแล้ว", data:[], search:search, total: resContectTotal});
                return;
            }
    
        } catch (error) {
            result({status:500, message:"เกิดข้อผิดพลาดในการดำเนินการ", data:error, search:search, total: 0});
            return;
        }

    }else{
        try {
            const queryContects = [
                {
                    $match: {
                        userId: userId
                    }
                },
                {
                    $addFields: {
                        "contactUserIdObj": { $toObjectId: "$contactUserId" }
                    }
                },
                {
                    $lookup: {
                        from: 'users',
                        localField: 'contactUserIdObj',
                        foreignField: '_id',
                        as: 'users_info'
                    }
                },
                {
                    $match: {
                        $or: [
                            {
                                "users_info.firstName": {
                                    $regex: search,
                                    $options: "i"
                                }
                            },
                            {
                                "users_info.lastName": {
                                    $regex: search,
                                    $options: "i"
                                }
                            },
                            {
                                "users_info.email": {
                                    $regex: search,
                                    $options: "i"
                                }
                            }
                        ]
                    }
                },
                {
                    $sort: { messageUpdate: -1 }
                },
                {
                    $skip: skipAmount
                },
                {
                    $limit: limit
                },
                {
                    $unwind: "$users_info"
                },
                {
                    $replaceRoot: {
                        newRoot: "$users_info"
                    }
                }
            ];

            const queryContectsTotal = [
                {
                    $match: {
                        userId: userId
                    }
                },
                {
                    $addFields: {
                        "contactUserIdObj": { $toObjectId: "$contactUserId" }
                    }
                },
                {
                    $lookup: {
                        from: 'users',
                        localField: 'contactUserIdObj',
                        foreignField: '_id',
                        as: 'users_info'
                    }
                },
                {
                    $match: {
                        $or: [
                            {
                                "users_info.firstName": {
                                    $regex: search,
                                    $options: "i"
                                }
                            },
                            {
                                "users_info.lastName": {
                                    $regex: search,
                                    $options: "i"
                                }
                            },
                            {
                                "users_info.email": {
                                    $regex: search,
                                    $options: "i"
                                }
                            }
                        ]
                    }
                }
            ];
            const resContact = await mongoClient.collection('contacts').aggregate(queryContects).toArray();
            const resContectTotal = (await mongoClient.collection('contacts').aggregate(queryContectsTotal).toArray()).length;
            if(resContact.length){
                result(null, {status:200, message:"ดึงข้อมูลเรียบร้อยแล้ว", data:resContact, search:search, total: resContectTotal});
                return;
            }else{
                result(null, {status:200, message:"ดึงข้อมูลเรียบร้อยแล้ว", data:resContact, search:[], total: resContectTotal});
                return;
            }

        } catch (error) {
            result({status:500, message:"เกิดข้อผิดพลาดในการดำเนินการ", data:error, search:search, total: 0});
            return;
        }
    }

};

module.exports = Contact;