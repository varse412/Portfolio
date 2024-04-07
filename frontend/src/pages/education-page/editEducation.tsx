import { ReactElement, FC } from "react";
import InputCustom from "../../components/custom-input-witherror/index.tsx"
import { SubmitHandler, useForm } from "react-hook-form"
import z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import ButtonCustom from "../../components/custom-buttonwithloader/index.tsx"
import { useParams } from "react-router-dom";
import { useRouteMatch } from "../../utils/routeMatcher";

const schemaProfile = z.object({
    id: z.any().optional(),
    schoolName: z.string().min(3),
    degree: z.string().min(3),
    description: z.string().min(3),
    companyImage: z.any(z.instanceof(File)),
    startDate: z.coerce.date(),
    endDate: z.coerce.date(),
})
type FormFields = z.infer<typeof schemaProfile>
const EditEducation: React.FC = (): ReactElement => {
    const items = ["i1", "i2", "i3", "i4", "i5", "i6", "i7", "i8"]
    const { profile } = useParams()
    const { id, pathname } = useRouteMatch();
    const { handleSubmit, register, formState: { errors } } = useForm<FormFields>({
        resolver: zodResolver(schemaProfile)
    })
    const submitForm: SubmitHandler<FormFields> = (data: any) => {
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
                    labelfor="schoolName"
                    label="schoolName"
                    inputType="text"
                    placeholder="Enter name Of school"
                    register={register}
                    errorMessage={errors.schoolName?.message}
                />
                <InputCustom
                    labelfor="degree"
                    label="degree"
                    inputType="text"
                    placeholder="Enter name Of degree"
                    register={register}
                    errorMessage={errors.degree?.message}
                />
                <InputCustom
                    labelfor="description"
                    label="description"
                    inputType="url"
                    placeholder="Enter your certificate Link To Download"
                    register={register}
                    errorMessage={errors.certificateLinkToDownload?.message}
                />
                <InputCustom
                    labelfor="startDate"
                    label="startDate"
                    inputType="date"
                    placeholder="Enter your start Date"
                    register={register}
                    errorMessage={errors.startDate?.message}
                />
                <InputCustom
                    labelfor="endDate"
                    label="endDate"
                    inputType="date"
                    placeholder="Enter your end Date"
                    register={register}
                    errorMessage={errors.endDate?.message}
                />
                 <InputCustom
                    labelfor="companyImage"
                    label="companyImage"
                    inputType="file"
                    placeholder="Enter your company Image"
                    register={register}
                    errorMessage={errors.companyImage?.message}
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

export default EditEducation;



