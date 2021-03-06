import { Component, PropTypes } from 'react';
import { BEM } from '@yummies/bem';

const block = 'demo-item';

export default class extends Component {
    static displayName = 'demo: demo-item';
    static propTypes = {
        title: PropTypes.oneOfType([
            PropTypes.node,
            PropTypes.arrayOf(PropTypes.node),
            PropTypes.object,
            PropTypes.arrayOf(PropTypes.object)
        ]),
        description: PropTypes.oneOfType([
            PropTypes.node,
            PropTypes.arrayOf(PropTypes.node),
            PropTypes.object,
            PropTypes.arrayOf(PropTypes.object)
        ]),
        children: PropTypes.oneOfType([
            PropTypes.node,
            PropTypes.arrayOf(PropTypes.node),
            PropTypes.object,
            PropTypes.arrayOf(PropTypes.object)
        ])
    };

    renderTitle() {
        if ('title' in this.props) {
            return BEM(
                {
                    block,
                    elem: 'title'
                },
                this.props.title
            );
        }

        return null;
    }

    renderDescription() {
        if ('description' in this.props) {
            return BEM(
                {
                    block,
                    elem: 'description'
                },
                this.props.description
            );
        }

        return null;
    }

    render() {
        return BEM(
            {
                ...this.props,
                block
            },
            this.renderTitle(),
            this.renderDescription(),
            BEM(
                {
                    block,
                    elem: 'content'
                },
                this.props.children
            )
        );
    }
}
