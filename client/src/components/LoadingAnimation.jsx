import { motion } from 'framer-motion';

const LoadingAnimation = () => (
    <motion.div
        initial={{ scale: 0.8, opacity: 0.5 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 1, ease: 'easeInOut' }}
        className="flex flex-col items-center justify-center h-screen text-6xl font-semibold text-lime-500">
        <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1 }}
            className="mb-4 h-30 w-30 border-4 border-lime-500 border-t-transparent rounded-full"
        />
        Loading, please wait...
    </motion.div>
);

export default LoadingAnimation;
