import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Head} from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import { router } from "@inertiajs/core";
import ReactHtmlParser from 'react-html-parser';

export default function Index({auth, categories}) {
    console.log({categories})

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h1 className="font-semibold text-xl leading-tight">Category</h1>}
        >
            <Head title="Category" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-primary overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 items-center justify-center">
                                {categories.map((category) => (
                                    <div className="card card-compact bg-base-100 w-full sm:w-5/6 md:w-3/4 lg:w-full shadow-xl hover:bg-primary hover:cursor-pointer">
                                        <figure className="px-10 pt-10">
                                             {ReactHtmlParser(category.icon)}
                                        </figure>
                                        <div className="card-body items-center text-center">
                                            <p className="card-title text-sm lg:text-lg md:text-md">{category.name}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
