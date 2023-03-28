export default function Message({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex justify-center p-2 grey-storm">
            <span>{children}</span>
        </div>
    );
}
