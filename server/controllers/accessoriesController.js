const {Accessories} =require('../database/index')



module.exports={
    getAllAccessories : async(req,res)=>{
        try {
           const accessories=await Accessories.findAll()
           res.status(200).send(accessories) 
        } catch (error) {
            console.log("error",error)
        }
    },
    AddAccessories:async(req,res)=>{
        const {name,image,price,quantity}=req.body
        try {
            const added=await Accessories.create({name,image,price,quantity})
            res.status(201).send(added)
        } catch (error) {
            console.log("error",error)
        }
    },
    DeleteAccessories:async(req,res)=>{
        const {id}=req.params
        try {
            await Accessories.destroy({where:{id}})
            res.status(200).send("deleted sucessfully")
        } catch (error) {
            console.log("error",error)
        }
    },
    UpdateAccessories:async(req,res)=>{
        const {id}=req.params
        const {name,image,price,quantity}=req.body
        try {
            const updated=await Accessories.update({name,image,price,quantity},{where:{id}})
            res.status(200).send("Updated sucessfully")
        } catch (error) {
            console.log("error",error)
        }
    },
    getAccessoriesByOne : async(req,res)=>{
        const {id}=req.params
        try {
            const accessories=await Accessories.findOne({where:{id}})
            res.status(200).send(accessories)
        } catch (error) {
            console.log("error",error)
        }
    }
}