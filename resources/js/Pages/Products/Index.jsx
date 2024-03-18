import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Head} from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import {router} from '@inertiajs/core'

export default function Index({auth, can, products}) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Products"/>

            <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
                <div className="flex items-center justify-between p-4 bg-gray-200 rounded-md">
                    <div className="font-bold">Products</div>
                    {
                        can['product-create'] &&
                        <PrimaryButton onClick={() => router.visit(route('products.create'))}>create product</PrimaryButton>
                    }
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Name
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Detail
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                        {products.data.map((product, index) => (
                            <tr key={index}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {product.name}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {product.detail}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    <PrimaryButton className='mr-2' disabled={false}>Show</PrimaryButton>
                                    {
                                        product.user.id === auth.user.id &&
                                        can['product-edit'] &&
                                        <PrimaryButton className='mr-2' disabled={false}>Edit</PrimaryButton>
                                    }
                                    {
                                        product.user.id === auth.user.id &&
                                        can['product-delete'] &&
                                        <PrimaryButton disabled={false}>Delete</PrimaryButton>
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
