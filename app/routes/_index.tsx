import { redirect, type ActionArgs } from "@remix-run/node";
import { Form, type V2_MetaFunction } from "@remix-run/react";

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  console.table(Object.fromEntries(formData));
  return redirect("/");
}

export const meta: V2_MetaFunction = () => {
  return [{ title: "New Remix App" }];
};

export default function Index() {
  return (
    <div className="mx-auto max-w-7xl p-6">
      <h1 className="text-4xl text-white">Work journal</h1>
      <p className="mt-3 text-xl text-gray-400">
        Doings and learnings. Updated weekly.
      </p>

      <div className="my-8 border p-2">
        <Form method="post">
          <p className="italic">Create an entry</p>
          <div>
            <div className="mt-4">
              <input type="date" name="date" className="text-gray-700" />
            </div>
            <div className="mt-2 space-x-6">
              <label>
                <input
                  className="mr-1"
                  type="radio"
                  name="category"
                  value="work"
                />
                Work
              </label>
              <label>
                <input
                  className="mr-1"
                  type="radio"
                  name="category"
                  value="learning"
                />
                Learning
              </label>
              <label>
                <input
                  className="mr-1"
                  type="radio"
                  name="category"
                  value="interesting"
                />
                Interesting thing
              </label>
            </div>

            <div className="mt-2">
              <textarea
                name="text"
                className="w-full text-gray-700"
                placeholder="Write your entry"
              />
            </div>

            <div className="mt-1 text-right">
              <button className="bg-blue-500 px-4 py-1 font-medium text-white">
                Save
              </button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
}
