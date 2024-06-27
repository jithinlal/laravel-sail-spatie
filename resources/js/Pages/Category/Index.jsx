import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Head} from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import {router} from "@inertiajs/core";
import ReactHtmlParser from 'react-html-parser';
import CategoryBlock from "@/Components/CategoryBlock.jsx";
import { useState } from "react";

export default function Index({auth, incomeCategories, expenseCategories}) {
    const [tab, setTab] = useState(1)

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h1 className="font-semibold text-xl leading-tight">Category</h1>}
        >
            <Head title="Category"/>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-primary overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="flex tabs tabs-boxed m-2" role="tablist">
                            <a role="tab" className={`tab w-full text-center ${tab === 1 ? 'tab-active' : ''}`}
                               onClick={() => setTab(1)}>
                                Expense
                            </a>
                            <a role="tab" className={`tab w-full text-center ${tab === 2 ? 'tab-active' : ''}`}
                               onClick={() => setTab(2)}>
                                Income
                            </a>
                        </div>
                        <div role="tabpanel"
                             className={`tab-content rounded-box p-6 ${tab === 1 ? 'block' : 'hidden'}`}>
                            <CategoryBlock categories={expenseCategories}/>
                        </div>
                        <div role="tabpanel"
                             className={`tab-content rounded-box p-6 ${tab === 2 ? 'block' : 'hidden'}`}>
                            <CategoryBlock categories={incomeCategories}/>
                        </div>
                    </div>
                </div>
            </div>
</AuthenticatedLayout>
)
}
