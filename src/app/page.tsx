export default function Home() {
  return (
    <div className="container mt-5">
      <div className="p-5 text-center bg-white rounded-4 shadow-sm">
        <h1 className="display-4 fw-bold text-primary">
          Who's The Most Valuable Overwatch Player?
        </h1>
        <p className="lead mt-3 text-secondary">
          Welcome to the new application! We've successfully migrated to Next.js
          with TypeScript and Bootstrap.
        </p>
        <button className="btn btn-primary btn-lg mt-4 px-5 rounded-pill shadow-sm">
          Get Started
        </button>
      </div>
    </div>
  );
}
