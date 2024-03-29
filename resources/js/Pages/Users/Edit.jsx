import React, {Fragment,useState} from 'react'
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Head, useForm} from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import toast from "react-hot-toast";
import {Combobox, Transition} from "@headlessui/react";
import {CheckIcon, ChevronUpDownIcon} from "@heroicons/react/20/solid/index.js";

export default function Edit({auth, permissions, roles, user, assignedRoles}) {
    const {data, setData, patch, processing, reset} = useForm({
        name: user.name,
        email: user.email,
        roles: assignedRoles.map(assignedRole => assignedRole.id),
    })

    const [selectedRoles, setSelectedRoles] = useState(assignedRoles)
    const [query, setQuery] = useState('')

    const submit = (e) => {
        e.preventDefault();
        patch(route('users.update', user.id), {
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

    const filteredRoles =
        query === ''
            ? roles
            : roles.filter((role) => {
                return role.name.toLowerCase().includes(query.toLowerCase())
            })

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
                    <div className="w-full max-w-md m-2">
                        <Combobox value={selectedRoles} onChange={value => {
                            setSelectedRoles(value)
                            let roles = value.map(item => item.id)
                            setData('roles', roles)
                        }} multiple>
                            <div className="relative mt-1">
                                <div
                                    className="relative w-full cursor-default overflow-hidden rounded-lg bg-primary text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                                    <Combobox.Input
                                        className="w-full border-none py-2 pl-3 pr-10 text-sm bg-primary leading-5 focus:ring-0"
                                        displayValue={(roles) =>
                                            roles.map((role) => role.name).join(', ')
                                        }
                                        onChange={(event) => setQuery(event.target.value)}
                                    />
                                    <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                                        <ChevronUpDownIcon
                                            className="h-5 w-5 text-gray-400"
                                            aria-hidden="true"
                                        />
                                    </Combobox.Button>
                                </div>
                                <Transition
                                    as={Fragment}
                                    leave="transition ease-in duration-100"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                    afterLeave={() => setQuery('')}
                                >
                                    <Combobox.Options
                                        className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-primary py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                                        {filteredRoles.length === 0 && query !== '' ? (
                                            <div className="relative cursor-default select-none px-4 py-2">
                                                Nothing found.
                                            </div>
                                        ) : (
                                            filteredRoles.map((role) => (
                                                <Combobox.Option
                                                    key={role.id}
                                                    className={({active}) =>
                                                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                                            active ? 'bg-secondary' : ''
                                                        }`
                                                    }
                                                    value={role}
                                                >
                                                    {({selected, active}) => (
                                                        <>
                                                            <span
                                                                className={`block truncate ${
                                                                    selected ? 'font-medium' : 'font-normal'
                                                                }`}
                                                            >
                                                              {role.name}
                                                            </span>
                                                            {selected ? (
                                                                <span
                                                                    className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                                                        active ? '' : 'text-secondary'
                                                                    }`}
                                                                >
                                                                <CheckIcon className="h-5 w-5" aria-hidden="true"/>
                                                              </span>
                                                            ) : null}
                                                        </>
                                                    )}
                                                </Combobox.Option>
                                            ))
                                        )}
                                    </Combobox.Options>
                                </Transition>
                            </div>
                        </Combobox>
                    </div>
                    <PrimaryButton className="mt-4 m-2" disabled={processing}>Update</PrimaryButton>
                </form>
            </div>
        </AuthenticatedLayout>
    )
}
