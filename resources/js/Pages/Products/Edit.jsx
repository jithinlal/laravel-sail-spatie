import {Head, useForm} from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import {toast} from "react-hot-toast";

export default function Edit({auth, product, permissions}) {
    const {data, setData, patch, processing, reset} = useForm({
        name: product.name,
        detail: product.detail
    })
    const submit = (e) => {
        e.preventDefault();
        patch(route('products.update',  product.id), {
            onSuccess: () => {
                toast.success('Product updated!')
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
        <AuthenticatedLayout user={auth.user} permissions={permissions}>
            <Head title="Update product"/>

            <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
                <form onSubmit={submit}>
                    <input
                        value={data.name}
                        placeholder="Name"
                        className="input block m-2 input-bordered w-full"
                        onChange={e => setData('name', e.target.value)}
                    />
                    <input
                        value={data.detail}
                        placeholder="Detail"
                        className="input block m-2 input-bordered w-full"
                        onChange={e => setData('detail', e.target.value)}
                    />
                    <PrimaryButton className="mt-4 m-2" disabled={processing}>Update</PrimaryButton>
                </form>
            </div>
        </AuthenticatedLayout>
    )
}
