
import {SubmitHandler, useForm} from "react-hook-form"
import {z} from "zod";
import {zodResolver} from '@hookform/resolvers/zod'

const schema = z.object({
    name: z.string().min(3),
    email: z.string().email(),
   
})
type Formfields=z.infer<typeof schema>
const ProjectForm=()=>{
    const {register,handleSubmit,formState: {errors,isSubmitting},setError} =useForm<Formfields>({
        defaultValues: {
            "email": "dsdfsdf@gmail.com"
        },
        resolver: zodResolver(schema)
    });
    const onSubmit : SubmitHandler<Formfields> = async (data)=>{
        try{
            await new Promise((resolve) => setTimeout(()=>resolve(20),1000))
            throw new Error("abss")
        }catch(err){
            setError("root",{
                message:"This email is already registered"
            })
        }
        
      console.log(data);
    }
    return (
      <form className="flex-row" onSubmit={handleSubmit(onSubmit)}>
       {/* <p>Hello world </p> */}
       <input {...register("name",{
        required:"Please enter your name",
        minLength:{
            value:3,
            message:"Your name must be at least 3 characters long"
        }
       })} type="text" name="name" id="name" className="bg-gray-50 border-2 border-blue-400"/>
       {errors.name && (<div className="text-red-500">{errors.name.message}</div>)}
       <input {...register("email")}type="text" name="email" id="email" className="bg-gray-50 border-2 border-blue-400"/>
      {errors.email&& (<div className="text-red-500">{errors.email.message}</div>)}
       <input {...register("email",{
        required:"Please enter your email",
        validate: (value)=>{
            if(!value.includes('@')){
                return "Email must contain @"
            }
            return true;
        },
        minLength:3
       })}type="text" name="email" id="email" className="bg-gray-50 border-2 border-blue-400"/>
      {errors.email&& (<div className="text-red-500">{errors.email.message}</div>)}
       <button disabled={isSubmitting} type="submit" className="bg-stone-500">{isSubmitting? "Loading..." :"SUBMIT"}</button>
       {errors.root&& (<div className="text-red-500">{errors.root.message}</div>)}
      </form>
   
    );
}
//@hookform/resolvers
//zod
//react-hook-forms
export default ProjectForm;