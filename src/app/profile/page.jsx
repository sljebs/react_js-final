export default async function ProfilePage() {
  const user = {
    name: "Jane Doe",
    email: "jane@example.com",
    role: "UI/UX Designer",
    location: "Tbilisi, Georgia",
    joined: "October 2026",
  };

  return (
    <div className="min-h-[70vh] bg-gradient-to-br from-[#EAF0E9] via-[#F8FAF7] to-[#DFE9DF] px-6 py-12">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 text-center md:text-left">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#53765E]">
            Account
          </p>
          <h1 className="mt-2 text-4xl font-bold text-gray-900">User Profile</h1>
        </div>

        <div className="overflow-hidden rounded-[28px] border border-[#DCE7DD] bg-white shadow-[0_20px_60px_rgba(29,73,56,0.10)]">
          <div className="flex flex-col gap-8 bg-gradient-to-r from-[#1D4938] to-[#4C7A5A] px-6 py-8 text-white md:flex-row md:items-center md:px-10">
            <div className="flex h-28 w-28 items-center justify-center rounded-full border-4 border-white/60 bg-white/10 text-4xl font-bold shadow-lg backdrop-blur-sm">
              {user.name.charAt(0)}
            </div>

            <div className="flex-1">
              <p className="text-sm uppercase tracking-[0.25em] text-white/80">Profile</p>
              <h2 className="mt-2 text-3xl font-bold">{user.name}</h2>
              <p className="mt-2 inline-flex rounded-full bg-white/15 px-3 py-1 text-sm font-medium text-white/95">
                {user.role}
              </p>
            </div>
          </div>

          <div className="grid gap-5 p-6 md:grid-cols-2 md:p-8">
            <div className="rounded-2xl border border-[#DCE7DD] bg-[#F1F5F1] p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
                Email
              </p>
              <p className="mt-3 text-lg font-medium text-gray-800">{user.email}</p>
            </div>

            <div className="rounded-2xl border border-[#DCE7DD] bg-[#F1F5F1] p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
                Location
              </p>
              <p className="mt-3 text-lg font-medium text-gray-800">{user.location}</p>
            </div>

            <div className="rounded-2xl border border-[#DCE7DD] bg-[#F1F5F1] p-5 md:col-span-2">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
                Member Since
              </p>
              <p className="mt-3 text-lg font-medium text-gray-800">{user.joined}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}