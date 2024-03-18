import {Head, useForm} from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import InputError from "@/Components/InputError.jsx";

export default function Create({auth}) {
    const {data, setData, post, processing, reset, errors} = useForm({
        name: '',
        detail: ''
    })
    const submit = (e) => {
        e.preventDefault();
        post(route('products.store'), { onSuccess: () => reset() });
    };
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Create product"/>

            <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
                <form onSubmit={submit}>
                    <input
                        value={data.name}
                        placeholder="Name"
                        className="block m-2 w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                        onChange={e => setData('name', e.target.value)}
                    />
                    <InputError message={errors.name} className="m-2"/>
                    <input
                        value={data.detail}
                        placeholder="Detail"
                        className="block m-2 w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                        onChange={e => setData('detail', e.target.value)}
                    />
                    <InputError message={errors.detail} className="m-2"/>
                    <PrimaryButton className="mt-4 m-2" disabled={processing}>Add</PrimaryButton>
                </form>
            </div>
        </AuthenticatedLayout>
    )
}
