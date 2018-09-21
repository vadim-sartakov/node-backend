import mongoose from 'mongoose';
import { bill } from './model/user';
import { admin, moderator } from './model/role';
import { department } from './model/department';

export const expectedLinks = ({ first, prev, next, last, size, port }) => 
        `<http://127.0.0.1:${port}/users?page=${first}&size=${size}>; rel=first, ` +
        `${prev !== undefined ? `<http://127.0.0.1:${port}/users?page=${prev}&size=${size}>; rel=previous, ` : ""}` +
        `${next !== undefined ? `<http://127.0.0.1:${port}/users?page=${next}&size=${size}>; rel=next, ` : ""}` +
        `<http://127.0.0.1:${port}/users?page=${last}&size=${size}>; rel=last`;

export const populateDatabase = async (count, startDate) => {

    const User = mongoose.model("User");
    const Role = mongoose.model("Role");
    const Department = mongoose.model("Department");

    const adminInstance = await new Role(admin).save();
    const moderatorInstance = await new Role(moderator).save();
    const departmentInstance = await new Department(department).save();

    let createdAt = startDate;
    const users = [];
    for(let i = 0; i < count; i++) {
        createdAt = new Date(createdAt);
        createdAt.setDate(createdAt.getDate() + 1);
        users.push({
            ...bill,
            number: i,
            email: `mail${i}@mail.com`,
            phoneNumber: i,
            createdAt,
            roles: [ adminInstance, moderatorInstance ],
            department: departmentInstance
        });
    }

    await User.insertMany(users);

};