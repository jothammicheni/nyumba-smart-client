export const Loader = () => {
    return (
        <div className="flex flex-row gap-2 mt-40 items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-primary-600 animate-bounce"></div>
            <div
                className="w-3 h-3 rounded-full bg-primary-600 animate-bounce [animation-delay:-.3s]">
            </div>
            <div
                className="w-3 h-3 rounded-full bg-primary-600 animate-bounce [animation-delay:-.5s]">
            </div>
        </div>
    );
}