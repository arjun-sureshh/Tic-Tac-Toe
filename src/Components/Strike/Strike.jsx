import React from 'react';
import Styles from './Strike.module.css';

const Strike = ({ strike = [] }) => {

   


    const strikeKey = strike.join(',');
    console.log(strike);
    

    const strikeClasses = {
        '0,1,2': Styles.strike_row_1,
        '3,4,5': Styles.strike_row_2,
        '6,7,8': Styles.strike_row_3,
        '0,3,6': Styles.strike_column_1,
        '1,4,7': Styles.strike_column_2,
        '2,5,8': Styles.strike_column_3,
        '0,4,8': Styles.strike_diagonal_1,
        '2,4,6': Styles.strike_diagonal_2,
    };

    return (
        <div className={`${Styles.strike} ${strikeClasses[strikeKey] || ''}`}>
            {/* You can add content here if needed */}
        </div>
    );
};

// Default export
export default Strike;
