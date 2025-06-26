import { motion } from "framer-motion";

export const ComingSoonPage = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 px-6 py-12">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-3xl text-center"
            >
                {/* Illustration */}
                <div className="mb-6">
                <img
                    src="https://thumbs.dreamstime.com/b/laptop-crane-icon-thin-line-website-under-construction-page-element-template-isolated-web-building-process-concept-vector-108268399.jpg"
                    alt="Under Construction"
                    className="w-72 mx-auto"
                    draggable={false}
                />
                </div>

                {/* Title */}
                <h1 className="text-5xl font-extrabold text-indigo-600 mb-4">Oops!</h1>

                {/* Message */}
                <p className="text-xl text-gray-700 mb-2 font-medium">
                This feature is still under construction.
                </p>
                <p className="text-gray-500 max-w-md mx-auto">
                Our dev team is working hard behind the scenes to get this ready for you.
                Come back soon and check it out!
                </p>
            </motion.div>
        </div>
    )
}