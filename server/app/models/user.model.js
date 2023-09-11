const mongoClient = require('../config/db');
const User = function(user) { };

User.checkInsertData = async (userData, result) => {
    if (
        !userData.firstName || userData.firstName === "" ||
        !userData.lastName || userData.lastName === "" ||
        !userData.email || userData.email === "" ||
        !userData.image || userData.image === "" ||
        !userData.userType || userData.userType === ""
    ) {
        result({ status: 500, message: "ข้อมูลที่ได้รับไม่ถูกต้อง", data: userData });
        return;
    }

    const data = {
        firstName : userData.firstName,
        lastName  : userData.lastName,
        email     : userData.email,
        image     : userData.image,
        userType  : userData.userType,
        status    : 1
    };

    try {
        const res = await mongoClient.collection('users').insertOne(data);

        if (!res.acknowledged) {
            result({ status: 500, message: "เกิดข้อผิดพลาดในการบันทึกข้อมูล", data: res });
            return;
        }

        result(null, { status: 200, message: "เพื่มข้อมูลเรียบร้อยแล้ว", data: res });

    } catch (err) {
        result({ status: 500, message: "เกิดข้อผิดพลาดในการดำเนินการ", data: userData });
    }
};

// User.getUserList = async (userType, page = 1,  itemsPerPage, result) => {
//     const skipAmount = (page - 1) * itemsPerPage;
//     try {
//         const res = await mongoClient.collection('users').find({ userType: parseInt(userType) }).skip(skipAmount).limit(itemsPerPage).toArray();
//         const count = await mongoClient.collection('users').countDocuments({ userType: parseInt(userType) });
//         result(null, {status:200, message:"ดึงข้อมูลเรียบร้อยแล้ว", data:res, total: count });
//         return;

//     } catch (error) {
//         result({status:500, message:"เกิดข้อผิดพลาดในการดำเนินการ", data:error });
//         return;
//     }

// };


module.exports = User;