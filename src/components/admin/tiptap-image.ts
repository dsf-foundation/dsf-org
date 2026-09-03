import Image from "@tiptap/extension-image";

export const RichImage = Image.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      caption: {
        default: "",
        parseHTML: (element) => element.getAttribute("data-caption") || "",
        renderHTML: (attributes) => ({
          "data-caption": attributes.caption || "",
        }),
      },
      alt: {
        default: "",
        parseHTML: (element) => element.getAttribute("alt") || "",
        renderHTML: (attributes) => ({ alt: attributes.alt || "" }),
      },
    };
  },

  addKeyboardShortcuts() {
    const removeIfImageSelected = (): boolean => {
      const { selection } = this.editor.state;
      if (!selection.empty) return false;
      const selectedNode =
        "node" in selection
          ? (selection as { node?: { type?: { name?: string } } }).node
          : null;
      if (selectedNode && selectedNode.type?.name === "image") {
        this.editor.commands.deleteSelection();
        return true;
      }
      return false;
    };
    return {
      Delete: () => removeIfImageSelected(),
      Backspace: () => removeIfImageSelected(),
    };
  },
});
