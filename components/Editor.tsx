"use client";
import { PostCreationRequest, PostValidator } from "@/lib/validators/post";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC, useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import TextareaAutosize from "react-textarea-autosize";
import EditorJS from "@editorjs/editorjs";
import { uploadFiles } from "@/lib/uploadthing";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "./ui/use-toast";
import { usePathname, useRouter } from "next/navigation";

interface EditorProps {
  subredditId: string;
}

const Editor: FC<EditorProps> = ({ subredditId }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostCreationRequest>({
    resolver: zodResolver(PostValidator),
    defaultValues: {
      subredditId,
      title: "",
      content: null,
    },
  });
  const pathName = usePathname();
  const router = useRouter();
  const [isMounted, setisMounted] = useState<boolean>(false);
  useEffect(() => {
    if (window !== undefined) {
      setisMounted(true);
    }
  },[]);
  const editorInstace = useRef<EditorJS>();

  const initializeEditor = useCallback(async () => {
    const EditorJS = (await import("@editorjs/editorjs")).default;
    // @ts-ignore
    const Header = (await import("@editorjs/header")).default;
    // @ts-ignore
    const Embed = (await import("@editorjs/embed")).default;
    // @ts-ignore
    const Table = (await import("@editorjs/table")).default;
    // @ts-ignore
    const List = (await import("@editorjs/list")).default;
    // @ts-ignore
    const Code = (await import("@editorjs/code")).default;
    // @ts-ignore
    const LinkTool = (await import("@editorjs/link")).default;
    // @ts-ignore
    const InlineCode = (await import("@editorjs/inline-code")).default;
    // @ts-ignore
    const ImageTool = (await import("@editorjs/image")).default;
    if (!editorInstace.current) {
      const editor = new EditorJS({
        holder: "editorjs",
        data: { blocks: [] },
        inlineToolbar: true,
        tools: {
          header: Header,
          link: LinkTool,
          embed: {
            class: Embed,
            config: {
              youtube: true,
            },
          },
          table: Table,
          list: List,
          code: Code,
          inlineCode: InlineCode,
          image: {
            class: ImageTool,
            config: {
              uploader: {
                async uploadByFile(file: File) {
                  const [res] = await uploadFiles("imageUploader", {
                    files: [file],
                  });
                  return {
                    success: "1",
                    file: {
                      url: res.url,
                    },
                  };
                },
              },
            },
          },
        },
        readOnly: false,
      });
    }
  }, []);

  const createPostMutation = useMutation({
    mutationFn: async ({
      title,
      subredditId,
      content,
    }: PostCreationRequest) => {
      const payload: PostCreationRequest = { title, subredditId, content };
      const { data } = await axios.post("/api/subreddit/post/create", payload);
      return data;
    },
    onError: () => {
      return toast({
        title: "Something went wrong",
        description: "Your post was not published, please try again later",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      const pathname = pathName.split("/").slice(0, -1).join("/");
      router.push(pathname);
      router.refresh();
      return toast({
        description: "Your post has been created",
      });
    },
  });

  const formSubmit = async (data: PostCreationRequest) => {
    console.log("hello");
    const block = await editorInstace.current?.save();
    const payload: PostCreationRequest = {
      title: data.title,
      content: block,
      subredditId,
    };
    createPostMutation.mutate(payload);
  };

  useEffect(() => {
    if (isMounted) {
      initializeEditor();
    }
    return () => {
      editorInstace.current?.destroy();
      editorInstace.current = undefined;
    };
  }, [isMounted]);

  return (
    <div className="w-full bg-zinc-50 mt-2 rounded-lg border border-zinc-200 p-4">
      <form id="echodit" onSubmit={handleSubmit(formSubmit)}>
        <div className="prose">
          <TextareaAutosize
            className="w-full appearance-none outline-none bg-transparent text-3xl focus:outline-none text-bold"
            placeholder="Title"
            {...register("title")}
          />
          <div id="editorjs"></div>
        </div>
      </form>
    </div>
  );
};

export default Editor;
