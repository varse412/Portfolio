import { ReactElement, FC, useState, useEffect } from "react";
import InputCustom from "../../components/custom-input-witherror/index.tsx"
import { SubmitHandler, useForm } from "react-hook-form"
import z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import ButtonCustom from "../../components/custom-buttonwithloader/index.tsx"
import { useLocation, useParams } from "react-router-dom";
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
import { Toaster } from "@/components/ui/toaster.tsx";
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"
import { useNavigate } from "react-router-dom";

const schemaProfile = z.object({
    id: z.any().optional(),
    schoolName: z.string().min(3),
    degree: z.string().min(3),
    description: z.string().min(3),
    schoolImage: z.any(z.instanceof(File)),
    startDate: z.coerce.date(),
    endDate: z.coerce.date(),
})
type FormFields = z.infer<typeof schemaProfile>
const EditEducation: React.FC = (): ReactElement => {
    const items = ["i1", "i2", "i3", "i4", "i5", "i6", "i7", "i8"]
    const { profile } = useParams()
    const { id, pathname } = useRouteMatch();
    const [loader, setLoader] = useState(false)
    const pathType = getPathName()
    const { toast } = useToast()
    const navigate = useNavigate();
    const location = useLocation();
    const { state } = location || {};
    const form = useForm<FormFields>({
        resolver: zodResolver(schemaProfile),
        defaultValues: {

        }
    })
    useEffect(() => {
        if (pathType != "add") {
            form.reset(state.data, { keepValues: false, keepDefaultValues: true })
        } else {
            form.reset();
        }

    }, [state])
    const submitForm: SubmitHandler<FormFields> = async (data: any) => {
        // const formdata = document.querySelector("form");
        // console.log("data is", Object.fromEntries(formData))
        // console.log("education data", data)
        setLoader(true)
        if (pathType == "add") {
            try {
                const params: requestParams = {
                    method: "POST",
                    url: `${backendBaseURL}/api/education/add`,
                    data: { ...data, schoolImage: data?.schoolImage?.[0] },
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
                console.log("entered block")
                const response = await createRequest(params)
                if (response.meta == 1) {

                    toast({
                        description: response.message ?? "Data added successfully",
                    })
                    await setTimeout(() => {
                        navigate("/profiles/education")
                    }, 2000)
                } else {
                    toast({
                        variant: "destructive",
                        title: "Api Error",
                        description: response.message ?? "Something went wrong with Api",
                        action: <ToastAction altText="Pls try again" onClick={() => {
                            form.handleSubmit(submitForm)
                        }}>{"try again"}</ToastAction>,
                    })
                }

            } catch (err) {
                console.log("error can't perform anything", err)
                toast({
                    variant: "destructive",
                    title: "Client Error",
                    description: JSON.stringify(err) ?? "Something went wrong with Api",
                    action: <ToastAction altText="Pls try again" onClick={() => {
                        form.handleSubmit(submitForm)
                    }}>{"try again"}</ToastAction>,
                })
                //show toast with message
            } finally {
                setLoader(false)
            }
        } else {
            // console.log("in id@@", `${backendBaseURL}/api/experience/edit/${state.data.id}`)
            try {
                const params: requestParams = {
                    method: "POST",
                    url: `${backendBaseURL}/api/education/edit/${state.data.id}`,
                    data: { ...data, schoolImage: data?.schoolImage?.[0] },
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
                const response = await createRequest(params)
                if (response.meta == 1) {
                    toast({
                        title: "Updation Successfull",
                        description: response.message ?? "Data updated successfully",
                        action: <ToastAction altText="go back to view page" onClick={() => {
                            navigate("/profiles/education")
                        }}>go back</ToastAction>,
                    })
                } else {
                    toast({
                        variant: "destructive",
                        title: "Api Error",
                        description: response.message ?? "Something went wrong with Api",
                        action: <ToastAction altText="Pls try again" onClick={() => {
                            form.handleSubmit(submitForm)
                        }}>{"try again"}</ToastAction>,
                    })
                }
            } catch (err) {
                console.log("error in edit", err)
                toast({
                    variant: "destructive",
                    title: "Client Error",
                    description: JSON.stringify(err) ?? "Something went wrong with Api",
                    action: <ToastAction altText="Pls try again" onClick={() => {
                        form.handleSubmit(submitForm)
                    }}>{"try again"}</ToastAction>,
                })
            } finally {
                setLoader(false)
            }
        }
    }
    // console.log("profiler is ",profile)
    return (
        <div className="flex flex-1 justify-center align-middle bg-white">
            <Form {...form}>
                <form className="flex flex-col  my-2 rounded border-2 border-gray-600 bg-slate-200 "
                    id="profileForm"
                    onSubmit={form.handleSubmit(submitForm)}
                    encType="multipart/form-data"
                >
                    {loader ? <FormSkeleton /> : <>
                        <InputCustom
                            labelfor="schoolName"
                            label="schoolName"
                            inputType="text"
                            placeholder="Enter name Of school"
                            controls={form.control}
                        />
                        <InputCustom
                            labelfor="degree"
                            label="degree"
                            inputType="text"
                            placeholder="Enter name Of degree"
                            controls={form.control}
                        />
                        <InputCustom
                            labelfor="description"
                            label="description"
                            inputType="textarea"
                            placeholder="Enter your certificate Link To Download"
                            controls={form.control}
                        />
                        <InputCustom
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
                        />
                        <InputCustom
                            labelfor="schoolImage"
                            label="schoolImage"
                            inputType="file"
                            placeholder="Enter your School Image"
                            controls={form.control}
                            dataToEdit={state?.data?.schoolImage || undefined}
                        />
                    </>}
                    <ButtonCustom
                        type={"submit"}
                        value={"updateProfile"}
                        name={"Update Profile"}
                        formId={"profileForm"}
                        disabled={loader}
                        disabledText={pathType == 'add' ? "Adding pls wait..." : "Updating pls wait..."}
                    />
                </form>
            </Form>
        </div>
    );
}

export default EditEducation;


