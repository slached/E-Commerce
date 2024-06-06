import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {store} from './redux/store'
import {Provider} from 'react-redux'
import {CookiesProvider} from 'react-cookie';
import {NextUIProvider} from "@nextui-org/react";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <NextUIProvider>
        <CookiesProvider defaultSetOptions={{path: '/'}}>
            <Provider store={store}>
                <App/>
            </Provider>
        </CookiesProvider>
    </NextUIProvider>
);
