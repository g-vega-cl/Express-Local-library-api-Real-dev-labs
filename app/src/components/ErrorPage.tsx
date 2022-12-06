import React from 'react';

const ErrorPage = ({errorMessage}) => {
    return (
        <div>
            <h2>There has been an error, sorry... {errorMessage}</h2>
        </div>
    );
}

export default ErrorPage;