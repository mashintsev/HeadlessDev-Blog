import React, { PureComponent } from 'react';
import building from '../../../img/building.svg'

const pinStyle = {
    cursor: 'pointer',
    stroke: 'none'
};

export default class Pin extends PureComponent {

    render() {
        const { size = 20, onClick } = this.props;

        return (
            <img
                width={size}
                src={building}
                onClick={onClick}
                style={{ ...pinStyle }}
            />
        );
    }
}