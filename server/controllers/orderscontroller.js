const {Orders}=require('../database/index')
const orderController={

    createorder:async(req,res)=>{
        try{
            const {userId,items}=req.body
            if(!userId||!items){
                return res.status(400).json({message:'Required fields are missing'})
            }
            
            const order=await Orders.create({
                userId:userId,
                items:items
            })
            res.status(201).json(order)
        }catch(error){
            res.status(500).json(req.body)
        }
    },

    getOrders:async(req,res)=>{
        try{
            const orders=await Orders.findAll({
                where:{userId:req.params.userId}
            })
            res.status(200).json(orders)
        }catch(error){
            res.status(500).json({message:'Error fetching orders',error:error.message})
        }
    }


}
module.exports=orderController