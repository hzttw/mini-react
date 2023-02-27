import {
  updateClassComponent,
  updateFragmentComponent,
  updateFunctionComponent,
  updateHostComponent,
  updateHostTextComponent,
} from './ReactFiberReconciler';
import {
  ClassComponent,
  Fragment,
  FunctionComponent,
  HostComponent,
  HostText,
} from './ReactWorkTags';
import { schedileCallback } from './scheduler';
import { Placement } from './utils';

let wip = null; //work in progress 当前正在工作中的，当前正在执行的fiber
let wipRoot = null;
//初次渲染和更新
export function scheduleUpdateOnFiber(fiber) {
  wip = fiber;
  wipRoot = fiber;

  schedileCallback(wookLoop)
}

function performUnitOfWork() {
  const { tag } = wip;
  //1.更新当前组件
  switch (tag) {
    case HostComponent:
      updateHostComponent(wip);
      break;
    case FunctionComponent:
      updateFunctionComponent(wip);
      break;
    case ClassComponent:
      updateClassComponent(wip);
      break;
    case Fragment:
      updateFragmentComponent(wip);
      break;
    case HostText:
      updateHostTextComponent(wip);
      break;
    default:
      break;
  }
  //2.下一个更新谁 深度优先遍历
  if (wip.child) {
    wip = wip.child;
    return;
  }
  let next = wip;
  while (next) {
    if (next.sibling) {
      wip = next.sibling;
      return;
    }
    next = next.return;
  }
  wip = null;
}

// function wookLoop(IdleDeadline) {
//   while (wip && IdleDeadline.timeRemaining() > 0) {
//     performUnitOfWork();
//   }

//   if (!wip && wipRoot) {
//     commitRoot();
//   }
// }
// requestIdleCallback(wookLoop);

function wookLoop() {
  while (wip) {
    performUnitOfWork();
  }

  if (!wip && wipRoot) {
    commitRoot();
  }
}

//提交
function commitRoot() {
  commitWorker(wipRoot);
  wipRoot = null;
}
function commitWorker(wip) {
  //如果没有节点就退出
  if (!wip) {
    return;
  }
  //1.提交自己
  // parentNode是父dom节点
  // const parentNode = wip.return.stateNode;
  const parentNode = getParentNode(wip.return);
  const { flags, stateNode } = wip;
  if (flags & Placement && stateNode) {
    parentNode.appendChild(stateNode);
  }
  //2.提交子节点
  commitWorker(wip.child);
  //3.提交兄弟
  commitWorker(wip.sibling);
}

function getParentNode(wip) {
  let tem = wip;
  while (tem) {
    if (tem.stateNode) {
      return tem.stateNode;
    }
    tem = tem.return;
  }
}
