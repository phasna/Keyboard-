import { motion } from "framer-motion";

const reviews = [
    { name: "Jack", username: "@jack", body: "C'est incroyable, du jamais vu !", img: "https://avatar.vercel.sh/jack" },
    { name: "Jill", username: "@jill", body: "Je suis sans voix, c'est trop fort !", img: "https://avatar.vercel.sh/jill" },
    { name: "John", username: "@john", body: "J'adore totalement ce projet !", img: "https://avatar.vercel.sh/john" },
    { name: "Alice", username: "@alice", body: "L'expérience utilisateur est parfaite !", img: "https://avatar.vercel.sh/alice" },
    { name: "Bob", username: "@bob", body: "Une expérience visuelle incroyable !", img: "https://avatar.vercel.sh/bob" },
];

const ReviewCard = ({ img, name, username, body }) => {
    return (
        <motion.div
            className="relative flex flex-col items-start w-96 h-auto p-4 rounded-xl shadow-lg border
                 border-gray-300 bg-white bg-opacity-25 dark:border-gray-700 dark:bg-gray-800"
            whileHover={{ scale: 1.05, rotateY: 5 }}
            whileTap={{ scale: 0.95 }}
        >
            <div className="flex items-center gap-3">
                <img className="rounded-full" width="40" height="40" alt={name} src={img} />
                <div className="flex flex-col">
                    <span className="text-sm font-semibold text-white dark:text-white">{name}</span>
                    <span className="text-xs text-white dark:text-gray-400">{username}</span>
                </div>
            </div>
            <p className="mt-2 text-sm text-white dark:text-gray-300">{body}</p>
        </motion.div>
    );
};

export default function TextScroll3D() {
    return (
        <div className={"my-20 text-white"}>
            <h1 className={" text-center text-5xl p-10 font-light h-32 bg-gradient-to-r from-gray-600 via-white to-gray-600 text-transparent bg-clip-text"}>
                AVIS DE NOTRE CLIENTS
            </h1>
            <div className="relative flex w-full items-center justify-center overflow-hidden [perspective:1000px] h-40">
                <motion.div
                    className="flex gap-6"
                    animate={{x: ["0%", "-20%"], rotateY: [0, 0]}}
                    transition={{repeat: Infinity, duration: 40, ease: "linear"}}
                    style={{transformOrigin: "center"}}
                >
                    {[...reviews, ...reviews].map((review, index) => (
                        <motion.div
                            key={index}
                            className="relative"
                            animate={{rotateY: [0, 0, -5, 0]}}
                            transition={{repeat: Infinity, duration: 8, ease: "easeInOut"}}
                        >
                            <ReviewCard {...review} />
                        </motion.div>
                    ))}
                </motion.div>
            </div>

        <div className="relative flex w-full items-center justify-center overflow-hidden [perspective:1000px]">
        <motion.div
            className="flex gap-6"
            animate={{x: ["-20%", "0%"], rotateY: [0, 0]}}
            transition={{repeat: Infinity, duration: 40, ease: "linear"}}
            style={{transformOrigin: "center"}}
        >
            {[...reviews, ...reviews].map((review, index) => (
                <motion.div
                    key={index}
                    className="relative"
                    animate={{rotateY: [0, 0, -5, 0]}}
                    transition={{repeat: Infinity, duration: 8, ease: "easeInOut"}}
                >
                    <ReviewCard {...review} />
                </motion.div>
            ))}
        </motion.div>
    </div>
        </div>
    );
}
