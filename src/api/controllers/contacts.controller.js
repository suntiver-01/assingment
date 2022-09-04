const _ = require("lodash");
const { uuid } = require('uuidv4');
const moment = require('moment')
const {Group } = require('../model/group.model')
const {User} = require('../model/user.model')
const {getProtocol} = require('../helpers/utils')

const { validateCreateGroup } = require("../validations/oncreateGroup.validation");
const { validateUser } = require("../validations/user.validation");
const { validateContact } = require("../validations/oncreateContact.validation");
const { validateEditGroup } = require("../validations/updateGroup.validation");
const { validateUpdateContact } = require("../validations/updateContact.validation");


const methods = {

    async onLogin(req,res,next){
        const { error } = validateUser(req.body);
        if (error) return res.error({message:error.details[0].message,statusCode:400})
        let user = await User.findOne({ email: req.body?.email });
        if(!user) res.error({message:"Invalid email!",statusCode:400})

        const respone = {
            userId: user.userId,
            email: user.email
        };
    
        return res.success({data:respone})
    },



    async onRegister(req,res,next){
        const { error } = validateUser(req.body);
        if (error) return res.error({message:error.details[0].message,statusCode:400})
        let user = await User.findOne({ email: req.body?.email });
        if (user) return  res.error({message:"User already registered!",statusCode:400})
        
        let body = {
            email:req.body.email,
            userId:uuid()
        }

        user = new User(body);
        await user.save();

        const respone = {
            userId: user.userId,
            email: user.email,
            created:user.created
        };
    
        return res.success({data:respone})
    },

    async onUpdateUser(req,res,next){
        const { error } = validateUser(req.body);      
        if (error) return res.error({message:error.details[0].message,statusCode:400})
  
        let userId = await User.findOne({userId:req.params.userId})
        if (!userId) return  res.error({message:"Invalid userID!",statusCode:400})

        let user = await User.findOne({ email: req.body?.email });
        if (user) return  res.error({message:"User already registered!",statusCode:400})
 
        let dataUpdate = {
            email:req.body.email,
            updated:moment().format()
        }
        await User.updateOne({userId: req.params.userId} ,{$set:dataUpdate})
        

        return res.success({data:"Update user success!"})
    },

    async onCreateGroup(req,res,next){


        const { error } = validateCreateGroup(req.body);
        if (error) return res.error({message:error.details[0].message,statusCode:400})

        let user = await User.findOne({ userId: req.body?.userId});
        if (!user) return  res.error({message:"Invalid user!",statusCode:400})

        let body = {
            ...req.body,
            groupId:uuid()
        }

       
        let  contact = new Group(body);

        await contact.save();


        return res.success({data:"Create group success!"})

  
    },

    async onUpdateGroup(req,res,next){
   
        const { error } = validateEditGroup(req.body);      
        if (error) return res.error({message:error.details[0].message,statusCode:400})

        let groupId = await Group.findOne({ groupId: req.params.groupId  });
        if (!groupId) return  res.error({message:"Invalid groupId!",statusCode:400})

        let dataUpdate = {
            ...req.body,
            updated:moment().format()
        }

        await Group.updateOne({groupId: req.params.groupId},{$set:dataUpdate})
        

        return res.success({data:"Update group success!"})

    },

    async onDeleteGroup(req,res,next){
            
         let group = await Group.findOne({ groupId:req.params.groupId })
         if (!group) return  res.error({message:"Invalid groupId!",statusCode:400})

         await  Group.deleteOne({groupId:req.params.groupId})
         return res.success({data:"Delete group success!"})
        
    },

    async onCreateContact(req,res,next){

         
        const { error } = validateContact(req.body);
        if (error) return res.error({message:error.details[0].message,statusCode:400})
    
        let body = {contact:{...req.body,contactId:uuid(),image:req?.file?.filename}}

        let contact =  await Group.findOneAndUpdate({groupId: req.body?.groupId} ,{$push:body},{new:true})
        if (!contact) return  res.error({message:"Invalid user or  groupId!",statusCode:400})
       
        return res.success({data:"Create contact success!"})

    },

    async onUpdateContact(req,res,next){
     
        const { error } = validateUpdateContact(req.body);      
        if (error) return res.error({message:error.details[0].message,statusCode:400})
        
        let contactId  = await Group.find({"contact.contactId":req.params.contactId})
        if (contactId.length == 0 ) return  res.error({message:"Invalid contactId!",statusCode:400})
 
        let body = {
            ...req.body,
            contactId:req.params.contactId,
            image:req?.file?.filename,
            updated:moment().format()
        }
        await Group.updateOne({"contact.contactId":req.params.contactId},{$set:{"contact.$":body}})
      

        return res.success({data:"Update contact success!"})

    },

    async onDeleteContact(req,res,next){
     
        let contactId  = await Group.find({"contact.contactId":req.params.contactId})
        if (contactId.length == 0 ) return  res.error({message:"Invalid contactId!",statusCode:400})

        await Group.updateOne({"contact.contactId":req.params.contactId},{$pull:{"contact":{'contactId':req.params.contactId}}})


        return res.success({data:"Delete contact success!"})

    },  
  
    async getGroups(req,res,next){

  
        let result = await Group.aggregate([
            {
                $match:{userId:req.params.userId}
            },
            {$project:  { count: { $size:"$contact" } ,userId:1,nameGroup:1,groupId:1,_id:0 }}
        ])
  
        return res.success({data:result})
    },

    async getContacts(req,res,next){

  
        let result = await Group.aggregate([
            {
                $match:{groupId:req.params.groupId}
            },
            {$project:  { _id:0,contact:{
                "$map":{
                    "input": "$contact",
                    "as": "i",
                    "in": {
                        contactId: "$$i.contactId",
                        firstName: "$$i.firstName",
                        lastName:"$$i.lastName",
                        birthDate:"$$i.birthDate",
                        phone:"$$i.phone",
                        email:"$$i.email",
                        url:"$$i.url",
                        image:{$concat: [`${getProtocol(req)}://${req.headers.host}/static/uploads/`,"$$i.image"]},
                        updated:"$$i.updated",
                        created:"$$i.created"
                      }
                }
            
            }
        }
    }


        ])


  
        return res.success({data:result[0]})
    },
    
    

  
}

module.exports = { ...methods }