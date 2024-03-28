import React, {useState} from 'react'
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Head, useForm} from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import toast from "react-hot-toast";

export default function Edit({auth, permissions, roles, user, role}) {
    console.log({role, roles, user})
    const {data, setData, patch, processing, reset} = useForm({
        name: user.name,
        email: user.email,
        role: role,
    })
    const submit = (e) => {
        e.preventDefault();
        patch(route('users.update', role.id), {
            onSuccess: () => {
                toast.success('User updated!')
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

    return (
        <AuthenticatedLayout permissions={permissions} user={auth.user}>
            <Head title="Update user"/>

            <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
                <form onSubmit={submit}>
                    <input
                        value={data.name}
                        placeholder="Name"
                        className="m-2 input input-bordered w-full max-w-md"
                        onChange={e => setData('name', e.target.value)}
                    />
                    <input
                        value={data.email}
                        placeholder="Email"
                        className="m-2 input input-bordered w-full max-w-md"
                        onChange={e => setData('email', e.target.value)}
                    />
                    <div className="w-full flex flex-wrap m-1">
                        <select className="select select-bordered m-1 w-full max-w-md"
                                onChange={e => setData('role', e.target.value)}>
                            {roles.map(role => (
                                <option key={role.id} value={role.id} selected={role.id === role}>
                                    {role.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <PrimaryButton className="mt-4 m-2" disabled={processing}>Update</PrimaryButton>
                </form>
            </div>
        </AuthenticatedLayout>
    )
}
