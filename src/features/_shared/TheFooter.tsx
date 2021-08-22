import React from 'react';
import styled from 'styled-components';
import {MdCode} from 'react-icons/md';

const AppFooter = styled.footer`
    background: var(--dark);
    color: var(--gray-light);
    font-size: 1rem;
`;

export default function TheFooter() {
    return (
        <AppFooter className="displayFlex justifyCenter itemsCenter p3">
            <MdCode className="textSm mr1" />
            by 
            <a href="https://linkedin.com/in/akshay-rajput" target="_blank" rel="noopener noreferrer" className="app-logo ml1">Akshay</a>
        </AppFooter>
    )
}
