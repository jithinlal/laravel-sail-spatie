import { router } from "@inertiajs/core";

export default function Dialog({ modelId, id, routePath  }) {
    return (
        <dialog id={modelId} className="modal modal-bottom sm:modal-middle">
            <div className="modal-box">
                <p className="py-4">Are you sure you want to delete?</p>
                <div className="modal-action">
                    <form method="dialog">
                        <button className="btn btn-secondary">
                            Cancel
                        </button>
                        <button className="btn btn-error ml-2"
                                onClick={() => router.delete(route(routePath, id))}>
                            Delete
                        </button>
                    </form>
                </div>
            </div>
        </dialog>
    );
}
