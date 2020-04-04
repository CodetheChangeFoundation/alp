import { MsalAuthProvider, LoginType } from "react-aad-msal";
import { Logger, LogLevel } from "msal";

import { adminAPIBaseURL, applicationBaseUrl, authConstants } from '../constants';

const { authority, adminScope, applicationId } = authConstants;

// The auth provider should be a singleton. Best practice is to only have it ever instantiated once.
// Avoid creating an instance inside the component it will be recreated on each render.
// If two providers are created on the same page it will cause authentication errors.
export const authProvider = new MsalAuthProvider(
  {
    auth: {
      authority: authority,
      clientId: applicationId,
      postLogoutRedirectUri: window.location.origin,
      redirectUri: applicationBaseUrl + '/admin/shiftData',
      validateAuthority: true,

      // After being redirected to the "redirectUri" page, should user
      // be redirected back to the Url where their login originated from?
      navigateToLoginRequestUrl: false
    },
    // Enable logging of MSAL events for easier troubleshooting.
    // This should be disabled in production builds.
    system: {
      logger: new Logger(
        (logLevel, message, containsPii) => {
          console.log("[MSAL]", message);
        },
        {
          level: LogLevel.Verbose,
          piiLoggingEnabled: false
        }
      )
    },
    cache: {
      cacheLocation: 'localStorage',
      storeAuthStateInCookie: true
    }
  },
  {
    scopes: ['User.Read', adminScope]
  },
  {
    loginType: LoginType.Redirect,
    // When a token is refreshed it will be done by loading a page in an iframe.
    // Rather than reloading the same page, we can point to an empty html file which will prevent
    // site resources from being loaded twice.
    tokenRefreshUri: window.location.origin + '/auth.html'
  }
);

export const authorizedFetch = async (apiPath, requestType, payload = {}) => {
  const token = await authProvider.acquireTokenSilent({
    scopes: [adminScope]
  });

  let headers = new Headers();
  headers.append('Access-Control-Allow-Origin', adminAPIBaseURL);
  headers.append('Access-Control-Allow-Methods', requestType + ', OPTIONS');
  headers.append('Authorization', 'Bearer ' + token.accessToken);
  if(requestType === 'PUT' || requestType === 'POST') headers.append('Content-Type', 'application/json')

  let options = {
    method: requestType,
    headers: headers
  };

  if(requestType === 'PUT' || requestType === 'POST') options.body = payload;

  const response = await fetch(adminAPIBaseURL + apiPath, options);

  return await response.json();
}
