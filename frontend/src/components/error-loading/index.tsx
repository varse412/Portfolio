import React, { useState } from 'react';

const ErrorLoadingData: React.FC = ({ onPressCallback }: { onPressCallback: Function }) => {
    return (
        <div className='flex flex-1 flex-col items-center justify-center bg-pink-500'>
            <h1>Error Loading Data</h1>

            <button onClick={() => onPressCallback()} className='flex flex-1 bg-slate-500'>Retry</button>
        </div>
    );
};

export default ErrorLoadingData;