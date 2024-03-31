import React, {Fragment,useState} from 'react'
import {Head, useForm} from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import {toast} from "react-hot-toast";
import { Combobox, Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'


export default function Create({auth, permissions, roles}) {
    const {data, setData, post, processing, reset} = useForm({
        name: '',
        email: '',
        roles: []
    })

    const [selectedRoles, setSelectedRoles] = useState([])

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
                    <div className="w-full max-w-md m-2">
                        <div className="relative mt-1">
                            <Listbox value={selectedRoles} onChange={value => {
                                setSelectedRoles(value)
                                let roleIds = value.map(item => item.id)
                                setData('roles', roleIds)
                            }} multiple>
                                <Listbox.Button className="w-full border-none btn pl-3 pr-10 text-sm bg-primary leading-5 focus:ring-0">
                                    {selectedRoles.length === 0 && <h6>Role</h6>}
                                    {selectedRoles.map(selectedRole => selectedRole.name).join(', ')}
                                </Listbox.Button>
                                <Transition
                                    as={Fragment}
                                    leave="transition ease-in duration-100"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-primary py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                                        {roles.map(role => (
                                            <Listbox.Option
                                                key={role.id}
                                                className={({ active }) =>
                                                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                                        active ? 'bg-secondary' : ''
                                                    }`
                                                }
                                                value={role}
                                            >
                                                {({ selected }) => (
                                                    <>
                                                      <span
                                                          className={`block truncate ${
                                                              selected ? 'font-medium' : 'font-normal'
                                                          }`}
                                                      >
                                                        {role.name}
                                                      </span>
                                                        {selected ? (
                                                            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                                                <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                            </span>
                                                        ) : null}
                                                    </>
                                                )}
                                            </Listbox.Option>
                                        ))}
                                    </Listbox.Options>
                                </Transition>
                            </Listbox>
                        </div>
                    </div>
                    <PrimaryButton className="mt-4 m-2" disabled={processing}>Add</PrimaryButton>
                </form>
            </div>
        </AuthenticatedLayout>
    )
}
