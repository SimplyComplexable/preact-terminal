import { h, Component } from 'preact';
import style from './style';
import Line from "./line";

export default class Cmd extends Component {

    commands = {
        cd: function () {
            console.log(arguments);
        }
    };

    constructor() {
        super();
        this.state = {
            lines: [
                {
                    position: [
                        '~'
                    ],
                    cmd: ''
                }
            ],
            userContent: ''
        };
    }

    runCommand(cmd) {
        let operation = cmd.splice(0,1);
        if (this.commands[operation] === undefined) {
            return `${operation}: command not found`
        }
        return this.commands[operation](...cmd);
    }

    handleCommand(cmdString) {
        let cmd = cmdString.split(' ');
        let cmdResponse = this.runCommand(cmd);
        let lines = this.state.lines.slice();

        let newline = {
            position: this.state.lines[this.state.lines.length -1].position,
            cmd: cmdString,
            response: cmdResponse
        };
        lines.splice(lines.length - 1, 0, newline);
        return lines;
    }

    handleKeyPress(e) {
        e.preventDefault();
        e.stopPropagation();
        
        let content = this.state.userContent;
        let lines = this.state.lines;

        //send command if enter is pressed
        if (e.key === 'Enter') {
            lines = this.handleCommand(content);
            content = '';
        // override backspace functionality
        } else if (e.key === 'Backspace') {
            content = content.substr(0,content.length - 1);

        // only print to screen if key is a standard value, (e.g. not Control, Alt, etc.)
        } else if (e.key.length === 1) {
            content = content + e.key;
        }
        this.setState({
            lines,
            userContent: content
        });
    }

    render(props, state) {
        let lines = state.lines.slice();
        let currentPosition = lines.pop().position;
        return (
            <div class={style.main} tabIndex="1" onKeyDown={ this.handleKeyPress.bind(this) } >
                { lines.map(line => <Line line={ line } />) }
                <span>{currentPosition.join('\\') }$ </span>
                { state.userContent }
            </div>
        );
    }
}