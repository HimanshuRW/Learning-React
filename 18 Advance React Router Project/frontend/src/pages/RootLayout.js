import { Fragment } from "react";
import MainNavigation from '../components/MainNavigation';
import { Outlet } from "react-router-dom";

function RootLayout() {
    return (
        <Fragment>
            <MainNavigation />
            <main>
                <Outlet />
            </main>
        </Fragment>
    );
}

export default RootLayout;
