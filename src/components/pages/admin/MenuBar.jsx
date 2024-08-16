// import './styles.scss'
import { Color } from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";
import { EditorProvider, useCurrentEditor } from "@tiptap/react";
import { ListItem as OriginalListItem } from "@tiptap/extension-list-item";
import StarterKit from "@tiptap/starter-kit";
import React, { useState } from "react";
import { GrRedo } from "react-icons/gr";
import { LuUndo2 } from "react-icons/lu";
import { GoListUnordered, GoListOrdered } from "react-icons/go";

const MenuBar = () => {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }
  return (
    <div className="control-group">
      <div className="button-group">
        <div
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? "btn is-active" : "btn"}
        >
          B
        </div>
        <div
          onClick={() =>
            editor.chain().focus().setColor("var(--text-color)").run()
          }
          className={
            editor.isActive("textStyle", { color: "var(--text-color)" })
              ? "btn is-active"
              : "btn"
          }
        >
          Color
        </div>
        <div
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive("bulletList") ? "btn is-active" : "btn"}
        >
          <GoListUnordered className="icon" />
        </div>
        <div
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive("orderedList") ? "btn is-active" : "btn"}
        >
          <GoListOrdered className="icon" />
        </div>
        <div
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
          className="btn"
        >
          <LuUndo2 />
        </div>
        <div
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
          className="btn"
        >
          <GrRedo />
        </div>
      </div>
    </div>
  );
};


const CustomListItem = OriginalListItem.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
    };
  },
  parseHTML() {
    return [
      {
        tag: 'li',
        getAttrs: (node) => ({}),
      },
    ];
  },
  renderHTML({ node, HTMLAttributes }) {
    return ['li', HTMLAttributes, 0]; // Remove the wrapping <p> tag
  },
});

export const editorExtensions = [
  Color.configure({ types: [TextStyle.name, CustomListItem.name] }),
  TextStyle.configure({ types: [CustomListItem.name] }),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false,
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false,
    },
    listItem: CustomListItem,
  }),
];

export default MenuBar;
