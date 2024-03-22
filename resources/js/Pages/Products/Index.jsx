import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Head} from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import {router} from '@inertiajs/core'

export default function Index({auth, can, products, permissions}) {
    return (
        <AuthenticatedLayout user={auth.user} permissions={permissions}>
            <Head title="Products"/>

            <div className="max-w-3xl mx-auto p-4 sm:p-6 lg:p-8">
                <div className="bg-primary flex items-center justify-between p-4 rounded-md">
                    <div className="font-bold">
                        <h1>
                            Products
                        </h1>
                    </div>
                    {
                        can['product-create'] &&
                        <PrimaryButton onClick={() => router.visit(route('products.create'))}>
                            Create Product
                        </PrimaryButton>
                    }
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full table">
                        <thead>
                            <tr>
                                <th>
                                    Name
                                </th>
                                <th>
                                    Detail
                                </th>
                                <th>
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-primary">
                        {products.data.map((product, index) => (
                            <tr key={index}>
                                <td>
                                    {product.name}
                                </td>
                                <td>
                                    {product.detail}
                                </td>
                                <td>
                                    <PrimaryButton className='mr-2' disabled={false}>Show</PrimaryButton>
                                    {
                                        product.user.id === auth.user.id &&
                                        can['product-edit'] &&
                                        <PrimaryButton className='mr-2' onClick={() => router.visit(route('products.edit', {id: product.id}))}>Edit</PrimaryButton>
                                    }
                                    {
                                        product.user.id === auth.user.id &&
                                        can['product-delete'] &&
                                        <PrimaryButton onClick={() => router.delete(route('products.destroy', product.id))}>Delete</PrimaryButton>
                                    }
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
