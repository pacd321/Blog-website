import axios from "axios";
import { AppBar } from "../components/AppBar";
import { BACKEND_URL } from "../config";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Publish = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  return (
    <div>
      <AppBar />
      <div className="flex justify-center pt-8">
        <div className="max-w-screen-lg w-full">
          <input
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            id="message"
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Title"
          ></input>
          <div className="pt-4">
            <TextEditor
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
            <div className="flex items-center justify-between px-3 py-2 border-t">
              <button
                onClick={async () => {
                  const response = await axios.post(
                    `${BACKEND_URL}/api/v1/blog`,
                    {
                      title,
                      content: description,
                    },
                    {
                      headers: {
                        Authorization: localStorage.getItem("jwt"),
                      },
                    }
                  );
                  navigate(`/blog/${response.data.id}`);
                }}
                type="submit"
                className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700  focus:outline-non rounded-lg "
              >
                Post comment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function TextEditor({
  onChange,
}: {
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}) {
  return (
    <div>
      <form>
        <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50">
          <div className="px-4 py-2 bg-white rounded-t-lg">
            <textarea
              onChange={onChange}
              id="comment"
              className="block focus:outline-none w-full min-h-[200px] text-sm text-gray-900  border-gray-300 "
              placeholder="Write your blog here..."
              required
            ></textarea>
          </div>
        </div>
      </form>
    </div>
  );
}
