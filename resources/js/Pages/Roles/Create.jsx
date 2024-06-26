import React from 'react'
import {Head, useForm} from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import {toast} from "react-hot-toast";

export default function Create({auth, permissions, permissionList}) {
    const {data, setData, post, processing, reset} = useForm({
        name: '',
        permissions: []
    })
    const submit = (e) => {
        e.preventDefault();
        post(route('roles.store'), {
            onSuccess: () => {
                toast.success('Role created!')
                reset()
            },
            onError: (errors) => {
                let error = ''
                Object.values(errors).forEach(err => {
                    error += err + '\n'
                })

                if (error) {
                    toast.error(error)
                }
            }
        });
    };
    return (
        <AuthenticatedLayout user={auth.user} permissions={permissions}>
            <Head title="Create role"/>

            <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
                <form onSubmit={submit}>
                    <input
                        value={data.name}
                        placeholder="Name"
                        className="m-2 input input-bordered w-full"
                        onChange={e => setData('name', e.target.value)}
                    />
                    <div className="w-full flex flex-wrap m-1">
                        {permissionList.map((permission) => (
                            <React.Fragment key={permission.id}>
                                <div className="form-control w-1/2 p-2">
                                    <label className="label cursor-pointer">
                                        <h6>{permission.title}</h6>
                                        <input type="checkbox" className="checkbox" onChange={(e) => {
                                            let prevPermissions = data.permissions
                                            if(e.target.checked) {
                                                prevPermissions.push(permission.id)
                                            } else {
                                                prevPermissions = prevPermissions.filter(prevPermission => prevPermission !== permission.id)
                                            }
                                            setData('permissions', prevPermissions)
                                        }}/>
                                    </label>
                                    <div className="divider"></div>
                                </div>
                            </React.Fragment>
                        ))}
                    </div>
                    <PrimaryButton className="mt-4 m-2" disabled={processing}>Add</PrimaryButton>
                </form>
            </div>
        </AuthenticatedLayout>
    )
}
