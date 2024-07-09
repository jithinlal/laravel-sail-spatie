import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Head, useForm} from "@inertiajs/react";
import GhostButton from "@/Components/GhostButton.jsx";
import React, { useState} from "react";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import {toast} from "react-hot-toast";
import TooltipText from "@/Components/TooltipText.jsx";
import {router} from "@inertiajs/core";
import Dialog from "@/Components/Dialog.jsx";
import Pagination from "@/Components/Pagination.jsx";

export default function Index({auth, accounts, bankTypes, currencies}) {
    const [deleteAccountId, setDeleteAccountId] = useState(null);

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
                        <div className="p-6 overflow-x-auto h-screen md:h-auto">
                            <table className="w-full table">
                                <thead>
                                <tr>
                                    <th>
                                        Name
                                    </th>
                                    <th>
                                        Balance
                                    </th>
                                    <th className="flex items-center justify-center">
                                        Actions
                                    </th>
                                </tr>
                                </thead>
                                <tbody className="bg-primary">
                                {accounts.data.map((account, index) => (
                                    <tr key={index}>
                                        <td>
                                            {account.name}
                                        </td>
                                        <td>
                                            <TooltipText text={account.balance} limit={50}/>
                                        </td>
                                        <td>
                                            <div className="hidden md:block">
                                                <ul className="menu menu-horizontal bg-primary rounded-box flex items-center justify-center">
                                                    <li>
                                                        <a className="tooltip tooltip-top" data-tip="Edit"
                                                           onClick={() => router.visit(route('accounts.edit', {id: account.id}))}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                                 viewBox="0 0 24 24" strokeWidth="1.5"
                                                                 stroke="currentColor" className="w-6 h-6">
                                                                <path strokeLinecap="round"
                                                                      strokeLinejoin="round"
                                                                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"/>
                                                            </svg>

                                                        </a>
                                                    </li>

                                                        <li>
                                                            <a className="tooltip tooltip-top text-error"
                                                               data-tip="Delete"
                                                               onClick={() => {
                                                                   setDeleteAccountId(account.id);
                                                                   document.getElementById('account-delete-confirm').showModal()
                                                               }}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                                     viewBox="0 0 24 24" strokeWidth="1.5"
                                                                     stroke="currentColor" className="w-6 h-6">
                                                                    <path strokeLinecap="round"
                                                                          strokeLinejoin="round"
                                                                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"/>
                                                                </svg>
                                                            </a>
                                                        </li>

                                                </ul>
                                            </div>
                                            <div className="block md:hidden">
                                                <div
                                                    className="dropdown dropdown-left flex items-center justify-center">
                                                    <summary tabIndex={0} className="m-1 btn btn-ghost">
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                             viewBox="0 0 24 24"
                                                             strokeWidth="1.5" stroke="currentColor"
                                                             className="w-6 h-6">
                                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                                  d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"/>
                                                        </svg>
                                                    </summary>
                                                    <ul tabIndex={0}
                                                        className="shadow menu dropdown-content z-[1] bg-primary rounded-box">
                                                        <ul className="menu bg-primary rounded-box">
                                                            <li>
                                                                <a className="tooltip tooltip-right"
                                                                   data-tip="Edit"
                                                                   onClick={() => router.visit(route('accounts.edit', {id: account.id}))}>
                                                                    <svg xmlns="http://www.w3.org/2000/svg"
                                                                         fill="none"
                                                                         viewBox="0 0 24 24" strokeWidth="1.5"
                                                                         stroke="currentColor"
                                                                         className="w-6 h-6">
                                                                        <path strokeLinecap="round"
                                                                              strokeLinejoin="round"
                                                                              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"/>
                                                                    </svg>
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a className="tooltip tooltip-right"
                                                                   data-tip="Delete"
                                                                   onClick={() => {
                                                                       setDeleteAccountId(account.id);
                                                                       document.getElementById('account-delete-confirm').showModal()
                                                                   }}>
                                                                    <svg xmlns="http://www.w3.org/2000/svg"
                                                                         fill="none"
                                                                         viewBox="0 0 24 24" strokeWidth="1.5"
                                                                         stroke="currentColor"
                                                                         className="w-6 h-6">
                                                                        <path strokeLinecap="round"
                                                                              strokeLinejoin="round"
                                                                              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"/>
                                                                    </svg>
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </ul>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                            <Dialog id={deleteAccountId} modelId="account-delete-confirm"
                                    routePath="accounts.destroy"/>
                            <div className="flex justify-center align-items">
                                <Pagination
                                    className="mt-5"
                                    currentPage={accounts.current_page}
                                    prevPageUrl={accounts.prev_page_url}
                                    nextPageUrl={accounts.next_page_url}
                                    totalPages={accounts.last_page}
                                />
                            </div>
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
