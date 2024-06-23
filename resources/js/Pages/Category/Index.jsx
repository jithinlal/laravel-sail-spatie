import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Head} from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import { router } from "@inertiajs/core";

export default function Index({auth, permissions}) {
    return (
        <AuthenticatedLayout user={auth.user} permissions={permissions}>
            <Head title="Categories"/>

            <div className="max-w-3xl mx-auto p-4 sm:p-6 lg:p-8">
                <div className="bg-primary flex items-center justify-between p-4 rounded-md">
                    <div className="font-bold">
                        <h1>
                            Categories
                        </h1>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
