import { ReactElement, FC } from "react";
import InputCustom from "../../components/custom-input-witherror/index.tsx"
import { SubmitHandler, useForm } from "react-hook-form"
import z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import ButtonCustom from "../../components/custom-buttonwithloader/index.tsx"
import { useParams } from "react-router-dom";
import { useRouteMatch } from "../../utils/routeMatcher";
import {skillData} from "./mockData.ts"
import { EachElement } from "../../utils/Each.tsx";
const schemaProfile = z.object({
    id: z.any().optional(),
    stackName: z.string().min(3),
    item: z.string().min(3),
    description: z.string().min(3),
    
})
type FormFields = z.infer<typeof schemaProfile>
const EditSkills: React.FC = (): ReactElement => {
    const items = ["i1", "i2", "i3", "i4", "i5", "i6", "i7", "i8"]
    const { profile } = useParams()
    const { id, pathname } = useRouteMatch();
    const { handleSubmit, register, formState: { errors } } = useForm<FormFields>({
        resolver: zodResolver(schemaProfile)
    })
    const submitForm: SubmitHandler<FormFields> = (data: any) => {
        console.log(data)
    }

    return (
        <div className="flex flex-1 justify-center align-middle bg-green-800">
            <form className="flex flex-col  bg-red-600 my-2 "
                id="profileForm"
                onSubmit={handleSubmit(submitForm)}
            >

                <InputCustom
                    labelfor="stackName"
                    label="stackName"
                    inputType="text"
                    placeholder="Enter name Of stack"
                    register={register}
                    errorMessage={errors.stackName?.message}
                />
               <EachElement 
                of={skillData[0].insideStack}
                render={(item,index)=>(
                    <InputCustom
                    labelfor={`item`}
                    label={'item'}
                    inputType="text"
                    placeholder={`InsideStack: ${item}`}
                    register={register}
                    errorMessage={errors.item?.message}
                    />
                )}
                />
                
                {/* <InputCustom 
            labelfor="schoolName"
            label="schoolName"
            inputType="text"
            placeholder="Enter name Of school"
            register={register}
            errorMessage={errors.schoolName?.message}
           />   */}
                
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

export default EditSkills;



