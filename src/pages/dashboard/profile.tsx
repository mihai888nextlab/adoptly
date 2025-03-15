import { NextPageWithLayout } from "../_app";

const Profile: NextPageWithLayout = () => {
  return (
    <div>
      <h1 className="mt-0 mb-10">Update Profile</h1>

      <form className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            value="John Doe"
          />
        </div>
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            value="Software Developer"
          />
        </div>

        <div>
          <label
            htmlFor="organization"
            className="block text-sm font-medium text-gray-700"
          >
            Organization
          </label>
          <input
            type="text"
            id="organization"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            value="Estep Bilişim"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            value="john.doe@example.com"
          />
        </div>
        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700"
          >
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            value="+1 (555) 123-4567"
          />
        </div>
        <div>
          <label
            htmlFor="location"
            className="block text-sm font-medium text-gray-700"
          >
            Location
          </label>
          <input
            type="text"
            id="location"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            value="San Francisco, CA"
          />
        </div>

        <div className="flex justify-end space-x-4 ">
          <button
            type="button"
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-800 text-white rounded-lg hover:bg-indigo-700"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

Profile.getLayout = "dashboard";

export default Profile;
