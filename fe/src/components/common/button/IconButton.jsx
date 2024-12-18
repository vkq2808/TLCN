import React from "react";
import { motion } from "framer-motion";
import '@fortawesome/fontawesome-free/css/all.min.css';

const ICON_BUTTON_TAILWIND_CSS = "flex cursor-pointer border-none bg-transparent hover:text-[#002fff] px-2 text-inherit";

/**
 * IconButton component renders a button with an icon and optional status indicator.
 *
 * @param {Object} props - The properties object.
 * @param {string} props.className - Additional CSS classes for the button.
 * @param {string} props.iconClassName - CSS classes for the icon.
 * @param {function} props.onClick - Click event handler for the button.
 * @param {Object} [props.status] - Optional status object to display a count indicator.
 * @param {number} [props.status.count] - The count to display in the status indicator.
 * @param {number} [props.size=20] - The size of the icon in pixels.
 *
 * @returns {JSX.Element} The rendered IconButton component.
 */
const IconButton = ({ className, iconClassName, onClick, status, size = 20 }) => {
    const [hoverBtn, setHoverBtn] = React.useState(false);

    if (status) {
        return (
            <motion.div initial={{ scale: 1 }} animate={{ scale: hoverBtn ? 1.1 : 1 }} transform={{ duration: 0.5 }}
                onMouseEnter={() => setHoverBtn(true)} onMouseLeave={() => setHoverBtn(false)}
                onClick={onClick} className={`${ICON_BUTTON_TAILWIND_CSS} justify-between ${className}`}>
                <i className={`text-inherit text-[${size}px] ${iconClassName}`} />
                <div className="flex flex-row-reverse absolute top-[-21px] left-[21px]">
                    <div className=" text-xs bg-transparent px-[4px] rounded-[50%] border-solid border-[red]">{status.count}</div>
                </div>
            </motion.div>
        );
    }

    return (
        <div onClick={onClick} className={`${ICON_BUTTON_TAILWIND_CSS} ${className}`}>
            <i className={`text-inherit text-[${size}px] ${iconClassName}`} />
        </div>
    );
}

export default IconButton;