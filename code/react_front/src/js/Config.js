import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NotFound from '../404'

export const Router = () => (
    <BrowserRouter>
        <Switch>
            <Route component={NotFound} />
        </Switch>
    </BrowserRouter>
);

export const RouteURL = () => "http://localhost:3031";

export const header = {
  'Access-Control-Allow-Origin': 'http://localhost:3031',
  "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS",
  "Access-Control-Allow-Headers": "X-Requested-With, Origin, X-Csrftoken, Content-Type, Accept",
  "Access-Control-Allow-Credentials": true
}
