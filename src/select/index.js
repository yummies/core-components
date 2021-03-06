import { Component, PropTypes } from 'react';
import { BEM } from '@yummies/bem';

const block = 'select';

export default class extends Component {
    static displayName = `core: ${block}`;
    static propTypes = {
        value: (props, propName, componentName) => {
            if (props.options.length > 0 && !props.options.some(option => props.value === option.value)) {
                return new Error(`Invalid prop \`${propName}\` of type \`${typeof props[propName]}\` supplied to \`${componentName}\`, expected to be equal to one of the \`value\` fields from \`props.options\``);
            }
        },
        options: PropTypes.arrayOf(
            PropTypes.shape({
                text: PropTypes.string,
                value: PropTypes.string
            })
        ).isRequired,
        disabled: PropTypes.bool,
        onChange: PropTypes.func,
        onFocus: PropTypes.func,
        onBlur: PropTypes.func,
        onMouseEnter: PropTypes.func,
        onMouseLeave: PropTypes.func
    };
    static defaultProps = {
        value: null,
        options: [],
        disabled: false
    };

    constructor(props, context) {
        super(props, context);

        this.state = {
            value: props.value,
            hovered: false,
            focused: false
        };

        this._onSelectChange = this._onSelectChange.bind(this);
        this._onSelectFocus = this._onSelectFocus.bind(this);
        this._onSelectBlur = this._onSelectBlur.bind(this);
        this._onSelectMouseLeave = this._onSelectMouseLeave.bind(this);
        this._onSelectMouseEnter = this._onSelectMouseEnter.bind(this);
    }

    componentWillReceiveProps({ value }) {
        if (this.props.value !== value) {
            this.setState({
                value
            });
        }
    }

    _onSelectChange(e) {
        this.setState({
            value: e.target.value
        });

        if (this.props.onChange) {
            this.props.onChange(e);
        }
    }

    _onSelectMouseEnter(e) {
        this.setState({
            hovered: true
        });

        if (this.props.onMouseEnter) {
            this.props.onMouseEnter(e);
        }
    }

    _onSelectMouseLeave(e) {
        this.setState({
            hovered: false
        });

        if (this.props.onMouseLeave) {
            this.props.onMouseLeave(e);
        }
    }

    _onSelectFocus(e) {
        this.setState({
            focused: true
        });

        if (this.props.onFocus) {
            this.props.onFocus(e);
        }
    }

    _onSelectBlur(e) {
        this.setState({
            focused: false
        });

        if (this.props.onBlur) {
            this.props.onBlur(e);
        }
    }

    renderOptions() {
        return this.props.options.map(function(option) {
            return BEM(
                {
                    block,
                    tag: 'option',
                    value: option.value,
                    key: option.value
                },
                option.text
            );
        });
    }

    val() {
        return this.state.value;
    }

    render() {
        return BEM(
            {
                block,
                tag: 'label',
                mods: {
                    focused: this.state.focused,
                    hovered: this.state.hovered,
                    disabled: this.props.disabled,
                    ...this.props.mods
                }
            },
            BEM(
                {
                    ...this.props,
                    block,
                    elem: 'control',
                    tag: 'select',
                    value: this.state.value,
                    onChange: this._onSelectChange,
                    onFocus: this._onSelectFocus,
                    onBlur: this._onSelectBlur,
                    onMouseLeave: this._onSelectMouseLeave,
                    onMouseEnter: this._onSelectMouseEnter
                },
                this.renderOptions()
            ),
            this.props.children
        );
    }
}
