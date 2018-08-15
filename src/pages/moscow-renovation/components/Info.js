import React, { PureComponent } from 'react';

export default class Info extends PureComponent {

    render() {
        const { info } = this.props;
        return (
            <div>
                <div>{info.address}</div>
                <div>Срок ввода: {info.end_year}</div>
                <a target="_new" href={info.url}>Страница объекта</a>
            </div>
        );
    }
}