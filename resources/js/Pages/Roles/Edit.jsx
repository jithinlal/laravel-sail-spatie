import React, {useState} from 'react'
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Head, useForm} from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import toast from "react-hot-toast";

export default function Edit({auth, permissions, permissionList, role, rolePermissions}) {
    const {data, setData, patch, processing, reset} = useForm({
        name: role.name,
        permissions: rolePermissions.map(item => item.id)
    })
    const submit = (e) => {
        e.preventDefault();
        patch(route('roles.update', role.id), {
            onSuccess: () => {
                toast.success('Role updated!')
                reset()
            },
            onError: (errors) =>  {
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

    const permissionNames = permissionList.map(item => {
        return {
            name: item.name,
            included: item.included ?? false,
        }
    })

    const [checkedItems, setCheckedItems] = useState(permissionNames.reduce((prev, curr) => ({
        ...prev,
        [curr.name]: curr.included ?? false
    }), {}))

    const handleChange = (event, permissionId) => {
        let prevPermissions = data.permissions

        if (event.target.checked) {
            prevPermissions.push(permissionId)
        } else {
            prevPermissions = prevPermissions.filter(prevPermission => prevPermission !== permissionId)
        }

        setData('permissions', prevPermissions)

        setCheckedItems({
            ...checkedItems, [event.target.name]: event.target.checked
        })
    }

    return (
        <AuthenticatedLayout permissions={permissions} user={auth.user}>
            <Head title="Update role"/>

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
                                        <input type="checkbox" name={permission.name} className="checkbox" checked={checkedItems[permission.name] || false} onChange={(event) => handleChange(event, permission.id)}/>
                                    </label>
                                    <div className="divider"></div>
                                </div>
                            </React.Fragment>
                        ))}
                    </div>
                    <PrimaryButton className="mt-4 m-2" disabled={processing}>Update</PrimaryButton>
                </form>
            </div>
        </AuthenticatedLayout>
    )
}
