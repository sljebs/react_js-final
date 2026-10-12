export default function Footer() {
  return (
    <footer className="mt-10 bg-[#1D4938] py-4 text-sm text-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4">
        <nav className="flex flex-wrap items-center gap-5 text-white">
          <a href="#" className="hover:underline">Terms of Use</a>
          <a href="#" className="hover:underline">Privacy & Policy</a>
          <a href="#" className="hover:underline">Delivery & Return</a>
        </nav>

        <p className="whitespace-nowrap text-white">
          &copy; 2026 My Store. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}