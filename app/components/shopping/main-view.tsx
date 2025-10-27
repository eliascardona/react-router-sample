import { useEffect, useState } from 'react';
import type { GenericServerResponse } from '~/lib/api/types';
import { ShoppingContextProvider } from '~/lib/shopping/context';
import { ProductPriceSummary } from './(ui)/summary';
import { AccountInfo } from './forms/account/main-view';
import { ReadyPaymentForm } from './forms/payment/ready-payment-form';
import { redirect } from 'react-router';

export function MainViewCheckoutPage({
  actionData,
}: {
  actionData: GenericServerResponse<any>;
}) {
  const [activeTab, setActiveTab] = useState(1);

  useEffect(() => {
    if (actionData && actionData.success) {
      setActiveTab(2);
    }
  }, [actionData]);

  /**
   * 	@TODO
   * 	Colocar un paso previo en nuestras tabs
   * 	en el cual se le indique al usuario que cuando
   * 	compre el curso tendrá acceso a él.
   *
   * 	Habrá un botón para proceder con el pago,
   * 	además de una casilla en donde se acpetan
   * 	los términos y condiciones de servicio.
   *
   **/

  // Generate a random string as code_verifier
  function generateCodeVerifier(length = 128) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
    let randomValues = new Uint8Array(length);
    crypto.getRandomValues(randomValues);
    return Array.from(randomValues).map(v => chars[v % chars.length]).join('');
  }

  // Convert ArrayBuffer to Base64URL
  function base64UrlEncode(arrayBuffer: any) {
    let str = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));
    return str.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  }

  // SHA256 hash of the code_verifier
  async function generateCodeChallenge(codeVerifier: any) {
    const encoder = new TextEncoder();
    const data = encoder.encode(codeVerifier);
    const digest = await crypto.subtle.digest('SHA-256', data);
    return base64UrlEncode(digest);
  }

  // Usage example
  async function initPkce() {
    const codeVerifier = generateCodeVerifier();
    const codeChallenge = await generateCodeChallenge(codeVerifier);

    // Store verifier for later (token exchange)
    localStorage.setItem('pkce_verifier', codeVerifier);

    console.log("Verifier:", codeVerifier);
    console.log("Challenge:", codeChallenge);

    // Redirect user to authorization endpoint
    const authUrl = new URL("https://auth-server.local/oauth2/authorize");
    authUrl.searchParams.append("response_type", "code");
    authUrl.searchParams.append("client_id", "my-client");
    authUrl.searchParams.append("redirect_uri", "http://localhost:8080/callback");
    authUrl.searchParams.append("code_challenge", codeChallenge);
    authUrl.searchParams.append("code_challenge_method", "S256");
    authUrl.searchParams.append("scope", "openid profile email");

    redirect(authUrl.toString())
  }

  return (
    <ShoppingContextProvider>
      <div className={'grid w-full'}>
        <div className={'grid w-[90%] grid-cols-2 gap-2 justify-self-center'}>
          <ProductPriceSummary />
          <span className={'p-4'}>
            {activeTab === 1 ? (
              <AccountInfo onClick={initPkce} />
            ) : activeTab === 2 ? (
              <ReadyPaymentForm />
            ) : (
              <span>no tab</span>
            )}
          </span>
        </div>
      </div>
    </ShoppingContextProvider>
  );
}
