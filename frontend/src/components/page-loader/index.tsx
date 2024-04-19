import React, { useState } from 'react';

const PageLoader: React.FC = () => {
    const [isLoading, setIsLoading] = useState(true);
    return (
        <div className='flex flex-1 flex-col items-center justify-center bg-yellow-200'>
            <h1>Loading...</h1>
        </div>
    );
};

export default PageLoader;