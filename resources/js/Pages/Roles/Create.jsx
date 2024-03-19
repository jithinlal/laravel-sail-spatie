import {Head, useForm} from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import InputError from "@/Components/InputError.jsx";

export default function Create({auth, permissions}) {
    const {data, setData, post, processing, reset, errors} = useForm({
        name: '',
        permissions: []
    })
    const submit = (e) => {
        e.preventDefault();
        console.log({data})
        // post(route('roles.store'), { onSuccess: () => reset() });
    };
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Create role"/>

            <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
                <form onSubmit={submit}>
                    <input
                        value={data.name}
                        placeholder="Name"
                        className="block m-2 w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                        onChange={e => setData('name', e.target.value)}
                    />
                    <InputError message={errors.name} className="m-2"/>
                    <div className="flex flex-wrap m-2">
                        {permissions.map(permission => (
                            <div key={permission.id} className="w-full md:w-1/4 sm:w-1/2 flex items-center">
                                <input
                                    type="checkbox"
                                    value={permission.id}
                                    className="mr-2 h-4 w-4 border border-gray-300 checked:bg-black focus-visible:bg-black focus:outline-none checked:border-transparent rounded-sm"
                                    onChange={e => setData('permissions', [e.target.value])}
                                />
                                <label className="mr-4">
                                    {permission.name}
                                </label>
                            </div>
                        ))}
                    </div>

                        <InputError message={errors.detail} className="m-2"/>
                        <PrimaryButton className="mt-4 m-2" disabled={processing}>Add</PrimaryButton>
                </form>
            </div>
        </AuthenticatedLayout>
)
}
