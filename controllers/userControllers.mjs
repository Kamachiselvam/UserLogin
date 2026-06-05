
import { checkSchema } from "express-validator"
import { user } from "../Data/data.mjs"
export const createValidation=checkSchema({
    name:{
        notEmpty:{
            errorMessage:"Name must be required"
        },
    
    custom:{
        options:(value)=>{
            const existName=user.find((u)=>u.name===value)
            if(existName){
                throw new Error("Name already Exists")
            }
            return true
        }
    }
},
    email:{
        notEmpty:{
            errorMessage:"Email must be required"
        },
        isEmail:{
            errorMessage:"email contain must be email format"
        }
    },
    password:{
        notEmpty:{
            errorMessage:"password must be required"
        },
    
        isStrongPassword:{
        options:{
            minLength:3,
            minNumbers:1,
            minLowercase:1,
            minUppercase:1,
            minSymbols:1
        },
        errorMessage:"Password must contain with uppercase , Lowercase,symbols and Number"
    }
}
})