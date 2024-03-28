import React from 'react'
import {Head, useForm} from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import {toast} from "react-hot-toast";

export default function Create({auth, permissions, roles}) {
    const {data, setData, post, processing, reset} = useForm({
        name: '',
        email: '',
        role: ''
    })
    const submit = (e) => {
        e.preventDefault();
        post(route('users.store'), {
            onSuccess: () => {
                toast.success('User created!')
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
            <Head title="Create user"/>

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
                        <select className="select select-bordered w-full max-w-md" onChange={e => setData('role', e.target.value)}>
                            <option disabled selected>Role</option>
                            {roles.map(role => (
                                <option key={role.id} value={role.id}>
                                    {role.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <PrimaryButton className="mt-4 m-2" disabled={processing}>Add</PrimaryButton>
                </form>
            </div>
        </AuthenticatedLayout>
    )
}
