import { Node, mergeAttributes } from "@tiptap/core";

export const Callout = Node.create({
  name: "callout",

  group: "block",

  content: "paragraph",

  addAttributes() {
    return {
      title: {
        default: "",
      },
      text: {
        default: "",
      },
    };
  },

  addKeyboardShortcuts() {
    const kill = (atEnd: boolean): boolean => {
      const { state } = this.editor;
      const { $from } = state.selection;
      const container = $from.node($from.depth - 1);
      if (!container || container.type.name !== "callout") return false;
      const isAtStart = $from.parentOffset === 0;
      const isAtEnd = $from.parentOffset === $from.parent.nodeSize - 2;
      const shouldDelete = atEnd ? isAtEnd : isAtStart;
      if (!shouldDelete) return false;
      this.editor.commands.deleteNode("callout");
      return true;
    };
    return {
      Backspace: () => kill(false),
      Delete: () => kill(true),
    };
  },

  parseHTML() {
    return [{ tag: "div[data-callout]" }];
  },

  renderHTML({ HTMLAttributes }) {
    return ["div", mergeAttributes({ "data-callout": "" }, HTMLAttributes), 0];
  },
});
