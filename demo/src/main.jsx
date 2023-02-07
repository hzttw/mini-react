import { ReactDOM, Component } from './which-react';
import './index.css';

function FunctionComponent(props) {
  return (
    <div className="border">
      <p>{props.name}</p>
      我是一个文本
    </div>
  );
}

class ClassComponent extends Component {
  render() {
    return <div>{this.props.name}</div>;
  }
}

function FragmentComponent() {
  return (
    <ul>
      <>
        <li>part1</li>
        <li>part2</li>
      </>
    </ul>
  );
}

const jsx = (
  <div className="border">
    <h1>react</h1>
    <a href="https://github.com/bubucuo/mini-react">mini react</a>
    <FunctionComponent name="函数组件" />
    <ClassComponent name="类组件" />
    <FragmentComponent />
  </div>
);

ReactDOM.createRoot(document.getElementById('root')).render(jsx);
