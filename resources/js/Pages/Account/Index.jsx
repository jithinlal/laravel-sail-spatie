import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Head, useForm} from "@inertiajs/react";
import GhostButton from "@/Components/GhostButton.jsx";
import React, { useState} from "react";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import {toast} from "react-hot-toast";

export default function Index({auth, accounts, bankTypes, currencies}) {
    console.log({accounts})

    const {data, setData, post, processing, reset} = useForm({
        name: '',
        bankType: 0,
        balance: 0,
        // hard coded id of the INR
        currency: 25,
    })

    const submit = (e) => {
        e.preventDefault();
        console.log({data})
        post(route('accounts.store'), {
            onSuccess: () => {
                toast.success('Account created!')
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

            <dialog id='create-account-modal' className="modal modal-middle sm:modal-middle">
                <div className="modal-box">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-1 top-1">✕</button>

                        <label className="input input-bordered flex items-center gap-2 w-full max-w-md m-2">
                            Name
                            <input
                                value={data.name}
                                className="grow border-none border-transparent focus:border-transparent focus:ring-0"
                                onChange={e => setData('name', e.target.value)}
                            />
                        </label>
                        <label className="input input-bordered flex items-center gap-2 w-full max-w-md m-2">
                            Balance
                            <input
                                value={data.balance}
                                className="grow border-none border-transparent focus:border-transparent focus:ring-0"
                                onChange={e => setData('balance', e.target.value)}
                            />
                        </label>
                        <select className="m-2 select select-bordered w-full max-w-md"
                                onChange={e => setData('bankType', e.target.value)}>
                            <option disabled selected>Type</option>
                            {
                                bankTypes.map(bankType =>
                                    <option key={bankType.name} value={bankType.value}>
                                        {bankType.name}
                                    </option>
                                )
                            }
                        </select>
                        <select className="m-2 select select-bordered w-full max-w-md"
                                onChange={e => setData('currency', e.target.value)}>
                            <option disabled selected>Currency</option>
                            {
                                currencies.map(currency =>
                                    <option key={currency.id} value={currency.id}
                                            selected={currency.id === data.currency}>
                                        {currency.code} - {currency.name}
                                    </option>
                                )
                            }
                        </select>
                        <div className="flex justify-around">
                            <PrimaryButton className="mt-2 w-1/3" disabled={processing} onClick={(e) => submit(e)}>
                                Add
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </dialog>
        </AuthenticatedLayout>
    )
}
