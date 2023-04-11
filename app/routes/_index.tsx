import { redirect, type ActionArgs } from "@remix-run/node";
import { Form, useFetcher, type V2_MetaFunction } from "@remix-run/react";
import { format } from "date-fns";
import { useEffect, useRef } from "react";
import { db } from "~/db.server";

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const { date, type, text } = Object.fromEntries(formData);

  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (
    typeof date !== "string" ||
    typeof type !== "string" ||
    typeof text !== "string"
  ) {
    throw new Error("Bad request");
  }

  return db.entry.create({
    data: {
      date: new Date(date),
      type: type,
      text: text,
    },
  });
}

export const meta: V2_MetaFunction = () => {
  return [{ title: "Work Journal - lgastler" }];
};

export default function Index() {
  const fetcher = useFetcher();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (fetcher.state === "idle" && textareaRef.current) {
      textareaRef.current.value = "";
      textareaRef.current.focus();
    }
  }, [fetcher.state]);

  return (
    <div className="mx-auto max-w-7xl p-6">
      <h1 className="text-4xl text-white">Work journal</h1>
      <p className="mt-3 text-xl text-gray-400">
        Doings and learnings. Updated weekly.
      </p>

      <div className="my-8 border p-2">
        <p className="italic">Create an entry</p>
        <fetcher.Form method="post" autoComplete="off">
          <fieldset
            className="disabled:opacity-80"
            disabled={fetcher.state === "submitting"}
          >
            <div>
              <div className="mt-4">
                <input
                  type="date"
                  name="date"
                  required
                  className="text-gray-900"
                  defaultValue={format(new Date(), "yyyy-MM-dd")}
                />
              </div>
              <div className="mt-2 space-x-6">
                <label>
                  <input
                    className="mr-1"
                    type="radio"
                    name="type"
                    value="work"
                    defaultChecked
                  />
                  Work
                </label>
                <label>
                  <input
                    className="mr-1"
                    type="radio"
                    name="type"
                    required
                    value="learning"
                  />
                  Learning
                </label>
                <label>
                  <input
                    className="mr-1"
                    type="radio"
                    name="type"
                    value="interesting"
                  />
                  Interesting thing
                </label>
              </div>

              <div className="mt-2">
                <textarea
                  name="text"
                  className="w-full text-gray-700"
                  required
                  placeholder="Type your entry"
                  ref={textareaRef}
                />
              </div>

              <div className="mt-1 text-right">
                <button className="bg-blue-500 px-4 py-1 font-medium text-white">
                  {fetcher.state === "submitting" ? "Saving…" : "Save"}
                </button>
              </div>
            </div>
          </fieldset>
        </fetcher.Form>
      </div>
    </div>
  );
}
