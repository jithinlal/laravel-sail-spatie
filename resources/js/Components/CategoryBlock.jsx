import ReactHtmlParser from "react-html-parser";

export default function CategoryBlock({categories}) {
    return (
        <div className="p-6">
            <div
                className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 items-center justify-center">
                {categories.map((category) => (
                    <div
                        className="card card-compact bg-base-100 w-full sm:w-5/6 md:w-3/4 lg:w-full shadow-xl hover:bg-secondary hover:cursor-pointer">
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
    )
}
