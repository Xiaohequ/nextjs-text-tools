

const Footer = () => {
    return (
        <footer className="w-full py-6 mt-12 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 text-gray-600 dark:text-gray-400">
            <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-sm">
                <div className="mb-4 md:mb-0">
                    <span>&copy; {new Date().getFullYear()} Text Tools. All rights reserved.</span>
                </div>
                <div>
                    <a
                        href="https://github.com/Xiaohequ"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-gray-900 dark:hover:text-gray-200 transition-colors duration-200"
                    >
                        About
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
