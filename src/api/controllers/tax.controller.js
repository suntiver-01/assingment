const _ = require("lodash");

const {validateTax}  =  require('../validations/tax.validation')


const methods = {


    async oncalTax(req,res,next){

        const { error } = validateTax(req.body);
        if (error) return res.error({message:error.details[0].message,statusCode:400})

        const {netIncome} = req.body
        let incomeTax = 0
        let level = 0 
        switch(true){
            case  netIncome <= 150000:
                incomeTax = 0
                level = 1
                break;
            case  netIncome >= 150001 && netIncome <= 300000:
                incomeTax = (((netIncome - 150000)/100)*5)
                level = 2
                break;
            case  netIncome >= 300001 && netIncome <= 500000:
                incomeTax = (((netIncome - 300000)/100)*10)+7500
                level = 3
                break;
            case  netIncome >= 500001 && netIncome <= 750000:
                incomeTax = (((netIncome - 500000)/100)*15)+27500
                level = 4
                break;
            case  netIncome >= 750001 && netIncome <= 1000000:
                incomeTax = (((netIncome - 750000)/100)*20)+65000
                level = 5
                break;
            case  netIncome >= 1000001 && netIncome <= 2000000:
                incomeTax = (((netIncome - 1000000)/100)*25)+115000
                level = 6
                break;
            case  netIncome >= 2000001 && netIncome <= 5000000:
                incomeTax = (((netIncome - 2000000)/100)*30)+365000
                level = 7
                break;
            case  netIncome >= 5000001 :
                incomeTax = (((netIncome - 5000000)/100)*35)+1265000
                level = 8
                break;
       }
        
        return res.success({data:{level:level,personalIncomeTax:incomeTax,currency:"baht"}})
    },

  
}

module.exports = { ...methods }