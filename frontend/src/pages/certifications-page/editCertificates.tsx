import { ReactElement, FC, useEffect, useState } from "react";
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
    nameOfCertificate: z.string().min(3),
    certificateLinkToDownload: z.string().url(),
    imageCertificate: z.any(z.instanceof(File)),
})
type FormFields = z.infer<typeof schemaProfile>
const EditCertificate: React.FC = (): ReactElement => {
    const items = ["i1", "i2", "i3", "i4", "i5", "i6", "i7", "i8"]
    const { profile } = useParams()
    const { id, pathname } = useRouteMatch();
    // const { handleSubmit, register, formState: { errors } } = useForm<FormFields>({
    //     resolver: zodResolver(schemaProfile)
    // })
    const form = useForm<FormFields>({
        resolver: zodResolver(schemaProfile)
    })
    const [loader, setLoader] = useState(false)
    const pathType = getPathName()
    const { toast } = useToast()
    const navigate = useNavigate();
    const location = useLocation();
    const { state } = location || {};
    useEffect(() => {
        if (pathType != "add") {
            form.reset(state.data, { keepValues: false, keepDefaultValues: true })
        } else {
            form.reset();
        }

    }, [state])
    const submitForm: SubmitHandler<FormFields> = async (data: any) => {
        setLoader(true)
        if (pathType == "add") {
            try {
                const params: requestParams = {
                    method: "POST",
                    url: `${backendBaseURL}/api/certificates/add`,
                    data: { ...data, imageCertificate: data?.imageCertificate?.[0] },
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
                        navigate("/profiles/certifications")
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
                    url: `${backendBaseURL}/api/certificate/edit/${state.data.id}`,
                    data: { ...data, imageCertificate: data?.imageCertificate?.[0] },
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
                            navigate("/profiles/certifications")
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
            <Toaster className="flex absolute top-10 " />
            <Form {...form}>
                <form className="flex flex-col  my-2 rounded border-2 border-gray-600 bg-slate-200 "
                    id="profileForm"
                    onSubmit={form.handleSubmit(submitForm)}
                >
                    {loader ? <FormSkeleton /> : <>
                        <InputCustom
                            labelfor="nameOfCertificate"
                            label="nameOfCertificate"
                            inputType="text"
                            placeholder="Enter name Of Certificate"
                            controls={form.control}
                        />

                        <InputCustom
                            labelfor="certificateLinkToDownload"
                            label="certificateLinkToDownload"
                            inputType="url"
                            placeholder="Enter your certificate Link To Download"
                            controls={form.control}
                        />
                        <InputCustom
                            labelfor="imageCertificate"
                            label="imageCertificate"
                            inputType="file"
                            placeholder="Enter your image of Certificate"
                            controls={form.control}
                            dataToEdit={state?.data?.imageCertificate || undefined}
                        />
                    </>}
                    <ButtonCustom
                        type={"submit"}
                        formId={"profileForm"}
                        value={pathType == 'add' ? "Add certi" : "Update certi"}
                        name={pathType == 'add' ? "Add certi" : "Update certi"}
                        disabled={loader}
                        disabledText={pathType == 'add' ? "Adding pls wait..." : "Updating pls wait..."}
                    />
                </form>
            </Form>
        </div>
    );
}

export default EditCertificate;



