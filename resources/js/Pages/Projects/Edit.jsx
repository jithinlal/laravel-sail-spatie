import React, {Fragment,useState} from 'react'
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Head, useForm} from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import toast from "react-hot-toast";
import { Combobox, Listbox, Transition } from "@headlessui/react";
import {CheckIcon, ChevronUpDownIcon} from "@heroicons/react/20/solid/index.js";

export default function Edit({auth, permissions, roles, project, presets}) {
    const {data, setData, patch, processing, reset} = useForm({
        name: project.name,
        detail: project.detail,
        preset: project.preset.id,
    })

    const [selectedPreset, setSelectedPreset] = useState(project.preset)

    const submit = (e) => {
        e.preventDefault();
        patch(route('projects.update', project.id), {
            onSuccess: () => {
                toast.success('Project updated!')
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
            <Head title="Update project"/>

            <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
                <form onSubmit={submit}>
                    <input
                        value={data.name}
                        placeholder="Name"
                        className="m-2 input input-bordered w-full max-w-md"
                        onChange={e => setData('name', e.target.value)}
                    />
                    <input
                        value={data.detail}
                        placeholder="Email"
                        className="m-2 input input-bordered w-full max-w-md"
                        onChange={e => setData('detail', e.target.value)}
                    />
                    <div className="w-full max-w-md m-2">
                        <div className="relative mt-1">
                            <Listbox by="id" value={selectedPreset} onChange={value => {
                                setSelectedPreset(value)
                                setData('preset', value.id)
                            }}>
                                <Listbox.Button
                                    className="w-full border-none btn pl-3 text-sm bg-primary">
                                    {selectedPreset === null ? <h6>Preset</h6> : selectedPreset.name}
                                </Listbox.Button>
                                <Transition
                                    as={Fragment}
                                    leave="transition ease-in duration-100"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <Listbox.Options
                                        className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-primary py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                                        {presets.map(preset => (
                                            <Listbox.Option
                                                key={preset.id}
                                                className={({active}) =>
                                                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                                        active ? 'bg-secondary' : ''
                                                    }`
                                                }
                                                value={preset}
                                            >
                                                {({selected}) => (
                                                    <>
                                                      <span
                                                          className={`block truncate ${
                                                              selected ? 'font-medium' : 'font-normal'
                                                          }`}
                                                      >
                                                        {preset.name}
                                                      </span>
                                                        {selected ? (
                                                            <span
                                                                className="absolute inset-y-0 left-0 flex items-center pl-3">
                                                                <CheckIcon className="h-5 w-5" aria-hidden="true"/>
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
                    <PrimaryButton className="mt-4 m-2" disabled={processing}>Update</PrimaryButton>
                </form>
            </div>
        </AuthenticatedLayout>
    )
}
