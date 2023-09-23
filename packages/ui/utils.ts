import type { FunctionComponent, ReactNode } from "react";
import { Children, createElement, isValidElement } from "react";
import { m } from "framer-motion";

/** Sets the `layout` property depending on the type of the children*/
export function getLayoutValueFromChildren(
  children: ReactNode,
): "position" | true {
  if (typeof children === "string") return "position";
  return true;
}

export function convertChildrenToMotionChildren(
  children: ReactNode,
  customProps?: (child: ReactNode) => Record<string, unknown>,
): ReactNode {
  return Children.map(children, (child): ReactNode => {
    // Checks if the child is a string or boolean or number
    if (!isValidElement(child)) return child;
    let childRef = null;
    // Checks if the child is a function component

    if (typeof child.type === "function") {
      // console.log("before", child);
      if (child.props?.test) {
        childRef = child.props.test;
      }
      child = (child.type as Function)(child.props);

      // console.log("after", childRef);
      if (!isValidElement(child)) return child;
    }

    const childType = child.type as keyof typeof m;
    // console.log(child, child.props, child.ref);
    // Creates a motion version of the element child type
    const passedInProps = customProps ? customProps(child) : {};
    // console.log(child);
    const newElem = createElement(
      m[childType] as string | FunctionComponent<any>,
      {
        ...child.props,
        ref: child.ref,
        ...passedInProps,
      },
      convertChildrenToMotionChildren(
        child.props.children as ReactNode,
        customProps,
      ),
    );

    return newElem;
  });
}
