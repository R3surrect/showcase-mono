import { type PluginObj } from '@babel/core';
import * as t from '@babel/types';

const exceptionArray = ['input', 'button', 'a', 'select'] as const;
const EXCEPTIONS: ReadonlyArray<string> = exceptionArray;

export default function addOnClickDataPlugin(): PluginObj {
  return {
    name: 'add-onclick-data-attribute',
    visitor: {
      JSXOpeningElement(path) {
        const nodeName = path.node.name;
        let tagName = '';

        if (t.isJSXIdentifier(nodeName))
          tagName = nodeName.name;
        else if (t.isJSXMemberExpression(nodeName) && t.isJSXIdentifier(nodeName.property))
          tagName = nodeName.property.name;

        if (EXCEPTIONS.includes(tagName)) return;

        const attributes = path.node.attributes;
        const hasOnClick = attributes.some(
          (attr) =>
            t.isJSXAttribute(attr) &&
            t.isJSXIdentifier(attr.name) &&
            attr.name.name === 'onClick'
        );

        if (hasOnClick) {
          const dataAttr = t.jsxAttribute(
            t.jsxIdentifier('data-clickable'),
            t.stringLiteral(''),
          );
          attributes.push(dataAttr);
        }
      },
    },
  };
}