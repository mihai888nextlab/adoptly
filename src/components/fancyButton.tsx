import { motion } from "framer-motion";

interface ButtonProps {
    text: string;
    onClick?: () => void;
}

export default function Button({ text, onClick }: ButtonProps) {
    return (
        <motion.button
            onClick={onClick}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 rounded-full  bg-primary
                       text-white font-semibold shadow-lg transition-all 
                       duration-300 ease-in-out hover:from-purple-600 hover:to-blue-500"
        >
            {text}
        </motion.button>
    );
}
