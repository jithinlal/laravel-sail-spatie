import React from 'react'
import {Head, useForm} from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import InputError from "@/Components/InputError.jsx";

export default function Create({auth, permissions}) {
    const {data, setData, post, processing, reset, errors} = useForm({
        name: '',
        permissions: []
    })
    const submit = (e) => {
        e.preventDefault();
        post(route('roles.store'), { onSuccess: () => reset() });
    };
    return (
        <AuthenticatedLayout user={auth.user}>
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
                        {permissions.map((permission) => (
                            <React.Fragment key={permission.id}>
                                <div className="form-control w-1/2 p-2">
                                    <label className="label cursor-pointer">
                                        <h6>{permission.name}</h6>
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
                    <InputError message={errors.name} className="m-2"/>
                    <InputError message={errors.permissions} className="m-2"/>
                    <PrimaryButton className="mt-4 m-2" disabled={processing}>Add</PrimaryButton>
                </form>
            </div>
        </AuthenticatedLayout>
    )
}
