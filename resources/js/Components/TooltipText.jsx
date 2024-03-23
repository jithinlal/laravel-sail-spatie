import {truncateText} from "@/util/util.js";

export default function TooltipText({text, limit}) {
    return (
        <div className="tooltip" data-tip={text}>
            {truncateText(text, limit)}
        </div>
    )
}
