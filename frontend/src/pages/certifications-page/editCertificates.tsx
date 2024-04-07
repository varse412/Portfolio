import { ReactElement,FC } from "react";
import InputCustom from "../../components/custom-input-witherror/index.tsx"
import {SubmitHandler, useForm} from "react-hook-form"
import z from "zod"
import {zodResolver} from "@hookform/resolvers/zod"
import ButtonCustom from "../../components/custom-buttonwithloader/index.tsx"
import {  useParams } from "react-router-dom";
import { useRouteMatch } from "../../utils/routeMatcher";

const schemaProfile =z.object({
    id: z.any().optional(),
    nameOfCertificate: z.string().min(3),
    certificateLinkToDownload: z.string().url(),
    imageCertificate: z.any(z.instanceof(File)),
})
type FormFields=z.infer<typeof schemaProfile>
const EditCertificate: React.FC=():ReactElement=>{
    const items=["i1","i2","i3","i4","i5","i6","i7","i8"]
    const { profile } = useParams()
    const {id,pathname} = useRouteMatch();
    const {handleSubmit,register,formState:{errors}} =useForm<FormFields>({
        resolver:zodResolver(schemaProfile)
    })
   const submitForm: SubmitHandler<FormFields>=(data:any) => {
    console.log(data)
   }
    // console.log("profiler is ",profile)
    return (
    <div className="flex flex-1 justify-center align-middle bg-green-800">
      <form className="flex flex-col  bg-red-600 my-2 "
         id="profileForm"
         onSubmit={handleSubmit(submitForm)}
        >
   
       <InputCustom 
            labelfor="nameOfCertificate"
            label="nameOfCertificate"
            inputType="text"
            placeholder="Enter name Of Certificate"
            register={register}
            errorMessage={errors.nameOfCertificate?.message}
           />  
     
        <InputCustom
           labelfor="certificateLinkToDownload"
           label="certificateLinkToDownload"
           inputType="url"
           placeholder="Enter your certificate Link To Download"
           register={register}
           errorMessage={errors.certificateLinkToDownload?.message}
           />
        <InputCustom
           labelfor="imageCertificate"
           label="imageCertificate"
           inputType="file"
           placeholder="Enter your image of Certificate"
           register={register}
           errorMessage={errors.imageCertificate?.message}
           />
        <ButtonCustom
          type={"submit"}
          value={"updateProfile"}
          name={"Update Profile"}
          formId={"profileForm"}
        />
        </form>
        </div>
    );
}

export default EditCertificate;



 