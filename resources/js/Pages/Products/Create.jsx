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
                        className="input block m-2 input-bordered w-full"
                        onChange={e => setData('name', e.target.value)}
                    />
                    <InputError message={errors.name} className="m-2"/>
                    <input
                        value={data.detail}
                        placeholder="Detail"
                        className="input block m-2 input-bordered w-full"
                        onChange={e => setData('detail', e.target.value)}
                    />
                    <InputError message={errors.detail} className="m-2"/>
                    <PrimaryButton className="mt-4 m-2" disabled={processing}>Add</PrimaryButton>
                </form>
            </div>
        </AuthenticatedLayout>
    )
}
