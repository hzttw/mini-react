import { createFiber } from './ReactFiber';
import { schedilUpdateOnFiber } from './ReactFiberWorkLoop';
function ReactDOMRoot(internalRoot) {
  this._internalRoot = internalRoot;
}

ReactDOMRoot.prototype.render = function (children) {
  console.log(children);
  const root = this._internalRoot;
  updateContainer(children, root);
};
function updateContainer(element, container) {
  const { containerInfo } = container;
  const fiber = createFiber(element, {
    type: containerInfo.nodeName.toLocaleLowerCase(),
    stateNode: containerInfo,
  });
  schedilUpdateOnFiber(fiber);
}

function createRoot(container) {
  const root = { containerInfo: container };
  return new ReactDOMRoot(root);
}
export default { createRoot };
