import { Component, PropTypes } from 'react';
import { BEM } from '@yummies/bem';

const block = 'attach';

export default class extends Component {
    static displayName = `core: ${block}`;
    static propTypes = {
        value: PropTypes.string,
        disabled: PropTypes.bool,
        onChange: PropTypes.func,
        onFocus: PropTypes.func,
        onBlur: PropTypes.func,
        onMouseEnter: PropTypes.func,
        onMouseLeave: PropTypes.func,
        onMouseDown: PropTypes.func,
        onMouseUp: PropTypes.func
    };
    static defaultProps = {
        disabled: false
    };

    constructor(props, context) {
        super(props, context);

        this.state = {
            pressed: false,
            focused: false,
            hovered: false,
            value: null
        };

        this._onInputChange = this._onInputChange.bind(this);
        this._onInputFocus = this._onInputFocus.bind(this);
        this._onInputBlur = this._onInputBlur.bind(this);
        this._onInputMouseDown = this._onInputMouseDown.bind(this);
        this._onInputMouseUp = this._onInputMouseUp.bind(this);
        this._onInputMouseLeave = this._onInputMouseLeave.bind(this);
        this._onInputMouseEnter = this._onInputMouseEnter.bind(this);
    }

    // file input doesn't allow to change it's value programmatically
    // componentWillReceiveProps() {}

    _onInputChange(e) {
        this.setState({
            value: e.target.value
        });

        if (this.props.onChange) {
            this.props.onChange(e);
        }
    }

    _onInputFocus(e) {
        this.setState({
            focused: true
        });

        if (this.props.onFocus) {
            this.props.onFocus(e);
        }
    }

    _onInputBlur(e) {
        this.setState({
            focused: false
        });

        if (this.props.onBlur) {
            this.props.onBlur(e);
        }
    }

    _onInputMouseDown(e) {
        this.setState({
            pressed: true
        });

        if (this.props.onMouseDown) {
            this.props.onMouseDown(e);
        }
    }

    _onInputMouseUp(e) {
        this.setState({
            pressed: false
        });

        if (this.props.onMouseUp) {
            this.props.onMouseUp(e);
        }
    }

    _onInputMouseEnter(e) {
        this.setState({
            hovered: true
        });

        if (this.props.onMouseEnter) {
            this.props.onMouseEnter(e);
        }
    }

    _onInputMouseLeave(e) {
        this.setState({
            hovered: false,
            pressed: false
        });

        if (this.props.onMouseLeave) {
            this.props.onMouseLeave(e);
        }
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
                    pressed: this.state.pressed,
                    disabled: this.props.disabled,
                    ...this.props.mods
                }
            },
            BEM({
                ...this.props,
                block,
                elem: 'control',
                tag: 'input',
                type: 'file',
                value: this.state.value,
                onChange: this._onInputChange,
                onFocus: this._onInputFocus,
                onBlur: this._onInputBlur,
                onMouseDown: this._onInputMouseDown,
                onMouseUp: this._onInputMouseUp,
                onMouseLeave: this._onInputMouseLeave,
                onMouseEnter: this._onInputMouseEnter
            }),
            this.props.children
        );
    }
}
