import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

export const RouteErrorFaLLback = () => {
    const error = useRouteError();
    let errorMessage = 'Unknown error. Please check the routes system.';

    if (isRouteErrorResponse(error)) errorMessage = error.data || error.statusText;
    else if (error instanceof Error) errorMessage = error.message;

    return <div style={{ padding: '1.5rem' }}>
        <h5 style={{ color: 'var(--status-error)' }}><b>Route Error: </b></h5>
        <p>{errorMessage}</p>
    </div>
}
