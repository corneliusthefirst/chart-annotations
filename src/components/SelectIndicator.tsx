import React from 'react';

const SelectIndicator: React.FC = () => {
    return (
        <div className='flex w-full items-center justify-end'>
            <div className="animate-bounce w-6 h-6 mr-16">
               <p className='font-face-mb font-bold text-xl text-blue-500'>⇣</p>
            </div>
        </div>
    );
}

export default SelectIndicator;