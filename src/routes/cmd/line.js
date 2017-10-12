import { h, Component } from 'preact';
import style from 'style';

export default class Line extends Component {

    render(props, state) {
        let responseLine = "";
        if (props.line.response !== undefined) {
            responseLine = (
                <div>
                    { props.line.response }
                </div>
            );
        }
        return (
            <div>
                <div>
                    <span class={ style.pwd }>{ props.line.position.join('\\') }$ </span>
                    { props.line.cmd }
                </div>
                { responseLine }
            </div>
        );
    }
}