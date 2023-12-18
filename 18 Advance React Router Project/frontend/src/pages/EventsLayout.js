import { Fragment } from "react";
import EventsNavigation from '../components/EventsNavigation';
import { Outlet,useNavigation } from "react-router-dom";

function EventsLayout() {
    const navigation = useNavigation();
    return (
        <Fragment>
            <EventsNavigation />
            {navigation.state=='loading' && <p>Loading....</p>}
            <main>
                <Outlet />
            </main>
        </Fragment>
    );
}

export default EventsLayout;
