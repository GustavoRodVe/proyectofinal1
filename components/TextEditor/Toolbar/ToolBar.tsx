import { Separator } from '@/components/ui/separator';
import { Editor } from '@tiptap/react';
import {
  AtSign,
  Bold,
  Braces,
  Code,
  Italic,
  List,
  ListOrdered,
  Underline,
} from 'lucide-react';
import { AlignMenu } from './AlignMenu';
import HeadingMenu from './HeadingMenu';
import { ToolbarIconButton } from './IconButton';

export const ToolBar = ({ editor }: { editor: Editor | null }) => {
  if (!editor) {
    return null;
  }

  const handleBold = () => {
    editor.chain().focus().toggleBold().run();
  };

  const handleItalic = () => {
    editor.chain().focus().toggleItalic().run();
  };

  const handleUnderline = () => {
    editor.chain().focus().toggleUnderline().run();
  };

  const handleCode = () => {
    editor.chain().focus().toggleCode().run();
  };

  const handleBulletList = () => {
    editor.chain().focus().toggleBulletList().run();
  };

  const handleOrderedList = () => {
    editor.chain().focus().toggleOrderedList().run();
  };

  const handleCodeBlock = () => {
    editor.chain().focus().toggleCodeBlock().run();
  };

  const handleAtSign = () => {
    editor.commands.insertContent('@');
  };

  return (
    <div className="flex items-center space-x-2 px-2">
      <HeadingMenu editor={editor} />
      <ToolbarIconButton
        onClick={handleBold}
        isActive={editor.isActive('bold')}
        title="Negrita"
      >
        <Bold className="w-4 h-4" />
      </ToolbarIconButton>
      <ToolbarIconButton
        onClick={handleItalic}
        isActive={editor.isActive('italic')}
        title="Cursiva"
      >
        <Italic className="w-4 h-4" />
      </ToolbarIconButton>
      <ToolbarIconButton
        onClick={handleUnderline}
        isActive={editor.isActive('underline')}
        title="Subrayado"
      >
        <Underline className="w-4 h-4" />
      </ToolbarIconButton>
      <Separator orientation="vertical" className="h-7" />

      <ToolbarIconButton
        onClick={handleCode}
        isActive={editor.isActive('code')}
        title="Código"
      >
        <Code className="w-4 h-4" />
      </ToolbarIconButton>

      <Separator orientation="vertical" className="h-7" />
      <AlignMenu editor={editor} />
      <Separator orientation="vertical" className="h-7" />

      <ToolbarIconButton
        onClick={handleBulletList}
        isActive={editor.isActive('bulletList')}
        title="Lista con viñetas"
      >
        <List className="w-4 h-4" />
      </ToolbarIconButton>
      <ToolbarIconButton
        onClick={handleOrderedList}
        isActive={editor.isActive('orderedList')}
        title="Lista numerada"
      >
        <ListOrdered className="w-4 h-4" />
      </ToolbarIconButton>
      <ToolbarIconButton
        onClick={handleCodeBlock}
        isActive={editor.isActive('codeBlock')}
        title="Bloque de código"
      >
        <Braces className="w-4 h-4" />
      </ToolbarIconButton>
      <ToolbarIconButton
        onClick={handleAtSign}
        isActive={false}
        title="Menciones (@)"
      >
        <AtSign className="w-4 h-4" />
      </ToolbarIconButton>
    </div>
  );
};
