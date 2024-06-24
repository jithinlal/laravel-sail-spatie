import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Head} from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import { router } from "@inertiajs/core";

export default function Index({auth, accounts}) {
    console.log({accounts});

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h1 className="font-semibold text-xl leading-tight">Account</h1>}
        >
            <Head title="Account" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-primary overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <h5>Here are your accounts!</h5>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
