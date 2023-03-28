import "./Loader.css";

export default function Loader() {
    return (
        <div className="flex justify-center m-1">
            <div className="loader">
                <div className="arm">
                    <span className="material-icons grey-overcast">flight</span>
                </div>
            </div>
        </div>
    );
}
