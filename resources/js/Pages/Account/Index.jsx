import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Head, useForm} from "@inertiajs/react";
import GhostButton from "@/Components/GhostButton.jsx";
import {router} from "@inertiajs/core";
import {Listbox, Transition} from "@headlessui/react";
import React, {Fragment, useState} from "react";
import {CheckIcon} from "@heroicons/react/20/solid/index.js";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import {toast} from "react-hot-toast";

export default function Index({auth, accounts, bankTypes, currencies}) {
    const {data, setData, post, processing, reset} = useForm({
        name: '',
        bankType: 0,
        balance: 0,
        // hard coded id of the INR
        currency: 25,
    })

    const [selectedBankType, setSelectedBankType] = useState(null)
    const [selectedCurrency, setSelectedCurrency] = useState(currencies.find(currency => currency.id === 25))

    const submit = (e) => {
        e.preventDefault();
        post(route('accounts.store'), {
            onSuccess: () => {
                toast.success('Project created!')
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
        <AuthenticatedLayout
            user={auth.user}
            header={<h1 className="font-semibold text-xl leading-tight">Account</h1>}
            sideHeader={<GhostButton onClick={() => document.getElementById('create-account-modal').showModal()}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                     stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15"/>
                </svg>
            </GhostButton>}
        >
            <Head title="Account"/>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-primary overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <h5>Here are your accounts!</h5>
                        </div>
                    </div>
                </div>
            </div>

            <dialog id='create-account-modal' className="modal modal-bottom sm:modal-middle p-10">
                <div className="modal-box">
                    <div className="modal-action">
                        <form method="dialog">
                            <input
                                value={data.name}
                                placeholder="Name"
                                className="m-2 input input-bordered w-full max-w-md"
                                onChange={e => setData('name', e.target.value)}
                            />
                            <input
                                value={data.detail}
                                placeholder="Detail"
                                className="m-2 input input-bordered w-full max-w-md"
                                onChange={e => setData('detail', e.target.value)}
                            />
                            <div className="w-full max-w-md m-2">
                                <div className="relative mt-1">
                                    <Listbox value={selectedBankType} onChange={value => {
                                        setSelectedBankType(value)
                                        setData('bankType', value)
                                    }}>
                                        <Listbox.Button
                                            className="w-full border-none btn pl-3 pr-10 text-sm bg-primary leading-5 focus:ring-0">
                                            {selectedBankType === null ? <h6>Type</h6> : selectedBankType.name}
                                        </Listbox.Button>
                                        <Transition
                                            as={Fragment}
                                            leave="transition ease-in duration-100"
                                            leaveFrom="opacity-100"
                                            leaveTo="opacity-0"
                                        >
                                            <Listbox.Options
                                                className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-primary py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                                                {bankTypes.map(bankType => (
                                                    <Listbox.Option
                                                        key={bankType.name}
                                                        className={({active}) =>
                                                            `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                                                active ? 'bg-secondary' : ''
                                                            }`
                                                        }
                                                        value={bankType.value}
                                                    >
                                                        {({selected}) => (
                                                            <>
                                                      <span
                                                          className={`block truncate ${
                                                              selected ? 'font-medium' : 'font-normal'
                                                          }`}
                                                      >
                                                        {bankType.name}
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
                            <div className="w-full max-w-md m-2">
                                <div className="relative mt-1">
                                    <Listbox value={selectedCurrency} onChange={value => {
                                        setSelectedCurrency(value)
                                        setData('currency', value)
                                    }}>
                                        <Listbox.Button
                                            className="w-full border-none btn pl-3 pr-10 text-sm bg-primary leading-5 focus:ring-0">
                                            {selectedCurrency === null ? <h6>Currency</h6> : selectedCurrency.code}
                                        </Listbox.Button>
                                        <Transition
                                            as={Fragment}
                                            leave="transition ease-in duration-100"
                                            leaveFrom="opacity-100"
                                            leaveTo="opacity-0"
                                        >
                                            <Listbox.Options
                                                className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-primary py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                                                {currencies.map(currency => (
                                                    <Listbox.Option
                                                        key={currency.id}
                                                        className={({active}) =>
                                                            `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                                                active ? 'bg-secondary' : ''
                                                            }`
                                                        }
                                                        value={currency}
                                                    >
                                                        {({selected}) => (
                                                            <>
                                                      <span
                                                          className={`block truncate ${
                                                              selected ? 'font-medium' : 'font-normal'
                                                          }`}
                                                      >
                                                        {currency.code}
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
                            <PrimaryButton className="mt-4 m-2" disabled={processing}>Add</PrimaryButton>
                        </form>
                    </div>
                </div>
            </dialog>
        </AuthenticatedLayout>
    )
}
