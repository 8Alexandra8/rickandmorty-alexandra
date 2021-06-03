import React, {Component} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';

import Routes from './routes';

class AppRoute extends Component {
    routeRender(route) {
        return props => {
            const RouteComponent = route.component;
            return <RouteComponent {...props} />;
        };
    }

    render() {
        const result = [];
        for (const key in Routes) {
            if (Routes.hasOwnProperty(key)) {
                const route = Routes[key];
                const $key =
                    typeof route.path === 'string' ? route.path : route.path[0];

                result.push(
                    <Route
                        exact
                        key={$key}
                        path={route.path}
                        render={this.routeRender(route)}
                    />
                );
            }
        }

        return <Switch>
            {result}
            <Redirect from="/**" to="/"/>
        </Switch>;
    }
}

export default AppRoute;
