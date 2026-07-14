import { Outlet } from "react-router-dom";



function appshell() {
    return(
        <div className="appshell">
            <main className="appshell-content">
                <Outlet />
                <main />
            </main>
        </div>
    )
}

export default appshell