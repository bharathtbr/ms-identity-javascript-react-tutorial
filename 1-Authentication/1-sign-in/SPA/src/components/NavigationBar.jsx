import React from 'react';
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from '@azure/msal-react';
import { Navbar, Dropdown, DropdownButton } from 'react-bootstrap';
import { loginRequest } from '../authConfig';
import { PublicClientApplication } from '@azure/msal-browser';

export const NavigationBar: React.FC = () => {
    const { instance } = useMsal();
    const activeAccount = instance?.getActiveAccount();

    const handleLoginPopup = () => {
        instance
            ?.loginPopup({
                ...loginRequest,
                redirectUri: '/redirect',
            })
            .catch((error: Error) => console.log(error));
    };

    const handleLoginRedirect = () => {
        instance
            ?.loginRedirect(loginRequest)
            .catch((error: Error) => console.log(error));
    };

    const handleLogoutPopup = () => {
        instance
            ?.logoutPopup({
                mainWindowRedirectUri: '/', // redirects the top level app after logout
                account: instance.getActiveAccount(),
            })
            .catch((error: Error) => console.log(error));
    };

    const handleLogoutRedirect = () => {
        instance
            ?.logoutRedirect()
            .catch((error: Error) => console.log(error));
    };

    return (
        <>
            <Navbar bg="primary" variant="dark" className="navbarStyle">
                <a className="navbar-brand" href="/">
                    Microsoft identity platform
                </a>
                <AuthenticatedTemplate>
                    <div className="collapse navbar-collapse justify-content-end">
                        <DropdownButton
                            variant="warning"
                            drop="start"
                            title={activeAccount ? activeAccount.name : 'Unknown'}
                        >
                            <Dropdown.Item as="button" onClick={handleLogoutPopup}>
                                Sign out using Popup
                            </Dropdown.Item>
                            <Dropdown.Item as="button" onClick={handleLogoutRedirect}>
                                Sign out using Redirect
                            </Dropdown.Item>
                        </DropdownButton>
                    </div>
                </AuthenticatedTemplate>
                <UnauthenticatedTemplate>
                    <div className="collapse navbar-collapse justify-content-end">
                        <DropdownButton
                            variant="secondary"
                            className="justify-content-end ml-auto"
                            title="Sign In"
                            drop="start"
                        >
                            <Dropdown.Item as="button" onClick={handleLoginPopup}>
                                Sign in using Popup
                            </Dropdown.Item>
                            <Dropdown.Item as="button" onClick={handleLoginRedirect}>
                                Sign in using Redirect
                            </Dropdown.Item>
                        </DropdownButton>
                    </div>
                </UnauthenticatedTemplate>
            </Navbar>
        </>
    );
};
