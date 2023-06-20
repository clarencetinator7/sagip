import { useEditor } from "@tiptap/react";
import Tiptap from "../../components/tiptap-text-editor/Tiptap";
import StarterKit from "@tiptap/starter-kit";
import CustomMenuBar from "../../components/tiptap-text-editor/CustomMenuBar";
import { useEffect, useState } from "react";
import FileDropzone from "../../components/Form/FileDropzone";

const CreateArticlesPage = () => {
  const [title, setTitle] = useState<string>("");
  const [imageSrc, setImageSrc] = useState<string>("");
  const [imageName, setImageName] = useState<string | undefined>("");
  const [content, setContent] = useState<string>("");

  const onFileChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setImageName(file?.name);
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        setImageSrc(e.target?.result as string);
      };
    }
  };

  const editor = useEditor({
    extensions: [StarterKit],
    content: "<p>Write Something ...</p>",
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
  });

  return (
    <div className="m-5">
      <h1>Create Articles Page</h1>
      <div className="articleDetails w-full flex flex-col">
        <input
          type="text-area"
          id="articleTitle"
          className="p-2 my-1"
          style={{ fontSize: "2.2rem", fontWeight: "bold" }}
          placeholder="Title of article"
        />
      </div>
      {imageName && imageSrc ? (
        <div>
          <img src={imageSrc} alt="preview" />
          <p>{`Image Name: ${imageName}`}</p>
        </div>
      ) : (
        <FileDropzone handleFileChange={onFileChangeHandler} />
      )}
      <div className="tiptapEditor">
        <CustomMenuBar editor={editor} />
        <Tiptap editor={editor} />
      </div>
    </div>
  );
};

export default CreateArticlesPage;
