import { Buildings } from "./data/buildings";
import { Users } from "./data/users";
import { Manufacturers } from "./data/Manufacturers";
import { Devices } from "./data/Device";
import { Customers } from "./data/Customer";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    for (let Building of Buildings){
        await prisma.building.create({
            data: Building
        })
        console.log ("add Building " + Building.BuildingName)
    }
    for (let User of Users){
        await prisma.user.create({
            data: User
        })
        console.log ("add Users " + User.name)
    }
    for (let Manufacturer of Manufacturers){
        await prisma.manufacturer.create({
            data: Manufacturer
        })
        console.log ("add Manufacturer " + Manufacturer.ManufacturerName)
    }
    for (let Customer of Customers){
        await prisma.customer.create({
            data: Customer
        })
        console.log ("add Manufacturer " + Customer.CustomerName)
    }
    for (let Device of Devices){
        await prisma.device.create({
            data: Device
        })
        console.log ("add Device " + Device.DeviceName)
    }
}
main().catch(e=> {
    console.log(e);
    process.exit(1)
}).finally(() =>{
    prisma.$disconnect;
})