import React from 'react';
import { Table } from 'react-bootstrap';
import { createClaimsTable, ClaimTable } from '../utils/claimUtils'; // Assuming you have a type for the claims table

import '../styles/App.css';

interface IdTokenDataProps {
    idTokenClaims: any; // Adjust the type according to your actual data structure
}

const IdTokenData: React.FC<IdTokenDataProps> = (props) => {
    const tokenClaims: ClaimTable = createClaimsTable(props.idTokenClaims); // Assuming ClaimTable is the correct type

    const tableRow = Object.keys(tokenClaims).map((key, index) => {
        return (
            <tr key={key}>
                {tokenClaims[key].map((claimItem, index) => (
                    <td key={index}>{claimItem}</td>
                ))}
            </tr>
        );
    });
    
    return (
        <>
            <div className="data-area-div">
                <p>
                    See below the claims in your <strong> ID token </strong>. For more information, visit:{' '}
                    <span>
                        <a href="https://docs.microsoft.com/en-us/azure/active-directory/develop/id-tokens#claims-in-an-id-token">
                            docs.microsoft.com
                        </a>
                    </span>
                </p>
                <div className="data-area-div">
                    <Table responsive striped bordered hover>
                        <thead>
                            <tr>
                                <th>Claim</th>
                                <th>Value</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>{tableRow}</tbody>
                    </Table>
                </div>
            </div>
        </>
    );
};

export default IdTokenData;
