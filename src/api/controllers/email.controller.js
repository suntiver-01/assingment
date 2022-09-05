const _ = require("lodash");
const {sendMail ,Template} = require('../../configs/email')
const {validateEmail}  =  require('../validations/email.validation')


const methods = {

    async onSentEmail(req,res,next){

        const { error } = validateEmail(req.body);      
        if (error) return res.error({message:error.details[0].message,statusCode:400})

      
        sendMail({
            to:req.body.receiver,
            from: "arthit.chueahom@gmail.com",
            subject:req.body.subject,
            html:Template(req.body.message)
        }).then(()=>{
            const respone = {
                to: req.body.receiver,
                from: "arthit.chueahom@gmail.com",
                subject:req.body.subject,
                message:req.body.message,
                status:"Send email success"
            };
            
            return res.success({data:respone})

        }).catch(()=>{

            return  res.error({message:"Error send Email!",statusCode:400})
        })

         
         

          
            
       
      
    },

  
}

module.exports = { ...methods }