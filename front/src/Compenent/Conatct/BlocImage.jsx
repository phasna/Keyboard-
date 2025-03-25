import { motion } from "framer-motion";
import { Card, CardHeader, CardFooter, Image, Button } from "@heroui/react";
import Image1 from "../../../public/BlocText/Bloc5.png";
import Image2 from "../../../public/BlocText/Bloc6.png";
import Image3 from "../../../public/BlocText/Bloc7.png";
import Image4 from "../../../public/BlocText/Bloc8.png";

const cardsData = [
    {
        title: "What to watch",
        subtitle: "Stream the Acme event",
        image: Image1,
        span: "sm:col-span-4"
    },
    {
        title: "Plant a tree",
        subtitle: "Contribute to the planet",
        image: Image2,
        span: "sm:col-span-4"
    },
    {
        title: "Supercharged",
        subtitle: "Creates beauty like a beast",
        image: Image3,
        span: "sm:col-span-4"
    }
];

const specialCards = [
    {
        title: "New",
        subtitle: "Acme camera",
        image: Image4,
        span: "sm:col-span-5",
        footer: (
            <>
                <div>
                    <p className="text-black text-tiny">Available soon.</p>
                    <p className="text-black text-tiny">Get notified.</p>
                </div>
                <Button className="text-tiny" color="primary" radius="full" size="sm">
                    Notify Me
                </Button>
            </>
        )
    },
    {
        title: "Your day your way",
        subtitle: "Your checklist for better sleep",
        image: Image3,
        span: "sm:col-span-7",
        footer: (
            <>
                <div className="flex flex-grow gap-2 items-center">
                    <Image alt="Breathing app icon" className="rounded-full w-10 h-11 bg-black" src="https://heroui.com/images/breathing-app-icon.jpeg" />
                    <div className="flex flex-col">
                        <p className="text-tiny text-white/60">Breathing App</p>
                        <p className="text-tiny text-white/60">Get a good night's sleep.</p>
                    </div>
                </div>
                <Button radius="full" size="sm">Get App</Button>
            </>
        )
    }
];

export default function App() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="w-full mx-auto container"
        >
            <h1 className="text-5xl font-medium text-center text-white mb-10">
                Notre production
            </h1>
            <div className="gap-2 grid grid-cols-12 grid-rows-6 px-8">
                {cardsData.map(({title, subtitle, image, span}, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.2 }}
                        className={`col-span-12 rounded-xl ${span} h-[300px]`}
                    >
                        <Card className="w-full h-full">
                            <CardHeader className="absolute z-10 top-1 flex-col !items-start">
                                <p className="text-tiny text-white/60 uppercase font-bold">{title}</p>
                                <h4 className="text-white font-medium text-large">{subtitle}</h4>
                            </CardHeader>
                            <Image alt={title} className="z-0 w-full h-full object-cover" src={image}/>
                        </Card>
                    </motion.div>
                ))}
                {specialCards.map(({title, subtitle, image, span, footer}, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: (index + cardsData.length) * 0.2 }}
                        className={`w-full h-[300px] -mt-5 rounded-xl ${span}`}
                    >
                        <Card isFooterBlurred className="w-full h-full">
                            <CardHeader className="absolute z-10 flex-col items-start">
                                <p className="text-tiny text-white/60 uppercase font-bold">{title}</p>
                                <h4 className={`text-${title === "New" ? "black" : "white/90"} font-medium text-xl`}>{subtitle}</h4>
                            </CardHeader>
                            <Image alt={title} className="z-0 w-full h-full object-cover" src={image}/>
                            <CardFooter className={`absolute ${title === "New" ? "bg-white/30" : "bg-black/40"} bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100`}>
                                {footer}
                            </CardFooter>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}
