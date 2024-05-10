import { ReactElement, FC, useEffect, useState } from "react";
import InputCustom from "../../components/custom-input-witherror/index.tsx"
import { SubmitHandler, useForm } from "react-hook-form"
import z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import ButtonCustom from "../../components/custom-buttonwithloader/index.tsx"
import { redirect, useLocation, useParams } from "react-router-dom";
import { useRouteMatch } from "../../utils/routeMatcher";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { ImageSkeleton } from "@/components/loader-skeletons/image-skeleton/index.tsx";
import { SkeletonCard } from "@/components/loader-skeletons/card-skeleton/index.tsx";
import { FormSkeleton } from "@/components/loader-skeletons/form-skeleton/index.tsx";
import { getPathName } from "@/utils/pathName.ts";
import { backendBaseURL } from "../../../constants.ts";
import { createRequest, requestParams } from "../../services/createRequests/index.ts";
const schemaProfile = z.object({
    // id: z.any().optional(),
    // companyName: z.string().min(3),
    // position: z.string().min(3),
    // description: z.string().min(3),
    // companyImage: z.any(z.instanceof(File)),
    // startDate: z.date(),
    // endDate: z.date(),


    picture: z.any(z.instanceof(File)),

})
type FormFields = z.infer<typeof schemaProfile>
const EditWorkExperience: React.FC = (): ReactElement => {
    // const items = ["i1", "i2", "i3", "i4", "i5", "i6", "i7", "i8"]
    // const { profile } = useParams()
    // const { id, pathname } = useRouteMatch();
    const [loader, setLoader] = useState(false)
    const pathType = getPathName()
    const form = useForm<FormFields>({
        resolver: zodResolver(schemaProfile),
        defaultValues: {

        }
    })
    const location = useLocation();
    const { state } = location || {};
    // useEffect(() => {
    //     if (pathType != "add") {
    //         form.reset(state.data, { keepValues: false, keepDefaultValues: true })
    //     } else {
    //         form.reset();
    //     }
    // }, [state])
    const submitForm: SubmitHandler<FormFields> = async (data: any) => {
        const formData = document.querySelector("form");
        console.log("data is", formData)
        setLoader(true)
        if (pathType == "add") {
            try {
                // const params: requestParams = {
                //     method: "POST",
                //     url: `${backendBaseURL}/api/experience/add`,
                //     data: formData,
                // }
                // const response = await createRequest(params)
                const params: requestParams = {
                    method: "POST",
                    url: `${backendBaseURL}/api/projects/add`,
                    data: formData,
                }

                const response = await createRequest(params)
                // redirect("profiles/workExperience");
            } catch (err) {
                console.log("error can't perform anything")
                //show toast with message
            } finally {
                setLoader(false)
            }
        } else {

            // console.log("in id@@", `${backendBaseURL}/api/experience/edit/${state.data.id}`)
            try {
                const params: requestParams = {
                    method: "POST",
                    url: `${backendBaseURL}/api/experience/edit/${state.data.id}`,
                    data: formData,
                }
                const response = await createRequest(params)
            } catch (err) {
                console.log("error in edit", err)
            } finally {
                setLoader(false)
            }
        }
    }
    return (
        <div className="flex flex-1 justify-center align-middle bg-white">
            <Form {...form}>
                <form className="flex flex-col  my-2 rounded border-2 border-gray-600 bg-slate-200 "
                    id="profileForm"
                    onSubmit={form.handleSubmit(submitForm)}
                    encType="multipart/form-data"
                >

                    {/* <InputCustom
                        labelfor="companyName"
                        label="companyName"
                        inputType="text"
                        placeholder="Enter name Of company"
                        controls={form.control}
                    />
                    <InputCustom
                        labelfor="position"
                        label="position"
                        inputType="text"
                        placeholder="Enter name Of position"
                        controls={form.control}
                    />
                    <InputCustom
                        labelfor="description"
                        label="description"
                        inputType="textarea"
                        placeholder="Enter your certificate Description"
                        controls={form.control}
                    />
                    <InputCustom
                        labelfor="companyImage"
                        label="companyImage"
                        inputType="file"
                        placeholder="Enter your company Image"
                        controls={form.control}
                    />
                    <ButtonCustom
                        type={"submit"}
                        value={pathType == 'add' ? "Add Exp" : "Update Exp"}
                        name={pathType == 'add' ? "Add Exp" : "Update Exp"}
                        formId={"profileForm"}
                        disabled={loader}
                        disabledText={pathType == 'add' ? "Adding pls wait..." : "Updating pls wait..."}
                    /> */}
                    <InputCustom
                        labelfor="picture"
                        label="picture"
                        inputType="file"
                        placeholder="Enter your picture"
                        controls={form.control}
                    />
                    <ButtonCustom
                        type={"submit"}
                        value={"updateProfile"}
                        name={pathType == 'add' ? "Add project" : "Update project"}
                        formId={"profileForm"}
                        controls={form.control}
                        disabled={loader}
                        disabledText={pathType == 'add' ? "Adding project" : "Updating project"}
                    />
                </form>
            </Form>
        </div>
    );
}

export default EditWorkExperience;
{/* <InputCustom
                        labelfor="startDate"
                        label="startDate"
                        inputType="date"
                        placeholder="Enter your start Date"
                        controls={form.control}
                    />
                    <InputCustom
                        labelfor="endDate"
                        label="endDate"
                        inputType="date"
                        placeholder="Enter your end Date"
                        controls={form.control}
                    /> */}