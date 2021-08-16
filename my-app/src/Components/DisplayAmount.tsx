import React from 'react'

interface Props {
    nameAmount: string;
    amount: number;
}

export const DisplayAmount: React.FC<Props> = ({nameAmount, amount}) => {
    return (
        <div>
            <p>{nameAmount} : {amount}</p>
        </div>
    )
}
