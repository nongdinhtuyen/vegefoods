import { Axios } from 'axios';
import { NavigateFunction } from 'react-router-dom';

export {};

declare global {
  interface Window {
    axios: Axios;
    recaptchaVerifier: any,
    recaptchaWidgetId: any,
    confirmationResult: any,
    navigate: NavigateFunction;
    $dispatch: Dispatch<AnyAction>;
  }
}
